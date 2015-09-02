/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MISC FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.filter('currentBooksFilter', function(){
	return function(dataArray, searchTerm){
	    if(!dataArray ){ return;}
	    /* when term is cleared, return full array*/
	    if( !searchTerm){
	    	return dataArray;
	    }else{
	    	/* otherwise filter the array */
			var term = searchTerm.toLowerCase();
			return dataArray.filter(function(item){
			return (item.title && (item.title.toString().toLowerCase().indexOf(term) > -1)) || 
				(item.author && (item.author.toString().toLowerCase().indexOf(term) > -1)) || 
				(item.isbn && (item.isbn.indexOf(term) > -1)) || 
				(item.isbn13 && (item.isbn13.indexOf(term) > -1));     //.toString().toLowerCase()
	    });
		}
	};
});


 

app.service('tags', function($q, filterFilter) {
	// EXAMPLE: 
	//  var tags = [
	//    { "text": "Tag1" },
	//    { "text": "Tag2" }
	//  ];
	this.load = function(query, tagArray) {
    	var deferred = $q.defer();
		var newTagArray = filterFilter(tagArray, query);
	  	console.log(newTagArray);
	  	deferred.resolve(newTagArray);
	  	return deferred.promise;
	};
});



 // COLLECT UNIQUE TAGS
 app.filter('uniqueTags', function() {
  return function(list) {
    var tags = {};
    angular.forEach(list, function(obj) {
      angular.forEach(obj.tags, function(value) {
        tags[value] = 1;
      });
    });
    var uniqueTags = [];
    for (var key in tags) {
    	uniqueTags.push(key);
    }
    return uniqueTags;
  };
});

 
 app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
 }]);

app.filter('to_trusted_lines', ['$sce', function($sce){
  return function(text) {
	var thetext =  String(text).replace(/<p>/gm, '###startp###');
		thetext =  thetext.replace(/<\/p>/gm, '###endp###');
		thetext =  thetext.replace(/<br>/gm, '###br###');
		thetext =  thetext.replace(/<br\/>/gm, '###br###');			
		thetext = thetext.replace(/<[^>]+>/gm, '');
		thetext =  thetext.replace(/###startp###/gm, '<p>');
		thetext =  thetext.replace(/###endp###/gm, '</p>');
		thetext =  thetext.replace(/###br###/gm, '<br>');
		thetext =  thetext.replace(/###startp###/gm, '<p>');
		thetext =  thetext.replace(/\s{2,}/g, ' '); //removes double spaces
		return $sce.trustAsHtml(thetext);
  };
}]);


 app.filter('to_lines', [ function( ){
        return function(text) {
 			var thetext =  String(text).replace(/<p>/gm, '###startp###');
			 thetext =  thetext.replace(/<\/p>/gm, '###endp###');
			 thetext =  thetext.replace(/<br>/gm, '###br###');
			 thetext =  thetext.replace(/<br\/>/gm, '###br###');			
			 thetext = thetext.replace(/<[^>]+>/gm, '');
			 
  			 thetext =  thetext.replace(/###startp###/gm, '');
			 thetext =  thetext.replace(/###endp###/gm, '\n\r\n');
			 thetext =  thetext.replace(/###br###/gm, '');
			 thetext =  thetext.replace(/\s{2,}/g, ' '); //removes double spaces
              return (thetext);
         };
 }]);


 app.filter('to_plain', function(){
 	return function(text) {
  return String(text).replace(/<[^>]+>/gm, '');
	};
 });
 

// validHTMLTags  =/^(?:a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|bgsound|big|blink|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|isindex|kbd|keygen|label|legend|li|link|listing|main|map|mark|marquee|menu|menuitem|meta|meter|nav|nobr|noframes|noscript|object|ol|optgroup|option|output|p|param|plaintext|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|spacer|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr|xmp)$/i;

//var validHTMLTags  =/^(?:i|p|br)$/i;

app.filter('to_plain_keep_some', function(){
	return function(text) {
	return String(text).replace(/<[^>]+>/gm, '');
  };
});
 

  /*
  var // This regex normalises anything between quotes
        normaliseQuotes = /=(["'])(?=[^\1]*[<>])[^\1]*\1/g,
        normaliseFn = function ($0, q, sym) { 
            return $0.replace(/</g, '&lt;').replace(/>/g, '&gt;'); 
        },
        replaceInvalid = function ($0, tag, off, text) {
            var 
                // Is it a valid tag?
				invalidTag = !validHTMLTags.test(tag),
 
                // Is the tag complete?
                isComplete = text.slice(off+1).search(/^[^<]+>/) > -1;
 		
 				console.log(invalidTag || !isComplete ? '&lt;' + tag : $0);

            return invalidTag || !isComplete ? '&lt;' + tag : $0;
        };

    text = text.replace(normaliseQuotes, normaliseFn)
             .replace(/<(\w+)/g, replaceInvalid);
             
			 return String(text);

*/

/*
function sanitize(txt) {
    var // This regex normalises anything between quotes
        normaliseQuotes = /=(["'])(?=[^\1]*[<>])[^\1]*\1/g,
        normaliseFn = function ($0, q, sym) { 
            return $0.replace(/</g, '&lt;').replace(/>/g, '&gt;'); 
        },
        replaceInvalid = function ($0, tag, off, txt) {
            var 
                // Is it a valid tag?
                invalidTag = protos && 
                    document.createElement(tag) instanceof HTMLUnknownElement
                    || !validHTMLTags.test(tag),

                // Is the tag complete?
                isComplete = txt.slice(off+1).search(/^[^<]+>/) > -1;

            return invalidTag || !isComplete ? '&lt;' + tag : $0;
        };

    txt = txt.replace(normaliseQuotes, normaliseFn)
             .replace(/<(\w+)/g, replaceInvalid);
             
			 return String(txt);
        }
*/
 



// this fucntion cutes the length of the title/text
angular.module('ng').filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) {return '';}
            max = parseInt(max, 10);
            if (!max){ return value;}
            if (value.length <= max){ return value;}

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' ?');
        };
    });



////////////////////////////////////////
/// DISTANCE FUNCTION ///
////////////////////////////////////////

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit==="K") { dist = dist * 1.609344 };
	if (unit==="N") { dist = dist * 0.8684 };
	return dist;
}              
                                                             

////////////////////////////////////////
/// GETS INDEX OF ///
////////////////////////////////////////

function arrayObjectIndexOf(arr, obj){
    for(var i = 0; i < arr.length; i++){
        if(angular.equals(arr[i], obj)){
            return i;
        }
    }
    return -1;
} 
