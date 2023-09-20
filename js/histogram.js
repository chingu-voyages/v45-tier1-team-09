const yearChart = new Chart(document.getElementById("year-chart"), {
  
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Meteor Strikes per Year',
        data:  [],
      }]
    }
});

const compositionChart = new Chart(document.getElementById("composition-chart"), {
  
  type: 'bar',
  data:  {
    labels: [],
    datasets: [{
      label: 'Meteor Composition by Year',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
});



export default function histogramPlotPoints(data) {
  const yearCount = {}
  const compCount = {}

  data.forEach(element => {

    const year = element.year;
      if (!yearCount[year]) {
        yearCount[year] = 1
      } else {
        yearCount[year]++
      }

    const composition = element.recclass;
      if (!compCount[composition]) {
        compCount[composition] = 1
      } else {
        compCount[composition]++
      }
});

  const yearPlotPoints = [];
  for (const year in yearCount) {
    if (yearCount.hasOwnProperty(year)) {
      yearPlotPoints.push({ year: year, count: yearCount[year] });
    }
  }

  const compositionPlotPoints = []
  for (const composition in compCount) {
    if (compCount.hasOwnProperty(composition)){
      compositionPlotPoints.push({composition: composition, count: compCount[composition]})
    }
  }
    
// Display and update bar graph

// Parse the array of year count objects.
const years = yearPlotPoints.map((object) => object.year);
const yearCounts = yearPlotPoints.map((object) => object.count);

const composition = compositionPlotPoints.map((object) => object.composition);
const compCounts = compositionPlotPoints.map((object) => object.count);

// Update the Chart object with the parsed data.
yearChart.data.labels = years;
yearChart.data.datasets[0].data = yearCounts;

compositionChart.data.labels = composition;
compositionChart.data.datasets[0].data = compCounts;

// Update the chart.
yearChart.update();
compositionChart.update();
}