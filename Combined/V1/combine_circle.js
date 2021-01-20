
// set the dimensions and margins of the graph
var width1 = 350
var height1 = 350
var radius = 32
var ccc = ""
// append the svg object to the div
var svg1 = d3.select("#bar_circle_dataviz")
    .append("svg")
    .attr("width", width1)
    .attr("height", height1)
    //.style("background-color", "#ebf0ed")

// boundary of svg
var borderPath1 = svg1.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", height1)
    .attr("width", width1)
    .style("stroke", 'black')
    .style("fill", "none")
    .style("stroke-width", 0.5);

// text head
var heading = svg1.append("text")
    .attr("x", width / 22.5)
    .attr("y", height / 22.5)
    .text("Draggable circles")
    .attr("font-size", height / 22.5)
    .attr("font-weight", "bold")

// for the country highlighted through mouseover on circle or text    
var selectedCountry = ""
var selectedCountry_id = null

// function to render data = visualize the data of draggable circles
const render = data1 => {

    // array of colors
    var color = ['red', '#e3b6be', '#f520e0', 'yellow', 'lightgreen', 'pink', 'orange', 'rgb(12,240,233)'];
    // to choose color based on number of respondents
    color_func = i => {
        num = data1[i]["Number"];
        if (num > Math.sqrt(5000)) {
            return color[3]; // yellow
        }
        else if (num > Math.sqrt(2000)) {
            return color[2]; // violet
        }
        else if (num > Math.sqrt(1600)) {
            return color[2]; // violet
        }
        else if (num > Math.sqrt(1200)) {
            return color[2]; // violet
        }
        else if (num > Math.sqrt(800)) {
            return color[0]; // red
        }
        else if (num > Math.sqrt(400)) {
            return color[6]; // orange
        }
        else if (num > Math.sqrt(100)) {
            return color[4]; // lightgreen
        }
        else {
            return color[7]; // gray
        }
    };

    // define circles coordinates - includes randomization
    var circles = d3.range(55).map(function (d, i) {
        return {
            x: Math.round(Math.random() * (width1 - radius * 2) + radius) * .92 + width / 30,
            y: Math.round(Math.random() * (height1 - radius * 2) + radius) * .92 + height / 30,
            rr: data1[i]["Number"],
            clk: false
        };
    });

    // Features of the forces applied to the nodes:
    var simulation = d3.forceSimulation()
        .force("center", d3.forceCenter(width1 / 2, height1 / 2)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.1).radius(Math.round(height / 15)).iterations(1)) // Force that avoids circle overlapping

    // Node as container or circle and text
    var node = svg1
        .selectAll(".node")
        .data(circles)
        .enter()
        .append("g")
        .attr('class', 'node')
        .call(d3.drag() // call specific functions when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // circles
    var circle = node.append("circle").attr("class", "circles")
        .attr("r", function (d, i) { return Math.round(data1[i]["Number"] * .4) + Math.round(height1 * 12 / 450); }) // radii of node based on total number of collaborators, 
        // formula adjusted to make the node link diagram look better
        .attr("fill", function (d, i) { return color_func(i); })
        .attr("stroke-width", 1)
        .attr("stroke", "white")
        .on("mouseover", function (d, i) {
            var sel = d3.select(this);
            sel.style('fill', function (d, i) { { return "red" } });
            selectedCountry = data1[i]["Country"];
            selectedCountry_id = i;
            description(selectedCountry);
            clearAll(); draw_chart(countries[selectedCountry_id + 1]);
        })
        .on("mouseout", function (d, i) {
            var sel = d3.select(this);
            sel.style('fill', function (d, i) { { color_func(i); } });
        })

    // labels/text on circles
    const labels = node.append("text") // adding labels to each node
        .style("font-size", function (d, i) { return Math.round(data1[i]["Number"] * .35 + Math.round(height1 * 6 / 450)).toString() + "px"; })
        .attr("dx", (d, i) => -(data1[i]["Number"] * .40) - Math.round(height1 * 8 / 450))
        .attr("dy", "0.35em")
        .attr("font-weight", 500)
        .attr("font-family", "sans-serif")
        .text(function (d, i) {
            return data1[i]["Country"][3] == " " ? data1[i]["Country"].slice(0, 3) : data1[i]["Country"].slice(0, 5);
        })
        .on("mouseover", function (d, i) {
            var sel = d3.select(this);
            sel.style('fill', function (d, i) { { return "#910d01" } });
            selectedCountry = data1[i]["Country"];
            selectedCountry_id = i;
            description(selectedCountry);
            clearAll(); draw_chart(countries[selectedCountry_id + 1]);
        })
        .on("mouseout", function (d, i) {
            var sel = d3.select(this);
            sel.style('fill', function (d, i) { { color_func(i); } });
        });

    // title when hovered over circle or its label/text
    node.append("title")
        .text(function (d, i) {
            return data1[i]["Country"] + " , Respondents: " + Math.round(data1[i]["Number"] * data1[i]["Number"]);
        });


    // Apply these forces to the nodes and update their positions.
    simulation
        .nodes(circles)
        .on("tick", function (d, i) {
            node
                .attr("cx",
                    function (d, i) {
                        rad = Math.round(data1[i]["Number"] * .4) + Math.round(height1 * 12 / 450);
                        if (d.x + rad > width1) {
                            return width1 - rad;
                        }
                        else if (d.x < rad) {
                            return rad
                        }
                        else return d.x;
                    }
                )// function (d, i) { return ((Math.abs(d.x) * .85) + width1/22.5 > data1[i]["Number"] ? (Math.abs(d.x) * .85) + width1/22.5 : data1[i]["Number"] + width1/90); })
                .attr("cy",
                    function (d, i) {
                        rad = Math.round(data1[i]["Number"] * .4) + Math.round(height1 * 12 / 450);
                        if (d.y + rad > width1) {
                            return width1 - rad;
                        }
                        else if (d.y < rad) {
                            return rad
                        }
                        else return d.y;
                    }
                )// function (d, i) { return ((Math.abs(d.y) * .85) + height1/22.5 > data1[i]["Number"] ? (Math.abs(d.y) * .85) + height1/22.5 : data1[i]["Number"] + height1/90); })
                .attr("transform", function (d, i) {
                    const rad = Math.round(data1[i]["Number"] * .4) + Math.round(height1 * 12 / 450);
                    var a, b;    
                    if (d.x + rad > width1) {
                            a = width1 - rad;
                        }
                        else if (d.x < rad) {
                            a = rad;
                        }
                        else {a = d.x;}
                    if (d.y + rad > width1) {
                        b = width1 - rad;
                    }
                    else if (d.y < rad) {
                        b = rad;
                    }
                    else {b = d.y;}
                
                    return "translate("+a+","+b+")";
                })
                //{ return "translate(" + (Math.abs(d.x) * .85 + width1 / 45) + "," + (Math.abs(d.y) * .85 + width1 / 45) + ")"; });
        });

    // When node is dragged: dragstarted, dragged, dragended
    function dragstarted(d, i) {
        if (!d3.event.active) simulation.alphaTarget(.03).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(d, i) {
        rad = Math.round(data1[i]["Number"] * .4) + Math.round(height1 * 12 / 450);
        if (d3.event.x < 0 || d3.event.x > width1 || d3.event.y < 0 || d3.event.y > height1) {
            d.fx = null;
            d.fy = null;
        }
        else {
            if (d3.event.x + rad > width1) {
                d.fx = width1 - rad;
            }
            else if (d3.event.x < rad) {
                d.fx = rad
            }
            else {
                d.fx = Math.abs(d3.event.x)
            }
            if (Math.abs(d3.event.y) + rad > height1) {
                d.fy = height1 - rad;
            }
            else if (d3.event.y < rad) {
                d.fy = rad
            }
            else {
                d.fy = Math.abs(d3.event.y)
            }
            //d.fx = Math.abs(d3.event.x) + Math.round(width1/45) > width1 ? width1 : Math.abs(d3.event.x) + Math.round(width1/45);
            //d.fy = Math.abs(d3.event.y) + Math.round(height1/45) > height1 ? height1 : Math.abs(d3.event.y) + Math.round(height1/45);
        }
    }
    function dragended(d, i) {
        if (!d3.event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;
    }
    // to describe the country selected, at the bottom of the circle diagram
    describe = svg1.append("text")
        .attr("class", "describe")
        .attr("x", 0)
        .attr("y", height1 - height1 / 90)
        .attr("font-weight", "bold")
        .attr("font-size", Math.round(height1 * 20 / 450));

    // to update the description of the selected country at the bottom of the circle diagram
    description = (selectedCountry) => {
        describe.selectAll("*").remove();
        describe.text("Country selected: " + selectedCountry.slice(0, 19));
    };
}

// to get the data and create visualization
d3.csv("https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Countries_and_respondens/df_countries_circle_sorted_resp.csv",
    function (data) {
        // Initially both Country and Number were strings
        data.forEach(d => {
            d.Number = +d.Number; // this converts the string Number into integer
            d.Number = Math.sqrt(d.Number); // taking square root due to the large size of the numbers, to make it appropriate for radius
        });
        dataset = data.sort();
        render(dataset)
    });