app.controller("AddBookResponseCtrl",["fsConfig","$scope","Auth","currentUser","$firebaseObject","$location","$routeParams","FsGet",function(e,o,s,l,a,d,n,c){function i(o,s){if(b){var l=new Firebase(e.FIREBASE_URL+"/badges/").child(s),a=new Firebase(e.FIREBASE_URL+"/users/").child(o);console.log(a),console.log(l),l.once("value",function(e){var o=e.val();a.child("badges").child(s).push(o)})}}var r=!1;r=e.DEV_STATUS,o.isLoading=!0,o.hasData=!1,o.currentUser=l,console.log(n);var t=n.type,g=n.id,h=!1,u=!1;o.showNewBadge=u;var f=n.badgetype,b=s.$getAuth(),v,p;o.authData=b;var A=new Firebase(e.FIREBASE_URL);if(b){var B=c.getUser1(b.uid);B.$loaded().then(function(e){console.log(e),o.isLoading=!1,o.refProfile=B,o.profile=e,o.userName=e.userName,f&&(h=!0),o.hasBadge=h,r===!1?("bookSuccess"===t||"success"===t)&&(v=a(A.child("Books").child(g)),console.log("the item added is: "),v.$loaded().then(function(){o.refItem=v,console.log(v);var e=a(A.child(b.uid).child("badges")),s=a(A.child(b.uid).child("badges").child(f));console.log(e),s.$loaded().then(function(s){null!==s.$value?(console.log("has badge"),u=!1,p=!0):(console.log("does not have badge"),console.log(e),u=!0,p=!1,i(b.uid,f),u=!0,o.showNewBadge=!0)})})):console.log("DEV_STATUS")})}}]);
//# sourceMappingURL=./ctrlAddBookResponse-min.js.map