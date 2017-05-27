var itemInfo=[
    {
       array:["friend" ,"friend2", "dad" , "mom", "relative", "boyfriend" , "girlfriend"],
       x: 2
     },
     {
       array:  ["baby", "child", "teen", "young-adult", "adult","mid-age", "elder"],
       x: 4
     },
     {
       array:
      ["geek" , "introvert" , "outdoor" , "sporty" , "musician" , "cute" , "foody" , "decoration" , "fashion"],
       x:4
     },
     {
       array: ["other","male","female"],
       x: 2
     }
]




   var resultObject=  [
       ["friend","friend2"], ["young-adult", "adult","mid-age"], ["geek" , "outdoor" , "sporty",
       "introvert"], ["other","male"]
   ]





var query=[];

var item={
   queries:[]
}




function generateQuery( itemInfo , v , item ){

////   this takes each ItemInfo ,
// creates 4 or 2

          if(v === itemInfo.length ){

               return item;
          }

          var next = v+1;

           var array= create4Word([]);

              var notRepeated= equalityChecker(array);

             if(notRepeated === false ){


                 next= v;

           }

               else
          {


                    var randomO= {
                         traits:array,
                         match1:0,
                         match2:0,
                         match3:0,
                         inclusion:0,
                         randomId:item.randomId
                       }


                      item.queries.push(randomO)

                      next = v+1;

           }





         // if there are repeated words, then createWord again.

         	function checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size;
    }

           function equalityChecker(array){


                var notRepeated= checkIfArrayIsUnique(array); // will return false if is repeated


            return notRepeated

           }


        function create4Word(array){


                     for(var j=0 ; j < itemInfo[v].x ; j++){

                       var a = Math.floor(Math.random() * (itemInfo[v].array.length) );

                         array.push(itemInfo[v].array[a]);

                     }

             return array
        }


 		 generateQuery( itemInfo , next , item )

       return item;
}



var queryArray=[];

/// for each item, create a query with 4 words depandant on the array//
for( var i=0 ; i <1000 ; i++){

var randomC= Math.floor((Math.random()*1000000)+1);
var randomN=Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
var randomId= randomC+randomN

  queryArray.push(generateQuery(itemInfo , 0 , { queries:[], randomId:randomId }  ))

}


// create an array of those items ///


function queryGenerator(infoArray, x, query ){



for( var i = 0 ; i < 100; i ++ ){

       var array=[];

           for(var j=0 ; j < x; j++) {

              var a = Math.floor(Math.random() * (infoArray[v].array.length) );

              array.push(infoArray[v].array[a]);

           }


           var randomO= {
               traits:array,
               match1:0,
               match2:0,
               match3:0,
               inclusion:0
           }

            query.push(randomO);
      }

 return query;
}


////////////////////////////////////////////////////////////////////////////





var special={
traits:["musician","geek","decoration","cute"],
match1:0,
match2:0,
match3:0,
inclusion:0
}
// query.push(special)


var special2={
traits:["geek","musician","foody","cute"],
match1:0,
match2:0,
match3:0,
inclusion:0
}
//query.push(special2)




// var result= ["geek" , "musician" , "fashion" ,"decoration"];
//var result=["female", "other"];
// var result=["child", "teen", "young-adult"];
var result=["friend" , "dad" , "mom", "relative"];


/////////////////////////



  function queryFormator(queryArray , c ){

       queryArray.map(function(q){

            toBeFiltered.push( q.queries[c])

       })
      }




	var toBeFiltered=[];
   var importance=1
    queryFormator(queryArray , 0);
    bigFilter(resultObject[0] , toBeFiltered);

    toBeFiltered=[];
     importance=1
    queryFormator(queryArray , 1);
    bigFilter(resultObject[1] , toBeFiltered);

      toBeFiltered=[];
       importance=2
    queryFormator(queryArray , 2);
    bigFilter(resultObject[2] , toBeFiltered);

      toBeFiltered=[];
       importance=1
    queryFormator(queryArray , 3);
    bigFilter(resultObject[3] , toBeFiltered);


function bigFilter(result, query){


  var notSelectedArray=[];

   function findBySection(result, v , query , notSelectedArray ){

             if( v == result.length){


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

                  var matchPoint= Math.abs(-4 + v ) + query[i].match1;

                 query[i].match1 = matchPoint * importance ;

                 selectedArray.unshift(query[i])

               }

               else {
                 notSelectedArray.unshift(query[i])
               }

               findById(result, i+1 , v , query    ,selectedArray, notSelectedArray)
             };

             var selectedArray=[];


             findById(result, 0 , v , query, selectedArray , notSelectedArray);


             findBySection(result , v+1 , selectedArray, notSelectedArray );

             return notSelectedArray

           }


           var matchedArray= findBySection(result, 0 , query, [] , notSelectedArray);

