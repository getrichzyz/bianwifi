

document.addEventListener('DOMContentLoaded', () => {
  const barangData = [
    { nama: "Router TP-Link AC750", kode: "RT-001", lokasi: "Rak A1", jumlah: 5 },
    { nama: "Switch 8 Port", kode: "SW-008", lokasi: "Rak A2", jumlah: 3 }
  ];

  const tabelBody = document.getElementById('tabelBarangBody');
  const modal = document.getElementById('modalTambah');
  const tambahBtn = document.getElementById('tambahBarangBtn');
  const simpanBtn = document.getElementById('simpanBarangBtn');
  const tutupBtn = document.getElementById('tutupModalBtn');

  function renderTable() {
    tabelBody.innerHTML = '';
    barangData.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.kode}</td>
        <td>${item.lokasi}</td>
        <td>${item.jumlah}</td>
        <td><span class="hapus-btn" data-index="${index}">🗑️</span></td>
      `;
      tabelBody.appendChild(row);
    });
  }

  renderTable();

  tambahBtn.onclick = () => {
    modal.classList.remove('hidden');
  };

  tutupBtn.onclick = () => {
    modal.classList.add('hidden');
  };

  simpanBtn.onclick = () => {
    const nama = document.getElementById('namaBarang').value;
    const kode = document.getElementById('kodeBarang').value;
    const lokasi = document.getElementById('lokasiRak').value;
    const jumlah = document.getElementById('jumlahBarang').value;

    if (nama && kode && lokasi && jumlah) {
      barangData.push({ nama, kode, lokasi, jumlah: parseInt(jumlah) });
      renderTable();
      modal.classList.add('hidden');
    }
  };

  tabelBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('hapus-btn')) {
      const index = e.target.dataset.index;
      barangData.splice(index, 1);
      renderTable();
    }
  });
});
