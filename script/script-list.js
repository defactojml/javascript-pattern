/**
 * Created by jean-michel.legrand on 17/11/2015.
 */


var jsonCats = [{
  "id": "cat1",
  "name": "Xuxa",
  "img": 'images/kitty1.jpg',
  "counter": 0
}, {
  "id": "cat2",
  "name": "Dramatic",
  "img": 'images/kitty2.jpg',
  "counter": 0
}, {
  "id": "cat3",
  "name": "Winter",
  "img": 'images/kitty3.jpg',
  "counter": 0
}, {
  "id": "cat4",
  "name": "Japanese",
  "img": 'images/kitty4.jpg',
  "counter": 0
}, {
  "id": "cat5",
  "name": "Sweeties",
  "img": 'images/kitty5.jpg',
  "counter": 0
}];

var containerElement = document.getElementById('container');
var masterElement = document.getElementById('master');
var detailElement = document.getElementById('detail');



// When data are available
if (jsonCats.length) {
  // we sort the list
  var sortedCats = sortByName(jsonCats);
  // we  build the elements (ul / li + contents) to display the list
  buildMasterList();
  detailElement.style.visibility='hidden';
}
// When there is no data ...
else {
  // we remove the master / detail elements
  containerElement.removeChild(masterElement);
  containerElement.removeChild(detailElement);
  // we create a dedicated message that will get added to the main container element
  var h2NoCatElement = document.createElement("h2");
  h2NoCatElement.innerHTML = 'Sorry, no data retrieved';
  containerElement.appendChild(h2NoCatElement);
}


function sortByName(cats) {
  var sortedCats = cats.sort(function(catA, catB) {
    return (catA.name).localeCompare(catB.name);
  });
  return sortedCats;
}


function buildMasterList() {

  var ulElementMaster = null;
  ulElementMaster = document.createElement("ul");
  masterElement.appendChild(ulElementMaster);
  sortedCats.forEach(function(cat) {
    var liElementMaster = null, ulElementDetail = null;

    liElementMaster = document.createElement("li");
    liElementMaster.id = 'textClickageZone';
    liElementMaster.innerHTML = '<a href="#">' + cat.name + '</a>';
    ulElementMaster.appendChild(liElementMaster);

    // required to be outside the scope of the 1st addEventListener() because it is used in the 2nd one
    var liElementDetailCounter = null;

    liElementMaster.addEventListener('click', function () {
      detailElement.style.visibility='visible';
      if (ulElementDetail) {
        detailElement.removeChild(ulElementDetail);
      }
      ulElementDetail = document.createElement("ul");
      detailElement.appendChild(ulElementDetail);

      var liElementDetailName = null, liElementDetailPic = null;

      liElementDetailName = document.createElement("li");
      liElementDetailName.innerHTML = "cat's name is " + sortedCats[0].name;
      ulElementDetail.appendChild(liElementDetailName);

      liElementDetailPic = document.createElement("li");
      liElementDetailPic.innerHTML = "<img id='picClickableZone' src=" + sortedCats[0].img + " />";
      ulElementDetail.appendChild(liElementDetailPic);

      liElementDetailCounter = document.createElement("li");
      liElementDetailCounter.innerHTML = "this cat has been clicked " + sortedCats[0].counter + " times";
      ulElementDetail.appendChild(liElementDetailCounter);


      var clickableZoneElement = document.getElementById('picClickableZone');
      clickableZoneElement.addEventListener('click', function() {
        sortedCats[0].counter += 1;
        liElementDetailCounter.innerHTML = "this cat has been clicked " + sortedCats[0].counter + " times";
      });

    });



  });
}



