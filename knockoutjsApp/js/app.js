/**
 * Created by jmlegrand on 24/01/16.
 */

document.addEventListener("DOMContentLoaded", function () {
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min.js");
  document.getElementsByTagName("head")[0].appendChild(script);

  script.onload = function () {

    var ClickCounterViewModel = function () {
      this.numberOfClicks = ko.observable(0);

      this.registerClick = function () {
        this.numberOfClicks(this.numberOfClicks() + 1);
      };

      this.resetClicks = function () {
        this.numberOfClicks(0);
      };

      this.hasClickedTooManyTimes = ko.computed(function () {
        return this.numberOfClicks() >= 3;
      }, this);
    };

    ko.applyBindings(new ClickCounterViewModel());
  }
});