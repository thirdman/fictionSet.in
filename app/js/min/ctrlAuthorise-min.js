app.controller("AuthoriseCtrl",["fsConfig","$scope","Profile","Auth","currentUser","$firebaseArray","$firebaseObject","$location","$routeParams","FsGet","ngDialog","DataSource","$timeout",function(e,o,r,s,i,a,t,n,g,c,l,d,u){"use strict";function p(){console.log("doing GETDATA");var e="http://fictionset.in/admin/grGetUser.php?provider=Goodreads",r=function(e){return o.isLooking=!1,o.hasData=!0,o.grProcessing=!1,o.grGettingData=!1,o.grGettingUser=!0,e.identifier?(o.grDone=!0,o.grProcessing=!1,o.hasData=!0,o.grData=e,o.hasData=!0,o.grGettingUser=!1,console.log("we have goodreads user data"),console.log(e),f(i,e),void 0):(o.isError=!0,"no data")};d.get(e,r)}function f(r,s){o.grGettingUser=!1,o.grGettingData=!0,console.log("doing SAVEDATA"),console.log("Do we have a current user..."),console.log(i.uid),console.log(s);var a="goodreads:"+s.identifier,t="goodreads",n=!0,g=s.displayName,c=s.identifier,l=s.address;s.address||(l="");var d=s.city;s.city||(d="");var u=s.country;s.country||(u="");var p=s.photoURL,f=s.profileURL,v=s.email,D=s.zip;s.zip||(D="");var A=new Firebase(e.FIREBASE_URL);A.child("users").child(i.uid).child("userMappings").set({goodreads:a}),A.child("users").child(i.uid).child("goodreads").set({isActive:n,provider:t,provider_id:c,displayName:g,provider_email:v,picture_url:p,profile_url:f,provider_address:l,provider_city:d,provider_country:u,provider_zip:D}),o.grProcessing=!1,o.grGettingUser=!1,o.grGettingData=!1,h()}function h(e,r){console.log("doing gotorpofile"),o.grDone=!0,u(function(){n.path("/profile")})}o.aaa=!1,o.actionMessage="",console.log(g),o.grProcessing=!0,o.grGettingUser=!1,o.grGettingData=!1,o.grDone=!1;var v=new Firebase(e.FIREBASE_URL),D=g.provider,A=g.success,G=g.action,R=g.session;console.log(D),console.log(A),console.log(G),console.log(R),o.oauthSession=R,1===R&&(R="true",o.oauthSession="true"),o.auth=s;var U=s.$getAuth();o.authData=U;var b=c.getRole(U.uid);if(b.$loaded().then(function(){console.log(b);var e=b.$value>50;o.userRole=b.$value,o.userAaa=e,console.log("$scope.userRole is "+o.userRole),console.log("$scope.userAaa is "+o.userAaa)})["catch"](function(e){console.error(e)}),i){if("Goodreads"===D&&"true"===A)if(o.grProcessing=!1,G)switch(o.todo="Do something",G){case"getuser":console.log("go get user"),o.actionMessage="Getting user...",p();break;case"updateuser":console.log("go update the user"),o.actionMessage="updating  user...",f();break;case"gotoprofile":console.log("Go back to profile"),o.actionMessage="going back to profile",h();break;default:console.log("no action set"),o.actionMessage="default"}else o.todo="no action specified"}else n.path("#/home").replace(),o.$apply();o.doExternalLink=function(){console.log("doing EXTERNAL LINK"),o.grProcessing=!0}}]);
//# sourceMappingURL=./ctrlAuthorise-min.js.map