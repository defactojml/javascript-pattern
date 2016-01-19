/**
 * Created by jean-michel.legrand on 17/11/2015.
 */

var model = {
  getAllCats: function() {
    if (datas.length) {
      return datas;
    }
  }
};

var octopus = {
  // on loading:
  // - get the list of cats stored in the mocked array
  // - create the initial dom elements
  init: function() {
    if (model.getAllCats()){
      listView.init();
      detailView.init();
    } else {
      errorView.init()
    }
  },
  getSortedCats: function() {
    return model.getAllCats().sort(function(catA, catB) {
      return (catA.name).localeCompare(catB.name);
    });
  },
  getFirstCatFromSortedCats: function() {
    return this.getSortedCats()[0];
  },
  getCatById: function(id){
    return this.getSortedCats().filter(function ( obj ) {
      return obj.id === id;
    })[0];

  }


};

// The view consists of 3 components: listView, detailView & errorView
var listView = {
  // initialize the view dom elements
  init: function() {
    this.containerElement = utils.retrieveContainerElement();
    this.listElements = createListElements();
    utils.addElementsToContainer(this.containerElement,this.listElements);
    listView.render(this.listElements);

    function createListElements(){
      var mainElement = document.createElement('div');
      mainElement.setAttribute("id","master");
      mainElement.setAttribute("class","master");

      var subTitleElement = document.createElement("h2");
      subTitleElement.innerHTML = 'List of Cats';
      mainElement.appendChild(subTitleElement);

      var listContainerElement = document.createElement("ul");
      mainElement.appendChild(listContainerElement);

      return mainElement;
    }
  },

  render: function(listElements){
    octopus.getSortedCats().forEach(function(cat){
      var listElement = null;
      listElement = document.createElement("li");
      listElement.id = cat.id ;
      listElement.innerHTML = '<a href="#">' + cat.name + '</a>';
      listElements.childNodes[1].appendChild(listElement);


      listElement.addEventListener('click', function() {
        var catId = this.id;
        var cat = octopus.getCatById(catId);
        detailView.render(detailView.detailElements.childNodes[1], cat);
      });
    });
  }
};

var detailView = {
  // initialize the view dom elements
  init: function() {
    this.containerElement = utils.retrieveContainerElement();
    this.detailElements = createDetailElements();
    utils.addElementsToContainer(this.containerElement,this.detailElements);
    detailView.render(this.detailElements.childNodes[1], octopus.getFirstCatFromSortedCats());

    function createDetailElements(){
      var mainElement = document.createElement('div');
      mainElement.setAttribute("id","detail");
      mainElement.setAttribute("class","detail");

      var subTitleElement = document.createElement("h2");
      subTitleElement.innerHTML = 'Detail of the Cat selected';
      mainElement.appendChild(subTitleElement);

      var detailContainerElement = document.createElement("ul");
      mainElement.appendChild(detailContainerElement);

      var liElementDetailName = document.createElement("li");
      detailContainerElement.appendChild(liElementDetailName);

      var liElementDetailPic = document.createElement("li");
      detailContainerElement.appendChild(liElementDetailPic);

      var liElementDetailCounter = document.createElement("li");
      detailContainerElement.appendChild(liElementDetailCounter);

      return mainElement
    }
  },
  render: function(catDetailElements, cat) {
    catDetailElements.childNodes[0].setAttribute("id", cat.id);
    catDetailElements.childNodes[0].innerHTML = "cat's name is " + cat.name;
    catDetailElements.childNodes[1].innerHTML = "<img id='picClickableZone' src=" + cat.img + " />";
    catDetailElements.childNodes[2].innerHTML = "this cat has been clicked " + cat.counter + " times";

    var clickableZoneElement = document.getElementById('picClickableZone');
    clickableZoneElement.addEventListener('click', function() {
      var catId = this.parentElement.parentElement.childNodes[0].id;
      var cat = octopus.getCatById(catId);
      cat.counter += 1;
      this.parentElement.parentElement.childNodes[2].innerHTML = "this cat has been clicked " + cat.counter + " times";
    });
  }
};

var errorView = {
  init: function () {
    this.containerElement = utils.retrieveContainerElement();
    this.errorElements = createErrorElements();
    utils.addElementsToContainer(this.containerElement,this.errorElements);
    errorView.render(this.errorElements);

    function createErrorElements(){
      return document.createElement("h2")
    }
  },
  render: function(errorElements) {
    errorElements.innerHTML = 'Sorry, no data retrieved';
  }
};

var utils = {
  addElementsToContainer: function(containerElement, element){
    containerElement.appendChild(element);
  },
  retrieveContainerElement: function() {
    return document.getElementById('container');
  }
};

octopus.init();
