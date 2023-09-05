// export default function convertCsvToLocation(){   
// const lines = csvData.split("\n"); // Split data into lines
//   const headers = lines[0].split(","); // Extract headers
  
//   const data = [];
//   for (let i = 1; i < lines.length; i++) {
//     const values = lines[i].split(",");
//     if (values.length === headers.length) {
//       const entry = {};
//       for (let j = 0; j < headers.length; j++) {
//         entry[headers[j]] = values[j];
//       }
//       data.push(entry);
//     }
//   }
//   histogramPlotPoints(data);
// }

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

    const composition = element.recclass
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
    
console.log(yearPlotPoints)
console.log(compositionPlotPoints)
}

//Function to display plotpoints