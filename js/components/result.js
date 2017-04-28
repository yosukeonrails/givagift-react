

var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import {NextQuestion, setCurrentQuery, ZeroQuestion, CallAmazon, CallAmazonCalls, saveResultData, intializeResults, SubmitAnswerPoints, GetMax , SetQuery} from '../actions/index.js'
import cssStyle from '../css-variables.js'
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import Container from './outtercontainer.js'
import ResultItemContainer from './result-item.js';
var blockOrNone= 'none';
var ItemsArray;
var callArray=[];
var ItemInfo;
import itemIndex from '../itemindex.js';
var queryNumber='';
var count=0;
var resultItemGroup=['group1', 'group2','group3'];
var selectedIndex=0;
var  queryset;
var selectedQueryTitle='';
var queryArray=[];
var currentQuery='';
var currentQueryArray=[];
var menuDisplayed=false;


var addToQuery= function(query){

  var queryX= queryArray;

  queryArray=[];
  queryArray[0]= query;


  for(var i=0; i < queryX.length ; i++){
    queryArray.push(queryX[i]);
  }

};


var createContent= function(dis , queryArray , index ){

    if( !queryArray[index]){

          return callArray;

        }

  dis.props.dispatch(CallAmazon(queryArray[index])).then(function(){


           ItemsArray=[];
           filteredArray(dis.props.amazonData ,  0  , ItemsArray , queryArray[index]);

           if(callArray.length === queryset.length){

                     dis.props.dispatch(CallAmazonCalls(callArray));
                     dis.props.dispatch(intializeResults(callArray));

                     dis.setState({
                     random:'random'
                 });
             }

       });


   return  createContent(dis, queryArray , index+1);

};

var filteredArray =  function(amazonData , index , itemArray, currentQuery ){

          if(!amazonData[index]){


            callArray.push(itemArray);

            queryArray.push(currentQuery);


            return callArray;
          }

          var price;

          if( typeof amazonData[index].OfferSummary[0].LowestNewPrice == 'undefined') {


          price=  amazonData[index].OfferSummary[0].LowestUsedPrice[0].FormattedPrice[0];

          } else {

          price= amazonData[index].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
          }

            var picLink;


          if( !amazonData[index].LargeImage){
                  picLink='';
          } else{
             picLink= amazonData[index].LargeImage[0].URL[0];
          }


        var ItemInfo={
           "LowestNewItemPrice":price,
           "titleOfItem":amazonData[index].ItemAttributes[0].Title[0],
           "picLink":picLink,
           "buyLink":amazonData[index].DetailPageURL[0],
         };

          itemArray.push(ItemInfo);

       return  filteredArray(amazonData, index+1 , itemArray, currentQuery);
};

export class Result extends React.Component {

            constructor(props){

              super(props);
              this.saveMyResults= this.saveMyResults.bind(this);
              this.goTo= this.goTo.bind(this);
              this.props.dispatch(ZeroQuestion(0));
              this.goLeft= this.goLeft.bind(this);
              this.goRight= this.goRight.bind(this);
              this.showMenu= this.showMenu.bind(this);

            }

            componentWillMount(){

              var queryNumber = this.props.params.id;

              if(!this.props.contents){
              hashHistory.push('/landingpage');
              }


              queryset = itemIndex.class[queryNumber[0]].subclass[queryNumber[1]].items[queryNumber[2]];

              this.props.dispatch(SetQuery(queryNumber));

              var dis=this;

              createContent(dis, queryset , 0 );

              var queryNumber = this.props.params.id;

              this.setState({
                ramdom:"random"
              });
                this.props.dispatch(SetQuery(queryNumber));

            }


            showMenu(){

              var bottomMenuClosed='70px';
              var bottomMenuOpen='270px';


              if(window.screen.width < 600 ){

              bottomMenuClosed='10vh';

              bottomMenuOpen='35vh';

              }

            if(menuDisplayed===true) {

            $('.results-bottom').stop();
            $('.result-buttons').stop();


                $('.results-bottom').animate({height:bottomMenuClosed}, function(){
                    $('.result-buttons').css('display' , 'block');
                });

            menuDisplayed=false;
            return ;
            }

            if(menuDisplayed===false){

            $('.results-bottom').stop();
            $('.result-buttons').stop();


            $('.results-bottom').animate({height:bottomMenuOpen}, function(){
            $('.result-buttons').css('display' , 'block');
            $('.result-buttons').animate({opacity:'1'});
            });
            menuDisplayed=true;
            return ;
            }

            }

            goTo(event){
                queryArray=[];
                callArray=[];
                hashHistory.push(event.target.id);
            }

            goLeft(){

              var percentage=35;


              if(window.screen.width < 600 ){
                  percentage=20;
              }
              var dis=this;
              $('.result-row').stop();

                  $('.result-row').animate({left: percentage+'%'}, 300, function(){

                  if(selectedIndex === 0){

                  selectedIndex=2;
                  dis.setState({ currentIndex:selectedIndex});
                  } else {

                  var previousIndex= selectedIndex;
                  selectedIndex= previousIndex -1;
                  dis.setState({ currentIndex:selectedIndex});
                  }


                  $('.result-row').css('left', -percentage+'%');


                  $('.result-row').animate({left:'0%'}, 300);


              });


            }

            goRight(){

            var percentage=35;
            if(window.screen.width < 600 ){
                percentage=20;
            }
            var dis=this;
              $('.result-row').stop();

              $('.result-row').animate({left:-percentage+'%'}, 300, function(){


                  if(selectedIndex === 2){

                  selectedIndex=0;
                  dis.setState({ currentIndex:selectedIndex});
                  } else {

                  var previousIndex= selectedIndex;
                  selectedIndex= previousIndex+1;
                  dis.setState({ currentIndex:selectedIndex});
                  }


                $('.result-row').css('left', percentage+'%');

                $('.result-row').animate({left:'0%'}, 300);


            });



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
                queryArray=[];
                callArray=[];
                    hashHistory.push('/dashboard');

            }

           render(){
              var renderedResultArray= [];
             var selectedContentArray= [];

              ////////  begining of Amazon Call and setting for render function ///
              ////////



                if(!this.props.contents){

                }else{

                  if(this.props.contents.length ===3){



                      selectedQueryTitle= queryArray[selectedIndex];
                      selectedContentArray=this.props.contents[selectedIndex];

                      

                            for( var i=0; i< selectedContentArray.length; i++){

                                renderedResultArray.push(<ResultItemContainer index={i} content={selectedContentArray[i]}/>);

                            }
                    }
                }

             if(this.props.loggedUser){
               blockOrNone="block";
             }

             return (
              <div>



          <div className="result-header">
            <div className="result-logo">
              <h2>Givagifts</h2>
            </div>
                <div className="result-header-nav">
                  <button onClick={this.goLeft} type="button" name="button">
                        <i className="fa fa-chevron-left arrowLeft" aria-hidden="true"></i>
                  </button>

                    <h1>{selectedQueryTitle}</h1>

                    <button onClick={this.goRight} type="button" name="button">
                      <i className="fa fa-chevron-right arrowRight" aria-hidden="true"></i>
                    </button>

                </div>



          </div>


                    <div className="result-page">


                    <div className="result-row">
                      {renderedResultArray}
                   </div>

                    </div>

                    <div className="results-bottom" >

                    <i onClick={this.showMenu} className="fa fa-bars" aria-hidden="true"></i>
                    <div className="result-buttons">
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

var ResultContainer= connect(mapStateToProps)(Result)

export default ResultContainer;
