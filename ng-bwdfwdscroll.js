
// first thing's first; initialize the app  
var app = angular.module('yourAppName', ['ngRoute']);
  
// use $rootScope since this is for application-wide behavior  
app.run(function _bwdFwdDetect($rootScope, $location) {  
  $rootScope.path = $location.path();// stores only the current page being viewed  
  $rootScope.pathBwd = [];// stores up to the last page viewed before the current one  
  $rootScope.pathFwd = [];// stores starting with the page viewed before coming back to the current one  
  
  // detect that the location is about to change  
  $rootScope.$on('$locationChangeStart', function(event) {  
    var newPath = $location.path();// take note of the new path (using path instead of url is good)  
  
    // grab the last backward page for comparison  
    var bwd = !$rootScope.pathBwd.length ? null :  
      $rootScope.pathBwd[$rootScope.pathBwd.length - 1];  
  
    // grab the last forward page for comparison  
    var fwd = !$rootScope.pathFwd.length ? null :  
      $rootScope.pathFwd[$rootScope.pathFwd.length - 1];  
  
    // if the new page is the last backward page, assume the user went "back"  
    if (bwd == newPath) {  
      // it's no longer the last backward page, so remove it  
      $rootScope.pathBwd.pop();  
  
      // and push into the forward stack the page we're just leaving to go backward from  
      $rootScope.pathFwd.push($rootScope.path);  
    }  
    // the new page is the last page we came backward from, assume the user went "forward"  
    else if (fwd == newPath) {  
      // it's no longer the last forward page, so remove it  
      $rootScope.pathFwd.pop();  
  
      // and push into the backward stack the page we're going forward away from  
      $rootScope.pathBwd.push($rootScope.path);  
    }  
    // we didn't go back or forward; assume it's a new forward trail being started  
    else if ($rootScope.path != newPath) {  
      // remember the page we're leaving as our last backward page  
      $rootScope.pathBwd.push($rootScope.path);  
  
      // empty out our forward stack since we're now starting a wholly new forward path  
      $rootScope.pathFwd = [];  
  
      // this is what it's all about; scroll to the top of the freshly-loaded page  
      $('html,body').animate({ scrollTop: 0 }, 'slow'); 
    } 
 
    // now that we're done with our comparisons, we can remember our new current page  
    $rootScope.path = newPath;  
  });  
});

