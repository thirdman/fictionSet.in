"use strict";app.controller("CollectionsCtrl",["fsConfig","$scope","currentUser","$firebaseArray","$routeParams","$location","DataSource","Profile","filterFilter","ngDialog",function(a,o,r,e,i,t,n,l,s,c){var f;o.isLoading=!0,o.hasData=!1;var u=new Firebase(a.FIREBASE_URL+"/collections/");f=e(u),f.$loaded().then(function(){o.hasData=!0,o.isLoading=!1,o.arrCollections=f})}]);
//# sourceMappingURL=./appLoad-min.js.map