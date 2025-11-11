import fs from 'node:fs';
import path from 'node:path';

export function handleUploadRoutes(fastify){
  const base=path.join(process.cwd(),'storage','uploads');
  fs.mkdirSync(base,{recursive:true});
  const sessions=new Map();

  fastify.post('/api/upload/init',async(req,reply)=>{
    const {name}=req.body;
    const uploadId=Date.now()+'_'+Math.random().toString(36).slice(2);
    sessions.set(uploadId,{name,parts:[]});
    reply.send({uploadId,url:`/uploads/${name}`});
  });
}
