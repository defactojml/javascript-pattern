/**
 * Created by jean-michel.legrand on 17/11/2015.
 */


var model = {
  currentCat: null,
  getCats: function() {
    if (datas.length) {
      return datas;
    }
  }
};

var octopus = {
  // on loading:
  // - get the list of cats stored in the mocked array
  // - dynamically generate the list of cats
  // - display the detail of the first cat (from the sorted array)
  init: function () {
    if (model.getCats()) {
      model.currentCat = this.getFirstCatFromSortedCats();
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
    var ulListElement = document.getElementById('cat-list');
    listView.render(ulListElement);
  },

  render: function (ulListElement) {
    // we better start from a clean sheat, any times
    ulListElement.innerHTML = "";
    octopus.getSortedCats().forEach(function (cat) {
      var listElement = document.createElement("li");
      listElement.id = cat.id;
      listElement.innerHTML = '<a href="#">' + cat.name + '</a>';
      // create the event listener for the click
      // no usage of the closure approach
      // once we click on the link, detailView.render()
      listElement.addEventListener('click', function () {
        detailView.render(octopus.getCatById(this.id));
      });
      ulListElement.appendChild(listElement);

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
    var catElement =  document.getElementById('cat-detail');
    var catNameElement = document.getElementById('cat-name');
    var catImgElement = document.getElementById('cat-img');
    var catCounterElement = document.getElementById('cat-counter');

    catElement.setAttribute("cat-id", cat.id);
    catNameElement.innerHTML = "cat's name is " + cat.name;
    catImgElement.innerHTML = "<img src=" + cat.img + " />";
    catCounterElement.innerHTML = "this cat has been clicked " + cat.counter + " times";

    catImgElement.addEventListener('click', function () {
      cat.counter += 1;
      catCounterElement.innerHTML = "this cat has been clicked " + cat.counter + " times";
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
