
fetch("assets/Meteorite_Landings.csv")
.then(response => response.text())
.then(csvData => {
  const lines = csvData.split("\n"); // Split data into lines
  const headers = lines[0].split(","); // Extract headers
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length === headers.length) {
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }
      data.push(entry);
    }
  }
 // console.log(data)
  histogramPlotPoints(data);
}) 
.catch(error => {
  console.error("Error fetching CSV data:", error);
});


fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
.then((data)=>{ return data.json();})
.then((completedata)=> {
  // console.log({completedata})
  histogramPlotPoints(completedata)
})




function histogramPlotPoints(data) {
  const yearCount = {}
  const compCount = {}

  data.forEach(element => {

    if (element.year) {
      const year = element.year.substring(0, 4); 
      if (!yearCount[year]) {
        yearCount[year] = 1;
      } else {
        yearCount[year]++;
      }
    }

    const composition = element.recclass;
    if (!compCount[composition]) {
      compCount[composition] = 1;
    } else {
      compCount[composition]++;
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


