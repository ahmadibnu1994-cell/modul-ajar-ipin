// =============================================
// GANTI INI DENGAN API KEY OPENROUTER KAMU
// Dapatkan di: openrouter.ai/keys
// =============================================
const OPENROUTER_API_KEY = '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';
// =============================================

let currentLevel = 'Sedang';

const waktuInfo = {
  '2 JP (1 pertemuan)': '2 JP · 70 menit · 1 pertemuan',
  '4 JP (2 pertemuan)': '4 JP · 140 menit · 2 pertemuan',
  '6 JP (3 pertemuan)': '6 JP · 210 menit · 3 pertemuan',
  '8 JP (4 pertemuan)': '8 JP · 280 menit · 4 pertemuan',
};

function updateWaktuInfo() {
  const val = document.getElementById('waktu').value;
  const el = document.getElementById('waktu-info');
  if (val && waktuInfo[val]) {
    el.style.display = 'block';
    el.textContent = '⏱ ' + waktuInfo[val];
  } else {
    el.style.display = 'none';
  }
}

function goStep(n) {
  [1, 2].forEach(i => {
    document.getElementById('panel-' + i).classList.remove('active');
    const tab = document.getElementById('step-tab-' + i);
    const num = document.getElementById('step-num-' + i);
    tab.classList.remove('active', 'done');
    if (i < n) {
      tab.classList.add('done');
      num.innerHTML = '✓';
    } else if (i === n) {
      tab.classList.add('active');
      num.textContent = i;
    } else {
      num.textContent = i;
    }
  });
  document.getElementById('panel-' + n).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleChip(el) {
  const selected = document.querySelectorAll('#strategi-chips .chip.selected');
  if (!el.classList.contains('selected') && selected.length >= 3) return;
  el.classList.toggle('selected');
}

function setLevel(val, el) {
  currentLevel = val;
  document.querySelectorAll('.level-opt').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
}

function getStrategis() {
  return [...document.querySelectorAll('#strategi-chips .chip.selected')].map(c => c.textContent);
}

function getAsesmen() {
  const types = [
    { id: 'pg', label: 'Pilihan Ganda' },
    { id: 'isian', label: 'Isian Singkat' },
    { id: 'uraian', label: 'Uraian/Esai' },
    { id: 'kinerja', label: 'Penilaian Kinerja' }
  ];
  return types
    .filter(t => document.getElementById('aktif-' + t.id).checked)
    .map(t => ({
      jenis: t.label,
      jumlah: document.getElementById('jml-' + t.id).value,
      level: document.getElementById('lvl-' + t.id).value || currentLevel
    }));
}

function getData() {
  return {
    mapel: document.getElementById('mapel').value,
    kelas: document.getElementById('kelas').value,
    tema: document.getElementById('tema').value,
    subtema: document.getElementById('subtema').value,
    materi: document.getElementById('materi').value,
    waktu: document.getElementById('waktu').value,
    guru: document.getElementById('guru').value,
    tp: document.getElementById('tp').value,
    strategis: getStrategis(),
    asesmen: getAsesmen(),
    level: currentLevel
  };
}

function buildPrompt(data) {
  return `Kamu adalah asisten perancang modul ajar untuk SD Islam Plus Imam Nawawi (SD IPIN), Jakarta Timur. Buatkan modul ajar Deep Learning yang LENGKAP berdasarkan data berikut:

IDENTITAS:
- Mata Pelajaran: ${data.mapel}
- Kelas/Fase: ${data.kelas}
- Tema (Judul Bab): ${data.tema}
- Sub Tema (Fokus Pertemuan): ${data.subtema}
- Materi: ${data.materi}
- Alokasi Waktu: ${data.waktu} (1 JP = 35 menit)
- Nama Penyusun: ${data.guru}

TUJUAN PEMBELAJARAN (dari guru):
${data.tp}

STRATEGI PEMBELAJARAN: ${data.strategis.length ? data.strategis.join(', ') : 'Problem Based Learning'}

ASESMEN YANG DIMINTA:
${data.asesmen.map(a => `- ${a.jenis}: ${a.jumlah} soal, level ${a.level}`).join('\n')}
Level kesulitan umum: ${data.level}

Hasilkan modul dalam format HTML sederhana menggunakan tag h2, p, ul, li, strong saja.

Struktur wajib:
1. IDENTIFIKASI PESERTA DIDIK (kesiapan, minat, kebutuhan belajar, dimensi profil lulusan SD IPIN)
2. DESAIN PEMBELAJARAN (CP, lintas disiplin, tujuan, topik esensial, model pedagogis, kemitraan, lingkungan, pemanfaatan digital)
3. LANGKAH PEMBELAJARAN per pertemuan (Kegiatan Awal yang berkesadaran → Inti: Memahami/Mengaplikasi/Merefleksi → Penutup)
4. ASESMEN PEMBELAJARAN (awal, proses As/For/Of Learning, akhir)
5. INSTRUMEN SOAL (tulis soal lengkap sesuai jenis dan jumlah yang diminta, beserta kunci jawaban)
6. RUBRIK PENILAIAN

Penting:
- Integrasikan nilai-nilai Islam secara substantif (syukur atas nikmat Allah, karakter Islami, ayat/hadis relevan jika ada)
- Langkah pembelajaran harus detail, menarik, dan benar-benar sesuai strategi yang dipilih
- Soal harus lengkap dan kontekstual, bukan hanya placeholder
- Gunakan bahasa Indonesia yang baik dan sesuai jenjang SD`;
}

async function generate() {
  const data = getData();

  if (!data.mapel || !data.kelas || !data.tema || !data.subtema || !data.materi || !data.waktu) {
    alert('Harap lengkapi semua field identitas terlebih dahulu.');
    return;
  }

  goStep(2);
  document.getElementById('loading-state').style.display = 'block';
  document.getElementById('preview-state').style.display = 'none';
  document.getElementById('saved-state').style.display = 'none';

  const msgs = [
    'Membangun identitas dan desain pembelajaran...',
    'Menyusun langkah pembelajaran...',
    'Membuat instrumen asesmen dan soal...',
    'Finalisasi modul ajar...'
  ];
  let mi = 0;
  const iv = setInterval(() => {
    mi = (mi + 1) % msgs.length;
    document.getElementById('loading-msg').textContent = msgs[mi];
  }, 2500);

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://modul-ajar-ipin.vercel.app',
        'X-Title': 'Generator Modul Ajar SD IPIN'
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        messages: [{ role: 'user', content: buildPrompt(data) }],
        max_tokens: 8192
      })
    });

    const result = await res.json();
    clearInterval(iv);

    if (!res.ok) {
      throw new Error(result.error?.message || `Error ${res.status}`);
    }

    const text = result.choices?.[0]?.message?.content || '';
    const clean = text.replace(/```html?/gi, '').replace(/```/g, '').trim();
    showPreview(data, clean);

  } catch (err) {
    clearInterval(iv);
    console.error(err);
    showPreview(data, `<p><strong>⚠️ Terjadi error:</strong> ${err.message}</p><p>Periksa konsol browser (F12) untuk detail.</p>`);
  }
}

