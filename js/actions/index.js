
import { push } from 'react-router-redux';

require('isomorphic-fetch');

export var INITIALIZE_RESULTS= 'INITIALIZE_RESULTS';

 export var intializeResults= function(resultsArray){

        return {
          type:INITIALIZE_RESULTS,
          resultsArray:resultsArray
        };

 };


export var CHANGE_MODE = 'CHANGE_MODE';

 export var changeMode= function(mode){
    return {
       type:CHANGE_MODE,
       mode:mode
    }
 }

 export var ADD_BUBBLE = 'ADD_BUBBLE';

  export var addBubble= function(newBubbleArray){

    console.log(newBubbleArray);
     return {
        type:ADD_BUBBLE,
        newBubbleArray:newBubbleArray
     }
  }







  export var SAVE_CHOSEN_BUBBLE = 'SAVE_CHOSEN_BUBBLE';

   export var saveChosenBubble= function(chosenBubbleArray){


      return {
         type:SAVE_CHOSEN_BUBBLE,
         chosenBubbleArray:chosenBubbleArray
      }
   }



   export var CHANGE_REDIRECT = 'CHANGE_REDIRECT';

    export var changeRedirect= function(query){
       return {
          type:CHANGE_REDIRECT,
          redirectQuery:query
       }
    }




 export var BUBBLE_COUNT = 'BUBBLE_COUNT';

  export var bubbleCount= function(countData){
     return {
        type:BUBBLE_COUNT,
        countData:countData
     }
  }


 export var ARROW_LEFT= 'ARROW_LEFT';

  export var ArrowLeft= function(id){

         return {
           type:ARROW_LEFT,
           id:id
         };
  };



  export var LAYOUT_STATE= 'LAYOUT_STATE';

   export var layOutState= function(layOut){

          return {
            type:LAYOUT_STATE,
            layOutState:layOut
          };

   };



   export var ARROW_RIGHT= 'ARROW_RIGHT';

    export var ArrowRight= function(id){

           return {
             type:ARROW_RIGHT,
             id:id
           };

    };

    export var NEXT_QUESTION= 'NEXT_QUESTION';

     export var NextQuestion= function(currentQuestionIndex){

            return {
              type:NEXT_QUESTION,
               currentQuestionIndex:currentQuestionIndex
            };

     };

     export var ZERO_QUESTION= '  ZERO_QUESTION';

      export var ZeroQuestion= function(index){

             return {
               type:ZERO_QUESTION,
               index:index
             };

      };



 export var LOG_IN='LOG_IN';

 export function LogInUser(data) {

   var fetchData={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({

         username:data.username,
         password:data.password

      })
   };

   return {
    type: LOG_IN,

    promise: fetch('/login', fetchData).then(function(data){


       return data.json();

      })
  };
}


 export var SIGN_UP_USER='SIGN_UP_USER';


export function SignUpUser(data) {

var fetchData={
method:'POST',
headers:{
 'Content-Type':'application/json'
},
body:JSON.stringify({

  first_name:data.firstName,
  last_name:data.lastName,
  username:data.email,
  facebookId:data.facebookId,
  password:data.password
})
};

return {
type: SIGN_UP_USER,
promise: fetch('/user', fetchData).then(function(data){


return data.json();

})
};
}

export var CALL_AMAZON_CALLS= 'CALL_AMAZON_CALLS'

export function CallAmazonCalls(callArray){

      return {
        type:CALL_AMAZON_CALLS,
        callArray:callArray
      };

}

export var CALL_AMAZON='CALL_AMAZON'

export function CallAmazon(query){



     var url='/amazon/'+query;
     return {
       type:CALL_AMAZON,
       promise: fetch(url).then(function(data){

         return data.json();

       })
     };
}


export var SET_CURRENT_QUERY='SET_CURRENT_QUERY'

export function setCurrentQuery(query){

        return {
           type:SET_CURRENT_QUERY,
           currentQuery:query
        };
}


export var SET_ANSWER_POINTS='SET_ANSWER_POINTS'

export function setAnswerPoints(answerPoints){

        return {
           type:SET_ANSWER_POINTS,
           answerPoints:answerPoints
        };
}

export var SELECT_ANSWER='SELECT_ANSWER'

export function selectAnswer(answerInfo){

        return {
           type:SELECT_ANSWER,
          selectedAnswerInfo:answerInfo
        };
}

export var SUBMIT_ANSWER_POINT='SUBMIT_ANSWER_POINT'

export function SubmitAnswerPoints(SubmittedAnswerPoint){

        return {
           type:SUBMIT_ANSWER_POINT,
           SubmittedAnswerPoint:SubmittedAnswerPoint
        };
}

