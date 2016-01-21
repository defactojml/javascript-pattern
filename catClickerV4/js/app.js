/**
 * Created by jean-michel.legrand on 17/11/2015.
 */

// mocked json file
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

var model = {
  getCats: function () {
    if (jsonCats.length) {
      return jsonCats;
    }
  }
};

var octopus = {
  // on loading:
  // - get the list of cats stored in the mocked array
  // - create the initial dom elements
  init: function () {
    if (model.getCats()) {
      listView.init();
      detailView.init();
      adminView.init();
    } else {
      errorView.init()
    }
  },
  getSortedCats: function () {
    return model.getCats().sort(function (catA, catB) {
      return (catA.name).localeCompare(catB.name);
    });
  },
  getFirstCatFromSortedCats: function () {
    return this.getSortedCats()[0];
  },
  getCatById: function (id) {
    return this.getSortedCats().filter(function (obj) {
      return obj.id === id;
    })[0];
  }
};

// The view consists of 3 components: listView, detailView & errorView
var listView = {
  // initialize the view dom elements
  init: function () {
    var listContainerElement = document.getElementById('list');
    listView.render(listContainerElement);
  },

  render: function (listElements) {
    octopus.getSortedCats().forEach(function (cat) {
      var listElement = document.createElement("li");
      listElement.id = cat.id;
      listElement.innerHTML = '<a href="#">' + cat.name + '</a>';
      listElements.appendChild(listElement);

      listElement.addEventListener('click', function () {
        var catId = this.id;
        var cat = octopus.getCatById(catId);
        detailView.render(cat);
      });
    });
  }
};

var detailView = {
  // initialize the view dom elements
  init: function () {
    detailView.render(octopus.getFirstCatFromSortedCats());
    adminView.render(octopus.getFirstCatFromSortedCats());

  },
  render: function (cat) {
    var detailCatName = document.getElementById('detailCatName');
    detailCatName.setAttribute("catid", cat.id);
    detailCatName.innerHTML = "cat's name is " + cat.name;

    var detailCatImg = document.getElementById('detailCatImg');
    detailCatImg.innerHTML = "<img id='picClickableZone' src=" + cat.img + " />";

    var detailCatCounter = document.getElementById('detailCatCounter');
    detailCatCounter.innerHTML = "this cat has been clicked " + cat.counter + " times";

    detailCatImg.addEventListener('click', function () {
      var catId = detailCatName.getAttribute("catid");
      var cat = octopus.getCatById(catId);
      cat.counter += 1;
      detailCatCounter.innerHTML = "this cat has been clicked " + cat.counter + " times";
    });
  }
};

var adminView = {
  init: function () {
  },
  render: function (cat) {
    var adminDetailElement = document.getElementById('adminDetail');
    adminDetailElement.style.visibility = 'hidden';

    var adminButton = document.getElementById('adminButton');
    adminButton.addEventListener('click', function () {
      adminDetailElement.style.visibility = 'visible  ';
    });

    var catNameElement = document.getElementById('catName');
    catNameElement.value = cat.name;
    var catCounterElement = document.getElementById('catCounter');
    catCounterElement.value = cat.counter;

    var submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function () {
      cat.name = catNameElement.value;
      cat.counter = parseInt(catCounterElement.value);
      catNameElement.value = "";
      catCounterElement.value = "";
      adminDetailElement.style.visibility = 'hidden';
    });

    var cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', function () {
      catNameElement.value = "";
      catCounterElement.value = "";
      adminDetailElement.style.visibility = 'hidden';
    });
  }
};

var errorView = {
  init: function () {
    var masterElement = document.getElementById('master');
    var detailElement = document.getElementById('detail');
    var adminElement = document.getElementById('admin');
    var errorElement = document.getElementById('error');
    errorView.render(masterElement, detailElement, adminElement, errorElement);
  },
  render: function (masterElement, detailElement, adminElement, errorElement) {
    masterElement.parentNode.removeChild(masterElement);
    detailElement.parentNode.removeChild(detailElement);
    adminElement.parentNode.removeChild(adminElement);
    errorElement.style.visibility = "visible";
  }
};


octopus.init();
