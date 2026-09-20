export type Relation={id:string;label:string};
export type Source={title:string;url:string;publisher:string;date:string};
export type Trap={correct:string;wrong:string;kind:string;explain:string};
export type Card={id:string;title:string;room:number;date:string;kind:string;priority:'核心'|'延伸';scope:'全国'|'贵州';summary:string;points:string[];original:string[];keywords:string[];aliases:string[];must:string[];traps:Trap[];links:Relation[];source:Source;cue:string;question:string;answer:string;custom?:boolean;examRef?:string};
export type Progress={card_id:string;note:string;starred:number;interval:number;due:string|null;reviewed_at:string|null;reviews:number;lapses:number};
export type Position={x:number;y:number};
export const ROOMS=[{name:'理论与改革',place:'序厅',color:'#7960c8',x:800,y:470},{name:'经济与发展',place:'议事厅',color:'#427acb',x:1500,y:410},{name:'科教与创新',place:'实验室',color:'#388a97',x:2240,y:600},{name:'乡村与生态',place:'庭院',color:'#448f69',x:2390,y:1320},{name:'民生与法治',place:'民生馆',color:'#c57b35',x:2240,y:2460},{name:'文化与党建',place:'书房',color:'#bc6585',x:1410,y:2470},{name:'开放与安全',place:'观景台',color:'#797cb6',x:520,y:2470},{name:'多彩贵州',place:'家乡馆',color:'#298f8e',x:420,y:1180}];
