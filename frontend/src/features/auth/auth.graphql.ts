import{gql}from'@apollo/client';
export const LOGIN=gql`mutation Login($input:LoginInput!){login(input:$input){accessToken user{id email firstName lastName role permissions}}}`;
export const REFRESH=gql`mutation Refresh{refreshSession{accessToken user{id email firstName lastName role permissions}}}`;
export const LOGOUT=gql`mutation Logout{logout}`;
