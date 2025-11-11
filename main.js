import Timeline from './components/Timeline.js';
import { uploadInChunks } from './components/Upload.js';

let project = { id: crypto.randomUUID(), title:"مشروع جديد", tracks:[{type:"video",clips:[]},{type:"audio",clips:[]},{type:"text",clips:[]}] };

function renderTimeline(){
  document.getElementById('timelineRoot').innerHTML='';
  const el = Timeline({ tracks:project.tracks, onSelectClip:()=>{}, onMoveClip:()=>{} });
  document.getElementById('timelineRoot').appendChild(el);
}
renderTimeline();
