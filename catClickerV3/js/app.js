/**
 * Created by jean-michel.legrand on 17/11/2015.
 */

var model = {
  getCats: function () {
    if (datas.length) {
      return datas;
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
  getSelectedCatById: function (id) {
    return this.getSortedCats().filter(function (obj) {
      return obj.id === id;
    })[0];

  }
};

// The view consists of 3 components: listView, detailView & errorView
var listView = {
  // initialize the view dom elements
  init: function () {
    var ulListElement = document.getElementById('listCats');
    listView.render(ulListElement);
  },

  render: function (ulListElement) {
    octopus.getSortedCats().forEach(function (cat) {
      // create the li element & associated its data
      var listElement = document.createElement("li");
      listElement.id = cat.id;
      listElement.innerHTML = '<a href="#">' + cat.name + '</a>';
      ulListElement.appendChild(listElement);

      // create the event listener for the click - no used of the closure approach
      // once we click on the link, detailView is getting displayed
      listElement.addEventListener('click', function () {
        detailView.render(document.getElementById('detailCat'), octopus.getSelectedCatById(this.id));
      });
    });
  }
};

var detailView = {
  // initialize the dom elements of the view
  init: function () {
    var ulDetailElement = document.getElementById('detailCat');
    this.render(ulDetailElement, octopus.getFirstCatFromSortedCats());
  },
  render: function (catDetailElements, cat) {
    //TODO : check the pizza app with the template approach
    catDetailElements.children[0].setAttribute("id", cat.id);
    catDetailElements.children[0].innerHTML = "cat's name is " + cat.name;
    catDetailElements.children[1].innerHTML = "<img id='picClickableZone' src=" + cat.img + " />";
    catDetailElements.children[2].innerHTML = "this cat has been clicked " + cat.counter + " times";

    var clickableZoneElement = document.getElementById('picClickableZone');
    clickableZoneElement.addEventListener('click', function () {
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
    errorView.render(masterElement, detailElement, errorElement);
  },
  render: function (masterElement, detailElement, errorElement) {
    masterElement.parentNode.removeChild(masterElement);
    detailElement.parentNode.removeChild(detailElement);
    errorElement.style.visibility = "visible";
  }
};


octopus.init();
