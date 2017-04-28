var S=10; // what number it starts
var F=6; // how many answers in that question
var N=100; // how many points is that question worth


function  getAnswerPoints(S, F, N){

  var increment= [N-(S*F)] / [ [(F-1)*(F-1+1)]/2 ];

  var array=[S];


  for(var i=1; i< F ; i++){
     array.push(S+increment*[i]);
  }

  var sum = Math.round(array.reduce(add, 0));

  function add (a, b) {
      return a + b;
  }

  return array;
}


export default getAnswerPoints
