// set the dimensions and margins of the graph
var margin3 = { top: 30, right: 25, bottom: 30, left: 140 },
  width3 = 500 - margin3.left - margin3.right,
  height3 = 300 - margin3.top - margin3.bottom;

// append the svg object to the body of the page
var svg3 = d3.select("#cloud_dataviz")
  .append("svg")
  .attr("width", width3 + margin3.left + margin3.right)
  .attr("height", height3 + margin3.top + margin3.bottom)
  //.style("background-color", "#ebf0ed")  
  .append("g")
  .attr("transform",
    "translate(" + margin3.left + "," + margin3.top + ")");

const render3 = (data) => {

      // boundary of svg
      var borderPath3 = svg3.append("rect")
      .attr("x", -margin3.left)
      .attr("y", -margin3.right)
      .attr("height", height3+margin3.top+margin3.bottom*.8)
      .attr("width", width3+margin3.left+margin3.right)
      .style("stroke", 'black')
      .style("fill", "none")
      .style("stroke-width", 0.5);

      // text head
    var heading3 = svg3.append("text")
    .attr("x", 0)
    .attr("y", -10)
    .text("Job title vs Programming e xperience")
    .attr("font-size", 15)
    .attr("font-weight", "bold")

    // Labels of row and columns
    var myGroups = []
    var myVars = []
    //console.log(data)

    for(let i=0; i<data.length; i++){
      d = data[i]
      if(!myGroups.includes(d.group)){
        myGroups.push(d.group)
      }

      if(!myVars.includes(d.variable)){
        myVars.push(d.variable)
      }      
    }
    //console.log(myGroups)
    //console.log(myVars)

    // Build X scales and axis:
    var x = d3.scaleBand()
      .range([0, width3])
      .domain(myVars)
      .padding(0.01);
    svg3.append("g")
      .attr("transform", "translate(0," + height3 + ")")
      .call(d3.axisBottom(x))
  
    // Build X scales and axis:
    var y = d3.scaleBand()
      .range([height3, 0])
      .domain(myGroups)
      .padding(0.01);
    svg3.append("g")
      .call(d3.axisLeft(y));
  
    // Build color scale
    var myColor = d3.scaleLinear()
      .range(["white", "#69b3a2"])
      .domain([1, 200])
    svg3.selectAll()
      .data(data, function (d) { return d.group + ':' + d.variable; })
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.variable) })
      .attr("y", function (d) { return y(d.group) })
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function (d) { return myColor(d.value) })
      .append("title")
      .text((d) =>d.group +", " + d.variable + ", " + d.value + " respondents")
};

const heatmap_links = ["https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Fields_and_more_questions/df_q5_q6.csv"];
//Read the data
draw_heatmap = (str) => 
d3.csv(heatmap_links[+str], function (data) {
render3(data)
});

draw_heatmap(0);
