$(function () {
  var data = SIAKAD.load('prodi');
  var id = new URLSearchParams(window.location.search).get('id');
  var cur = id ? data.filter(function (p) { return String(p.id) === id; })[0] : null;

  if (cur) {
    $('#formTitle').text('Edit Program Studi');
    document.title = 'SIAKAD - Edit Program Studi';
    $('#prodiId').val(cur.id);
    $('#prodiKode').val(cur.kode);
    $('#prodiNama').val(cur.nama);
    $('#prodiJenjang').val(cur.jenjang);
    $('#prodiKaprodi').val(cur.kaprodi);
    $('#prodiAkreditasi').val(cur.akreditasi);
  }

  $('#formProdi').on('submit', function (e) {
    e.preventDefault();
    var kode = $.trim($('#prodiKode').val()).toUpperCase();
    var dup = data.some(function (p) { return p.kode === kode && (!cur || p.id !== cur.id); });
    if (dup) { alert('Kode Prodi "' + kode + '" sudah digunakan.'); return; }

    var row = {
      kode: kode,
      nama: $.trim($('#prodiNama').val()),
      jenjang: $('#prodiJenjang').val(),
      kaprodi: $.trim($('#prodiKaprodi').val()),
      akreditasi: $('#prodiAkreditasi').val()
    };
    if (cur) {
      $.extend(cur, row);
    } else {
      row.id = data.reduce(function (m, p) { return Math.max(m, p.id); }, 0) + 1;
      row.aktif = 0;
      data.push(row);
    }
    SIAKAD.save('prodi', data);
    window.location.href = 'prodi.html';
  });
});
