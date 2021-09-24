import React from "react";

class EventManager {
  constructor() {
    this.eventLookup = {};
  }

  off(event, callback) {
    var listeners = this.eventLookup[event];
    if (event === "*") this.eventLookup = {};
    else if (!callback) this.eventLookup[event] = [];
    else _.remove(listeners, { callback });
  }

  on(event, callback, scope) {
    var listeners = this.eventLookup[event];
    if (!listeners) this.eventLookup[event] = listeners = [];
    listeners.push({ callback, scope });
    return () => _.remove(listeners, { callback });
  }

  once(event, callback, scope) {
    var on = (...data) => {
      this.off(event, on);
      callback.apply(scope, data);
    };
    return this.on(event, on);
  }

  fire(event, ...data) {
    var listeners = this.eventLookup[event];
    if (!listeners) return;
    listeners.forEach((list) => {
      try {
        return list.callback.apply(list.scope, data);
      } catch (e) {
        return _.isError(e) ? e : new Error(e);
      }
    });
  }
}

var events = new EventManager();

var ns = "http://www.w3.org/2000/svg";
//leaf shape?
var d = "M0,0 Q5,-5 10,0 5,5 0,0z";

var stems = $("#stems");
var leaves = $("#leaves");
var svg = $("svg");

var leafCount = _.random(31, 35); //was 30;
var plants = _.random(6, 12); //was 10;
var centerX = 275;
var offsetX = 175;

$("#create").on("click", generate);
//generate initial plants
generate();

function generate() {
  //clear previous plants from UI
  leaves.empty();
  stems.empty();

  //dependency: lodash
  //call createPlant (See below) for # of plants
  _.times(plants, createPlant);

  //for each leaf? on each stem
  stems.children().each(function () {
    //dependency: GSAP
    //animate draw leaf
    var tween = TweenMax.to(this, _.random(2, 4, true), {
      drawSVG: true,
      delay: _.random(2, true),
      onStart: () => TweenLite.set(this, { opacity: 1 }),
      onUpdate: () => events.fire(this.id, tween.progress()),
    });
  });
}

//how to create a plant
function createPlant() {
  var points = createPoints();
  var stem = createPath(stems);
  var length = points.length;
  //reformat points array into comma seperated x,y values
  var values = points.map((point) => `${point.x},${point.y}`);
  //set height equal to the tallest point in intial points array
  var height = points[length - 1].y;
  //return a unique ID that starts with grow
  var id = _.uniqueId("grow");
  var coords = [];

  //for each point
  for (var i = 0; i < length; i++) {
    var point = points[i];
    //push values into coords array in one long list that goes x y x y x y
    coords.push(point.x, point.y);
  }

  //Dependency: GASP
  //set stem invisible
  TweenLite.set(stem, {
    opacity: 0,
    drawSVG: 0,
    //create stem path shape using solve function below
    attr: { id, d: solve(coords) },
  });
  //for # of leaves in leafcount
  for (var i = 0; i < leafCount; i++) {
    //starting at the end and working backwards?
    var point = points[length - 1 - i];
    var scale = {
      x: 1 + 0.1 * i,
      y: 1 + 0.05 * i,
    };
    //create each leaf with scale and id
    createLeaf(point, scale, height, id);
  }
}

function createLeaf(point, scale, height, grow) {
  //make a path inside 'leaves'
  var leaf = createPath(leaves);
  var start = height / point.y;
  //give function to stop growth
  var off = events.on(grow, growLeaf);

  function growLeaf(growth) {
    if (growth >= start) {
      // Remove listener
      off();

      //Set end state of leaf
      //Greensock possibly uses matrix command to do this
      TweenLite.set(leaf, {
        x: point.x,
        y: point.y,
        scaleX: scale.x,
        scaleY: scale.y,
        rotation: _.random(180) - 180,
        fill: `rgb(0,${_.random(110, 160)},0)`,
        //put leaf shape into d attribute
        attr: { d },
      });
      //Grow leaf to end state
      TweenLite.from(leaf, 1, { scale: 0 });
    }
  }
}

function createPoints() {
  //get a random x coordinate within set range
  var x = _.random(centerX - offsetX, centerX + offsetX);
  var y = 150; //highest leaves?
  var dy = 5; //space between leaves
  var offset = 0.007;
  //get a random number of leaves
  var count = _.random(40, 55);
  //add initial x,y to array
  var points = [{ x, y }];

  //for each number in counter
  for (var i = 1; i <= count; i++) {
    points.push({
      //get previous x and offset it by a random amount
      x: points[i - 1].x + i * offset * (_.random(21) - 10),
      //multiple count by space between leaves and subtract from plant height to work backward from the top
      y: [y - dy] - dy * i, //was 395 - dy * i
    });
  }
  //return array of point from tallest to lowest on stalk
  return points;
}

//create a path element within a svg group parents
function createPath(parent) {
  return $(document.createElementNS(ns, "path")).appendTo(parent);
}

//passed an array of x y values alternating in a long list
//create an SVG path to go between each pair of x,y coords
function solve(data) {
  var size = data.length;

  var last = size - 4;

  var path = "M" + [data[0], data[1]];
  //go in 2s to get x and y
  for (var i = 0; i < size - 2; i += 2) {
    var x0 = i ? data[i - 2] : data[0];
    var y0 = i ? data[i - 1] : data[1];

    var x1 = data[i + 0];
    var y1 = data[i + 1];

    var x2 = data[i + 2];
    var y2 = data[i + 3];

    var x3 = i !== last ? data[i + 4] : x2;
    var y3 = i !== last ? data[i + 5] : y2;

    var cp1x = (-x0 + 6 * x1 + x2) / 6;
    var cp1y = (-y0 + 6 * y1 + y2) / 6;

    var cp2x = (x1 + 6 * x2 - x3) / 6;
    var cp2y = (y1 + 6 * y2 - y3) / 6;

    path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
  }

  return path;
}

const UpdatingTree = (props) => {
  return (
    <svg viewBox="0 0 500 150" preserveAspectRatio="xMidYMax meet">
      <g id="stems" fill="none" stroke="green"></g>
      <g id="leaves"></g>
    </svg>
  );
};

export { Tree };
