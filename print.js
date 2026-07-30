// Logo SD IPIN dalam base64
const LOGO_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAAncElEQVR42u19d3xVRfr+OzOn3V5TSUKABEKJVAUlQBUpUkRQBBsqwn6Vta+Kii6wdt1FUVfUtaC7ay8grC5KUREERESqVAkEEEJCQert7ZSZ+f1xkogIFgQXP7/7kny4955zT3nOO2953ncmiHMOaTn5gtMQpIFOA52WNNBpoNNApyUNdBrotKSBTgOdBjotaaDTQKclDXQa6DTQaUkDnQY6LWmg00CngU5LGujDhVLGfrc1e/S7aDcwrxEhAADGOMYordEnXhjjCAFC8M7cjfv2NWCMDMrSQJ9oc8E4xohS47b7Prnqrs9HTZi3bOVegWDG+O+r9eeUNh0GZQLBoVDi2rsWLFpRk+G1J1IaMPrXO3rd/qeBvy8zcuoCbaK8e2/dtXctXr8jmOFWKEUG1wUsBoKxq8d0fObhYQ6HhVJGCE4DfZyuj3FOMPrsi/Ibpy6rDVC3QzQoJOJqll9uDKTsdqUxFO9d4nv5qRFdS3IoZRhjdGpr9imnC2YARzD615tfXX7TR4EI8joEzYBIJHHDuE4r3ht7y4TO9U0Jv9u5c19i9DXz5n+8jZBTHeVTTqNNm8sZu3f6sqdf3eZwWhUBoqoBhvHEPf3/NOEMc7enXlr14NPrKeOaLvJk4rbruz44ebDP6wAAdKpCfgoBbVrbcDh+6z0fz/2o0u+1IYKiYc3vE2c+MmTksE4A8PXmysICr89nX/jpjvVb6hESKEAiHLh0ZHG/viWM8+PT7d/Ayp8qQJuursOHjlspIhBRhLo4QfbpfHOVAJzrpV0B+BAAAA==';

const KEPALA_SEKOLAH = {
  nama: 'Rafif Shidqi, B.Sh.',
  nip: ''
};

const SEKOLAH = {
  nama: 'SD Islam Plus Imam Nawawi',
  alamat: 'Ciracas, Jakarta Timur',
  tahun: new Date().getFullYear()
};

