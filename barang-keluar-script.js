const BIN_ID = "6887851c7b4b8670d8a8a749";
const API_KEY = "$2a$10$JCbX6d8rVbDg4zI0.fjTQeOyJ/A8HwoQ/3QW9qAkSupc4MAb7GWJO";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY,
};

let dataKeluar = [];

const tabelBody = document.querySelector("#tabel-barang-keluar tbody");
const tambahBtn = document.getElementById("tambahBtn");
const modal = document.getElementById("modal");
const simpanBtn = document.getElementById("simpanBtn");
const batalBtn = document.getElementById("batalBtn");


async function getData() {
  try {
    const res = await fetch(`${BASE_URL}/latest`, { headers });
    const json = await res.json();
    return json.record || [];
  } catch (err) {
    console.error("Gagal ambil data:", err);
    return [];
  }
}


async function saveData(data) {
  try {
    await fetch(BASE_URL, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("Gagal simpan data:", err);
  }
}


function renderTable() {
  tabelBody.innerHTML = "";
  dataKeluar.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.tanggal}</td>
      <td>${item.nama_barang}</td>
      <td>${item.jumlah}</td>
      <td>${item.penerima}</td>
      <td><button class="hapus-btn" data-index="${index}">🗑️</button></td>
    `;
    tabelBody.appendChild(row);
  });
}


async function loadData() {
  dataKeluar = await getData();
  renderTable();
}


tambahBtn.onclick = () => {
  modal.classList.remove("hidden");
};

simpanBtn.onclick = async () => {
  const tanggal = document.getElementById("tanggal").value;
  const nama_barang = document.getElementById("namaBarang").value.trim();
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const penerima = document.getElementById("penerima").value.trim();

  if (tanggal && nama_barang && jumlah && penerima) {
    dataKeluar.push({ tanggal, nama_barang, jumlah, penerima });
    await saveData(dataKeluar);
    renderTable();
    modal.classList.add("hidden");
    document.getElementById("formBarangKeluar").reset();
  } else {
    alert("Semua kolom wajib diisi.");
  }
};

batalBtn.onclick = () => {
  modal.classList.add("hidden");
  document.getElementById("formBarangKeluar").reset();
};

tabelBody.addEventListener("click", async (e) => {
  if (e.target.classList.contains("hapus-btn")) {
    const index = e.target.dataset.index;
    if (confirm("Yakin ingin menghapus data ini?")) {
      dataKeluar.splice(index, 1);
      await saveData(dataKeluar);
      renderTable();
    }
  }
});

document.addEventListener("DOMContentLoaded", loadData);
