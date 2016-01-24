var Cat = function () {
  var juniorThreshold = 5;
  this.name = ko.observable("Dramatic");
  this.imgSrc = ko.observable("images/kitty2.jpg");
  this.counter = ko.observable(0);
  this.nicknames = ko.observableArray(['Berty', 'Charly', 'Nicky']);
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

  this.currentCat = ko.observable(new Cat());

  this.incrementCounter = function () {
    self.currentCat().counter(self.currentCat().counter() + 1);
  };
};

ko.applyBindings(new ViewModel());