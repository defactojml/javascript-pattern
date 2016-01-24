var viewModel = function () {
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

  this.incrementCounter = function () {
    this.counter(this.counter() + 1);
  };

};

ko.applyBindings(new viewModel());
