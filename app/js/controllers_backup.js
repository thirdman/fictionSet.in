app.controller("ManagePlacesCtrl", ["$scope", "Profile", 
  function($scope, Profile, currentUser) {
   var ref = new Firebase('https://sweltering-fire-3219.firebaseio.com/');

 var placelist =[
{
       "displayName" : "Canada",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },


  {
       "displayName" : "Paris",
		"geonameId": "2988507",
      "gps" : {
		"lng": "2.3488",
		"lat": "48.85341"
		},
 		 
  },
    
  {
       "displayName" : "France",
	  "geonameId": "3017382",
      "gps" : {
		"lng": "2",
		"lat": "46"
      }
   },
    
      {
       "displayName" : "Japan",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },
    
      {
       "displayName" : "India",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
      {
       "displayName" : "London",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
            {
       "displayName" : "England",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
            {
       "displayName" : "United Kingdom",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
            {
       "displayName" : "United States",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
        
  
              {
       "displayName" : "South Carolina",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
                  {
       "displayName" : "Guernsey",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },
      
                  {
       "displayName" : "England",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
                  {
       "displayName" : "South Africa",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
                  {
       "displayName" : "Spain",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
{
       "displayName" : "Barcelona",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },

{
       "displayName" : "Afghanistan",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },

{
       "displayName" : "Kabul",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },

{
       "displayName" : "Herat",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },

{
       "displayName" : "Terrell County",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },

{
       "displayName" : "Texas",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },

{
       "displayName" : "Tuscany",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },
      


{
       "displayName" : "Italy",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
      
{
       "displayName" : "Kyoto",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
      
{
       "displayName" : "Amsterdam",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
      
{
       "displayName" : "Netherlands",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
      
      
{
       "displayName" : "New York",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },
      
      
{
       "displayName" : "Las Vegas",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },
      
      
{
       "displayName" : "Nevada",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },
        

{
       "displayName" : "Pamplona",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },
        
        {
       "displayName" : "Jamaica",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },
        
        {
       "displayName" : "San Sebastian",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
        
        {
       "displayName" : "Provence",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
          
{
       "displayName" : "Thailand",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
        
         
        {
       "displayName" : "Kingston",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
        
        {
       "displayName" : "Honduras",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
        
        {
       "displayName" : "Berlin",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
        
        {
       "displayName" : "New Zealand",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
       
               {
       "displayName" : "West Coast",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
       
               {
       "displayName" : "Czech Republic",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
       
               {
       "displayName" : "Prague",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },
       
               {
       "displayName" : "Hokitika",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
     }
  },
                                                        
        {
       "displayName" : "Dunedin",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
       
               {
       "displayName" : "Crete",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
       
               {
       "displayName" : "Moosonee",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
       
               {
       "displayName" : "Moose Factory",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },
       
       
               {
       "displayName" : "Ontario",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   },

       
               {
       "displayName" : "Rome",
      "gps" : {
        "lat" : "-34.34",
        "lng" : "12.23"
      }
   } 
 
];
 
  console.log(placelist);
 $scope.placelist = placelist;
 
		 var postsRef = ref.child("places");
		 var log = [];
		 angular.forEach(placelist, function(value,key) {
 			 console.log(value);
 			 postsRef.push(value);

			// console.log(key);

       this.push(key + ': ' + value);
     }, log);
      
/*
		  postsRef.push({
		    author: "gracehop",
		    title: "Announcing COBOL, a New Programming Language"
		  });
*/
		 
		  
  
 
  }
]);
