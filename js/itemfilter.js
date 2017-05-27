
function bigFilter(result, query , importance){


  var notSelectedArray=[];

   function findBySection(result, v , query , notSelectedArray ){
        console.log(result);
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


export default bigFilter;
