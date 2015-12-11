/**
 * Created by jean-michel.legrand on 17/11/2015.
 */


// récuperation des div englobantes pour gerer la visibilité
var cat1El = document.getElementById('cat1');
var cat2El = document.getElementById('cat2');

// récuperation des images
var kitty1 = document.getElementById('kitty1');
var kitty2 = document.getElementById('kitty2');

// récuperation des compteurs associés aux chats
var increment1El = document.getElementById('increment1');
var increment2El = document.getElementById('increment2');

// récuperation des noms associés aux chats
var name1El = document.getElementById('name1');
var name2El = document.getElementById('name2');

// au chargement, on cache ses div
cat1El.style.visibility='hidden';
cat2El.style.visibility='hidden';

// initialisation des compteurs
var increment1 = 0, increment2 = 0;

// ajout des events listeners pour gerer le click souris
// vanilla JS style with no jQuery
kitty1.addEventListener('click', function () {
  increment1 += 1;
  if (increment1 === 1) {
    // pour le 1er coup, on rend visible le commentaire et on set le nom
    cat1El.style.visibility='visible';
    name1El.innerHTML = 'cat1';
  }
  increment1El.innerHTML = increment1;
}, false);

kitty2.addEventListener('click', function () {
  increment2 += 1;
  if (increment2 === 1) {
    // pour le 1er coup, on rend visible le commentaire et on set le nom
    cat2El.style.visibility='visible';
    name2El.innerHTML = 'cat2';
  }
  increment2El.innerHTML = increment2;
}, false);


