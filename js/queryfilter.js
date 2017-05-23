
var query=[];

 for( var i = 0 ; i < 100 ; i ++ ){

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

  var diamond={ traits:[5,5,5,5] }

      query.push(diamond);

  var result= [5 ,5 , 5, 5];

	var notSelectedArray=[];


 function findBySection(result, v , query , notSelectedArray ){

	console.log('starting oveeeer')
  console.log(query)

         if( v == result.length){
             console.log('here is epic query')
             console.log(query)

             query.map(function(chosen){
                  notSelectedArray.unshift(chosen);
             })

              return notSelectedArray
            }



                 function findById(result , i , v , query, selectedArray ,notSelectedArray){

                          if( i == query.length ){

                          return
                          }

                       if(result[v] == query[i].traits[v]){

                          selectedArray.unshift(query[i])

                       }  else {
                            notSelectedArray.unshift(query[i])
                       }

                       findById(result, i+1 , v , query    ,selectedArray, notSelectedArray)
                    };

    var selectedArray=[];


   findById(result, 0 , v , query, selectedArray , notSelectedArray);


 	 findBySection(result , v+1 , selectedArray, notSelectedArray );

   return notSelectedArray

  }


var theArray= findBySection(result, 0 , query, [] , notSelectedArray);

 console.log('at the end.')
 console.log(notSelectedArray)
 console.log(theArray)
