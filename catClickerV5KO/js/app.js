var Cat = function (data) {
  var juniorThreshold = 5;
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

  // temp storage for the viewModel object
  var self = this;

  this.catList = ko.observableArray([]);

  datas.forEach(function(catItem) {
    self.catList.push(new Cat(catItem))
  });

  this.currentCat = ko.observable(new Cat(datas[0]));

  this.incrementCounter = function () {
    self.currentCat().counter(self.currentCat().counter() + 1);
  };
};

ko.applyBindings(new ViewModel());