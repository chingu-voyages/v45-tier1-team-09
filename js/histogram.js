
// fetch("assets/Meteorite_Landings.csv")
// .then(response => response.text())
// .then(csvData => {
//   const lines = csvData.split("\n"); // Split data into lines
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
//  // console.log(data)
//   histogramPlotPoints(data);
// }) 
// .catch(error => {
//   console.error("Error fetching CSV data:", error);
// });


// fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
// .then((data)=>{ return data.json();})
// .then((completedata)=> {
//   // console.log({completedata})
//   histogramPlotPoints(completedata)
// })




// function histogramPlotPoints(data) {
//   const selectedValueCount = {}
//   const compCount = {}

//   data.forEach(element => {

//     if (element.year) {
//       const year = element.year.substring(0, 4); 
//       if (!yearCount[year]) {
//         yearCount[year] = 1;
//       } else {
//         yearCount[year]++;
//       }
//     }

//     const composition = element.recclass;
//     if (!compCount[composition]) {
//       compCount[composition] = 1;
//     } else {
//       compCount[composition]++;
//     }
//   });

//   const yearPlotPoints = [];
//   for (const year in yearCount) {
//     if (yearCount.hasOwnProperty(year)) {
//       yearPlotPoints.push({ year: year, count: yearCount[year] });
//     }
//   }

//   const compositionPlotPoints = []
//   for (const composition in compCount) {
//     if (compCount.hasOwnProperty(composition)){
//       compositionPlotPoints.push({composition: composition, count: compCount[composition]})
//     }
//   }

  
  
// console.log(yearPlotPoints)
// console.log(compositionPlotPoints)

// }



  
    let chartWidth = window.innerWidth;

    window.addEventListener("resize", function(){
      
      chartWidth < 600 ? chartWidth = 600  
     : chartWidth > 1000 ?  chartWidth = 1000
     : chartWidth;
      
    })


	// set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = chartWidth - margin.left - margin.right,
  height = width - 60 - margin.top - margin.bottom;

 




// append the svg object to the body of the page
var svg = d3.select("#yearChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")
 

// get the data







// function updateChart(data) {

d3.csv("assets/Meteorite_Landings.csv", function(data) {
    
// d3.json("https://data.nasa.gov/resource/gh4g-9sfh.json", function(data) {

// function updateChart(selectedValue) {
//   // Filter the data based on the selected value
//   var filteredData = data.filter(function (d) {
//       if (selectedValue === "year") {
        
//           return d.year
//       } else if (selectedValue === "reclass") {
          
//           return d.reclass
//       } 
      
//       // Return true to include all data when no filter is selected
//       return true;
//   });

//   // Update your chart with the filtered data
//   // You will need to adjust your charting logic here

//   console.log(filteredData); // For testing purposes, log the filtered data
//   console.log(selectedValue)
// }

// // Add an event listener to the select element
// var select = d3.select("#data-type");
// select.on("change", function () {
//   var selectedValue = select.property("value");
//   updateChart(selectedValue); // Call the updateChart function with the selected value
// });

// // Initially, load the chart with all data
// updateChart();





  // X axis: scale and draw:
  var x = d3.scaleLinear()
  // Domain should = earliest year to latest year
    .domain([1750, 2023])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // set the parameters for the histogram
  var histogram = d3.histogram()
    .value(function(d) { return d.year})   // I need to give the vector of value
    .domain(x.domain())  // then the domain of the graphic
    .thresholds(x.ticks(70)); // then the numbers of bins

  // And apply this function to data to get the bins
  // var bins = histogram(data);
  var bins = histogram(data.filter( function(d){return d.year} ));

  // Y axis: scale and draw:
  var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg.append("g")
    .call(d3.axisLeft(y));
    

  // append the bar rectangles to the svg element
  svg.selectAll("rect")
  .data(bins)
  .enter()
  .append("rect")
  .attr("x", 1)
  .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
  .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
  .attr("height", function(d) { return height - y(d.length); })
  .style("fill", "#008080")
  .append("title")
  .text((d)=> {
    return "Year" + ": " + d.x0 + " - " + d.x1 
  })
 
   
});
