/**
 * Created by jean-michel.legrand on 17/11/2015.
 */


var model = {
  currentCat: null,
  adminSectionVisibility: false,
  getCats: function () {
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
      // admin view call before the detail since there is a dependancy detail -> admin
      adminView.init();
      detailView.init();
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
  },
  setCurrentCat: function (cat) {
    model.currentCat = cat;
  },
  getCurrentCat: function () {
    return model.currentCat;
  },
  showAdminSection: function () {
    model.adminSectionVisibility = true;
    adminView.adminDetailElement.style.visibility = 'visible';

  },
  hideAdminSection: function () {
    model.adminSectionVisibility = false;
    adminView.adminDetailElement.style.visibility = 'hidden';

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
        octopus.setCurrentCat(octopus.getCatById(this.id));
      });
      ulListElement.appendChild(listElement);

    });
  }
};

var detailView = {
  // initialize the view dom elements
  init: function () {
    this.render(octopus.getFirstCatFromSortedCats());
  },

  render: function (cat) {
    var catElement = document.getElementById('cat-detail');
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

    // run one
    // add all the event listeners to the elements declared

    this.adminDetailElement = document.getElementById('adminDetail');

    var adminButton = document.getElementById('adminButton');
    adminButton.addEventListener('click', function () {
      adminView.render();
      octopus.showAdminSection();
    });

    this.catNameElement = document.getElementById('catName');
    this.catCounterElement = document.getElementById('catCounter');

    var tempCatNameElement = this.catNameElement;
    var tempCatCounterElement = this.catCounterElement;

    var submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function () {
      var currentCat = octopus.getCurrentCat();
      currentCat.name = tempCatNameElement.value;
      currentCat.counter = parseInt(tempCatCounterElement.value);
      tempCatNameElement.value = "";
      tempCatCounterElement.value = "";
      octopus.hideAdminSection();
      // refresh the detailled view
      detailView.render(currentCat);
    });

    var cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', function () {
      octopus.hideAdminSection();
    });
    // on loading, we hide the admin section
    octopus.hideAdminSection();

  },
  render: function () {
    var currentCat = octopus.getCurrentCat();
    this.catNameElement.value = currentCat.name;
    this.catCounterElement.value = currentCat.counter;
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
