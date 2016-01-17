

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


Question 1 
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

Question 2
Each time, we click on the master view, we recreate from scratch the detail view. The best approach?




### catClicker V3




### catClicker V4



### catClicker V5
