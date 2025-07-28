const BIN_ID = "6887830c7b4b8670d8a8a53b";
const API_KEY = "$2a$10$JCbX6d8rVbDg4zI0.fjTQeOyJ/A8HwoQ/3QW9qAkSupc4MAb7GWJO";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY,
};

let dataAdmin = [];

const tabelBody = document.querySelector("#tabel-admin tbody");
const tambahBtn = document.getElementById("tambahBtn");
const modal = document.getElementById("modal");
const simpanBtn = document.getElementById("simpanBtn");
const batalBtn = document.getElementById("batalBtn");


async function getDataAdmin() {
  try {
    const res = await fetch(`${BASE_URL}/latest`, { headers });
    const json = await res.json();
    return json.record || [];
  } catch (err) {
    console.error("Gagal ambil data:", err);
    return [];
  }
}


async function saveDataAdmin(data) {
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
  dataAdmin.forEach((admin, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${admin.nama}</td>
      <td>${admin.email}</td>
      <td>${admin.username}</td>
      <td><button class="hapus-btn" data-index="${index}">🗑️</button></td>
    `;
    tabelBody.appendChild(row);
  });
}


async function loadAdmin() {
  dataAdmin = await getDataAdmin();
  renderTable();
}


tambahBtn.onclick = () => {
  modal.classList.remove("hidden");
};


simpanBtn.onclick = async () => {
  const nama = document.getElementById("namaAdmin").value.trim();
  const email = document.getElementById("emailAdmin").value.trim();
  const username = document.getElementById("usernameAdmin").value.trim();

  if (nama && email && username) {
    dataAdmin.push({ nama, email, username });
    await saveDataAdmin(dataAdmin);
    renderTable();
    modal.classList.add("hidden");
    document.getElementById("formAdmin").reset();
  } else {
    alert("Semua kolom wajib diisi.");
  }
};


batalBtn.onclick = () => {
  modal.classList.add("hidden");
  document.getElementById("formAdmin").reset();
};


tabelBody.addEventListener("click", async (e) => {
  if (e.target.classList.contains("hapus-btn")) {
    const index = e.target.dataset.index;
    if (confirm("Yakin ingin menghapus data ini?")) {
      dataAdmin.splice(index, 1);
      await saveDataAdmin(dataAdmin);
      renderTable();
    }
  }
});

document.addEventListener("DOMContentLoaded", loadAdmin);
