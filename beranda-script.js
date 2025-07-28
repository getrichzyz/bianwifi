// Redirect ke index.html jika belum login
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "index.html";
}

// Logout button
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
});

const apiKey = "$2a$10$JCbX6d8rVbDg4zI0.fjTQeOyJ/A8HwoQ/3QW9qAkSupc4MAb7GWJO";

const bins = {
  admin: "6887830c7b4b8670d8a8a53b",
  suplier: "68878408f7e7a370d1ef42cc",
  rak: "6887849bae596e708fbd11fc",
  barang: "68878108ae596e708fbd0f81",
  barangKeluar: "6887851c7b4b8670d8a8a749"
};

// Fungsi ambil data dari JSON Bin
function fetchCount(binId, elementId) {
  fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
    headers: {
      "X-Master-Key": apiKey
    }
  })
    .then(res => res.json())
    .then(data => {
      const records = data.record;
      const count = Array.isArray(records) ? records.length : 0;
      document.getElementById(elementId).textContent = count;
    })
    .catch(err => {
      console.error(`Gagal ambil data ${elementId}`, err);
      document.getElementById(elementId).textContent = "0";
    });
}

// Ambil semua data
fetchCount(bins.admin, "adminCount");
fetchCount(bins.suplier, "suplierCount");
fetchCount(bins.rak, "rakCount");
fetchCount(bins.barang, "barangCount");
fetchCount(bins.barangKeluar, "barangKeluarCount");
