import {CATALOG} from '@/lib/catalog';
import type {Card,Position,Progress} from '@/lib/types';

type Stored={progress:Progress[];positions:({card_id:string}&Position)[];cards:Card[];reviewIds:string[]};
const KEY='zhizheng-static-v1';
const empty=():Stored=>({progress:[],positions:[],cards:[],reviewIds:[]});
function read():Stored{try{return {...empty(),...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return empty()}}
function write(data:Stored){localStorage.setItem(KEY,JSON.stringify(data))}
function progressFor(data:Stored,cardId:string){return data.progress.find(p=>p.card_id===cardId)??{card_id:cardId,note:'',starred:0,interval:0,due:null,reviewed_at:null,reviews:0,lapses:0}}
function saveProgress(data:Stored,p:Progress){data.progress=[...data.progress.filter(x=>x.card_id!==p.card_id),p];write(data);return p}
function json(body:unknown,status=200){return new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}})}

export function installStaticApi(){
 const nativeFetch=window.fetch.bind(window);
 window.fetch=async(input:RequestInfo|URL,init?:RequestInit)=>{
  const url=typeof input==='string'?input:input instanceof URL?input.href:input.url;
  if(!url.includes('/api/state')&&!url.includes('/api/action'))return nativeFetch(input,init);
  const data=read();
  if(url.includes('/api/state'))return json({cards:[...CATALOG,...data.cards],progress:data.progress,positions:data.positions,user:{displayName:'本地学习者'}});
  let body:any;try{body=JSON.parse(String(init?.body||'{}'))}catch{return json({error:'数据格式错误'},400)}
  const all=[...CATALOG,...data.cards];
  if(body.action==='card'){
   const known=new Set(all.map(c=>c.id));
   if(!body.title||!body.date||!body.sourceUrl||!Array.isArray(body.links)||!body.links.length||body.links.some((id:string)=>!known.has(id)||id===body.cardId))return json({error:'请检查必填项、日期、原文链接和关联考点。'},400);
   const card:Card={id:body.cardId??`custom-${crypto.randomUUID()}`,title:body.title,room:Number(body.room),date:body.date,kind:'个人补充',priority:'延伸',scope:Number(body.room)===7?'贵州':'全国',summary:body.summary,points:String(body.summary).split(/\n+/).filter(Boolean),original:String(body.summary).split(/\n+/).filter(Boolean),keywords:body.keywords,aliases:body.keywords,must:body.must,traps:[{correct:body.correct,wrong:body.wrong,kind:'自定义辨析',explain:body.explain}],links:[...new Set<string>(body.links)].map(id=>({id,label:'个人关联'})),source:{title:body.sourceTitle,url:body.sourceUrl,publisher:'个人添加 · 待自行核验',date:body.date},cue:'把它放到熟悉的地点，用自己的话复述。',question:`请复述「${body.title}」，并说出一个易错替换。`,answer:`${body.summary}\n准确：${body.correct}；不能替换成：${body.wrong}`,custom:true};
   data.cards=[...data.cards.filter(c=>c.id!==card.id),card];write(data);return json({card});
  }
  if(!all.some(c=>c.id===body.cardId))return json({error:'未找到知识点。'},404);
  if(body.action==='position'){data.positions=[...data.positions.filter(p=>p.card_id!==body.cardId),{card_id:body.cardId,x:body.x,y:body.y}];write(data);return json({saved:true})}
  const prev=progressFor(data,body.cardId);
  if(body.action==='note')return json({progress:saveProgress(data,{...prev,note:String(body.note||'')})});
  if(body.action==='star')return json({progress:saveProgress(data,{...prev,starred:body.starred?1:0})});
  if(body.action==='review'){
   if(!data.reviewIds.includes(body.requestId)){
    const interval=body.rating==='again'?1:body.rating==='hard'?Math.max(1,Math.round((prev.interval||1)*1.2)):Math.min(180,prev.interval?Math.max(3,Math.round(prev.interval*2.2)):3);
    const now=new Date(),due=new Date(now.getTime()+interval*86400000).toISOString();
    data.reviewIds=[...data.reviewIds.slice(-499),body.requestId];
    const p={...prev,interval,due,reviewed_at:now.toISOString(),reviews:prev.reviews+1,lapses:prev.lapses+(body.rating==='again'?1:0)};return json({progress:saveProgress(data,p)});
   }
   return json({progress:prev});
  }
  return json({error:'不支持的操作'},400);
 };
}
