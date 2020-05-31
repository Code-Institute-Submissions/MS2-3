// Remove landing screen to show main game area when "Start Game" button is clicked 

$("#start-game").click(function () {
    $("#landing").removeClass("d-flex");
    $("#landing").addClass("d-none");
    // Display spinning vinyl and needle arm animation 
    $("#spinningVinyl").removeClass("d-none");
    $("#spinningVinyl").addClass("d-flex");
    // Display main game console 
    $("main").removeClass("d-none");
    $("main").addClass("d-flex");
    // Remove parallax dust particles 
    $(".parallax").addClass("d-none");
});

// Return to home screen when drum console home icon is clicked 

$(".home-btn").click(function () {
    window.location.reload()
});

// Landing screen dust particle parallax effect
// Based on source: https://codepen.io/SabAsan/pen/gOaRJzV

function Parallax(options){
    options = options || {};
    this.nameSpaces = {
      wrapper: options.wrapper || '.parallax',
      layers: options.layers || '.parallax-layer',
      deep: options.deep || 'data-parallax-deep'
    };
    this.init = function() {
      var self = this,
          parallaxWrappers = document.querySelectorAll(this.nameSpaces.wrapper);
      for(var i=0; i< parallaxWrappers.length; i++) {
        (function(i) {
          parallaxWrappers[i].addEventListener('mousemove', function(e){
            var x = e.clientX,
                y = e.clientY,
                layers = parallaxWrappers[i].querySelectorAll(self.nameSpaces.layers);
            for(var j=0; j<layers.length; j++){
               (function(j){
                 var deep = layers[j].getAttribute(self.nameSpaces.deep),
                     disallow = layers[j].getAttribute('data-parallax-disallow'),
                     itemX = (disallow && disallow === 'x') ? 0 : x / deep,
                     itemY = (disallow && disallow === 'y') ? 0 : y / deep;
                 if(disallow && disallow === 'both') return;
                 layers[j].style.transform = 'translateX(' + itemX + '%) translateY(' + itemY + '%)';
               })(j);
            }
          })
        })(i);
      }
    };
    this.init();
    return this;
  }
  window.addEventListener('load', function(){
    new Parallax();
  });