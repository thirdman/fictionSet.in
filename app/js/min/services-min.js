!function(){"use strict";function o(o){var e=Array.prototype.slice.call(arguments,1);return e.forEach(function(e){if(e&&"object"==typeof e)for(var t in e)e.hasOwnProperty(t)&&(o[t]=e[t])}),o}angular.module("myApp.services",["firebase","ngRoute"]).factory("FsAdmin",["$rootScope","$location",function(o,e){return{bookView:function(o,e){}}}]).service("FsGet",["fsConfig","$http","$firebase",function(o,e,t){var a=new Firebase(o.FIREBASE_URL);return{getBook:function(o){var e,t=a.child("Books").child(o);return t},getUser:function(o){var e=a.child("users").child(o);return e},getSuggested:function(o){var e=a.child("nominated/Books").child(o);return e},getMessage:function(o){var e=a.child("system/usermessages").child(o);return e},getBook1:function(o){var e=t(a.child("Books").child(o)).$asObject();return e},getUser1:function(o){var e=t(a.child("users").child(o)).$asObject();return e}}}]).service("FsNotifyWithId",["fsConfig","$http","$firebase","FsNotify","FsGet",function(o,e,t,a,n){var s=new Firebase(o.FIREBASE_URL);return{bookAdded:function(o,e){var t,s;n.getBook(e).on("value",function(l){s=l.val(),n.getUser(o).on("value",function(n){t=n.val(),t.$id=o,s.$id=e,a.bookAdded(t,s)})})},bookSuggested:function(o,e){var t,s;n.getSuggested(e).on("value",function(l){s=l.val(),console.log(l.val()),n.getUser(o).on("value",function(n){console.log(n.val()),t=n.val(),t.$id=o,s.$id=e,a.bookSuggested(t,s)})})},systemMessage:function(o,e){var t,s;n.getUser(o).on("value",function(l){t=l.val(),console.log(t),n.getMessage(e).on("value",function(n){s=n.val(),console.log(s),console.log(t),t.$id=o,s.$id=e,a.systemMessage(t,s)})})}}}]).service("FsNotify",["fsConfig","$http","$firebase","filterFilter","FsGet",function(o,e,t,a,n){var s=new Firebase(o.FIREBASE_URL),l=t(s.child("places")).$asArray(),i=t(s.child("users")).$asArray(),r=t(s.child("Books")).$asArray(),c=t(s.child("collections")).$asArray(),d=s.child("messages"),u=s.child("/system/adminmessages");return{bookAdded:function(o,e,t){var n=!1;t="undefined"!=typeof t?t:!1;var s=(new Date).valueOf(),l="bookAdded",r="New Book Added",c=e.title+" was added.",g=o.$id;return u.push({messageType:l,title:"A Book was added",messageContent:"'"+e.title+"' was added by "+o.displayName,messageLink:"http://fictionset.in/#/book/"+e.$id,activatorName:o.displayName,activatorId:o.$id,timestamp:s}),i.$loaded().then(function(){var t="";angular.forEach(e.places,function(n){var r=!1,c=!1;console.log("thePlace is:"+n.name);var u=n.geonameId,g=parseFloat(n.countryId);if(console.log(parseFloat(n.geonameId)),console.log(parseFloat(n.countryId)),u==g&&(r=!0,console.log("IT IS A COUNTRY")),console.log("sentcountryid:"+t),console.log("placecountry id:"+parseFloat(n.countryId)),t!=parseFloat(n.countryId)){var m=a(i,{following:g});console.log(m),m.length||console.log("NO ONE IS FOLLOWING "+n.name),angular.forEach(m,function(t){if(t.following[parseFloat(n.countryId)])var a=t.following[parseFloat(n.countryId)].countryId;if(console.log(a),a==parseFloat(n.countryId)){console.log("yep, ets do this"),console.log("notifying a country");var i=t.$id;d.child(i).push({userId:i,messageType:l,title:"New Book Added",messageContent:e.title+" was added, set in "+n.name,messageLink:"http://fictionset.in/#/book/"+e.$id,activatorName:o.displayName,activatorId:o.$id,bookId:e.$id,bookTitle:e.title,coverurl:e.coverurl,locationId:n.geonameId,locationName:n.name,countryId:parseFloat(n.countryId),countryName:n.countryName,followsId:parseFloat(n.countryId),followsName:n.countryName,timestamp:s},function(o){o?(console.log("error: "),console.log(o)):console.log("notified.")})}}),t=parseFloat(n.countryId),c=!0}if(!r){var f=a(i,{following:u});console.log(f),f.length||console.log("NO ONE IS FOLLOWING "+n.name),angular.forEach(f,function(t){console.log(t);var a=t.$id;d.child(a).push({userId:a,messageType:l,title:"New Book Added",messageContent:e.title+" was added, set in "+n.name,messageLink:"http://fictionset.in/#/book/"+e.$id,activatorName:o.displayName,activatorId:o.$id,bookId:e.$id,bookTitle:e.title,coverurl:e.coverurl,locationId:n.geonameId,locationName:n.name,countryId:parseFloat(n.countryId),countryName:n.countryName,followsId:parseFloat(n.geonameId),followsName:n.name,timestamp:s},function(o){o?(console.log("error: "),console.log(o)):console.log("notified.")})})}})}),"Book added: Admin and users notified"},bookSuggested:function(o,e){var t=(new Date).valueOf(),n="bookSuggested",s="New Book Suggested",l=e.title+" was suggested.";return u.push({messageType:n,title:"A Book was suggested",messageContent:"'"+e.title+"' was suggested by "+o.displayName,messageLink:"http://fictionset.in/#/requests/",activatorName:o.displayName,activatorId:o.$id,timestamp:t}),i.$loaded().then(function(){var s="";angular.forEach(e.places,function(l){var r=!1,c=!1;console.log("thePlace is:"+l.name);var u=l.geonameId,g=parseFloat(l.countryId);if(console.log(parseFloat(l.geonameId)),console.log(parseFloat(l.countryId)),u==g&&(r=!0,console.log("IT IS A COUNTRY")),console.log("sentcountryid:"+s),console.log("placecountry id:"+parseFloat(l.countryId)),s!=parseFloat(l.countryId)){var m=a(i,{following:g});console.log(m),m.length||console.log("NO ONE IS FOLLOWING "+l.name),angular.forEach(m,function(a){if(a.following[parseFloat(l.countryId)])var s=a.following[parseFloat(l.countryId)].countryId;if(console.log(s),s==parseFloat(l.countryId)){console.log("yep, ets do this"),console.log("notifying a country");var i=a.$id;d.child(i).push({userId:i,messageType:n,title:"New Book Suggested",messageContent:e.title+" was suggested, set in "+l.name,messageLink:"http://fictionset.in/#/requests/",activatorName:o.displayName,activatorId:o.$id,bookId:e.$id,bookTitle:e.title,coverurl:e.coverurl,locationId:l.geonameId,locationName:l.name,countryId:parseFloat(l.countryId),countryName:l.countryName,followsId:parseFloat(l.countryId),followsName:l.countryName,timestamp:t},function(o){o?(console.log("error: "),console.log(o)):console.log("notified.")})}}),s=parseFloat(l.countryId),c=!0}if(!r){var f=a(i,{following:u});console.log(f),f.length||console.log("NO ONE IS FOLLOWING "+l.name),angular.forEach(f,function(a){console.log(a);var s=a.$id;d.child(s).push({userId:s,messageType:n,title:"New Book Suggested",messageContent:e.title+" was suggested, set in "+l.name,messageLink:"http://fictionset.in/#/requests/",activatorName:o.displayName,activatorId:o.$id,bookId:e.$id,bookTitle:e.title,coverurl:e.coverurl,locationId:l.geonameId,locationName:l.name,countryId:parseFloat(l.countryId),countryName:l.countryName,followsId:parseFloat(l.geonameId),followsName:l.name,timestamp:t},function(o){o?(console.log("error: "),console.log(o)):console.log("notified.")})})}})}),"Book added: Admin and users notified"},systemMessage:function(o,e){var t=(new Date).valueOf(),a="system";return i.$loaded().then(function(){angular.forEach(i,function(o){var n=o.$id;d.child(n).push({userId:n,messageType:a,title:e.title,messageContent:e.messageContent,messageLink:e.messageLink,activatorName:e.authorName,activatorId:e.authorId,timestamp:t},function(o){o?(console.log("error: "),console.log(o)):console.log("notified.")})})}),"System Message Added"}}}])}();