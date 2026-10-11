'use client';
import {createContext,useContext,useState,useSyncExternalStore} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Layers3,ScanSearch,ChartNoAxesCombined,House,ArrowUpRight,Check,PanelLeftClose,PanelLeftOpen} from 'lucide-react';
import {initialProject,opportunities,type Project,type OpportunityId} from '@/lib/data';
const STORAGE='brandspace.project.v1';
type State={project:Project;selected:OpportunityId;axes:[number,number,number,number]};
type Store=State&{updateProject:(p:Project)=>void;select:(id:OpportunityId)=>void;setAxes:(a:State['axes'])=>void;ready:boolean;saved:boolean|null};
const fallback:State={project:initialProject,selected:'urban',axes:[0,1,0,1]};
const Context=createContext<Store|null>(null);
const subscribe=()=>()=>{};
function read():State{try{const raw=JSON.parse(localStorage.getItem(STORAGE)||'null');if(raw&&typeof raw.project?.brand==='string'&&typeof raw.project?.competitors==='string'&&typeof raw.project?.need==='string'&&opportunities.some(o=>o.id===raw.selected))return {...raw,axes:Array.isArray(raw.axes)&&raw.axes.length===4&&raw.axes.every((x:unknown)=>Number.isInteger(x)&&Number(x)>=0&&Number(x)<4)&&raw.axes[0]!==raw.axes[1]&&raw.axes[2]!==raw.axes[3]?raw.axes:fallback.axes};}catch{}return fallback}
export function useProject(){const value=useContext(Context);if(!value)throw Error('Workspace provider missing');return value}
export function Workspace({children}:{children:React.ReactNode}){
 const ready=useSyncExternalStore(subscribe,()=>true,()=>false);
 const [state,setState]=useState<State>(()=>typeof window==='undefined'?fallback:read());
 const [saved,setSaved]=useState<boolean|null>(null);const [collapsed,setCollapsed]=useState(false);
 const visible=ready?state:fallback;
 function commit(next:State){setState(next);try{localStorage.setItem(STORAGE,JSON.stringify(next));setSaved(true)}catch{setSaved(false)}}
 const path=usePathname().replace(/\/$/,'')||'/research';
 const nav=[{href:'/research',title:'Research Intelligence',cn:'品牌研究',icon:ScanSearch},{href:'/opportunity',title:'Opportunity Lab',cn:'营销机会',icon:ChartNoAxesCombined},{href:'/campaign',title:'Campaign Studio',cn:'策略工作室',icon:House}];
 return <Context.Provider value={{...state,ready,saved,updateProject:p=>commit({...state,project:p}),select:id=>commit({...state,selected:id}),setAxes:axes=>commit({...state,axes})}}><div className={'workspace '+(collapsed?'collapsed':'')}><aside className="sidebar no-print"><Link href="/research" className="brand"><span className="brand-symbol"><Layers3 size={24}/></span><span>BrandSpace<small>AI Marketing Strategy Studio</small></span></Link><div className="workspace-label">WORKSPACE <span>01</span></div><div className="project-mini"><span className="project-avatar">M</span><div><strong>{visible.project.brand||'未命名项目'}</strong><small>新能源汽车 · Demo</small></div></div><div className="nav-label">策略工作流</div><nav>{nav.map((n,i)=><Link key={n.href} href={n.href} className={path===n.href?'nav-item active':'nav-item'} aria-current={path===n.href?'page':undefined}><n.icon size={20}/><span><strong>{n.title}</strong><small>{n.cn}</small></span><span className="nav-step">0{i+1}</span></Link>)}</nav><div className="sidebar-bottom"><div className="demo-note"><span className="live-dot"/>DEMO WORKSPACE<p>模拟数据 · 预设案例<br/>探索从洞察到创意的完整链路</p></div><button className="collapse-button" onClick={()=>setCollapsed(!collapsed)} aria-label={collapsed?'展开导航':'收起导航'}>{collapsed?<PanelLeftOpen size={18}/>:<PanelLeftClose size={18}/>}<span>收起导航</span></button><div className="user"><span className="user-avatar">BS</span><div><strong>品牌策略团队</strong><small>本地演示工作区</small></div></div></div></aside><div className="main-shell"><header className="topbar no-print"><div className="breadcrumb">工作区 <span>/</span> <strong>{visible.project.brand||'未命名项目'}</strong><span className="small-badge">DEMO</span></div><div className="topbar-right"><span className="save-state"><Check size={14}/>{!ready?'载入中':saved===null?'本地自动保存':saved?'已保存到此浏览器':'浏览器保存不可用'}</span><span className="divider"/><span className="project-status"><span className="live-dot"/>策略探索中</span><Link href="/campaign" className="top-link">查看策略 <ArrowUpRight size={15}/></Link></div></header><main>{ready?children:<div className="loading">正在载入本地项目…</div>}</main><footer className="app-footer">BrandSpace <span>AI Marketing Strategy Studio · 模拟数据，仅用于产品交互演示</span></footer></div></div></Context.Provider>
}