////////// FIND BY INCLUSION ////////

          function findByInclusion( matchedArray , result ,  i  ){

               if(matchedArray.length === i ){
               return matchedArray;
               }

              function checkEquality( matchedArray , result, v ){

                                 if(result.length=== v){
                                    return matchedArray
                                 }

                                 if( matchedArray[i].match2 && matchedArray[i].match3 ){

                                 }


                                var repeatedCount=0;

                                 matchedArray[i].traits.map(function(trait){

                                  // for each trait inside query
                                 // check if its === to current V


                                     if(trait== result[v]){

                                         repeatedCount++

                                         if(repeatedCount==2){

                                              matchedArray.splice(i,1);
                                            repeatedCount=0;
                                         }
                                     }

                                       if(trait === result[v]){

                             var matchPoint= Math.abs(-4 + v ) + matchedArray[i].inclusion;
                                           matchedArray[i].inclusion = matchPoint * importance ;
                                       }

                                 })

               checkEquality(matchedArray , result , v+1)
                 }




              checkEquality(matchedArray , result, 0);


            findByInclusion( matchedArray , result ,  i+1 );

         return matchedArray;


          }


   var inclusionArray= findByInclusion( matchedArray , result ,  0);



 /////////////////////   SECOND MATCH /////////////////////////

 function  findBySecondMatch( matchedArray, result){

        matchedArray.map(function(query){

                         if(query.traits[1]  !== query.traits[0]){

                                             if(query.traits[1] === result[0]){
                                                 // if the second trait is same with first
                                                   query.match2=query.match2+5 * importance



                                            }

                                            if(query.traits[0]=== result[1]){
                                            // if the first trait is the same as the result second
                                                  query.match2=query.match2+5 * importance

                                            }


                                             if(query.traits[0] === result[0]){
                                                 // if the second trait is same with first
                                                 query.match2=query.match2+5 * importance


                                            }

                                            if(query.traits[1]=== result[1]){
                                            // if the first trait is the same as the result second
                                                query.match3=query.match3+5 * importance

                                            }

                         }


        })

       return matchedArray;
 }


 var secondMatchedArray= findBySecondMatch( inclusionArray ,result);



     secondMatchedArray.map(function(query){

           if(query.match2 > 0){

                     if(query.match3 > 0){

                     }

           }
     })


 var biggestCorrelation={
     correlation:0
 }

           /////////// Collect Correlation Points ///////// .
           function findCorrelationPoint(secondMatchedArray, result){

                    secondMatchedArray.map(function(query){

                       var correlationPoint=  query.match1 + query.match2 + query.match3 + query.inclusion
                         query.correlation= correlationPoint

                            if(biggestCorrelation.correlation <= query.correlation){
                                biggestCorrelation= query;
                            }

                    })

           }


           findCorrelationPoint(secondMatchedArray, result);



  /////// sort By correlation //////



              function sortByCorrelation(secondMatchedArray , result , v, sortedArray){

                       if(v === biggestCorrelation.correlation+1){


                          return sortedArray
                       }

                     secondMatchedArray.map(function(query){
                         if(query.correlation === v ){
                             sortedArray.unshift(query);
                         }
                     })


                     sortByCorrelation(secondMatchedArray , result , v+1 , sortedArray)
                     return sortedArray;
              }



            var sortedCorrelationArray=  sortByCorrelation(secondMatchedArray , result , 0, [] );



            return sortedCorrelationArray;

}

/////////////////// match correlated array with original array /////

  function correlationSorter(queryArray){



          	var biggest=0;

               queryArray.map(function(query){

                    var correlationArray=[];

                        for(var i=0; i < query.queries.length ; i++){

                           correlationArray.push(  query.queries[i].correlation )

                        }

                    var sum = correlationArray.reduce(add, 0);

                        function add(a, b) {
                            return a + b;
                        }

                     query.correlation= sum;

                     if(query.correlation > biggest){
                           biggest = query.correlation;
                     }
               })





            sortedQueryArray=[];

               for(var i=0 ; i < biggest+1 ; i++){

                  queryArray.map(function(query){

                       if(query.correlation == i ){
                       		  sortedQueryArray.push(query);
                       }

                  })

               }


       return sortedQueryArray;

  }
