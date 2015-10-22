# ng-bwdfwdscroll

[See Full Write-Up](http://rommelsantor.com/clog/2015/10/20/angularjs-scroll-to-top-for-new-pages-on-single-page-app/)

This Run block is used to track the full backward and forward browsing history for single-page apps, in order to execute any desired functionality when a new page is loaded, i.e., when the user is navigating to a page that is neither the first backward page nor first forward page.

In this case, we're scrolling to the top of the page upon new page load for better UX (as compared to the browser being scrolled low when a new page is loaded higher up at the top of the page).
