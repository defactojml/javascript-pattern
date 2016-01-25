var Cat = function (data) {
  var juniorThreshold = 5;
  this.id = ko.observable(data.id);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.counter = ko.observable(data.counter);
  this.nicknames = ko.observableArray(data.nicknames);
  this.level = ko.computed(function () {
    var title;
    var clicks = this.counter();
    (clicks < juniorThreshold) ? title = "Newborn" : title = "Infant";
    return title;
  }, this);
};

var ViewModel = function () {

  // self always refer to the viewModel object
  var self = this;

  this.catList = ko.observableArray([]);

  datas.forEach(function(catItem) {
    self.catList.push(new Cat(catItem))
  });

  this.currentCat = ko.observable(this.catList()[0]);

  this.incrementCounter = function () {
    self.currentCat().counter(self.currentCat().counter() + 1);
  };

  this.changeCat = function (clickedCat) {
    self.currentCat(clickedCat);
  }
};

ko.applyBindings(new ViewModel());