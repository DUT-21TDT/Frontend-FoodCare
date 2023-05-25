const toggleBtn = document.getElementById('toggle-btn');

toggleBtn.addEventListener('click', function () {
  this.classList.toggle('active');
});

// dd/mm/yyyy => split => (mm)=> gia tri trung binh(mm) = mm => dd

async function getBMI() {
  const data = await $.get("/user/getBMI", (data) => {
    console.log(data);
  });
  return data.success ? data.data : null;
}


$(document).ready(async () => {
  const data = await getBMI();
  console.log(data);

  let dataChart = {
    labels: [],
    weights: [],
    heights: [],
  }

  data.forEach(e => {
    dataChart.labels.push(e.updateTime);
    dataChart.weights.push(e.weight);
    dataChart.heights.push(e.height);
  });

  var ctx = document.getElementById('canvas').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataChart.labels,
      datasets: [
        {
          label: 'Chiều cao',
          data: dataChart.heights,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          yAxisID: 'y',
          tension: 0.5,
        },
        {
          label: 'Cân nặng',
          data: dataChart.weights,
          backgroundColor: 'transparent',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          yAxisID: 'y1',
          tension: 0.4,
        }]
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Biểu đồ chiều cao và cân nặng',
          font: {
            size: 20
          }

        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
        }
      }
    }
  });

})


