var height = document.getElementById("d3data").offsetHeight;
var width = document.getElementById("d3data").offsetWidth;

var xAxis_data = [];
var mapydata = {};
var svg;
savedata=[];

svg = d3.select("#d3data")
.append("svg")
.attr("width", width)
.attr("height", height);

function drawd3(data){
    savedata=data;
    svg.selectAll("g").remove();
    svg.selectAll("rect").remove();

    mapydata = {};
    xAxis_data = Array.from(new Set(data.map(d => {
        var ai = d.neighbourhood;
        if (!mapydata[ai]) {
            mapydata[ai] = 1;
        } else {
            mapydata[ai]++;
        }

        return d.neighbourhood;
    })))

    var arrdata=[]
    var i=0;
    for(let k in mapydata){
        arrdata[i]={};
        arrdata[i]["name"]=k;
        arrdata[i]["v"]=mapydata[k];
        // console.log(k)
        i++;
      }
    
    console.log(xAxis_data);
    console.log(arrdata);

    //为坐标轴定义一个线性比例尺
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(arrdata,d=>d.v)].reverse())
        .range([0, height - 50]);

// console.log(yScale(70))        

    var yAxis = d3.axisLeft(yScale) //定义一个axis，由bottom可知，是朝下的
        .ticks(40); //设置刻度数目

    var index_x = xAxis_data.map((d, i) => {
        return ((width-50) / xAxis_data.length) * i
    })
    var xScale = d3.scaleOrdinal()
        .domain(xAxis_data)
        .range(index_x);

    var xAxis = d3.axisBottom().scale(xScale);

    svg.append("g")
        .attr("transform", "translate(40,20)")
        .call(yAxis);

    svg.append("g")
        .attr("transform", "translate(55," + String(height - 30) + ")")
        .call(xAxis);

    svg.selectAll("rect")
        .data(arrdata)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return xScale(d.name)+40;
        })
        .attr("y", function (d, i) {
            return yScale(d.v)+20;
        })
        .attr("width", function (d, i) {
            return width/22;
        })
        .attr("height", function (d) {
            return height- yScale(d.v)-50;
        })
        .attr("fill", "steelblue");



}














window.addEventListener("resize", () => {

    height = document.getElementById("d3data").offsetHeight;
    width = document.getElementById("d3data").offsetWidth;

    svg
        .attr("width", width)
        .attr("height", height);

        drawd3(savedata)
})