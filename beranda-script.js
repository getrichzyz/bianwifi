

document.addEventListener('DOMContentLoaded', () => {
 
  const data = {
    admin: 2,
    suplier: 2,
    rak: 2,
    barang: 2,
    barangKeluar: 1
  };

  document.getElementById('adminCount').textContent = `Total Admin: ${data.admin}`;
  document.getElementById('suplierCount').textContent = `Total Suplier: ${data.suplier}`;
  document.getElementById('rakCount').textContent = `Total Rak: ${data.rak}`;
  document.getElementById('barangCount').textContent = `Total Barang: ${data.barang}`;
  document.getElementById('barangKeluarCount').textContent = `Total Barang Keluar: ${data.barangKeluar}`;
});

