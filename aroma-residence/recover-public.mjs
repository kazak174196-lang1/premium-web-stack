#!/usr/bin/env node
// Read-only public snapshot of Aroma Residence, without credentials or customer data.
// Run: node aroma-residence/recover-public.mjs ./aroma-snapshot
import {mkdir,writeFile} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';

const source='https://aroma-residence-emerald.vercel.app';
const target='https://aromaresidence.ru';
const root=resolve(process.argv[2]||'./aroma-snapshot');
const web=join(root,'webroot'),privateDir=join(root,'private');
const seen=new Set(),queue=[],errors=[],files=[];
function add(raw){
 if(!raw?.startsWith('/')||raw.startsWith('//')||raw.includes('\\'))return;
 const url=new URL(raw,source),p=decodeURIComponent(url.pathname);
 if(url.origin!==source||p.includes('..')||p.length>500||p.startsWith('/api/')||p.endsWith('/assets/products/'))return;
 if(!seen.has(p)){seen.add(p);queue.push(p);}
}
async function get(path){
 const response=await fetch(source+path,{redirect:'error',signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw Error(path+': HTTP '+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(bytes.length>9000000)throw Error(path+': oversized');
 return {bytes,type:response.headers.get('content-type')||''};
}
async function download(path){
 try{
  const {bytes,type}=await get(path);
  const relative=path.endsWith('/')?path.slice(1)+'index.html':path.slice(1);
  const dest=join(web,relative);
  await mkdir(dirname(dest),{recursive:true});
  const isText=relative.endsWith('.html')||relative.endsWith('.xml')||relative.endsWith('.txt')||relative.endsWith('.json');
  const data=isText?Buffer.from(bytes.toString('utf8').replaceAll(source,target)):bytes;
  await writeFile(dest,data);
  files.push({path,bytes:data.length,sha256:createHash('sha256').update(data).digest('hex')});
  if(isText||type.startsWith('text/')||path.endsWith('.js')){
   const content=data.toString('utf8');
   for(const match of content.matchAll(/(?:src|href|poster|content)=["'](\/assets\/[^"'<>\s]+)["']/g))add(match[1]);
   for(const match of content.matchAll(/url\(["']?(\/assets\/[^\s)'"]+)/g))add(match[1]);
   for(const match of content.matchAll(/["'](\/(?:assets|media)\/[a-zA-Z0-9_./?&=-]+)["']/g))add(match[1]);
  }
 }catch(e){errors.push({path,error:String(e?.message||e)});}
}
const sitemap=(await get('/sitemap.xml')).bytes.toString('utf8');
for(const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)){
 const u=new URL(match[1]);
 if(u.origin===source)add(u.pathname);
}
for(const p of ['/','/catalog/','/sets/','/cart/','/admin/','/dostavka/','/o-nas/','/robots.txt','/sitemap.xml','/assets/catalog-data.json'])add(p);
let offset=0;
while(offset<queue.length){
 const batch=queue.slice(offset,offset+8);offset+=batch.length;
 await Promise.all(batch.map(download));
 if(queue.length>500)throw Error('Unexpected asset graph expansion');
}
const catalog=JSON.parse((await get('/api/catalog/')).bytes.toString('utf8'));
if(!Array.isArray(catalog.products)||catalog.products.length<90)throw Error('Incomplete catalog');
await mkdir(privateDir,{recursive:true});
await writeFile(join(privateDir,'catalog.json'),JSON.stringify({products:catalog.products,sets:catalog.sets||[]},null,2));
for(const item of catalog.products)if(typeof item.image==='string')add(item.image);
while(offset<queue.length){const batch=queue.slice(offset,offset+8);offset+=batch.length;await Promise.all(batch.map(download));}
await writeFile(join(web,'robots.txt'),'User-agent: *\nDisallow: /\n# prelaunch only\n');
await writeFile(join(root,'snapshot-manifest.json'),JSON.stringify({source,target,products:catalog.products.length,files,errors},null,2));
console.log('Recovered:',files.length,'resources,',catalog.products.length,'products;',errors.length,'errors');
if(errors.length)process.exitCode=1;
