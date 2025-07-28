const BIN_ID = "68878408f7e7a370d1ef42cc";
const API_KEY = "$2a$10$JCbX6d8rVbDg4zI0.fjTQeOyJ/A8HwoQ/3QW9qAkSupc4MAb7GWJO";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY,
};

let dataSuplier = [];

const tabelBody = document.querySelector("#tabel-suplier tbody");
const tambahBtn = document.getElementById("tambahBtn");
const modal = document.getElementById("modal");
const simpanBtn = document.getElementById("simpanBtn");
const batalBtn = document.getElementById("batalBtn");


async function getDataSuplier() {
  try {
    const res = await fetch(`${BASE_URL}/latest`, { headers });
    const json = await res.json();
    return json.record || [];
  } catch (err) {
    console.error("Gagal ambil data:", err);
    return [];
  }
}


async function saveDataSuplier(data) {
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
  dataSuplier.forEach((suplier, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${suplier.nama}</td>
      <td>${suplier.kontak}</td>
      <td>${suplier.alamat}</td>
      <td><button class="hapus-btn" data-index="${index}">🗑️</button></td>
    `;
    tabelBody.appendChild(row);
  });
}


async function loadSuplier() {
  dataSuplier = await getDataSuplier();
  renderTable();
}


tambahBtn.onclick = () => {
  modal.classList.remove("hidden");
};


simpanBtn.onclick = async () => {
  const nama = document.getElementById("namaSuplier").value.trim();
  const kontak = document.getElementById("kontakSuplier").value.trim();
  const alamat = document.getElementById("alamatSuplier").value.trim();

  if (nama && kontak && alamat) {
    dataSuplier.push({ nama, kontak, alamat });
    await saveDataSuplier(dataSuplier);
    renderTable();
    modal.classList.add("hidden");
    document.getElementById("formSuplier").reset();
  } else {
    alert("Semua kolom wajib diisi.");
  }
};


batalBtn.onclick = () => {
  modal.classList.add("hidden");
  document.getElementById("formSuplier").reset();
};


tabelBody.addEventListener("click", async (e) => {
  if (e.target.classList.contains("hapus-btn")) {
    const index = e.target.dataset.index;
    if (confirm("Yakin ingin menghapus data ini?")) {
      dataSuplier.splice(index, 1);
      await saveDataSuplier(dataSuplier);
      renderTable();
    }
  }
});

document.addEventListener("DOMContentLoaded", loadSuplier);
