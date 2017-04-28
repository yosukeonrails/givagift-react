

var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import {NextQuestion, ZeroQuestion, CallAmazon, CallAmazonCalls, saveResultData, intializeResults, SubmitAnswerPoints, GetMax , SetQuery} from '../actions/index.js'
import cssStyle from '../css-variables.js'
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import Container from './outtercontainer.js'
var blockOrNone= 'none';
var ItemsArray;
var callArray=[];
var ItemInfo;
import itemIndex from '../itemindex.js';
var queryNumber='';
var count=0;
export class Results extends React.Component {

            constructor(props){

              super(props);
              this.saveMyResults= this.saveMyResults.bind(this);
              this.goTo= this.goTo.bind(this);
              this.props.dispatch(ZeroQuestion(0));

            }

            goTo(event){

                hashHistory.push(event.target.id);
            }

            componentDidMount(){
              $('.results-bottom').css('bottom', '-210px')
            }

            componentWillMount(){



                    var queryNumber = this.props.params.id;
                      this.props.dispatch(SetQuery(queryNumber));

            }

            saveMyResults(){



              var resultInfoData={
                  facebookId:this.props.loggedUser.facebookId,
                  name:this.props.listInfo.name,
                  age:this.props.listInfo.age,
                  relationship:this.props.listInfo.relationship,
                  gender:this.props.listInfo.gender,
                  month:this.props.listInfo.month,
                  day:this.props.listInfo.day,
                  amazon_results:this.props.params.id
              };


                this.props.dispatch(saveResultData(resultInfoData));

                    hashHistory.push('/userpage');

            }

           render(){


              ////////  begining of Amazon Call and setting for render function ///
              ////////


              var queryNumber = this.props.params.id;


                if(!this.props.contents){
                      hashHistory.push('/landingpage');
                }

              var queryset = itemIndex.class[queryNumber[0]].subclass[queryNumber[1]].items[queryNumber[2]];

                if(count<1){


                  this.props.dispatch(SetQuery(queryNumber));

                    for(var i=0; i<queryset.length; i++){

                    var dis=this;
                                                     //1-3
                    this.props.dispatch(CallAmazon(queryset[i])).then(function(){


                       ItemsArray=[];
                                                     //10
                             for(i=0; i<dis.props.amazonData.length; i++){

                                var price;

                                     if( typeof dis.props.amazonData[i].OfferSummary[0].LowestNewPrice == 'undefined') {


                                      price=dis.props.amazonData[i].OfferSummary[0].LowestUsedPrice[0].FormattedPrice[0];

                                    } else {

                                      price= dis.props.amazonData[i].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];

                                    }


                                 ItemInfo={
                                  "LowestNewItemPrice":price,
                                  "titleOfItem":dis.props.amazonData[i].ItemAttributes[0].Title[0],
                                  "picLink":dis.props.amazonData[i].LargeImage[0].URL[0],
                                  "buyLink":dis.props.amazonData[i].DetailPageURL[0],
                                };
                                 ItemsArray.push(ItemInfo);
                             }

                              callArray.push(ItemsArray);


                      }).then(function(){

                        if(callArray.length==queryset.length){

                            count=2;


                            dis.props.dispatch(CallAmazonCalls(callArray));
                            dis.props.dispatch(intializeResults(callArray));

                                return;
                        }

                      });

                    } //end of for

                } else{
                
                }


             if(this.props.loggedUser){
               blockOrNone="block";
             }

            var OutterContainerArray=[];



             for(var i=0; i<this.props.contents.length; i++){

            OutterContainerArray.push( <Container  id= {i} content={this.props.contents[i]} contentRange={this.props.contents[i].range} />)

             }
             return (
              <div>

               <div className="outside-result" style={{ paddingTop:'100px'}}>

                        <h1> Here are your results! </h1>

                             {OutterContainerArray}




                          <div className="results-bottom" >

                                <button style={{display:blockOrNone}}  onClick={ this.saveMyResults } className="save-my-results">Save My Results</button>

                              <button onClick={this.goTo} id="/home">Go Back To Main Page</button>

                                <button onClick={this.goTo} id="/quiz">Take the Quiz again</button>
                          </div>
                      </div>
                  </div>
             );
           }
}




var mapStateToProps= function(state){


return {
  contents:state.contents,
  loggedUser:state.loggedUser,
  listInfo:state.listInfo,
  queries:state.queries,
  amazonData:state.amazonData
}

}

var ResultsContainer= connect(mapStateToProps)(Results)

export default ResultsContainer;
