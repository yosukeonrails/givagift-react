
var evaluator= function( range , grade , classLength , query , times ){

    var n= range/classLength;
    //the 100% range points divided by how many classes is in the index
    // ex: range=100  classLength= 4   n= 25

  	var currentRange= n*times;

    //the range being examined ex: the first range will be 25, then 50 etc.

    if( grade <= currentRange  ){
      return query;
    }

    // if the grade percentage falls within the range, returns that query number

   return evaluator(range ,classLength, grade , query+1 , times+1);
};


export default evaluator;
