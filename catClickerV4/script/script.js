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
  getAllCats: function() {
    if (jsonCats.length) {
      return jsonCats;
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
      adminView.init();
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


      listElement.addEventListener('click', function(e) {
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
    clickableZoneElement.addEventListener('click', function(e) {
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


var adminView = {
  init: function () {
    this.containerElement = utils.retrieveContainerElement();
    this.adminElements = createAdminElements();
    utils.addElementsToContainer(this.containerElement,this.adminElements);
    adminView.render(this.adminElements);

    function createAdminElements(){
      var mainElement = document.createElement('div');
      mainElement.setAttribute("id", "admin");
      mainElement.setAttribute("class", "admin");

      var subTitleElement = document.createElement("h2");
      subTitleElement.innerHTML = 'Admin section';
      mainElement.appendChild(subTitleElement);

      var subSectionElement1 = document.createElement("div");
      subSectionElement1.setAttribute("id", "header");
      subSectionElement1.setAttribute("class", "header");
      mainElement.appendChild(subSectionElement1);

      var buttonElement = document.createElement("input");
      buttonElement.type = "button";
      buttonElement.value = "admin";
      subSectionElement1.appendChild(buttonElement);

      var subSectionElement2 = document.createElement("div");
      subSectionElement2.setAttribute("id", "adminDetail");
      subSectionElement2.setAttribute("class", "adminDetail");
      mainElement.appendChild(subSectionElement2);


      var detailContainerElement = document.createElement("ul");
      subSectionElement2.appendChild(detailContainerElement);

      var nameElementDetail = document.createElement("li");
      var nameLabelValue = document.createElement("span");
      nameLabelValue.innerHTML = " Name of the cat";
      var nameInputValue = document.createElement("input");
      nameElementDetail.appendChild(nameLabelValue);
      nameElementDetail.appendChild(nameInputValue);
      detailContainerElement.appendChild(nameElementDetail);

      var counterElementDetail = document.createElement("li");
      var counterLabelValue = document.createElement("span");
      counterLabelValue.innerHTML = " Number of # for the cat";
      var counterInputValue = document.createElement("input");
      counterElementDetail.appendChild(counterLabelValue);
      counterElementDetail.appendChild(counterInputValue);
      detailContainerElement.appendChild(counterElementDetail);

      var submitElementDetail = document.createElement("li");
      var buttonSubmitElement = document.createElement("input");
      buttonSubmitElement.type = "button";
      buttonSubmitElement.value = "submit";
      submitElementDetail.appendChild(buttonSubmitElement);
      detailContainerElement.appendChild(submitElementDetail);

      return mainElement;
    }
  },
  render: function(adminElements) {
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
