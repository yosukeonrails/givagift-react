




                var itemInfo=[
                    {
                       array:["friend" ,"dad" , "mom", "relative", "boyfriend" , "girlfriend"],
                       x: 1
                     },
                     {
                       array:  ["baby", "kids", "preteen", "teen" , "young-adult", "adult", "elder"],
                       x: 3
                     },
                     {
                       array:
                      ["Geek" , "Introvert" , "Outdoor" , "Sporty" , "Musician" , "Cute" , "Foody" , "Decoration" , "Fashion"],
                       x:4
                     },
                     {
                       array: ["other","male","female"],
                       x: 2
                     }
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



   function queryGenerator(){

       var queryArray=[];

             /// for each item, create a query with 4 words depandant on the array//
             for( var i=0 ; i <1000 ; i++){

             var randomC= Math.floor((Math.random()*1000000)+1);
             var randomN=Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
             var randomId= randomC+randomN

               queryArray.push(generateQuery(itemInfo , 0 , { queries:[], randomId:randomId }  ))

             }

       return queryArray;
   }








  export default queryGenerator;
