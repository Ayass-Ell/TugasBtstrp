$(function () {
  var data = SIAKAD.load('prodi');
  var esc = SIAKAD.esc;
  var akrBadge = { 'Unggul': 'success', 'Baik Sekali': 'primary', 'Baik': 'info', 'A': 'success', 'B': 'warning' };

  var dt = $('#dataTable').DataTable({
    data: data,
    language: SIAKAD.DT_LANG,
    order: [[1, 'asc']],
    columns: [
      { data: null, orderable: false, searchable: false, defaultContent: '' },
      { data: 'kode' },
      { data: 'nama', render: function (v) { return esc(v); } },
      { data: 'jenjang' },
      { data: 'kaprodi', render: function (v) { return esc(v); } },
      { data: 'akreditasi', render: function (v) {
          return '<span class="badge badge-' + (akrBadge[v] || 'secondary') + '">' + esc(v) + '</span>';
      } },
      { data: 'aktif', render: function (v) { return v + ' Mahasiswa'; } },
      { data: null, orderable: false, searchable: false, className: 'table-aksi', render: function (d) {
          return '<a href="prodi-form.html?id=' + d.id + '" class="btn btn-warning btn-circle btn-sm" title="Edit"><i class="fas fa-edit"></i></a>' +
                 '<button class="btn btn-danger btn-circle btn-sm btn-hapus" data-id="' + d.id + '" title="Hapus"><i class="fas fa-trash"></i></button>';
      } }
    ]
  });

  dt.on('order.dt search.dt draw.dt', function () {
    dt.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) { cell.innerHTML = i + 1; });
  }).draw();

  $('#dataTable').on('click', '.btn-hapus', function () {
    var id = Number($(this).data('id'));
    var p = data.filter(function (x) { return x.id === id; })[0];
    if (p && confirm('Hapus program studi "' + p.nama + '"?')) {
      data = data.filter(function (x) { return x.id !== id; });
      SIAKAD.save('prodi', data);
      dt.clear().rows.add(data).draw();
    }
  });
});
