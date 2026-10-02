$(function () {
  var data = SIAKAD.load('mahasiswa');
  var prodi = SIAKAD.load('prodi');
  var esc = SIAKAD.esc;

  var opts = '<option value="">-- Pilih Program Studi --</option>';
  prodi.forEach(function (p) {
    opts += '<option value="' + esc(p.nama) + '">' + esc(p.nama) + ' (' + esc(p.jenjang) + ')</option>';
  });
  $('#mhsProdi').html(opts);

  var id = new URLSearchParams(window.location.search).get('id');
  var cur = id ? data.filter(function (m) { return m.nim === id; })[0] : null;

  if (cur) {
    $('#formTitle').text('Edit Data Mahasiswa');
    document.title = 'SIAKAD - Edit Data Mahasiswa';
    $('#mhsOldNim').val(cur.nim);
    $('#mhsNim').val(cur.nim);
    $('#mhsNama').val(cur.nama);
    $('#mhsProdi').val(cur.prodi);
    $('#mhsAngkatan').val(cur.angkatan);
    $('#mhsGender').val(cur.gender);
    $('#mhsEmail').val(cur.email);
    $('#mhsStatus').val(cur.status);
  }

  $('#formMahasiswa').on('submit', function (e) {
    e.preventDefault();
    var nim = $.trim($('#mhsNim').val());
    var dup = data.some(function (m) { return m.nim === nim && (!cur || m !== cur); });
    if (dup) { alert('NIM ' + nim + ' sudah terdaftar.'); return; }

    var row = {
      nim: nim,
      nama: $.trim($('#mhsNama').val()),
      prodi: $('#mhsProdi').val(),
      angkatan: $('#mhsAngkatan').val(),
      gender: $('#mhsGender').val(),
      email: $.trim($('#mhsEmail').val()),
      status: $('#mhsStatus').val()
    };
    if (cur) { $.extend(cur, row); } else { data.push(row); }
    SIAKAD.save('mahasiswa', data);
    window.location.href = 'mahasiswa.html';
  });
});
