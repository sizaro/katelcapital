export type Role='SUPER_ADMIN'|'ADMIN'|'TALENT_SUCCESS_MANAGER'|'VETTING_OFFICER'|'ACADEMY_MANAGER'|'PROFESSIONAL'|'CLIENT'|'ACADEMY_LEARNER';
export interface AuthUser{id:string;email:string;firstName:string;lastName:string;role:Role;permissions:string[]}
export interface DashboardMetric{key:string;label:string;value:number}
export interface DashboardData{heading:string;description:string;metrics:DashboardMetric[]}
