export async function uploadInChunks(file){
  const res=await fetch('/api/upload/init',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:file.name})}).then(r=>r.json());
  return res;
}
