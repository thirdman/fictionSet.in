app.controller("ProfileCtrl",["fsConfig","$scope","Profile","Auth","currentUser","$firebaseArray","$firebaseObject","$location","$routeParams","FsGet","ngDialog","DataSource",function(o,e,r,s,a,n,i,t,l,c,g,u){"use strict";function d(o){var r="http://fictionset.in/admin/grApi.php?api=getUser&userId="+o,s=function(r){console.log(r),console.log("user data ...");var s=r.user;e.grUser=s,console.log(s),h(s,o)};u.get(r,s)}function h(o,r){var s=o,a=[];e.grShelfArray=a;var n=o.user_shelves.user_shelf;console.log("grUserShelf is..."),console.log(n),angular.forEach(n,function(o){console.log(o.name),console.log(a);var e="http://fictionset.in/admin/grApi.php?api=getShelf&shelfName="+o.name+"&userId="+r,s=function(e){console.log(e);var r=e.reviews.review;if(0==o.book_count);else if(1==o.book_count){var s=[];s.push(r),a.push({name:o.name,meta:o,content:s})}else a.push({name:o.name,meta:o,content:r})};u.get(e,s),console.log("current array of shelves is..."),console.log(a)})}function f(o,r){var s="http://fictionset.in/admin/grApi.php?provider=Goodreads",a=function(o){var r=o.shelves.user_shelf;e.grShelves=r};u.get(s,a)}function p(o){var r="http://fictionset.in/admin/grApi.php?api=getShelf&shelfName="+o,s=function(o){console.log(o),console.log("shelf data ...");var r=o.reviews.review;e.grShelf=r,console.log(r)};u.get(r,s)}var v,m;e.unreadMessages=v,e.aaa=!1,e.isLoadingMessages=!0,e.allBooks=m,l.authorise&&console.log("Routeparams authorise is: "+l.authorise),e.auth=s;var A=s.$getAuth();e.authData=A;var D=c.getRole(A.uid);if(D.$loaded().then(function(){console.log(D);var o=D.$value>50;e.userRole=D.$value,e.userAaa=o})["catch"](function(o){console.error(o)}),a){var E=c.getUser1(a.uid);console.log(E),e.profile=E;var L=i(new Firebase(o.FIREBASE_URL).child("users").child(a.uid).child("goodreads"));L.$loaded(function(){var o=null!==L.$value;console.log(L.isActive),console.log(L),e.grData=L,L.isActive?e.grDataActive=!0:e.grDataActive=!1}),d(6833362),f(),p("to-read");var R=new Firebase(o.FIREBASE_URL+"/Books/");R.once("value",function(o){m=o.val(),e.allBooks=m});var w=new Firebase(o.FIREBASE_URL+"/oldmessages/");w.once("value",function(o){v=o.val(),e.unreadMessages=v})}else t.path("#/home").replace(),e.$apply();e.doGoodreadDialog=function(){e.reportProcessing=!1,e.reportDone=!1,e.isError=!1,g.open({plain:!1,template:"views/dialogs/dialogGoodreads.html?session=yes",scope:e,controller:["$scope","Auth","DataSource","$location","$routeParams","$http",function(e,r,s,n,i,t){e.isLooking=!0,e.grDone=!1,e.grProcessing=!1,e.isError=!1;var l=new Firebase(o.FIREBASE_URL);if(console.log(a),a){console.log("it has a current user so chould be ok to start the check if it has a goodreads connected");var c=l.child("users").child(a.uid);console.log(c)}e.doGoodreadsAction=function(){e.grProcessing=!0,e.grDone=!1;var o="http://fictionset.in/admin/login.php?provider=Goodreads",r=function(o){return e.isLooking=!1,e.hasData=!0,o.identifier?(e.grDone=!0,e.grProcessing=!1,e.hasData=!0,e.grData=o,e.hasData=!0,console.log("we have goodreads user data"),console.log(o),g(a,o),void 0):(e.isError=!0,"no data")};s.get(o,r)};var g=function(e,r){console.log("Do we have a current user..."),console.log(e.uid),console.log(r);var s="goodreads:"+r.identifier,a=a,n=!0,i=r.displayName,t=r.identifier,l=r.country,c=r.country,g=r.photoURL,u=r.profileURL,d=r.email,h=r.zip,f=new Firebase(o.FIREBASE_URL);f.child("users").child(e.uid).child("userMappings").set({goodreads:s})}}]})},e.doGoodreadLogout=function(o,r){e.grProcessing=!0,e.grDone=!1,console.log(o),console.log(r);var s="http://fictionset.in/admin/grLogout.php?provider=Goodreads&logout=true&v=2",a=function(o){return console.log(o),e.isLooking=!1,e.hasData=!0,o.success?(e.grDone=!0,e.grProcessing=!1,console.log(o.message),void 0):(e.isError=!0,e.errorMessage="Something went wrong.","no data")};u.get(s,a)},e.doExternalLink=function(){console.log("doing EXTERNAL LINK"),e.grProcessing=!0}}]);
//# sourceMappingURL=./ctrlProfile-min.js.map