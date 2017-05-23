var query=[];

 for( var i = 0 ; i < 1000 ; i ++ ){

 	var array=[];


  for(var j=0 ; j < 4 ; j++) {

   	 var a = Math.floor(Math.random() * 7) + 1 ;
   	 array.push(a)

  }

  var randomO= {
  		traits:array
  }

   query.push(randomO);
 }
