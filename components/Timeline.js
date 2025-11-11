export default function Timeline({ tracks }) {
  const root=document.createElement('div'); root.className='timeline';
  tracks.forEach(track=>{
    const t=document.createElement('div'); t.className='track';
    track.clips.forEach(clip=>{
      const c=document.createElement('div'); c.className=`clip clip-${clip.type}`; c.textContent=clip.label||clip.type;
      t.appendChild(c);
    });
    root.appendChild(t);
  });
  return root;
}
