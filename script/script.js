/**
 * Created by jean-michel.legrand on 17/11/2015.
 */

var kitty1 = document.getElementById('kitty1');
var kitty2 = document.getElementById('kitty2');

var increment1El = document.getElementById('increment1');
var increment2El = document.getElementById('increment2');

var increment1 = 0, increment2 = 0;

kitty1.addEventListener('click', function () {
  increment1 += 1;
  increment1El.innerHTML = increment1;
}, false);

kitty2.addEventListener('click', function () {
  increment2 += 1;
  increment2El.innerHTML = increment2;
}, false);



// clear the screen for testing
document.body.innerHTML = '';
document.body.style.background="white";

var nums = [1,2,3];

// Let's loop over the numbers in our array
for (var i = 0; i < nums.length; i++) {

  // This is the number we're on...
  var num = nums[i];

  // We're creating a DOM element for the number
  var elem = document.createElement('div');
  elem.textContent = num;

  // ... and when we click, alert the value of `num`
  elem.addEventListener('click', (function(numCopy) {
    alert(numCopy);
  })(num));

  // finally, let's add this element to the document
  document.body.appendChild(elem);
};
