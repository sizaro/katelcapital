let accessToken:string|null=null;export const session={get:()=>accessToken,set:(token:string|null)=>{accessToken=token}};
