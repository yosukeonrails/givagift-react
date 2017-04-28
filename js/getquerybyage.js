var getQueryByAge= function(range , age ,  query , times ){

			if(age > 60){
      		age = 60;
      }

     var N= range/3;
     var currentRange=N*times;
        console.log(N);

  		if(age <= currentRange){
         console.log('query ' , query);
         return query;
      }

      return getQueryByAge(60, age , query+1 , times+1 );

};



export default getQueryByAge;
