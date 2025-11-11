import Fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'node:path';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { handleUploadRoutes } from './upload.js';

const fastify=Fastify({logger:true});
fastify.register(fastifyStatic,{root:path.join(process.cwd(),'frontend','public')});

const connection=new Redis(process.env.REDIS_URL);
const renderQueue=new Queue('render',{connection});

fastify.post('/api/render',async(req,reply)=>{
  const {project}=req.body;
  const job=await renderQueue.add('renderProject',{project});
  reply.send({jobId:job.id});
});

fastify.get('/api/render/:id',async(req,reply)=>{
  const job=await renderQueue.getJob(req.params.id);
  if(!job) return reply.code(404).send({error:'Not found'});
  const state=await job.getState();
  reply.send({state,result:job.returnvalue});
});

handleUploadRoutes(fastify);
fastify.listen({port:3000});
