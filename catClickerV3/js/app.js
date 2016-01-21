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
  init: function() {
    if (model.getCats()) {
      model.currentCat = this.getFirstCatFromSortedCats();
      listView.init();
      detailView.init();
    } else {
      errorView.init()
    }
  },
  getSortedCats: function() {
    return model.getCats().sort(function(catA, catB) {
      return (catA.name).localeCompare(catB.name);
    });
  },
  getFirstCatFromSortedCats: function() {
    return this.getSortedCats()[0];
  },
  getCatById: function(id) {
    return this.getSortedCats().filter(function(obj) {
      return obj.id === id;
    })[0];

  }
};

// The view consists of 3 components: listView, detailView & errorView
var listView = {
  init: function() {
    var ulListElement = document.getElementById('cat-list');
    this.render(ulListElement);
  },

  render: function(ulListElement) {
    // we better start from a clean sheat, any times
    ulListElement.innerHTML = "";
    octopus.getSortedCats().forEach(function(cat) {
      // create the li element & associated its data
      var listElement = document.createElement("li");
      listElement.id = cat.id;
      listElement.innerHTML = '<a href="#">' + cat.name + '</a>';
      // create the event listener for the click
      // no usage of the closure approach
      // once we click on the link, detailView.render()
      listElement.addEventListener('click', function() {
        detailView.render(octopus.getCatById(this.id));
      });
      ulListElement.appendChild(listElement);
    });
  }
};

var detailView = {
  init: function() {
    this.catElement =  document.getElementById('cat-detail');
    this.catNameElement = document.getElementById('cat-name');
    this.catImgElement = document.getElementById('cat-img');
    this.catCounterElement = document.getElementById('cat-counter');
    this.render(octopus.getFirstCatFromSortedCats());
  },
  render: function(cat) {
    //TODO : check the pizza app with the template approach
    this.catElement.setAttribute("cat-id", cat.id);
    this.catNameElement.innerHTML = "The name of the cat is " + cat.name;
    this.catImgElement.innerHTML = "<img src=" + cat.img + " />";
    this.catCounterElement.innerHTML = "This cat has been clicked  " + cat.counter + " times";
    // temp variable created to be used in the inner function # from the render function scope (so this # of this)
    var tempCatCounterElement = this.catCounterElement;
    this.catImgElement.addEventListener('click', function() {
      //TODO : use the currentCat property to update the field  ...
      cat.counter += 1;
      tempCatCounterElement.innerHTML = "This cat has been clicked " + cat.counter + " times";
    });
  }
};

var errorView = {
  init: function() {
    var masterElement = document.getElementById('list');
    var detailElement = document.getElementById('detail');
    var errorElement = document.getElementById('error');
    this.render(masterElement, detailElement, errorElement);
  },
  render: function(masterElement, detailElement, errorElement) {
    masterElement.parentNode.removeChild(masterElement);
    detailElement.parentNode.removeChild(detailElement);
    errorElement.style.visibility = "visible";
  }
};

octopus.init();
