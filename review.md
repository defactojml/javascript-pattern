

### catClicker V1 (version with 2 cats)


* heavy templating with duplicating 

``` 
<div>

    <div id="cat1">
        <span>You have clicked </span>
        <span id="increment1"></span>
        <span>time(s) on</span>
        <span id="name1">!!</span>
    </div>
</div>

```

* a lot of dom manipulation (wo jquery)


```javascript
    // get the 2 main div to handle visibility
    var cat1El = document.getElementById('cat1');
    var cat2El = document.getElementById('cat2');
    
    // get the images
    var kitty1 = document.getElementById('kitty1');
    var kitty2 = document.getElementById('kitty2');
    
    // get the counters associated to the cats
    var increment1El = document.getElementById('increment1');
    var increment2El = document.getElementById('increment2');
```

* vanilla JS style events listeners to handle the click with a lot of copy parameterized


=> the solution not scalable


### introClosure
```javascript
  elem.addEventListener('click', (function(numCopy) {
    return function() {
      alert(numCopy)
    };
  })(num));
```


**Question 1**

Can't see the eventListener created in the dev tool in debug mode. To which properties can we see it?



### catClicker V2 (catClicker premium)

* minimalist templating with only the main structural elements

``` 
<div id="container" class="container">
    <div id="master" class="master">
        <h2>List of Cats</h2>
    </div>

    <div id="detail" class="detail">
        <h2>Detail of the Cat selected</h2>
    </div>
</div>

```
* added css

* use the pattern to handle correctly eventlistener within a loop
```javascript
    liElementMaster.addEventListener('click', (function (tempCat) {
      return function(){
        detailElement.style.visibility='visible';
        if (document.getElementById('picClickableZone')) {
          ulElementDetail.parentNode.removeChild(ulElementDetail);
        }
        
        ...
  

        var clickableZoneElement = document.getElementById('picClickableZone');
        clickableZoneElement.addEventListener('click', function() {
          tempCat.counter += 1;
          liElementDetailCounter.innerHTML = "this cat has been clicked " + tempCat.counter + " times";
        });
      }
    })(cat));
```

* Externalize datas (cf data.js)

**Question 2**

Each time, we click on the master view, we recreate from scratch the detail view. The best approach?

**Question 3**

What is the best approach?

* Approach 1: relying on global variables declares at the beginning of the file (masterElement)


* Approach 2: relying on functions that have these variables as parameters (cats)

```javascript
var masterElement = document.getElementById('master');

buildMasterList(sortedCats);
  
...
  
function buildMasterList(cats) {
  var ulElementMaster = document.createElement("ul");
  var ulElementDetail = null; // to avoid the issue of the null retrieved when selecting on a different link from the initial one
  masterElement.appendChild(ulElementMaster);
  
  }
```



### catClicker V3 (catClicker premium aplying the MVO pattern)

**Question 4**

What is the best approach?

* Approach 1: minimalist on html with a lot of generation in the js
```
<div id="container" class="container">

</div>
```

```javascript
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
  }
};
```

* Approach 2: create the static  html with only the dynamic element in the js
```
<div id="container" class="container">
<div id="master" class="master">
    <h2>List of Cats</h2>
    <ul id="listCats"></ul>
</div>
...
</div>
```

```javascript
var listView = {
  // initialize the view dom elements
  init: function() {
    var ulListElement = document.getElementById('listCats');
    listView.render(ulListElement);
  },

  render: function(ulListElement){
    octopus.getSortedCats().forEach(function(cat){
      var listElement = null;
      listElement = document.createElement("li");
      listElement.id = cat.id ;
      listElement.innerHTML = '<a href="#">' + cat.name + '</a>';
      ulListElement.appendChild(listElement);

      listElement.addEventListener('click', function() {
        var catId = this.id;
        var cat = octopus.getCatById(catId);
        detailView.render(detailView.detailElements.childNodes[1], cat);
      });
    });
  }
};
```

**Question 5**

The counter update does not work properly.
The callback function is getting executed N times instead of one. Why?

```javascript
this.catImgElement.addEventListener('click', function() {
    //TODO : use the currentCat property to update the field  ...
    cat.counter += 1;
    tempCatCounterElement.innerHTML = "This cat has been clicked " + cat.counter + " times";
});
```

