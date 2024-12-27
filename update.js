const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'universitas'
});

function updateMahasiswa(nim, newAlamat, newUmur) {
  const query = `UPDATE mahasiswa SET Alamat = ?, Umur = ? WHERE NIM = ?`;
  connection.query(query, [newAlamat, newUmur, nim], (err, results) => {
    if (err) {
      console.error('Gagal memperbarui data mahasiswa:', err);
      return;
    }
    console.log(`Data mahasiswa dengan NIM ${nim} berhasil diperbarui.`);
  });
}

function updateMataKuliah(nim, newNilai) {
  const query = `UPDATE mata_kuliah SET Nilai = ? WHERE NIM = ?`;
  connection.query(query, [newNilai, nim], (err, results) => {
    if (err) {
      console.error('Gagal memperbarui data mata kuliah:', err);
      return;
    }
    console.log(`Nilai mata kuliah untuk mahasiswa dengan NIM ${nim} berhasil diperbarui.`);
  });
}

updateMahasiswa('123456', 'Jl. Raya No.5', 23);

connection.end(() => {
  console.log('Koneksi ke MySQL ditutup.');
});
