


var grade= 52

var Classes=['indoors', 'outdoors', 'fashion', 'intellectual']

var classRange=100

function Dog( range , grade , classLength  ){

var N=(range/classLength)

var IndexToArray=[];
var IndexFromArray=[];

for(var i=0 ; i< classLength ; i++ ){

   var IndexTo= N*(i+1);

   var IndexFrom= IndexTo-N;

   IndexToArray.push(IndexTo);

   IndexFromArray.push(IndexFrom);
}

console.log(IndexToArray);
console.log(IndexFromArray);


for(var i=0 ; i< classLength ; i++ ){

   if ( grade <= IndexToArray[i] ){

       console.log(IndexToArray[i]);

       var classIndex= i;
       var IndexRange= IndexToArray[i];
       var indexObject= {
            classIndex:classIndex,
            range:IndexRange
       };

       break
   }
}

	return indexObject
}


   var ClassN= Dog(classRange,grade,4);
     var SubClass= Dog( ClassN.range , grade,6 );
        var Item= Dog ( SubClass.range , grade ,30);

     console.log(ClassN);
     console.log(SubClass);
     console.log(Item);
