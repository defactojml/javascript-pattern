/**
 * Created by jean-michel.legrand on 17/11/2015.
 */

var cat1 = {
  name: 'Xuxa',
  img: 'images/kitty1.jpg',
  counter: 0
};


var cat2 = {
  name: 'Dramatic',
  img: 'images/kitty2.jpg',
  counter: 0
};
var ulElementMaster = null;
var ulElementDetail = null;


var cats = [];
cats.push(cat1);
cats.push(cat2);

var masterElement = document.getElementById('master');
var detailElement = document.getElementById('detail');


if (cats.length) {
  ulElementMaster = document.createElement("ul");
  ulElementMaster.className = 'cats';
} else {

}
masterElement.appendChild(ulElementMaster);

cats.forEach(function(cat) {
  var liElementMaster = null;
  liElementMaster = document.createElement("li");
  liElementMaster.innerHTML =   '<a href="#">' + cat.name + '</a>';
  ulElementMaster.appendChild(liElementMaster);
});


ulElementDetail = document.createElement("ul");
ulElementDetail.className = 'cat';

detailElement.appendChild(ulElementDetail);


var liElementDetailName = null, liElementDetailPic = null, liElementDetailCounter = null;

liElementDetailName = document.createElement("li");
liElementDetailName.innerHTML = "cat's name is " + cat1.name ;
ulElementDetail.appendChild(liElementDetailName);

liElementDetailPic = document.createElement("li");
liElementDetailPic.innerHTML = "<img src=" + cat1.img + " />" ;
"<img src='image.png' alt='The Image' />";
ulElementDetail.appendChild(liElementDetailPic);

liElementDetailCounter = document.createElement("li");
liElementDetailCounter.innerHTML = "this cat has been clicked " + cat1.counter +  " times" ;
ulElementDetail.appendChild(liElementDetailCounter);