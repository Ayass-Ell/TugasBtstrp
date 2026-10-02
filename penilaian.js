$(function () {
  var data = SIAKAD.load('penilaian');
  var esc = SIAKAD.esc;
  var gradeBadge = { 'A': 'success', 'B+': 'primary', 'B': 'info', 'C+': 'warning', 'C': 'warning', 'D': 'danger' };

  function fmt(n) { return Number(n).toFixed(1); }
  function withNilai(r) {
    var na = SIAKAD.hitung(r.tugas, r.uts, r.uas);
    return { na: na, grade: SIAKAD.grade(na), lulus: SIAKAD.lulus(na) };
  }

  var dt = $('#dataTable').DataTable({
    data: data,
    language: SIAKAD.DT_LANG,
    order: [[0, 'asc']],
    columns: [
      { data: 'kode' },
      { data: 'nim' },
      { data: 'nama', render: function (v) { return esc(v); } },
      { data: 'mk', render: function (v) { return esc(v); } },
      { data: 'tugas' },
      { data: 'uts' },
      { data: 'uas' },
      { data: null, render: function (d, t) {
          var h = withNilai(d); return t === 'display' ? '<strong>' + fmt(h.na) + '</strong>' : h.na;
      } },
      { data: null, render: function (d, t) {
          var h = withNilai(d);
          return t === 'display' ? '<span class="badge badge-' + gradeBadge[h.grade] + '">' + h.grade + '</span>' : h.grade;
      } },
      { data: null, render: function (d, t) {
          var h = withNilai(d);
          if (t !== 'display') return h.lulus ? 'Lulus' : 'Tidak Lulus';
          return h.lulus ? '<span class="badge badge-success">Lulus</span>' : '<span class="badge badge-danger">Tidak Lulus</span>';
      } },
      { data: null, orderable: false, searchable: false, className: 'table-aksi', render: function (d) {
          return '<a href="penilaian-form.html?id=' + encodeURIComponent(d.kode) + '" class="btn btn-warning btn-circle btn-sm" title="Edit"><i class="fas fa-edit"></i></a>' +
                 '<button class="btn btn-danger btn-circle btn-sm btn-hapus" data-kode="' + d.kode + '" title="Hapus"><i class="fas fa-trash"></i></button>';
      } }
    ]
  });

  $('#dataTable').on('click', '.btn-hapus', function () {
    var kode = String($(this).data('kode'));
    var r = data.filter(function (x) { return x.kode === kode; })[0];
    if (r && confirm('Hapus transaksi ' + r.kode + ' (' + r.nama + ')?')) {
      data = data.filter(function (x) { return x.kode !== kode; });
      SIAKAD.save('penilaian', data);
      dt.clear().rows.add(data).draw();
    }
  });
});
