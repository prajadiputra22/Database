const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });

const databaseName = 'universitas';

const createDatabaseSQL = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
const useDatabaseSQL = `USE ${databaseName}`;
const createMahasiswaTableSQL = `
CREATE TABLE IF NOT EXISTS mahasiswa (
    NIM VARCHAR(15) PRIMARY KEY,
    Nama VARCHAR(100) NOT NULL,
    Alamat TEXT,
    Jurusan VARCHAR(50) NOT NULL,
    Umur TINYINT
)`;
const createMataKuliahTableSQL = `
CREATE TABLE IF NOT EXISTS mata_kuliah (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matakuliah VARCHAR(100) NOT NULL,
    NIM VARCHAR(15),
    Nilai DECIMAL(5,2),
    Dosen_Pengajar VARCHAR(100),
    FOREIGN KEY (NIM) REFERENCES mahasiswa(NIM)
)`;


connection.connect((err) => {
  if (err) {
    console.error('Koneksi gagal:', err);
    return;
  }
  console.log('Terhubung ke MySQL.');

  connection.query(createDatabaseSQL, (err) => {
    if (err) {
      console.error('Gagal membuat database:', err);
      return;
    }
    console.log(`Database "${databaseName}" berhasil dibuat atau sudah ada.`);
    connection.query(useDatabaseSQL, (err) => {
      if (err) {
        console.error('Gagal menggunakan database:', err);
        return;
      }
      console.log(`Menggunakan database "${databaseName}".`);

      connection.query(createMahasiswaTableSQL, (err) => {
        if (err) {
          console.error('Gagal membuat tabel mahasiswa:', err);
          return;
        }
        console.log('Tabel "mahasiswa" berhasil dibuat atau sudah ada.');

        connection.query(createMataKuliahTableSQL, (err) => {
          if (err) {
            console.error('Gagal membuat tabel mata_kuliah:', err);
            return;
          }
          console.log('Tabel "mata_kuliah" berhasil dibuat atau sudah ada.');

          connection.end(() => {
            console.log('Koneksi ke MySQL ditutup.');
          });
        });
      });
    });
  });
});
