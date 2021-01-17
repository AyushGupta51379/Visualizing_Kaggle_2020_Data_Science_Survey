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


types = ["Programming languages", "IDEs", "Notebooks", "Data Visualization Libraries", "Machine Learning frameworks", "Cloud Computing Platforms", "Machine Learning Products", "Big data products", "Business Intelligence Tools", "Data Science Courses platform"]

// to make the graph, from the given data
render2 = (myWords, types) => {
    clearAll1()
        
    // boundary of svg
    var borderPath2 = svg2.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", height2)
    .attr("width", width2)
    .style("stroke", 'black')
    .style("fill", "none")
    .style("stroke-width", 0.5);
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
        .text("Most used "+types)
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
cloud_links = [{link:"https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_q7_count_Programming.csv", type:"Programming languages"}
,{link:"https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_q9_count_IDE.csv", type:"IDE"}
,{link:"https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_q10_count_Notebook.csv", type:"Notebooks"}
,{link:"https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_q14_count_DV_Library.csv", type:"Data Visualization Library"}
,{link:"https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_q16_count_ML_Frameworks.csv", type:"Machine Learning Framework"}
,{link:"https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_Q26_A_count_Cloud_Computing_Platform.csv", type:"Cloud Computing Platform"}
,{link:"https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_Q28_A_count_ML_product.csv", type:"Machine Learning Product"}
,{link:"https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_Q29_A_count_Big_Data_product.csv", type:"Big Data product"}
,{link:"https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_Q31_A_count_BI_Tools.csv", type:"BI Tools"}
,{link:"https://raw.githubusercontent.com/AyushGupta51379/demo/master/Kaggle_2020_DS_Survey/Most_frequent_tools/data_Q37_count_DS_courses_platform.csv", type:"Data Science courses platform"}
]
// List of words
draw_cloud = (str) =>
    // read the data
    d3.csv(cloud_links[types.indexOf(str)].link,
        function (data) {
            //console.log(data); // outputs the data
            myWords = []
            for (let i = 0; i < data.length; i++) {
                d = data[i]
                myWords.push({ word: d.Name, size: +d.resp})//Math.round(Math.sqrt(+d.Q7))})
            }
            //console.log(myWords)
            render2(myWords, cloud_links[types.indexOf(str)].type)
        }
    )

// function to clear the bar graph, called before generating another bar graph, to prevent overlap
clearAll1 = () => {
    svg2.selectAll("*").remove();
  };
  
// to finally draw the word cloud
//draw_cloud(7)