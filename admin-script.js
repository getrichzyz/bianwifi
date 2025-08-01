const binId = "6887830c7b4b8670d8a8a53b";
const apiKey = "$2a$10$JCbX6d8rVbDg4zI0.fjTQeOyJ/A8HwoQ/3QW9qAkSupc4MAb7GWJO";
const url = `https://api.jsonbin.io/v3/b/${binId}`;
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": apiKey
};

const tbody = document.querySelector("#tabel-admin tbody");
const tambahBtn = document.getElementById("tambahBtn");
const modal = document.getElementById("modal");
const batalBtn = document.getElementById("batalBtn");
const simpanBtn = document.getElementById("simpanBtn");


const namaInput = document.getElementById("namaAdmin");
const emailInput = document.getElementById("emailAdmin");
const usernameInput = document.getElementById("usernameAdmin");
const passwordInput = document.getElementById("passwordAdmin");




tambahBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  namaInput.value = "";
  emailInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";
});


batalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});


async function loadData() {
  try {
    const res = await fetch(`${url}/latest`, { headers });
    const json = await res.json();
    const data = json.record;

    tbody.innerHTML = "";
    data.forEach((admin, i) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${admin.nama}</td>
        <td>${admin.gmail}</td>
        <td>${admin.username}</td>
        <td>${admin.password}</td>
        <td><span class="hapus-btn" onclick="hapusData(${i})">🗑️</span></td>
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error("Gagal memuat data:", err);
  }
}


simpanBtn.addEventListener("click", async () => {
  const nama = namaInput.value.trim();
  const gmail = emailInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!nama || !gmail || !username || !password) {
    alert("Semua field wajib diisi!");
    return;
  }

  try {
    const res = await fetch(`${url}/latest`, { headers });
    const json = await res.json();
    const data = json.record;

    const newAdmin = { nama, gmail, username, password };
    data.push(newAdmin);

    await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(data)
    });

    modal.classList.add("hidden");
    loadData();

  } catch (err) {
    console.error("Gagal menyimpan data:", err);
  }
});


async function hapusData(index) {
  if (!confirm("Yakin ingin menghapus data ini?")) return;

  try {
    const res = await fetch(`${url}/latest`, { headers });
    const json = await res.json();
    const data = json.record;

    data.splice(index, 1);

    await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(data)
    });

    loadData();
  } catch (err) {
    console.error("Gagal menghapus data:", err);
  }
}


loadData();
