import type { Project, OpportunityId } from './data';
/** Real providers must return provenance and explicitly identify live results. */
export interface ResearchProvider { research(project:Project,signal?:AbortSignal):Promise<{mode:'demo'|'live';sources:{url:string;accessedAt:string}[];summary:string}> }
export interface StrategyProvider { generate(project:Project,opportunity:OpportunityId,signal?:AbortSignal):Promise<{mode:'demo'|'live';content:string}> }
export const demoResearchProvider:ResearchProvider={async research(){return {mode:'demo',sources:[],summary:'仅展示固定虚构案例（模拟数据）；输入不会触发联网搜索。'}}};
