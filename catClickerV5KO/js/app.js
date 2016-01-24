var viewModel = function () {
  var juniorThreshold = 5;

  this.name = ko.observable("Dramatic");
  this.imgSrc = ko.observable("images/kitty2.jpg");
  this.counter = ko.observable(0);
  this.level = ko.observable("Newborn");


  this.incrementCounter = function () {
    this.counter(this.counter() + 1);
    this.counter() >= juniorThreshold ? this.level("Infant") : this.level();
  };

};

ko.applyBindings(new viewModel());
