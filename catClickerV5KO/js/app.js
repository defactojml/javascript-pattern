var viewModel = function () {
  var juniorThreshold = 10;

  this.name = ko.observable("Dramatic");
  this.imgSrc = ko.observable("images/kitty2.jpg");
  this.counter = ko.observable(0);
  this.level = ko.observable("Newborn");
  this.nicknames = ko.observableArray([
    {nickname: 'Bert'},
    {nickname: 'Charles'},
    {nickname: 'Denise'}]);

  this.incrementCounter = function () {
    this.counter(this.counter() + 1);
    this.counter() >= juniorThreshold ? this.level("Infant") : this.level();
  };

};

ko.applyBindings(new viewModel());
