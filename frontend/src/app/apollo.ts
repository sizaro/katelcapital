import{ApolloClient,HttpLink,InMemoryCache,from}from'@apollo/client';import{SetContextLink}from'@apollo/client/link/context';import{session}from'../services/session';
const uri=import.meta.env.VITE_GRAPHQL_URL||'http://localhost:3000/graphql';
const auth=new SetContextLink((prev)=>({headers:{...prev.headers,...(session.get()?{authorization:`Bearer ${session.get()}`}:{})}}));
export const apolloClient=new ApolloClient({link:from([auth,new HttpLink({uri,credentials:'include'})]),cache:new InMemoryCache()});
