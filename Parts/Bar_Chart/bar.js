// set the dimensions and margins of the graph
var margin = 150,
    width = 800 - margin,
    height = 350 - margin;
        
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
          .append("svg")
          .attr("width", width + margin)
          .attr("height", height + margin)

var countries = ['All_Countries','Colombia',
          'United_States_of_America',
          'Argentina',
          'Japan',
          'India',
          'Brazil',
          'China',
          'Germany',
          'Indonesia',
          'Canada',
          'Switzerland',
          'Other',
          'Singapore',
          'Russia',
          'South_Africa',
          'Egypt',
          'Netherlands',
          'Pakistan',
          'Nepal',
          'South_Korea',
          'Poland',
          'Belarus',
          'Tunisia',
          'Ukraine',
          'Belgium',
          'Saudi_Arabia',
          'Taiwan',
          'Nigeria',
          'Italy',
          'Spain',
          'United_Arab_Emirates',
          'Mexico',
          'Viet_Nam',
          'Thailand',
          'United_Kingdom_of_Great_Britain',
          'France',
          'Ghana',
          'Ireland',
          'Philippines',
          'Morocco',
          'Turkey',
          'Iran',
          'Peru',
          'Romania',
          'Republic_of_Korea',
          'Australia',
          'Chile',
          'Kenya',
          'Sweden',
          'Bangladesh',
          'Greece',
          'Malaysia',
          'Portugal',
          'Israel',
          'Sri_Lanka']

var country_link = [];
var i = 0;
for(i=0; i < countries.length; i++){
  var s_start = "https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Countries_Compensation/"
  var s_end = "_compensation_.csv"
  var s = s_start+countries[i]+s_end
  country_link.push(s)
}
      
draw_chart = (str) => {
    //Read the data
    d3.csv(country_link[countries.indexOf(str)],
      
      function(data) {
        data.forEach(d => {
            d.index = +d.index; // this converts the string index into integer
            d.index = d.index/1000 // to divide by 1000
            d.Q24 = +d.Q24; // this converts the string Q24 into integer          
          });
        console.log(data); // outputs the data

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "20px")
       .text("Annual Compensation in "+str)

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");
        xScale.domain(data.map(function(d) { return d.index; }));
        yScale.domain([0, d3.max(data, function(d) { return d.Q24; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
         .attr("y", height - 160)
         .attr("x", width)
         .attr("text-anchor", "end")
         .attr("stroke", "blue")
         .attr("stroke-width", 0.4)
         .text("Compensation range (in thousands of USD)")
         .attr("font-size", "16px")
         

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return d;
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "blue")
         .attr("stroke-width", 0.4)
         .text("Number of respondents")
         .attr("font-size", "14px");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.index); })
         .attr("y", function(d) { return yScale(d.Q24); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.Q24); })
         .append("title")
         .text(function(d){return d.index+" : "+d.Q24;});
    });
};

clearAll = () => {
    svg.selectAll("*").remove();
};

