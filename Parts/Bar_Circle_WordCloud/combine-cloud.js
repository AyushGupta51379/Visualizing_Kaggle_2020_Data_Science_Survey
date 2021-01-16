// set the dimensions and margins of the word cloud graph
var margin2 = { top: 10, right: 10, bottom: 10, left: 10 },
    width2 = 450 - margin2.left - margin2.right,
    height2 = 450 - margin2.top - margin2.bottom;

// append the svg object to the div
var svg2 = d3.select("#cloud_dataviz").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin2.left + "," + margin2.top + ")");

// boundary of svg
var borderPath2 = svg2.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", height2)
    .attr("width", width2)
    .style("stroke", 'black')
    .style("fill", "none")
    .style("stroke-width", 0.5);

// to make the graph, from the given data
render2 = (myWords) => {
    // header
    heading = svg2.append("text")
        .attr("x", 2 * margin2.left)
        .attr("y", 2 * margin2.top)
        .text("Word cloud")
        .attr("font-size", 20)

    // footer
    footer = svg2.append("text")
        .attr("x", 2 * margin2.left)
        .attr("y", height2 - 1 * margin2.top)
        .text("Most used Programming languages")
        .attr("font-size", 20)

    // to find the maximum size, and adjust the color scheme accordingly
    maxx = 0
    for (let i = 0; i < myWords.length; i++) {
        if (+myWords[i]["size"] > maxx) {
            maxx = +myWords[i]["size"];
        };
    };

    //var color = ['red', 'rgb(12,240,233)', 'violet', '#ebd723', 'lightgreen', 'pink', 'orange', '#cdd1cf'];
    // to choose color based on size = number of respondents
    color_func = i => {
        num = +myWords[i]["size"];
        if (num > maxx * 0.66) {
            return '#ebd723'; // yellow
        }
        else if (num > maxx * .33) {
            return 'violet'; // violet
        }
        else if (num > maxx * .16) {
            return 'rgb(12,240,233)'; // lightblue
        }
        else if (num > maxx * .08) {
            return 'orange'; // orange
        }
        else {
            return 'pink'; // pink
        }
    };
    // Constructs a new cloud layout instance. It runs an algorithm to find the position of words that suits your requirements
    // Wordcloud main features
    var layout = d3.layout.cloud()
        .size([width2, height2])
        .words(myWords.map(function (d) { return { text: d.word, size_: Math.round(Math.sqrt(d.size) / 1.8 + 1), real_size: d.size }; }))
        .padding(5)        //space between words
        .rotate(function () { return ~~(Math.random() * 2) * 90; })
        .fontSize(function (d) { return d.size_; })      // font size of words
        .on("end", draw);
    layout.start();
    
    // This function takes the output of 'layout' above and draw the words
    // Wordcloud more features
    function draw(words) {
        w = svg2
            .append("g")
            .attr("class", "word_clouds")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("word_cloud")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d,i) { return d.size_; })
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .style("fill", (d, i) => color_func(i))
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) { return d.text; });
        // Adding title to each word
        title = w.append("title")
            .text(function (d, i) { return d.text + " " + d.real_size; })
    }
}

// Link to data for creating word cloud
cloud_links = ["https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_q7_count.csv"]
// List of words
draw_cloud = (str) =>
    // read the data
    d3.csv(cloud_links,
        function (data) {
            console.log(data); // outputs the data
            myWords = []
            for (let i = 0; i < data.length; i++) {
                d = data[i]
                myWords.push({ word: d.Programming, size: +d.Q7})//Math.round(Math.sqrt(+d.Q7))})
            }
            console.log(myWords)
            render2(myWords)
        }
    )
// to finally draw the word cloud
draw_cloud(0)