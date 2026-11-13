const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const template = fs.readFileSync(path.join(root, 'index.template.html'), 'utf8');
const embed = (name) => 'data:image/png;base64,' + fs.readFileSync(path.join(root, name)).toString('base64');
const groom = template.replace('__IMAGE_DATA__', embed('Thiep-cuoi-FEFCF6.png'));
const bride = template
  .replace(/const blocks=isNewInvitation\?\[\]:\[[\s\S]*?\]\.map/, `const blocks=[
['Tiêu đề Wedding Timeline',204,116,323,35],
['08:30 — Đón khách',82,231,113,48],
['10:00 — Lễ cưới',322,231,86,48],
['10:30 — Khai tiệc',537,231,103,48],
['Trân trọng kính mời',95,402,233,25],
['Lời mời dự tiệc',125,438,475,27],
['Tên cô dâu & chú rể',36,550,658,109],
['Ngày giờ tiệc cưới',28,782,176,52],
['Địa điểm tiệc cưới',274,755,180,77],
['Lời cảm ơn',536,782,185,51],
['Trân trọng báo tin — Lễ Vu Quy',244,917,241,58],
['Mai Hương & Vương Tiến',89,1013,550,58],
['Ngày giờ & địa chỉ lễ Vu Quy',154,1100,410,84],
['Thông tin nhà gái',144,1211,146,71],
['Thông tin nhà trai',393,1211,189,71]
].map`)
  .replaceAll('926', '726').replaceAll('1699', '1323')
  .replace("host.protocol==='http:'", 'false')
  .replace('wedding-invitation-settings-v1', 'wedding-invitation-bride-settings-v1')
  .replaceAll("'wedding-invitation'", "'wedding-invitation-bride'")
  .replaceAll('thong-so-thiep-cuoi.txt', 'thong-so-thiep-nha-gai.txt')
  .replace('Mở bằng Chay-thiep-cuoi.cmd để tự đọc và tự lưu file .txt trong thư mục.', 'Thông số Nhà gái tự lưu trong trình duyệt này.')
  .replace('416*scale,485*scale,395*scale,34*scale,416*scale,516*scale,395*scale,34*scale', '328*scale,373*scale,304*scale,26*scale,328*scale,403*scale,304*scale,26*scale')
  .replace('blocks[5]', 'blocks[4]').replace('Math.max(423,', 'Math.max(333,').replace('guestRight=805', 'guestRight=627').replace('542*scale', '423*scale')
  .replace('__IMAGE_DATA__', embed('Thiep-nha-gai-4K.png'));
const newInvitation = (side, image, settingsFile) => template
  .replace('const isNewInvitation=false', 'const isNewInvitation=true')
  .replace('<div id="blockControls">', '<div id="blockControls" hidden>')
  .replace('max="42"', 'max="28"')
  .replaceAll('#800b12', '#9e6a10').replaceAll('#800B12', '#9E6A10')
  .replace("host.protocol==='http:'", 'false')
  .replace('wedding-invitation-settings-v1', `wedding-invitation-${side}-new-settings-v1`)
  .replaceAll("'wedding-invitation'", `'wedding-invitation-${side}-new'`)
  .replaceAll('thong-so-thiep-cuoi.txt', settingsFile)
  .replace('Mở bằng Chay-thiep-cuoi.cmd để tự đọc và tự lưu file .txt trong thư mục.', 'Thông số mẫu mới tự lưu trong trình duyệt này.')
  .replace('__IMAGE_DATA__', embed(image));
const brideNew = newInvitation('bride', 'nha_gai_new.png', 'thong-so-thiep-nha-gai-new.txt');
const groomNew = newInvitation('groom', 'nha_trai_new.png', 'thong-so-thiep-nha-trai-new.txt');
const escapeAttribute = (html) => html.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const html = `<!doctype html>
<html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Viết tên thiệp cưới</title>
<style>
body{margin:0;height:100dvh;display:flex;flex-direction:column;background:#f5f1ec;font:15px system-ui,sans-serif}
nav{display:flex;flex-wrap:wrap;gap:8px;padding:10px 22px;background:#fffdfa;border-bottom:1px solid #e6ddd6}
button{padding:9px 20px;border:0;border-radius:8px;background:#ece3dc;color:#573c34;font:inherit;cursor:pointer}
button[aria-pressed=true]{background:#84252b;color:white}
iframe{flex:1;min-height:0;width:100%;border:0}
</style>
<nav aria-label="Chọn mẫu thiệp"><button aria-pressed="true" data-side="groom">Nhà trai</button><button aria-pressed="false" data-side="bride">Nhà gái</button><button aria-pressed="false" data-side="bride-new">Nhà gái new</button><button aria-pressed="false" data-side="groom-new">Nhà trai new</button></nav>
<iframe id="groom" title="Sửa thiệp Nhà trai" srcdoc="${escapeAttribute(groom)}"></iframe>
<iframe id="bride" title="Sửa thiệp Nhà gái" srcdoc="${escapeAttribute(bride)}" loading="lazy" hidden></iframe>
<iframe id="bride-new" title="Sửa thiệp Nhà gái new" srcdoc="${escapeAttribute(brideNew)}" loading="lazy" hidden></iframe>
<iframe id="groom-new" title="Sửa thiệp Nhà trai new" srcdoc="${escapeAttribute(groomNew)}" loading="lazy" hidden></iframe>
<script>
const choices = document.querySelectorAll('button[data-side]');
for (const choice of choices) {
  choice.addEventListener('click', () => {
    for (const tab of choices) {
      const selected = tab === choice;
      tab.setAttribute('aria-pressed', String(selected));
      document.getElementById(tab.dataset.side).hidden = !selected;
    }
  });
}
</script></html>`;
for (const file of ['Thiep-cuoi.html', 'index.html']) fs.writeFileSync(path.join(root, file), html);
console.log('Built Thiep-cuoi.html and index.html');
