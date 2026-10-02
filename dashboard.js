Chart.defaults.global.defaultFontFamily = 'Nunito, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var tooltipStyle = {
  backgroundColor: 'rgb(255,255,255)',
  bodyFontColor: '#858796',
  titleMarginBottom: 10,
  titleFontColor: '#6e707e',
  titleFontSize: 14,
  borderColor: '#dddfeb',
  borderWidth: 1,
  xPadding: 15,
  yPadding: 15,
  displayColors: false,
  caretPadding: 10
};

// Bar chart - sebaran grade
new Chart(document.getElementById('gradeChart'), {
  type: 'bar',
  data: {
    labels: ['A', 'B+', 'B', 'C+', 'C', 'D'],
    datasets: [{
      label: 'Jumlah Penilaian',
      backgroundColor: ['#1cc88a', '#4e73df', '#36b9cc', '#f6c23e', '#fd7e14', '#e74a3b'],
      hoverBackgroundColor: ['#17a673', '#2e59d9', '#2c9faf', '#dda20a', '#e0620a', '#be2617'],
      borderColor: '#fff',
      data: [38, 24, 18, 9, 5, 2],
      maxBarThickness: 48
    }]
  },
  options: {
    maintainAspectRatio: false,
    layout: { padding: { left: 10, right: 25, top: 25, bottom: 0 } },
    scales: {
      xAxes: [{ gridLines: { display: false, drawBorder: false }, ticks: { padding: 6 } }],
      yAxes: [{
        ticks: { beginAtZero: true, maxTicksLimit: 6, padding: 10 },
        gridLines: {
          color: 'rgb(234, 236, 244)',
          zeroLineColor: 'rgb(234, 236, 244)',
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }]
    },
    legend: { display: false },
    tooltips: Object.assign({}, tooltipStyle, {
      callbacks: {
        title: function (items) { return 'Grade ' + items[0].xLabel; },
        label: function (item) { return item.yLabel + ' penilaian'; }
      }
    })
  }
});

new Chart(document.getElementById('prodiChart'), {
  type: 'doughnut',
  data: {
    labels: ['Teknik Informatika', 'Sistem Informasi', 'Teknologi Informasi', 'Sains Data'],
    datasets: [{
      data: [45, 35, 28, 20],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#dda20a'],
      hoverBorderColor: 'rgba(234, 236, 244, 1)'
    }]
  },
  options: {
    maintainAspectRatio: false,
    tooltips: tooltipStyle,
    legend: { display: false },
    cutoutPercentage: 80
  }
});