export var GET_MAX='GET_MAX'

export function GetMax(maxpoint){

  return {
       type:GET_MAX,
       maxpoint:maxpoint
  };
}




export var LOG_MOCK_USER= 'LOG_MOCK_USER'

export var logMockUser= function(facebookId){

  return{
    type:LOG_MOCK_USER,
    promise: fetch('/mockuser/'+facebookId).then(function(data){


           return data.json();
    })

  };

};



export var SET_QUERY='SET_QUERY'

export function SetQuery(queries){


  return {
       type:SET_QUERY,
       queries:queries
  };

}


 export var SAVE_LIST_INFO= 'SAVE_LIST_INFO';

  export var saveListInfo= function(listInfo){

         return {
           type:SAVE_LIST_INFO,
           listInfo:listInfo
         };
  };



export var GET_FACEBOOK_USER= 'GET_FACEBOOK_USER'

export function getFacebookUser(){

  return{
  type:GET_FACEBOOK_USER,
  promise: fetch('/user',
  {
method: 'GET',
credentials: 'include'
}).then(function(data){

         return data.json();
  })

};

}



export var GET_ALL_QUERY= 'GET_ALL_QUERY'

export function getAllQuery(){

  return{
  type:GET_ALL_QUERY,
  promise: fetch('/query',
  {
method: 'GET',
credentials: 'include'
}).then(function(data){

         return data.json();
  })

};

}



export var LOG_OUT= 'LOG_OUT'

export function logOut(){

  return{
  type:LOG_OUT,
  promise: fetch('/logout',
  {
method: 'GET',
credentials: 'include'
}).then(function(data){
    console.log('loggint out from action');
         return data.json();
  })
};

}



export var FIND_GIFT_FORM_BY_ID= 'FIND_GIFT_FORM_BY_ID'

export function findGiftFormById(id, facebookId){


    return{
    type:FIND_GIFT_FORM_BY_ID,
    promise: fetch('/giftform/'+id+'/'+facebookId).then(function(data){

           return data.json();
    })

  };

}





export var GET_LAST_GIFT_FORM= 'GET_LAST_GIFT_FORM'

export function getLastGiftForm(facebookId){


    return{
    type:GET_LAST_GIFT_FORM,
    promise: fetch('/lastgiftform/'+facebookId).then(function(data){

           return data.json();
    })

  };

}



export var DELETE_LAST_GIFT_FORM="DELETE_LAST_GIFT_FORM"

export var deleteLastGiftForm=function(id){

  var fetchData= {
    method:'DELETE'
  };



  return {
    type:DELETE_LAST_GIFT_FORM,
    promise: fetch('/deletegiftform/'+id, fetchData).then(function(data){



      return data.json();

    })
};
};




export var GET_GIFT_LISTS= 'GET_GIFT_LISTS'

export function getGiftLists(facebookId){


  return{
  type:GET_GIFT_LISTS,
  promise: fetch('/amazonlist/'+facebookId).then(function(data){

         return data.json();
  })

};

}






 export var SAVE_GIFT_FORM= 'SAVE_GIFT_FORM';

export function saveGiftForm(data) {

var fetchData={
method:'POST',
headers:{
 'Content-Type':'application/json'
},
body:JSON.stringify({

  facebookId:data.facebookId,
  id:data.id,
  bdMonth:data.bdMonth,
  bdDay:data.bdDay,
  friendName:data.friendName,
  gender:data.gender,
  relationship:data.relationship,
  age:data.age,
  date:data.date,
  month:data.month,
  StartTime:data.StartTime,
  EndTime:data.EndTime,
  lastPage:data.lastPage,
  traits:data.traits,
  finished:data.finished,
  lastOpened:data.lastOpened,
  personality:data.personality

})

};

return {
type: SAVE_GIFT_FORM,
promise: fetch('/giftform', fetchData).then(function(data){


return data.json();

})
};
}





 export var SAVE_RESULT_DATA= 'SAVE_RESULT_DATA';

export function saveResultData(data) {

var fetchData={
method:'POST',
headers:{
 'Content-Type':'application/json'
},
body:JSON.stringify({

  facebookId:data.facebookId,
  name:data.name,
  age:data.age,
  relationship:data.relationship,
  gender:data.gender,
  month:data.month,
  day:data.day,
  amazon_results:data.amazon_results

})
};

return {
type: SAVE_RESULT_DATA,
promise: fetch('/amazonlist', fetchData).then(function(data){


return data.json();

})
};
}
