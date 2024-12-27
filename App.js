const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'universitas'
});

function updateAlamat(NIM, newAlamat) {
  const query = `UPDATE mahasiswa SET Alamat = ? WHERE NIM = ?`;
  connection.execute(query, [newAlamat, NIM], (err, results) => {
    if (err) {
      console.error('Error updating address:', err);
    } else {
      console.log('Address updated:', results);
    }
  });
}

function getMahasiswaTI() {
  const query = `
    SELECT m.NIM, m.Nama, m.Jurusan, mk.Dosen_Pengajar
    FROM mahasiswa m
    JOIN mata_kuliah mk ON m.NIM = mk.NIM
    WHERE m.Jurusan = 'Teknik Informatika'`;
    
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
    } else {
      console.log('Mahasiswa Teknik Informatika:', results);
    }
  });
}

function getTop5MahasiswaByAge() {
  const query = `SELECT Nama FROM mahasiswa ORDER BY Umur DESC LIMIT 5`;
  
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error fetching oldest students:', err);
    } else {
      console.log('5 Mahasiswa dengan umur tertua:', results);
    }
  });
}

function getMahasiswaNilaiLebih70() {
  const query = `
    SELECT m.Nama, mk.matakuliah, mk.Nilai
    FROM mahasiswa m
    JOIN mata_kuliah mk ON m.NIM = mk.NIM
    WHERE mk.Nilai > 70`;
  
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error fetching students with grades above 70:', err);
    } else {
      console.log('Mahasiswa dengan nilai > 70:', results);
    }
  });
}

updateAlamat('123456', 'Jl. Raya No.5');
getMahasiswaTI();
getTop5MahasiswaByAge();
getMahasiswaNilaiLebih70();

connection.end();
