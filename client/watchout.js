
var dataSet = [{x: Math.random() * 400, y: Math.random() * 400}];

for (i = 0; i < 15; i++) {
  dataSet.push({x: Math.random() * 400, y: Math.random() * 400});
}

d3.select('.board')
  .append('svg')
  .attr('width', 400)
  .attr('height', 400)
  .style('background', 'green');

d3.select('.board svg').selectAll('circle')
  .data(dataSet)
  .enter()
    .append('circle')
    .attr('r', 10)
    .attr('cx', function(item) { return item.x; })
    .attr('cy', function(item) { return item.y; })
  .transition()
    .each(move);

function move () {
  var circle = d3.select(this);
  // console.log(this);
  (function repeat() {
    console.log(circle);
    circle.transition()
      .delay(1000)
      .attr('cx', function(item) { return Math.random() * 400; })
      .attr('cy', function(item) { return Math.random() * 400; })
      .each('end', repeat);
  })();
};
