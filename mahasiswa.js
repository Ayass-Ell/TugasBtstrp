$(function () {
  var data = SIAKAD.load('mahasiswa');
  var esc = SIAKAD.esc;
  var statusBadge = { 'Aktif': 'success', 'Cuti': 'warning', 'Non-Aktif': 'secondary' };

  var dt = $('#dataTable').DataTable({
    data: data,
    language: SIAKAD.DT_LANG,
    order: [[1, 'asc']],
    columns: [
      { data: null, orderable: false, searchable: false, defaultContent: '' },
      { data: 'nim' },
      { data: 'nama', render: function (v) { return esc(v); } },
      { data: 'prodi', render: function (v) { return esc(v); } },
      { data: 'angkatan' },
      { data: 'gender' },
      { data: 'email', render: function (v) { return esc(v); } },
      { data: 'status', render: function (v) {
          return '<span class="badge badge-' + (statusBadge[v] || 'secondary') + '">' + esc(v) + '</span>';
      } },
      { data: null, orderable: false, searchable: false, className: 'table-aksi', render: function (d) {
          return '<a href="mahasiswa-form.html?id=' + encodeURIComponent(d.nim) + '" class="btn btn-warning btn-circle btn-sm" title="Edit"><i class="fas fa-edit"></i></a>' +
                 '<button class="btn btn-danger btn-circle btn-sm btn-hapus" data-nim="' + esc(d.nim) + '" title="Hapus"><i class="fas fa-trash"></i></button>';
      } }
    ]
  });

  dt.on('order.dt search.dt draw.dt', function () {
    dt.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) { cell.innerHTML = i + 1; });
  }).draw();

  $('#dataTable').on('click', '.btn-hapus', function () {
    var nim = String($(this).data('nim'));
    var m = data.filter(function (x) { return x.nim === nim; })[0];
    if (m && confirm('Hapus data mahasiswa "' + m.nama + '"?')) {
      data = data.filter(function (x) { return x.nim !== nim; });
      SIAKAD.save('mahasiswa', data);
      dt.clear().rows.add(data).draw();
    }
  });
});
