function gradeGetter(pointsArray, maxPointsArray){

      var totalPoint = pointsArray.reduce(add,0);
      var MaxPoint= maxPointsArray.reduce(add,0);

      function add(a,b){
        return a+b;
      }

    var grade= (totalPoint/MaxPoint)*100;

    return grade;

}

export default gradeGetter
