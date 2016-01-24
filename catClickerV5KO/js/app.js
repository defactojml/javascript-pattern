var viewModel = function () {
  this.counter = ko.observable(0);
  this.name = ko.observable("Dramatic");
  this.imgSrc = ko.observable("images/kitty2.jpg");

  this.incrementCounter = function () {
    this.clickCount(this.clickCount + 1);
  };

};

ko.applyBindings(new viewModel());