function showPreview(data, content) {
  document.getElementById('loading-state').style.display = 'none';
  document.getElementById('preview-state').style.display = 'block';

  document.getElementById('info-cards').innerHTML = `
    <div class="info-card"><div class="ic-label">Mata Pelajaran</div><div class="ic-val">${data.mapel || '—'}</div></div>
    <div class="info-card"><div class="ic-label">Kelas</div><div class="ic-val">${data.kelas || '—'}</div></div>
    <div class="info-card"><div class="ic-label">Tema</div><div class="ic-val">${data.tema || '—'}</div></div>
    <div class="info-card"><div class="ic-label">Waktu</div><div class="ic-val">${data.waktu || '—'}</div></div>
  `;

  document.getElementById('preview-content').innerHTML = content;
}

function rebuild() {
  if (!confirm('Modul ini akan dibuat ulang dari awal. Lanjutkan?')) return;
  generate();
}

function approve() {
  document.getElementById('preview-state').style.display = 'none';
  document.getElementById('saved-state').style.display = 'block';
}

function resetAll() {
  ['mapel', 'kelas', 'tema', 'subtema', 'materi', 'waktu', 'guru', 'tp'].forEach(id => {
    document.getElementById(id).value = '';
  });
  updateWaktuInfo();
  document.querySelectorAll('#strategi-chips .chip').forEach(c => c.classList.remove('selected'));
  document.getElementById('aktif-pg').checked = true;
  document.getElementById('aktif-isian').checked = true;
  document.getElementById('aktif-uraian').checked = false;
  document.getElementById('aktif-kinerja').checked = false;
  document.getElementById('saved-state').style.display = 'none';
  document.getElementById('loading-state').style.display = 'block';
  goStep(1);
}
