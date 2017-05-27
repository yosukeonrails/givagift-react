
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





          var sortedQueryArray=[];

               for(var i=0 ; i < biggest+1 ; i++){

                  queryArray.map(function(query){

                       if(query.correlation == i ){
                       		  sortedQueryArray.push(query);
                       }

                  })

               }


       return sortedQueryArray;

  }


  export default correlationSorter;
