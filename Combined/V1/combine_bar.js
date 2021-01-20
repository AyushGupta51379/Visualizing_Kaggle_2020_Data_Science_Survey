// set the dimensions and margins of the graph
var margin = { top: 75, right: 20, bottom: 30, left: 50 },
  width = 500 - margin.left - margin.right,
  height = 350 - margin.top - margin.bottom;

// append the svg object to the div
var svg = d3.select("#bar_circle_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  //.style("background-color", "#ebf0ed")

// data of country names 
var countries = ['All_Countries',
  'Argentina',
  'Australia',
  'Bangladesh',
  'Belarus',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Egypt',
  'France',
  'Germany',
  'Ghana',
  'Greece',
  'India',
  'Indonesia',
  'Iran',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Kenya',
  'Malaysia',
  'Mexico',
  'Morocco',
  'Nepal',
  'Netherlands',
  'Nigeria',
  'Other',
  'Pakistan',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Republic_of_Korea',
  'Romania',
  'Russia',
  'Saudi_Arabia',
  'Singapore',
  'South_Africa',
  'South_Korea',
  'Spain',
  'Sri_Lanka',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Thailand',
  'Tunisia',
  'Turkey',
  'Ukraine',
  'United_Arab_Emirates',
  'United_Kingdom_of_Great_Britain',
  'United_States_of_America',
  'Viet_Nam']

// sorting the names, in case they aren't already sorted  
countries_sorted = countries.sort()

countries_sorted_obj = []
for (i = 0; i < countries_sorted.length; i++) {
  countries_sorted_obj.push({ name: countries_sorted[i] })
}

// creating an array, with links to the data of these countries
var country_link = [];
var i = 0;
for (i = 0; i < countries.length; i++) {
  var s_start = "https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Countries_Compensation/"
  var s_end = "_compensation_.csv"
  var s = s_start + countries[i] + s_end
  country_link.push({ name: s, id: i })
}

// function that draws the bar chart for a given/selected country
draw_chart = (str) => {
  //Read the data
  d3.csv(country_link[countries.indexOf(str)].name,

    function (data) {
      data.forEach(d => {
        d.index = +d.index; // this converts the string index into integer
        d.index = d.index / 1000 // to divide by 1000
        d.Q24 = +d.Q24; // this converts the string Q24 into integer          
      });

      // this clears any existing bar chart, to make space for the new one
      clearAll(); // console.log("bar chart cleared, to update it")

      // boundary of svg
      var borderPath = svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height + margin.top+margin.bottom*.9)
        .attr("width", width + margin.left+margin.right)
        .style("stroke", 'black')
        .style("fill", "none")
        .style("stroke-width", 0.8);

      var heading = svg.append("text")
        .attr("x", width/22.5)
        .attr("y", height/15)
        .text("Bar chart")
        .attr("font-size", Math.round(Math.sqrt(width)*0.75))
        .attr("font-weight", "bold")

      // x,y scales
      var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

      var g = svg.append("g").attr("class", "bar-diagram")
        .attr("transform", "translate(" + width/7 + "," + height/6 + ")");
      xScale.domain(data.map(function (d) { return d.index; }));
      yScale.domain([0, d3.max(data, function (d) { return d.Q24; })]);

      // Text title
      var headtitle = g.append("text")
        .attr("transform", "translate("+width/5+","+(-height/20)+")")
        //.attr("x", width/15)
        //.attr("y", -height/20)
        .attr("font-size", Math.round(Math.sqrt(width)*0.75))
        .text("Annual Compensation in " + str)

      // x axis description
      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("dy", margin.bottom*1.2)
        .attr("dx", width*0.9)
        .attr("text-anchor", "end")
        .attr("fill", "black")
        //.attr("stroke-width", 0.4)
        .text("Compensation range (in thousands of USD)")
        .attr("font-size", Math.round(Math.sqrt(width)*0.75))


      // y axis description
      g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
          return d;
        })
        //.ticks(10)
        )
        .append("text")
        .attr("transform", "rotate(-90)")
        //.attr("x", 0)
        //.attr("y", height/6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("fill", "black")
        //.attr("stroke-width", 0.4)
        .attr("font-size", Math.round(Math.sqrt(width)*0.65))
        .attr("x", -width/7)
        .attr("y",height*5/60)
        .text("Number of respondents")
        
      // bars
      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.index); })
        .attr("y", function (d) { return yScale(d.Q24); })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.Q24); })
        .append("title")
        .text(function (d) { return d.index + "K USD : " + d.Q24+" respondents"; });
    });
};

// function to clear the bar graph, called before generating another bar graph, to prevent overlap
clearAll = () => {
  svg.selectAll("*").remove();
};