function generatePrintHTML(data, konten) {
  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Modul Ajar - ${data.mapel} - ${data.tema}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      color: #000;
      background: #fff;
      padding: 20px;
    }
    .page {
      max-width: 210mm;
      margin: 0 auto;
      padding: 20mm 25mm 20mm 30mm;
      background: #fff;
      min-height: 297mm;
    }

    /* HEADER */
    .header-kop {
      display: flex;
      align-items: center;
      border-bottom: 3px double #000;
      padding-bottom: 10px;
      margin-bottom: 16px;
    }
    .header-logo {
      width: 80px;
      height: 80px;
      margin-right: 16px;
      flex-shrink: 0;
    }
    .header-teks { flex: 1; text-align: center; }
    .header-teks .nama-sekolah {
      font-size: 16pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .header-teks .sub-sekolah {
      font-size: 10pt;
      margin-top: 2px;
    }
    .header-teks .alamat {
      font-size: 9pt;
      color: #333;
      margin-top: 2px;
    }

    /* JUDUL DOKUMEN */
    .judul-doc {
      text-align: center;
      margin: 16px 0 12px;
    }
    .judul-doc h1 {
      font-size: 14pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-decoration: underline;
    }

    /* TABEL IDENTITAS */
    .tabel-identitas {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 11pt;
    }
    .tabel-identitas td {
      padding: 4px 8px;
      vertical-align: top;
    }
    .tabel-identitas .label {
      width: 35%;
      font-weight: bold;
    }
    .tabel-identitas .sep { width: 3%; }

    /* SECTION */
    .section {
      margin-bottom: 14px;
    }
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      background: #d0d8e8;
      padding: 4px 8px;
      margin-bottom: 6px;
      border-left: 4px solid #1a3a6b;
    }
    .section-content {
      padding: 0 8px;
      font-size: 11pt;
      line-height: 1.7;
    }
    .section-content ul {
      padding-left: 20px;
      margin: 4px 0;
    }
    .section-content li { margin-bottom: 3px; }
    .section-content p { margin-bottom: 6px; }
    .section-content h2 {
      font-size: 11pt;
      font-weight: bold;
      margin: 10px 0 4px;
      color: #1a3a6b;
      border-bottom: 1px solid #ccc;
      padding-bottom: 2px;
    }
    .section-content strong { font-weight: bold; }

    /* TTD */
    .ttd-wrap {
      display: flex;
      justify-content: flex-end;
      margin-top: 32px;
    }
    .ttd-box {
      text-align: center;
      min-width: 200px;
    }
    .ttd-box .ttd-kota {
      margin-bottom: 4px;
      font-size: 11pt;
    }
    .ttd-box .ttd-jabatan {
      font-size: 11pt;
      margin-bottom: 48px;
    }
    .ttd-box .ttd-nama {
      font-size: 11pt;
      font-weight: bold;
      text-decoration: underline;
    }
    .ttd-box .ttd-nip {
      font-size: 10pt;
    }

    /* PRINT */
    @media print {
      body { padding: 0; }
      .page { padding: 15mm 20mm 15mm 25mm; box-shadow: none; }
      .no-print { display: none !important; }
    }

    /* TOMBOL */
    .toolbar {
      position: fixed;
      top: 16px;
      right: 16px;
      display: flex;
      gap: 8px;
      z-index: 100;
    }
    .btn-print {
      padding: 10px 20px;
      background: #1a3a6b;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }
    .btn-close {
      padding: 10px 20px;
      background: #888;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }
  </style>
</head>
<body>

<div class="toolbar no-print">
  <button class="btn-print" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
  <button class="btn-close" onclick="window.close()">✕ Tutup</button>
</div>

<div class="page">

  <!-- KOP SURAT -->
  <div class="header-kop">
    <img class="header-logo" src="data:image/png;base64,${LOGO_BASE64}" alt="Logo SD IPIN">
    <div class="header-teks">
      <div class="nama-sekolah">${SEKOLAH.nama}</div>
      <div class="sub-sekolah">Jl. Ciracas, Jakarta Timur</div>
      <div class="alamat">Email: sdipin@gmail.com | Website: sdipin.sch.id</div>
    </div>
  </div>

  <!-- JUDUL -->
  <div class="judul-doc">
    <h1>Modul Ajar / Rencana Pelaksanaan Pembelajaran</h1>
    <div style="font-size:10pt;margin-top:4px">Kurikulum Merdeka — Deep Learning</div>
  </div>

  <!-- IDENTITAS -->
  <table class="tabel-identitas">
    <tr>
      <td class="label">Mata Pelajaran</td>
      <td class="sep">:</td>
      <td>${data.mapel}</td>
      <td class="label">Kelas / Fase</td>
      <td class="sep">:</td>
      <td>${data.kelas}</td>
    </tr>
    <tr>
      <td class="label">Tema</td>
      <td class="sep">:</td>
      <td>${data.tema}</td>
      <td class="label">Alokasi Waktu</td>
      <td class="sep">:</td>
      <td>${data.waktu}</td>
    </tr>
    <tr>
      <td class="label">Sub Tema</td>
      <td class="sep">:</td>
      <td>${data.subtema}</td>
      <td class="label">Tahun Pelajaran</td>
      <td class="sep">:</td>
      <td>${SEKOLAH.tahun}/${SEKOLAH.tahun + 1}</td>
    </tr>
    <tr>
      <td class="label">Materi</td>
      <td class="sep">:</td>
      <td colspan="3">${data.materi}</td>
    </tr>
    <tr>
      <td class="label">Guru Penyusun</td>
      <td class="sep">:</td>
      <td colspan="3">${data.guru}</td>
    </tr>
    <tr>
      <td class="label">Strategi Pembelajaran</td>
      <td class="sep">:</td>
      <td colspan="3">${data.strategis && data.strategis.length ? data.strategis.join(', ') : 'Problem Based Learning'}</td>
    </tr>
  </table>

  <!-- KONTEN AI -->
  <div class="section">
    <div class="section-content">
      ${konten}
    </div>
  </div>

  <!-- TTD -->
  <div class="ttd-wrap">
    <div class="ttd-box">
      <div class="ttd-kota">Jakarta, ${tanggal}</div>
      <div class="ttd-jabatan">Kepala Sekolah</div>
      <div class="ttd-nama">${KEPALA_SEKOLAH.nama}</div>
      ${KEPALA_SEKOLAH.nip ? `<div class="ttd-nip">NIP. ${KEPALA_SEKOLAH.nip}</div>` : ''}
    </div>
  </div>

</div>
</body>
</html>`;
}

// Export untuk dipakai di app.js
window.generatePrintHTML = generatePrintHTML;
window.LOGO_BASE64 = LOGO_BASE64;
