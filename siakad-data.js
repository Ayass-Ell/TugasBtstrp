/* Data & helper bersama SIAKAD (disimpan di localStorage browser) */
var SIAKAD = (function () {
  var SEED = {
    prodi: [
      { id: 1, kode: 'PR001', nama: 'Teknik Informatika',  jenjang: 'S1', kaprodi: 'Dr. Budi Santoso, M.Kom',  akreditasi: 'Unggul',      aktif: 120 },
      { id: 2, kode: 'PR002', nama: 'Sistem Informasi',    jenjang: 'S1', kaprodi: 'Siti Aminah, M.T.',        akreditasi: 'Baik Sekali', aktif: 95 },
      { id: 3, kode: 'PR003', nama: 'Teknologi Informasi', jenjang: 'D3', kaprodi: 'Ahmad Dahlan, M.Sc',       akreditasi: 'Baik',        aktif: 60 },
      { id: 4, kode: 'PR004', nama: 'Sains Data',          jenjang: 'S1', kaprodi: 'Dr. Retno Wulandari, M.Si', akreditasi: 'Unggul',     aktif: 45 }
    ],
    mahasiswa: [
      { nim: '230101001', nama: 'Aditya Pratama', prodi: 'Teknik Informatika',  angkatan: '2023', gender: 'Laki-laki', email: 'aditya@student.ac.id', status: 'Aktif' },
      { nim: '230101002', nama: 'Siti Nurhaliza', prodi: 'Teknik Informatika',  angkatan: '2023', gender: 'Perempuan', email: 'siti@student.ac.id',   status: 'Aktif' },
      { nim: '230102001', nama: 'Bagas Rahadian', prodi: 'Sistem Informasi',    angkatan: '2023', gender: 'Laki-laki', email: 'bagas@student.ac.id',  status: 'Aktif' },
      { nim: '230103001', nama: 'Dewi Anggraini', prodi: 'Teknologi Informasi', angkatan: '2022', gender: 'Perempuan', email: 'dewi@student.ac.id',   status: 'Aktif' },
      { nim: '230104001', nama: 'Fajar Ramadan',  prodi: 'Sains Data',          angkatan: '2023', gender: 'Laki-laki', email: 'fajar@student.ac.id',  status: 'Aktif' },
      { nim: '230101003', nama: 'Gita Savitri',   prodi: 'Teknik Informatika',  angkatan: '2023', gender: 'Perempuan', email: 'gita@student.ac.id',   status: 'Cuti' },
      { nim: '230102002', nama: 'Hendra Gunawan', prodi: 'Sistem Informasi',    angkatan: '2022', gender: 'Laki-laki', email: 'hendra@student.ac.id', status: 'Aktif' },
      { nim: '230103002', nama: 'Intan Permata',  prodi: 'Teknologi Informasi', angkatan: '2023', gender: 'Perempuan', email: 'intan@student.ac.id',  status: 'Aktif' }
    ],
    penilaian: [
      { kode: 'TRX-001', nim: '230101001', nama: 'Aditya Pratama', mk: 'Pemrograman Web',   tugas: 85, uts: 80, uas: 90 },
      { kode: 'TRX-002', nim: '230101002', nama: 'Siti Nurhaliza', mk: 'Pemrograman Web',   tugas: 90, uts: 88, uas: 92 },
      { kode: 'TRX-003', nim: '230102001', nama: 'Bagas Rahadian', mk: 'Basis Data',        tugas: 75, uts: 70, uas: 68 },
      { kode: 'TRX-004', nim: '230103001', nama: 'Dewi Anggraini', mk: 'Jaringan Komputer', tugas: 60, uts: 55, uas: 50 },
      { kode: 'TRX-005', nim: '230104001', nama: 'Fajar Ramadan',  mk: 'Kecerdasan Buatan', tugas: 88, uts: 85, uas: 90 }
    ]
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function load(name) {
    var key = 'siakad_' + name;
    try {
      var raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    var seed = clone(SEED[name]);
    save(name, seed);
    return seed;
  }

  function save(name, data) {
    try { localStorage.setItem('siakad_' + name, JSON.stringify(data)); } catch (e) {}
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Nilai Akhir = 30% Tugas + 30% UTS + 40% UAS */
  function hitung(tugas, uts, uas) {
    var n = 0.3 * Number(tugas) + 0.3 * Number(uts) + 0.4 * Number(uas);
    return Math.round(n * 10) / 10;
  }
  function grade(n) {
    if (n >= 85) return 'A';
    if (n >= 80) return 'B+';
    if (n >= 70) return 'B';
    if (n >= 65) return 'C+';
    if (n >= 55) return 'C';
    return 'D';
  }
  function lulus(n) { return n >= 55; }

  var DT_LANG = {
    search: 'Cari:',
    lengthMenu: 'Tampilkan _MENU_ data',
    info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
    infoEmpty: 'Menampilkan 0 sampai 0 dari 0 data',
    infoFiltered: '(disaring dari _MAX_ total data)',
    zeroRecords: 'Data tidak ditemukan',
    emptyTable: 'Belum ada data',
    paginate: { first: 'Awal', last: 'Akhir', next: 'Berikutnya', previous: 'Sebelumnya' }
  };

  return { load: load, save: save, esc: esc, hitung: hitung, grade: grade, lulus: lulus, DT_LANG: DT_LANG };
})();
