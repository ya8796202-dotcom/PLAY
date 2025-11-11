import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { spawn } from 'node:child_process';

const connection=new Redis(process.env.REDIS_URL);
new Worker('render',async job=>{
  const outPath=`storage/renders/${job.data.project.id}.mp4`;
  const args=['-y','-f','lavfi','-i','color=c=black:s=640x480:d=3',outPath];
  await runFFmpeg(args);
  return {outputUrl:`/${outPath}`};
},{connection});

function runFFmpeg(args){
  return new Promise((res,rej)=>{
    const ff=spawn(process.env.FFMPEG_BIN||'ffmpeg',args);
    ff.on('close',code=>code===0?res():rej(new Error('ffmpeg failed')));
  });
}
