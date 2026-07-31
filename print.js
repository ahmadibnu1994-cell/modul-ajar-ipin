const LOGO_BASE64 = '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';

const KEPALA_SEKOLAH = { nama: 'Rafif Shidqi, B.Sh.', nip: '' };
const SEKOLAH = { nama: 'SD Islam Plus Imam Nawawi', alamat: 'Ciracas, Jakarta Timur', tahun: new Date().getFullYear() };

function generatePrintHTML(data, konten) {
  const tanggal = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Modul Ajar - ${data.mapel}</title>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Times New Roman',Times,serif; font-size:12pt; color:#000; background:#fff; }
.page { max-width:210mm; margin:0 auto; padding:20mm 25mm 20mm 30mm; min-height:297mm; }
.header-kop { display:flex; align-items:center; border-bottom:3px double #000; padding-bottom:10px; margin-bottom:16px; }
.header-logo { width:80px; height:80px; margin-right:16px; flex-shrink:0; }
.header-teks { flex:1; text-align:center; }
.nama-sekolah { font-size:16pt; font-weight:bold; text-transform:uppercase; letter-spacing:1px; }
.sub-sekolah { font-size:10pt; margin-top:2px; }
.alamat-sekolah { font-size:9pt; color:#333; margin-top:2px; }
.judul-doc { text-align:center; margin:16px 0 12px; }
.judul-doc h1 { font-size:13pt; font-weight:bold; text-transform:uppercase; letter-spacing:1px; text-decoration:underline; }
.tabel-identitas { width:100%; border-collapse:collapse; margin-bottom:16px; font-size:11pt; }
.tabel-identitas td { padding:3px 8px; vertical-align:top; }
.tabel-identitas .label { width:32%; font-weight:bold; }
.tabel-identitas .sep { width:2%; }
.section-content { font-size:11pt; line-height:1.75; margin-bottom:12px; }
.section-content h2 { font-size:11pt; font-weight:bold; margin:12px 0 5px; color:#1a3a6b; background:#d0d8e8; padding:4px 8px; border-left:4px solid #1a3a6b; }
.section-content ul { padding-left:20px; margin:4px 0; }
.section-content li { margin-bottom:3px; }
.section-content p { margin-bottom:6px; }
.section-content strong { font-weight:bold; }
.ttd-wrap { display:flex; justify-content:space-between; margin-top:40px; }
.ttd-box { text-align:center; min-width:180px; font-size:11pt; }
.ttd-jabatan { margin-bottom:56px; }
.ttd-nama { font-weight:bold; text-decoration:underline; }
.toolbar { position:fixed; top:16px; right:16px; display:flex; gap:8px; z-index:100; }
.btn-p { padding:10px 20px; background:#1a3a6b; color:#fff; border:none; border-radius:6px; font-size:13px; font-weight:500; cursor:pointer; }
.btn-c { padding:10px 20px; background:#888; color:#fff; border:none; border-radius:6px; font-size:13px; font-weight:500; cursor:pointer; }
@media print { .toolbar { display:none; } .page { padding:15mm 20mm 15mm 25mm; } }
</style>
</head>
<body>
<div class="toolbar">
  <button class="btn-p" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
  <button class="btn-c" onclick="window.close()">✕ Tutup</button>
</div>
<div class="page">
  <div class="header-kop">
    <img class="header-logo" src="data:image/png;base64,${LOGO_BASE64}" alt="Logo SD IPIN">
    <div class="header-teks">
      <div class="nama-sekolah">SD Islam Plus Imam Nawawi</div>
      <div class="sub-sekolah">Ciracas, Jakarta Timur</div>
      <div class="alamat-sekolah">Terakreditasi A | sdipin.sch.id</div>
    </div>
  </div>
  <div class="judul-doc">
    <h1>Modul Ajar — Kurikulum Merdeka (Deep Learning)</h1>
  </div>
  <table class="tabel-identitas">
    <tr>
      <td class="label">Mata Pelajaran</td><td class="sep">:</td><td>${data.mapel}</td>
      <td class="label">Kelas / Fase</td><td class="sep">:</td><td>${data.kelas}</td>
    </tr>
    <tr>
      <td class="label">Tema (Judul Bab)</td><td class="sep">:</td><td>${data.tema}</td>
      <td class="label">Alokasi Waktu</td><td class="sep">:</td><td>${data.waktu}</td>
    </tr>
    <tr>
      <td class="label">Sub Tema</td><td class="sep">:</td><td>${data.subtema}</td>
      <td class="label">Tahun Pelajaran</td><td class="sep">:</td><td>${SEKOLAH.tahun}/${SEKOLAH.tahun+1}</td>
    </tr>
    <tr>
      <td class="label">Materi</td><td class="sep">:</td><td colspan="3">${data.materi}</td>
    </tr>
    <tr>
      <td class="label">Guru Penyusun</td><td class="sep">:</td><td colspan="3">${data.guru}</td>
    </tr>
    <tr>
      <td class="label">Strategi</td><td class="sep">:</td><td colspan="3">${data.strategis && data.strategis.length ? data.strategis.join(', ') : 'Problem Based Learning'}</td>
    </tr>
  </table>
  <div class="section-content">${konten}</div>
  <div class="ttd-wrap">
    <div class="ttd-box">
      <div>Mengetahui,</div>
      <div class="ttd-jabatan">Kepala Sekolah</div>
      <div class="ttd-nama">${KEPALA_SEKOLAH.nama}</div>
    </div>
    <div class="ttd-box">
      <div>Jakarta, ${tanggal}</div>
      <div class="ttd-jabatan">Guru Penyusun</div>
      <div class="ttd-nama">${data.guru || '____________________'}</div>
    </div>
  </div>
</div>
</body>
</html>`;
}

window.generatePrintHTML = generatePrintHTML;
