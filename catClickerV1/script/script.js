/**
 * Created by jean-michel.legrand on 17/11/2015.
 */


// get the 2 main div to handle visibility
var cat1El = document.getElementById('cat1');
var cat2El = document.getElementById('cat2');

// get the images
var kitty1 = document.getElementById('kitty1');
var kitty2 = document.getElementById('kitty2');

// get the counters associated to the cats
var increment1El = document.getElementById('increment1');
var increment2El = document.getElementById('increment2');

// get the names associated to the cats
var name1El = document.getElementById('name1');
var name2El = document.getElementById('name2');

//by default, we hide the divs
cat1El.style.visibility = 'hidden';
cat2El.style.visibility = 'hidden';

// we initialize the counters
var increment1 = 0, increment2 = 0;

// add the events listeners to handle the click
// vanilla JS style with no jQuery
kitty1.addEventListener('click', function () {
    increment1 += 1;
    if (increment1 === 1) {
        // pour le 1er coup, on rend visible le commentaire et on set le nom
        cat1El.style.visibility = 'visible';
        name1El.innerHTML = 'cat1';
    }
    increment1El.innerHTML = increment1;
}, false);

kitty2.addEventListener('click', function () {
    increment2 += 1;
    if (increment2 === 1) {
        // pour le 1er coup, on rend visible le commentaire et on set le nom
        cat2El.style.visibility = 'visible';
        name2El.innerHTML = 'cat2';
    }
    increment2El.innerHTML = increment2;
}, false);


