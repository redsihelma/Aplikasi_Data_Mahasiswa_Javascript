let dataMahasiswa = [];
let isLoggedIn = false;
let editNIM = null;
var editIndex = -1;

function toggleLoading(showLoading) {
  const loginForm = document.getElementById("login-form");
  const loginLoading = document.getElementById("login-loading");
  if (showLoading) {
    loginForm.classList.add("show-loading");
    loginLoading.style.display = "block";
  } else {
    loginForm.classList.remove("show-loading");
    loginLoading.style.display = "none";
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Menampilkan loading.gif saat proses login
  const loginLoading = document.getElementById("login-loading");
  loginLoading.style.display = "block";

  // Misalkan, kita gunakan username "admin" dan password "12345" untuk masuk
  if (username === "admin" && password === "admin") {
      setTimeout(function () {
          isLoggedIn = true;
          loginLoading.style.display = "none";
          document.getElementById("login").style.display = "none";
          document.getElementById("data-mahasiswa").style.display = "block";
          tampilDataMahasiswa();
          showSuccessMessage("Berhasil Login");          
      }, 500); // Menunggu 0.5 detik sebelum memproses login
  } else {
      // Menampilkan pesan error (contoh sederhana)
      alert("Username atau password salah!");
      loginLoading.style.display = "none"; // Menyembunyikan loading.gif saat login gagal
  }
}

function tampilDataMahasiswa() {
  const tableBody = document.getElementById("data-mahasiswa-body");
  tableBody.innerHTML = ""; // Mengosongkan tabel sebelum mengisi ulang

  dataMahasiswa.forEach(function (mahasiswa, index) {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${mahasiswa.nim}</td>
          <td>${mahasiswa.nama}</td>
          <td>${mahasiswa.prodi}</td>
          <td>
              <button onclick="editMahasiswa(${index})">Edit</button>
              <button onclick="hapusMahasiswa(${index})">Hapus</button>
          </td>
      `;
      tableBody.appendChild(row);
  });
}

function hapusMahasiswa(index) {
  const confirmation = confirm("Apakah Anda yakin ingin menghapus data mahasiswa ini?");
  if (confirmation) {
      dataMahasiswa.splice(index, 1);
      tampilDataMahasiswa();
      showSuccessMessage("Berhasil Hapus");
  }
}

function resetForm() {
  document.getElementById("nim").value = "";
  document.getElementById("nama").value = "";
  document.getElementById("prodi").value = "";
  document.getElementById("tambah-button").style.display = "block";
  document.getElementById("update-button").style.display = "none";
  editIndex = -1;
}

function showSuccessMessage(message) {
  const successMessage = document.getElementById("success-message");
  successMessage.textContent = message;
  successMessage.style.backgroundColor = "green";
  successMessage.style.color = "white";
  successMessage.style.padding = "10px";
  successMessage.style.display = "block";

  setTimeout(function () {
      successMessage.style.display = "none";
  }, 2000);
}

function tambahMahasiswa() {
  const nim = document.getElementById("nim").value;
  const nama = document.getElementById("nama").value;
  const prodi = document.getElementById("prodi").value;

  if (nim && nama && prodi) {
      const mahasiswa = {
          nim,
          nama,
          prodi
      };
      dataMahasiswa.push(mahasiswa);
      tampilDataMahasiswa();
      resetForm();
      showSuccessMessage("Berhasil Tambah");
  } else {
      alert("Isi semua data mahasiswa terlebih dahulu!");
  }
}

// function login() {
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   // Misalkan, kita gunakan username "admin" dan password "12345" untuk masuk
//   if (username === "r" && password === "r") {
//     isLoggedIn = true;
//     document.getElementById("login").style.display = "none";
//     document.getElementById("data-mahasiswa").classList.add("show");
//     tampilDataMahasiswa();
//   } else {
//     alert("Username atau password salah!");
//   }
// }

function logout() {
  isLoggedIn = false;
  document.getElementById("login").style.display = "block";
  document.getElementById("data-mahasiswa").style.display = "none";
}

function editMahasiswa(index) {
  const mahasiswa = dataMahasiswa[index];
  document.getElementById("nim").value = mahasiswa.nim;
  document.getElementById("nama").value = mahasiswa.nama;
  document.getElementById("prodi").value = mahasiswa.prodi;
  document.getElementById("tambah-button").style.display = "none";
  document.getElementById("update-button").style.display = "block";
  editIndex = index;
}

function updateMahasiswa() {
  if (editIndex !== -1) {
      const nim = document.getElementById("nim").value;
      const nama = document.getElementById("nama").value;
      const prodi = document.getElementById("prodi").value;

      if (nim && nama && prodi) {
          dataMahasiswa[editIndex] = { nim, nama, prodi };
          tampilDataMahasiswa();
          resetForm();
          showSuccessMessage("Berhasil Edit");
      } else {
          alert("Isi semua data mahasiswa terlebih dahulu!");
      }
  }
}

function simpanEdit() {
  const nim = document.getElementById("edit-nim").value;
  const nama = document.getElementById("edit-nama").value;
  const prodi = document.getElementById("edit-prodi").value;

  if (nim && nama && prodi) {
    const mahasiswa = dataMahasiswa.find((m) => m.nim === editNIM);
    if (mahasiswa) {
      mahasiswa.nama = nama;
      mahasiswa.prodi = prodi;
      tampilDataMahasiswa();
      batalEdit();
    }
  } else {
    alert("Isi semua data mahasiswa terlebih dahulu!");
  }
}

function batalEdit() {
  document.getElementById("edit-nim").value = "";
  document.getElementById("edit-nama").value = "";
  document.getElementById("edit-prodi").value = "";
  document.getElementById("edit-mahasiswa").style.display = "none";
  document.getElementById("data-mahasiswa").style.display = "block";
  editNIM = null;
}

function cariMahasiswa() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();

  if (searchTerm) {
    const searchResult = dataMahasiswa.filter((mahasiswa) =>
      mahasiswa.nim.toLowerCase().includes(searchTerm) ||
      mahasiswa.nama.toLowerCase().includes(searchTerm) ||
      mahasiswa.prodi.toLowerCase().includes(searchTerm)
    );

    const tbody = document.getElementById("data-mahasiswa-body");
    tbody.innerHTML = "";

    for (const mahasiswa of searchResult) {
      const row = `<tr>
                    <td>${mahasiswa.nim}</td>
                    <td>${mahasiswa.nama}</td>
                    <td>${mahasiswa.prodi}</td>
                    <td>
                      <button onclick="editMahasiswa('${mahasiswa.nim}')">Edit</button>
                      <button onclick="hapusMahasiswa('${mahasiswa.nim}')">Hapus</button>
                    </td>
                  </tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
    }
  } else {
    tampilDataMahasiswa();
  }
}