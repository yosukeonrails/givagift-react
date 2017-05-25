
   var itemInfo={
      relationship:["friend" , "dad" , "mom", "relative", "boyfriend" , "girlfriend"],
      age:["baby", "child", "teen", "youg-adult", "adult","mid-age", "elder"],
      personality:["geek" , "introvert" , "outdoor" , "sporty" , "musician" , "cute" , "foody" , "decoration" , "fashion"],
      gender:["male" , "male-other", "female", "female-other" , "other"]
   }

var query=[];


  function queryGenerator(infoArray, x ){

        for( var i = 0 ; i < 100; i ++ ){

                var array=[];

                    for(var j=0 ; j < x ; j++) {

                       var a = Math.floor(Math.random() * (infoArray.length-1) );

                       array.push(infoArray[a]);
                    }

                    var randomO= {
                        traits:array,
                        match:0,
                        inclusion:0
                    }

                     query.push(randomO);
               }
  }







//////////////////////////////////////



	queryGenerator(itemInfo.age , 2);


  //var result= ["geek" , "musician" , "foody" ,"cute"];
 // var result=["male", "male-other"];
  var result=["baby", "child"];
  //var result=["friend" , "dad" , "mom", "relative"];


/////////////////////////


 var matchedArray= bigFilter(result, query);

     function bigFilter(result, query){
     	console.log('query before')
     		console.log(query)

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
                          query[i].match++
                          query[i].inclusion++
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


                    var inOrderArray= findBySection(result, 0 , query, [] , notSelectedArray);


                    var matchedArray=[];
                    var inclusionArray=[];



                    function arrayDivider(inOrderArray ){

                      inOrderArray.map(function(query){

                        if(query.match >= 2){
                          matchedArray.push(query)

                        } else {
                          query.inclusion= 0;
                          inclusionArray.push(query)

                        }

                      })
                    }

                    arrayDivider(inOrderArray);
											console.log('after array divider')
 								       console.log(matchedArray);

                    function filterInclusionArray(inclusionArray , v  , result){

                      if(v===result.length){
                        return inclusionArray
                      }

                      inclusionArray.map(function(query , queryIndex){

                        var traits= query.traits;

                        traits.map(function(trait){
                          if(trait === result[v]){

                            query.inclusion++

                          }
                        })

                      })

                      filterInclusionArray(inclusionArray, v+1 , result);

                    }


                    filterInclusionArray(inclusionArray, 1 , result)

                    var filteredArray=[];

                    function filterByInclusionLevel(inclusionArray , result , v , filteredArray ){

                      if(v == result.length){

                        return  filteredArray;
                      }

                      var unfilteredArray=[];

                      inclusionArray.map(function(query, queryIndex){

                        if(query.inclusion === v ){

                          filteredArray.unshift(query);

                        } else {

                          unfilteredArray.unshift(query);

                        }
                      })

                      filterByInclusionLevel(unfilteredArray , result , v+1 , filteredArray)
                    }


                    filterByInclusionLevel(inclusionArray , result , 1 ,filteredArray );

                    var arrayFilteredByInclusion=[];

                    inclusionArray= filteredArray;


                    inclusionArray.map(function(query){

                      matchedArray.push(query);
                    })

                  return matchedArray;

     }
