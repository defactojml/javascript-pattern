/**
 * Created by jmlegrand on 16/01/16.
 */

// clear the screen for testing
document.body.innerHTML = '';
document.body.style.background = "white";

var nums = [1, 2, 3];

// Let's loop over the numbers in our array
for (var i = 0; i < nums.length; i++) {

    // This variable keeps changing every time we iterate!
    // It's first value is 1, then 2, then finally 3.
    var num = nums[i];

    // We're creating a DOM element for the number
    var elem = document.createElement('div');
    elem.textContent = num;

    // ... and when we click, alert the value of `num` at the moment of the click!

    // Specifically, we're alerting the num variable that's defined outside of this inner function.
    // Each of these inner functions are pointing to the same `num` variable... the one that changes on
    // each iteration, and which equals 3 at the end of the for loop.
    // Whenever the anonymous function is called on the click event, the function will reference the same `num`
    // (which now equals 3).

    elem.addEventListener('click', function () {
        alert(num);
    });

    // finally, let's add this element to the document
    document.body.appendChild(elem);
}