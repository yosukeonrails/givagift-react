var actions = require('../actions/index');
var resultsArray = require('../results.js');
var questionsArray =  require('../questions.js');
import {INITIALIZE_RESULTS,CHANGE_MODE,SAVE_GIFT_FORM, SAVE_CHOSEN_BUBBLE,FIND_GIFT_FORM_BY_ID, GET_LAST_GIFT_FORM, DELETE_LAST_GIFT_FORM,CHANGE_REDIRECT,ADD_BUBBLE,BUBBLE_COUNT,LAYOUT_STATE ,LOG_OUT,GET_GIFT_LISTS,SET_CURRENT_QUERY, ZERO_QUESTION, SAVE_RESULT_DATA,SAVE_LIST_INFO, ARROW_RIGHT,GET_FACEBOOK_USER, LOG_MOCK_USER, NEXT_QUESTION, LOG_IN, CALL_AMAZON,CALL_AMAZON_CALLS, SET_ANSWER_POINTS, SELECT_ANSWER, SUBMIT_ANSWER_POINT, GET_MAX, SET_QUERY} from '../actions/index';
import {handle} from 'redux-pack';
import cssStyle from '../css-variables.js'
import mainBubbleData from '../components/bubbledata.js'

var defaultGiftForm={
  lastPage: "starter",
  month: 5,
  date: 17,
  age: 27,
  relationship: "Friend",
  gender: "Male",
  friendName: "none",
  EndTime:'',
  bdDay: 0,
  bdMonth: 0,
  traits:[],
  finished:false,
  lastOpened:false,
  personality:'none'
}

var stateDefault = {
  chosenBubbleArray:[],
    lastGiftFormState:'none',
    giftFormState:defaultGiftForm,
    countData:[],
    bubbleCount:'',
    bubblesArray:mainBubbleData,
    selectedAnswerCss:'answerButton',
    answerSelected:false,
    maxPoints:[],
    layOutState:{
      logInOpen:false,
      optionOpen:false
    },
    submittedPoints:[],
    contents:[],
    currentQuestionIndex:0,
    currentQuestion:questionsArray[0],
    questions: questionsArray,
    styles:cssStyle,
    userImageURL:'http://www.safe-collections.com/images/PNG%20Icons/user148.png',
    redirectQuery:''
};



