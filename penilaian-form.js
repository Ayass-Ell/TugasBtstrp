$(function () {
  var data = SIAKAD.load('penilaian');
  var mhs = SIAKAD.load('mahasiswa');
  var esc = SIAKAD.esc;

  function pad(n) { return ('000' + n).slice(-3); }
  function fmt(n) { return Number(n).toFixed(1); }
  function clamp(v) { v = parseFloat(v); if (isNaN(v)) return 0; return Math.max(0, Math.min(100, v)); }

  var opts = '<option value="">-- Pilih Mahasiswa --</option>';
  mhs.forEach(function (m) {
    opts += '<option value="' + esc(m.nim) + '">' + esc(m.nim) + ' - ' + esc(m.nama) + '</option>';
  });
  $('#trxMhs').html(opts);

  function updateEstimasi() {
    var na = SIAKAD.hitung(clamp($('#trxTugas').val()), clamp($('#trxUts').val()), clamp($('#trxUas').val()));
    var ok = SIAKAD.lulus(na);
    $('#estNilai').text(fmt(na));
    $('#estGrade').text(SIAKAD.grade(na));
    $('#estStatus').text(ok ? 'LULUS' : 'TIDAK LULUS')
      .toggleClass('text-success', ok).toggleClass('text-danger', !ok);
  }
  $('.nilai-input').on('input change', updateEstimasi);

  var id = new URLSearchParams(window.location.search).get('id');
  var cur = id ? data.filter(function (r) { return r.kode === id; })[0] : null;

  if (cur) {
    $('#formTitle').text('Edit Transaksi Penilaian');
    document.title = 'SIAKAD - Edit Transaksi Penilaian';
    $('#trxId').val(cur.kode);
    $('#trxMhs').val(cur.nim);
    $('#trxMk').val(cur.mk);
    $('#trxTugas').val(cur.tugas);
    $('#trxUts').val(cur.uts);
    $('#trxUas').val(cur.uas);
  }
  updateEstimasi();

  $('#formPenilaian').on('submit', function (e) {
    e.preventDefault();
    var nim = $('#trxMhs').val();
    var m = mhs.filter(function (x) { return x.nim === nim; })[0];
    if (!m) { alert('Silakan pilih mahasiswa terlebih dahulu.'); return; }

    var row = {
      nim: m.nim,
      nama: m.nama,
      mk: $('#trxMk').val(),
      tugas: clamp($('#trxTugas').val()),
      uts: clamp($('#trxUts').val()),
      uas: clamp($('#trxUas').val())
    };
    if (cur) {
      $.extend(cur, row);
    } else {
      var max = data.reduce(function (mx, r) { return Math.max(mx, parseInt(r.kode.replace('TRX-', ''), 10) || 0); }, 0);
      row.kode = 'TRX-' + pad(max + 1);
      data.push(row);
    }
    SIAKAD.save('penilaian', data);
    window.location.href = 'penilaian.html';
  });
});
