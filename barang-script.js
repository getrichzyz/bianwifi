const BIN_ID = "68878108ae596e708fbd0f81";
const API_KEY = "$2a$10$JCbX6d8rVbDg4zI0.fjTQeOyJ/A8HwoQ/3QW9qAkSupc4MAb7GWJO";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY,
};

let dataBarang = [];

const tabelBody = document.querySelector("#tabel-barang tbody");
const tambahBtn = document.getElementById("tambahBtn");
const modal = document.getElementById("modal");
const simpanBtn = document.getElementById("simpanBtn");
const batalBtn = document.getElementById("batalBtn");


async function getDataBarang() {
  try {
    const res = await fetch(`${BASE_URL}/latest`, { headers });
    const json = await res.json();
    return json.record || [];
  } catch (err) {
    console.error("Gagal ambil data:", err);
    return [];
  }
}


async function saveDataBarang(data) {
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
  dataBarang.forEach((barang, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${barang.nama}</td>
      <td>${barang.kode}</td>
      <td>${barang.lokasi}</td>
      <td>${barang.jumlah}</td>
      <td><button class="hapus-btn" data-index="${index}">🗑️</button></td>
    `;
    tabelBody.appendChild(row);
  });
}


async function loadBarang() {
  dataBarang = await getDataBarang();
  renderTable();
}


tambahBtn.onclick = () => {
  modal.classList.remove("hidden");
};


simpanBtn.onclick = async () => {
  const nama = document.getElementById("namaBarang").value.trim();
  const kode = document.getElementById("kodeBarang").value.trim();
  const lokasi = document.getElementById("lokasiBarang").value.trim();
  const jumlah = parseInt(document.getElementById("jumlahBarang").value);

  if (nama && kode && lokasi && jumlah) {
    dataBarang.push({ nama, kode, lokasi, jumlah });
    await saveDataBarang(dataBarang);
    renderTable();
    modal.classList.add("hidden");
    document.getElementById("formBarang").reset();
  } else {
    alert("Semua kolom wajib diisi.");
  }
};


batalBtn.onclick = () => {
  modal.classList.add("hidden");
  document.getElementById("formBarang").reset();
};


tabelBody.addEventListener("click", async (e) => {
  if (e.target.classList.contains("hapus-btn")) {
    const index = e.target.dataset.index;
    if (confirm("Yakin ingin menghapus data ini?")) {
      dataBarang.splice(index, 1);
      await saveDataBarang(dataBarang);
      renderTable();
    }
  }
});


document.addEventListener("DOMContentLoaded", loadBarang);
