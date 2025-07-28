const BIN_ID = "6887849bae596e708fbd11fc";
const API_KEY = "$2a$10$JCbX6d8rVbDg4zI0.fjTQeOyJ/A8HwoQ/3QW9qAkSupc4MAb7GWJO";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY,
};

let dataRak = [];

const tabelBody = document.querySelector("#tabel-rak tbody");
const tambahBtn = document.getElementById("tambahBtn");
const modal = document.getElementById("modal");
const simpanBtn = document.getElementById("simpanBtn");
const batalBtn = document.getElementById("batalBtn");


async function getDataRak() {
  try {
    const res = await fetch(`${BASE_URL}/latest`, { headers });
    const json = await res.json();
    return json.record || [];
  } catch (err) {
    console.error("Gagal ambil data:", err);
    return [];
  }
}


async function saveDataRak(data) {
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
  dataRak.forEach((rak, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${rak.kode}</td>
      <td>${rak.lokasi}</td>
      <td>${rak.keterangan}</td>
      <td><button class="hapus-btn" data-index="${index}">🗑️</button></td>
    `;
    tabelBody.appendChild(row);
  });
}


async function loadRak() {
  dataRak = await getDataRak();
  renderTable();
}


tambahBtn.onclick = () => {
  modal.classList.remove("hidden");
};


simpanBtn.onclick = async () => {
  const kode = document.getElementById("kodeRak").value.trim();
  const lokasi = document.getElementById("lokasiRak").value.trim();
  const keterangan = document.getElementById("ketRak").value.trim();

  if (kode && lokasi && keterangan) {
    dataRak.push({ kode, lokasi, keterangan });
    await saveDataRak(dataRak);
    renderTable();
    modal.classList.add("hidden");
    document.getElementById("formRak").reset();
  } else {
    alert("Semua kolom wajib diisi.");
  }
};


batalBtn.onclick = () => {
  modal.classList.add("hidden");
  document.getElementById("formRak").reset();
};


tabelBody.addEventListener("click", async (e) => {
  if (e.target.classList.contains("hapus-btn")) {
    const index = e.target.dataset.index;
    if (confirm("Yakin ingin menghapus data ini?")) {
      dataRak.splice(index, 1);
      await saveDataRak(dataRak);
      renderTable();
    }
  }
});

document.addEventListener("DOMContentLoaded", loadRak);
