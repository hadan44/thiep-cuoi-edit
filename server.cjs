const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFile } = require('node:child_process');
const defaults = require('./default-settings.json');
const root = __dirname;
const settingsPath = path.join(root, 'thong-so-thiep-cuoi.txt');
const token = crypto.randomBytes(24).toString('hex');
const port = Number(process.argv[2] || 4173);
let writes = Promise.resolve();
function validate(data) {
  if (!data || data.app !== defaults.app || data.version !== 1 || typeof data.name !== 'string' || data.name.length > 120 || !Number.isInteger(data.fontSize) || data.fontSize < 16 || data.fontSize > 42 || !/^#[0-9a-f]{6}$/i.test(data.color) || !['left','center','right'].includes(data.align) || !Array.isArray(data.blocks) || data.blocks.length !== defaults.blocks.length) throw Error('Invalid settings');
  data.blocks.forEach((b,i) => { if (!b || b.label !== defaults.blocks[i].label || !Number.isInteger(b.zoom) || b.zoom < 60 || b.zoom > 140) throw Error('Invalid block'); });
  return {app:data.app,version:1,name:data.name,fontSize:data.fontSize,color:data.color,align:data.align,blocks:data.blocks.map(b=>({label:b.label,zoom:b.zoom}))};
}
function reply(res, status, data) { res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}); res.end(JSON.stringify(data)); }
const server = http.createServer(async (req,res) => {
  const host = req.headers.host;
  if (![ '127.0.0.1:'+port, 'localhost:'+port ].includes(host)) return reply(res,403,{error:'Invalid host'});
  if (req.headers.origin && req.headers.origin !== 'http://'+host) return reply(res,403,{error:'Invalid origin'});
  try {
    if (req.url === '/api/settings' && req.method === 'GET') {
      await writes;
      let raw;
      try { raw = await fs.readFile(settingsPath,'utf8'); }
      catch (error) { if(error.code !== 'ENOENT') throw error; raw=JSON.stringify(defaults,null,2); await fs.writeFile(settingsPath,raw,{flag:'wx'}); }
      return reply(res,200,{settings:validate(JSON.parse(raw.replace(/^\uFEFF/,''))),token});
    }
    if (req.url === '/api/settings' && req.method === 'POST') {
      if(req.headers['x-settings-token'] !== token) return reply(res,403,{error:'Invalid token'});
      let body=''; for await (const chunk of req) { body+=chunk; if(Buffer.byteLength(body)>100000) return reply(res,413,{error:'Too large'}); }
      let data; try {data=validate(JSON.parse(body));} catch {return reply(res,400,{error:'Invalid settings'});}
      const task=writes.then(async()=>{const temp=settingsPath+'.tmp';await fs.writeFile(temp,JSON.stringify(data,null,2)+'\n','utf8');await fs.rename(temp,settingsPath);});
      writes=task.catch(()=>{}); await task; return reply(res,200,{saved:true});
    }
    if (['/','/index.html','/Thiep-cuoi.html'].includes(req.url) && req.method === 'GET') {
      const html=await fs.readFile(path.join(root,'index.html'));
      res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});return res.end(html);
    }
    reply(res,404,{error:'Not found'});
  } catch(error) { console.error('Settings error:',error.message);reply(res,500,{error:'Cannot read or save settings file'}); }
});
server.on('error',error=>{console.error('Khong khoi dong duoc:',error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>{
  const url='http://127.0.0.1:'+port;
  console.log('Mo '+url+' | Tu dong doc/ghi: '+settingsPath+'\nGiu cua so nay mo khi su dung.');
  if(process.argv.includes('--open') && process.platform==='win32') execFile('rundll32.exe',['url.dll,FileProtocolHandler',url]);
});
