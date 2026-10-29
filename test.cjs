const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
(async()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'wedding-test-'));
  for(const file of ['server.cjs','default-settings.json','index.html']) fs.copyFileSync(path.join(__dirname,file),path.join(dir,file));
  const child=spawn(process.execPath,[path.join(dir,'server.cjs'),'4187'],{stdio:['ignore','pipe','pipe']});
  try {
    await new Promise((resolve,reject)=>{child.stdout.once('data',resolve);child.once('error',reject);child.once('exit',code=>reject(Error('Server exited '+code)));});
    const url='http://127.0.0.1:4187';
    const get=await fetch(url+'/api/settings');assert.equal(get.status,200);
    const {settings,token}=await get.json();
    settings.name='Khách kiểm tra';settings.blocks[7].zoom=91;
    const post=(body,headers={})=>fetch(url+'/api/settings',{method:'POST',headers:{'Content-Type':'application/json',...headers},body});
    assert.equal((await post(JSON.stringify(settings),{'X-Settings-Token':token})).status,200);
    const file=path.join(dir,'thong-so-thiep-cuoi.txt'),saved=fs.readFileSync(file,'utf8');
    assert.equal(JSON.parse(saved).blocks[7].zoom,91);
    assert.equal((await (await fetch(url+'/api/settings')).json()).settings.name,'Khách kiểm tra');
    assert.equal((await post('{}',{'X-Settings-Token':token})).status,400);
    assert.equal((await post(JSON.stringify(settings))).status,403);
    assert.equal((await post(JSON.stringify(settings),{'X-Settings-Token':token,Origin:'https://example.com'})).status,403);
    assert.equal(fs.readFileSync(file,'utf8'),saved);
    fs.writeFileSync(file,'broken');
    assert.equal((await fetch(url+'/api/settings')).status,500);
    assert.equal(fs.readFileSync(file,'utf8'),'broken');
    assert.equal((await fetch(url)).status,200);
    console.log('PASS: startup TXT, save/reload, validation, request access checks, preserve damaged file, HTML. User file untouched.');
  } finally { child.kill(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