var reducer = function(state, action) {

    state = state || stateDefault;

    switch (action.type) {

      case LOG_IN:


      return handle(state, action, {



        start: s => ({
               ...s,
               isLoading: true,
               fooError: null
             }),
        finish: s => ({ ...s, isLoading: false }),
        failure: s => ({ ...s, userError: action.payload }),
        success: s => ({ ...s, user: action.payload  }),
      });

      case LOG_MOCK_USER:

           return handle(state, action, {

             failure: s => ({ ...s, callError:action.payload }),

             success: s => ({ ...s, loggedUser:action.payload[0] }),

           });


           case LOG_OUT:

                return handle(state, action, {

                  failure: s => ({ ...s, callError:action.payload }),

                  success: s => ({ ...s, loggedUser:'' }),

                });



      case GET_FACEBOOK_USER:



  return handle(state, action, {

    failure: s => ({ ...s, callError:action.payload }),

    success: s => ({ ...s, loggedUser:action.payload  }),

  });



        case GET_GIFT_LISTS:



    return handle(state, action, {

      failure: s => ({ ...s, callError:action.payload }),

      success: s => ({ ...s, giftlists:action.payload  }),

    });


    case DELETE_LAST_GIFT_FORM:



      return handle(state, action, {

        failure: s => ({ ...s, callError:action.payload }),

        success: s => ({ ...s, giftFormState:defaultGiftForm}),

      });


    case SET_CURRENT_QUERY:

        state.currentQuery=action.currentQuery

        break

      case SET_ANSWER_POINTS:

          state.answerPoints=action.answerPoints

          break

      case CALL_AMAZON:


      return handle(state, action, {

        start: s => ({
               ...s,
               isLoading: true,
               fooError: null
             }),
        finish: s => ({ ...s, isLoading: false }),

        failure: s => ({ ...s, callError: action.payload }),

        success: s => ({ ...s, amazonData: action.payload}),

      });

      case CALL_AMAZON_CALLS:

           state.callArray=action.callArray

            break

       case SELECT_ANSWER:

            state.selectedAnswerInfo= action.selectedAnswerInfo
            state.answerSelected=true
            break



    case CHANGE_REDIRECT:

          state.redirectQuery= action.redirectQuery;
          console.log('changing redirect');
          break

     case SELECT_ANSWER:

    case SUBMIT_ANSWER_POINT:

        var pointsArray= state.submittedPoints

      pointsArray.push(action.SubmittedAnswerPoint)

      state.submittedPoints=pointsArray

                break

    case GET_MAX:

       var maxArray= state.maxPoints;

        maxArray.push(action.maxpoint)

        state.maxPoints=maxArray

    break




    case SET_QUERY:

    state.queries =  action.queries;

    break

        case actions.INITIALIZE_RESULTS:


            for (var i = 0; i < action.resultsArray.length; i++) {

                state.contents[i] = action.resultsArray[i];


                if(state.contents[i].length< 5){

                  state.contents[i].range = {
                      from: 0,
                      to: state.contents[i].length
                  };
                }

                else {

                  state.contents[i].range = {
                      from: 0,
                      to: 5
                  };
                }
            }
            break;

        case actions.ARROW_RIGHT:

            var range = state.contents[action.id].range;
               var slicedContent= state.contents[action.id].slice(state.contents[action.id].range.from+5, state.contents[action.id].range.to+5);
                var remainer= 5-slicedContent.length;



                if(state.contents[action.id].length < 5){
                  return
                }
                else if(remainer==5){
                  state.contents[action.id].range = {
                      from:0,
                      to: remainer
                  };
                }
                else{

                  state.contents[action.id].range = {
                      from: range.to,
                      to: range.to+5-remainer
                  };

                }

             state.contents = state.contents.slice(0)

              break;

              case actions.ARROW_LEFT:



                  var range = state.contents[action.id].range;
                  var slicedLeft= state.contents[action.id].slice(state.contents[action.id].range.from-5, state.contents[action.id].range.to-5);

                  if (slicedLeft.length===0){

                      if(state.contents[action.id].length%5===0){

                        state.contents[action.id].range = {
                            from: state.contents[action.id].length-5,
                            to: state.contents[action.id].length
                          };
                      }
                      else {

                        state.contents[action.id].range = {
                            from: state.contents[action.id].length-(state.contents[action.id].length%5),
                            to: state.contents[action.id].length
                              };

                      }




                  } else {

                    state.contents[action.id].range = {
                        from: range.from-5,
                        to: range.from
                    };

                  }

                   state.contents = state.contents.slice(0)

                    break;


                          case SAVE_RESULT_DATA:



                               return handle(state, action, {

                                 failure: s => ({ ...s, callError:action.payload }),

                                 success: s => ({ ...s, resultData:action.payload}),

                               });



                               case FIND_GIFT_FORM_BY_ID:

                               console.log(action);

                              return handle(state, action, {

                                failure: s => ({ ...s, callError:action.payload }),

                                success: s => ({ ...s, foundGiftForm: action.payload[0]  }),

                              });





                            case GET_LAST_GIFT_FORM:

                            console.log(action);

                           return handle(state, action, {

                             failure: s => ({ ...s, callError:action.payload }),

                             success: s => ({ ...s, lastGiftFormState: action.payload  }),

                           });

                           case SAVE_GIFT_FORM:


                                return handle(state, action, {

                                  failure: s => ({ ...s, callError:action.payload }),

                                  success: s => ({ ...s, giftFormState:action.payload}),

                                });



                        case SAVE_LIST_INFO:

                        state.listInfo =  action.listInfo;

                        break

                        case ZERO_QUESTION:

                        state.currentQuestion= questionsArray[action.index];
                        state.currentQuestionIndex= action.index;

                        break;


            case LAYOUT_STATE:

            state.layOutState= action.layOutState;

                        break

              case CHANGE_MODE:

              state.mode= action.mode;

              break

              case actions.BUBBLE_COUNT:

                state.countData= action.countData;

              break;


              case SAVE_CHOSEN_BUBBLE:

                    return  { ...state , chosenBubbleArray : action.chosenBubbleArray }

              break;


          case ADD_BUBBLE:


                return  { ...state , bubblesArray : action.newBubbleArray }

          break;

            case actions.NEXT_QUESTION:

            state.currentQuestion= questionsArray[action.currentQuestionIndex+1];
            state.currentQuestionIndex= action.currentQuestionIndex+1;

            break;
        }

      // return Object.assign({}, state, {contents:state.contents.slice(0)});
      return {...state}
};



export default reducer;
