/**
 * Created by jean-michel.legrand on 17/11/2015.
 */

var model = {
  currentCat: null,
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

  }
};

// The view consists of 3 components: listView, detailView & errorView
var listView = {
  init: function () {
    var ulListElement = document.getElementById('listCats');
    this.render(ulListElement);
  },

  render: function (ulListElement) {
    ulListElement.innerHTML = "";
    octopus.getSortedCats().forEach(function (cat) {
      // create the li element & associated its data
      var listElement = document.createElement("li");
      listElement.id = cat.id;
      listElement.innerHTML = '<a href="#">' + cat.name + '</a>';
      // create the event listener for the click
      // no usage of the closure approach
      // once we click on the link, detailView.render()
      listElement.addEventListener('click', function () {
        detailView.render(document.getElementById('detailCat'), octopus.getCatById(this.id));
      });
      ulListElement.appendChild(listElement);
    });
  }
};

var detailView = {
  init: function () {
    var catElement = {
      reference : document.getElementById('cat'),
      name : document.getElementById('cat-name'),
      img : document.getElementById('cat-img'),
      counter :document.getElementById('cat-counter'),
      clickableZone : document.getElementById('cat-img-clickable-zone')
    };
    this.render(catElement, octopus.getFirstCatFromSortedCats());
  },
  render: function (catElement, cat) {
    //TODO : check the pizza app with the template approach

    catElement.reference.setAttribute("cat-id", cat.id);
    catElement.name.innerHTML = "The name of the cat is " + cat.name;
    catElement.img.innerHTML = "<img id='cat-img-clickable-zone' src=" + cat.img + " />";
    catElement.counter.innerHTML = "The image of this cat has been clicked  " + cat.counter + " times";
    catElement.clickableZone.addEventListener('click', function () {
      cat.counter += 1;
      this.parentElement.parentElement.children[2].innerHTML = "this cat has been clicked " + cat.counter + " times";
    });
  }
};

var errorView = {
  init: function () {
    var masterElement = document.getElementById('master');
    var detailElement = document.getElementById('detail');
    var errorElement = document.getElementById('error');
    this.render(masterElement, detailElement, errorElement);
  },
  render: function (masterElement, detailElement, errorElement) {
    masterElement.parentNode.removeChild(masterElement);
    detailElement.parentNode.removeChild(detailElement);
    errorElement.style.visibility = "visible";
  }
};

octopus.init();
