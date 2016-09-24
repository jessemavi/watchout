
/*
================================================
==========Create player and enemy data==========
================================================
*/

var enemyData = [];
var playerData = [{x: 200, y: 200, r: 10}];
var currentScore = 0;
var highScore = 0;
var score = 0;
var collisionCount = 0;

for (i = 0; i < 15; i++) {
  enemyData.push({x: Math.random() * 400, y: Math.random() * 400, r: 10});
}

setInterval(function() {
  d3.select('.current')
  .text('Current Score: ' + currentScore);
  currentScore++;
}, 10);


/*
================================================
=======Create Drag & Drop Functionality=========
================================================
*/

function move () {
  var circle = d3.select(this);
  (function repeat() {
    circle.transition()
      .delay(1000)
      .duration(1500)
      .attr('cx', function(item) { return Math.random() * 400; })
    //  .attr('cy', function(item) { return Math.random() * 400; })
    // .call(collide)
      .each('end', repeat);
  })();
};
var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('dragstart', dragstarted)
    .on('drag', dragged)
    .on('dragend', dragended);


function dragstarted(d) {
  d3.select(this).classed('dragging', true);
}

function dragged(d) {
  d3.select(this)
    .attr('cx', d.x = d3.event.x)
    .attr('cy', d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed('dragging', false);
}

/*
================================================
=======Create Board, Enemies and Player=========
================================================
*/
d3.select('.board')
  .append('svg')
  .attr('width', 400)
  .attr('height', 400)
  .style('background', 'green');

//Create enemy
d3.select('.board svg').selectAll('circle')
  .data(enemyData)
  .enter()
    .append('circle')
    .attr('r', 10)
    .attr('cx', function(item) { return item.x; })
    .attr('cy', function(item) { return item.y; })
    .attr('fill', 'black')
    .classed('enemy', true)
  .transition()
    .each(move)
  .transition()
  .tween('custom', function(t) {
      var node = this;
      return function checkCollision(t) {
        // console.log('node',node);
        // console.log('this',this);
        var radiusSum = parseFloat(node.r.animVal.value) + playerData[0].r;
        var xDiff = parseFloat(node.cx.animVal.value) - playerData[0].x;
        var yDiff = parseFloat(node.cy.animVal.value) - playerData[0].y;

        var separation = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
        if (separation < radiusSum) {
          if (currentScore > highScore) {
            highScore = currentScore;
            d3.select('.highscore')
              .text('High Score: ' + highScore);
          }
          currentScore = 0;
          collisionCount++;
          d3.select('.collisions')
              .text('Collisions: ' + collisionCount);
          console.log('it worked!');
        }
      };  
  });



//Create player
d3.select('.board svg').selectAll('player')
  .data(playerData)
  .enter()
    .append('circle')
    .attr('r', function(item) { return item.r; })
    .attr('cx', 200)
    .attr('cy', 200)
    .attr('fill', 'orange')
    .classed('player', true)
    .call(drag);

/*
================================================
===============Collision Detection==============
================================================
*/

setInterval (function() {
  enemyData.forEach(function(enemy) {
    console.log(enemy.x);
    var radiusSum = parseFloat(enemy.r) + playerData[0].r;
    var xDiff = parseFloat(enemy.x) - playerData[0].x;
    var yDiff = parseFloat(enemy.y) - playerData[0].y;
    // console.log(radiusSum, xDiff, yDiff);

    var separation = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
    if (separation < radiusSum) {
      if (currentScore > highScore) {
        highScore = currentScore;
        d3.select('.highscore')
          .text('High Score: ' + highScore);
      }
      currentScore = 0;
      collisionCount++;
      d3.select('.collisions')
          .text('Collisions: ' + collisionCount);
      console.log('it worked!');
    // if(enemy.cx ) {

    // }
    }
  });
}, 10);






// function collide () {
//  console.log(this.attr('r'));
//   var x1 = this.attr('cx') - this.attr('r');
//   var x2 = this.attr('cx') + this.attr('r');
//   var y1 = this.attr('cy') - this.attr('r');
//   var y2 = this.attr('cy') + this.attr('r');

//   var player = d3.select('.player');
//   console.log(player);
//   var px1 = player.attr('cx') - player.attr('r');
//   var px2 = player.attr('cx') + player.attr('r');
//   var py1 = player.attr('cy') - player.attr('r');
//   var py2 = player.attr('cy') + player.attr('r');

  // if (x1 < px2 && x2 > px1 &&
  //    y1 < py2 && y2 > py1 ) {
  //   counter = 0;
  //   console.log('worked');
  // } 
    //If enemies left is greater than player left but smaller than player right and 
 
// }

//While we are dragging the mouse
  //Check the players x and y values
  //Check all of the enemies x and y values
  //If they are within a certain range
    //Set score to 0



// function collide(node) {

//   var r = node.radius,
//       nx1 = node.x - r,
//       nx2 = node.x + r,
//       ny1 = node.y - r,
//       ny2 = node.y + r;
//   return function(quad, x1, y1, x2, y2) {
//     if (quad.point && (quad.point !== node)) {
//       var x = node.x - quad.point.x,
//           y = node.y - quad.point.y,
//           l = Math.sqrt(x * x + y * y),
//           r = node.radius + quad.point.radius;
//       if (l < r) {
//         l = (l - r) / l * .5;
//         node.x -= x *= l;
//         node.y -= y *= l;
//         quad.point.x += x;
//         quad.point.y += y;
//       }
//     }
//     console.log(x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1);
//     return x1 > nx2
//         || x2 < nx1
//         || y1 > ny2
//         || y2 < ny1;
//   };
// }


