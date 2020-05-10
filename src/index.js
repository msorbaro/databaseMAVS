// const $ = require('jquery');
//
// $('#main').html('Here we go! Wheee');
//

// // change require to es6 import style
import $ from 'jquery';
import './style.css';
//
// // this is a generator function.
// // note the *
function* simpleCounter() {
  let count = 0;
  while (true) {
    yield count += 1;
  }
}

// instantiate generator
const counter = simpleCounter();

setInterval(
  () => { $('#main').html(`Team Mavs. Wahoo. Starter pack ready :) You have been on this page for ${counter.next().value} seconds.`); },
  1000,
);
