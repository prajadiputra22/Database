const mysql = require('mysql2');

// Konfigurasi koneksi ke MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'universitas'
});

const mahasiswaData = [
  ['123456', 'John', 'Jl. Merdeka No.1', 'Teknik Informatika', 21],
  ['234567', 'Alice', 'Jl. Gatot Subroto', 'Sistem Informasi', 23],
  ['345678', 'Bob', 'Jl. Sudirman No.5', 'Teknik Informatika', 20],
  ['456789', 'Cindy', 'Jl. Pahlawan No.2', 'Manajemen Informatika', 22],
  ['567890', 'David', 'Jl. Diponegoro No.3', 'Teknik Elektro', 25],
  ['678901', 'Emily', 'Jl. Cendrawasih No.4', 'Manajemen', 24],
  ['789012', 'Frank', 'Jl. Ahmad Yani No.6', 'Teknik Informatika', 19],
];

// Data untuk tabel mata_kuliah
const mataKuliahData = [
  ['Pemrograman Web', '123456', 85.0, 'Pak Budi'],
  ['Basis Data', '234567', 70.0, 'Ibu Ani'],
  ['Jaringan Komputer', '345678', 75.0, 'Pak Dodi'],
  ['Sistem Operasi', '123456', 90.0, 'Pak Budi'],
  ['Manajemen Proyek', '456789', 80.0, 'Ibu Desi'],
  ['Bahasa Inggris', '567890', 85.0, 'Ibu Eka'],
  ['Statistika', '678901', 75.0, 'Pak Farhan'],
  ['Algoritma', '789012', 65.0, 'Pak Galih'],
  ['Pemrograman Java', '123456', 95.0, 'Pak Budi'],
];

// Fungsi untuk menyisipkan data ke tabel mahasiswa
function insertMahasiswa() {
  const query = `INSERT INTO mahasiswa (NIM, Nama, Alamat, Jurusan, Umur) VALUES ?`;
  connection.query(query, [mahasiswaData], (err, results) => {
    if (err) {
      console.error('Gagal menambahkan data mahasiswa:', err);
      return;
    }
    console.log('Data mahasiswa berhasil ditambahkan:', results);
  });
}

// Fungsi untuk menyisipkan data ke tabel mata_kuliah
function insertMataKuliah() {
  const query = `INSERT INTO mata_kuliah (matakuliah, NIM, Nilai, Dosen_Pengajar) VALUES ?`;
  connection.query(query, [mataKuliahData], (err, results) => {
    if (err) {
      console.error('Gagal menambahkan data mata kuliah:', err);
      return;
    }
    console.log('Data mata kuliah berhasil ditambahkan:', results);
  });
}

// Jalankan fungsi penyisipan data
insertMahasiswa();
insertMataKuliah();

// Menutup koneksi setelah selesai
connection.end(() => {
  console.log('Koneksi ke MySQL ditutup.');
});
