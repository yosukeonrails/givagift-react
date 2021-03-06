var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
import AmazonItem from './amazon-item.js'

export class GiftResults extends React.Component{

constructor(props){
super(props);

  this.next= this.next.bind(this);
  this.previous= this.previous.bind(this);

}

next(){

  var resultStart= this.state.resultStart + 9;
  var resultEnd = this.state.resultEnd + 9;

  this.setState({
       resultStart:resultStart,
       resultEnd:resultEnd
  })


}


previous(){



  var resultStart= this.state.resultStart - 9;
  var resultEnd = this.state.resultEnd - 9;

  this.setState({
       resultStart:resultStart,
       resultEnd:resultEnd
  })



}


componentWillMount(){
  this.setState({
       resultStart:0,
       resultEnd:8
  })
}



render () {

  var queryArray=[];

    this.props.callArray.map(function(array){

            array.map(function(query){
                 queryArray.push(query)
            })

    })

    var renderedResults=[];

      for( var i= this.state.resultStart ; i < this.state.resultEnd ; i++ ){

            renderedResults.push(queryArray[i]);

      }


        var renderedArray=[];

      renderedResults.map(function(item){



        var price;

        if( typeof item.OfferSummary[0].LowestNewPrice == 'undefined') {


        price=  item.OfferSummary[0].LowestUsedPrice[0].FormattedPrice[0];

        } else {

        price= item.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
        }

          var picLink;


        if( !item.LargeImage){
                picLink='';
        } else{
           picLink= item.LargeImage[0].URL[0];
        }


            renderedArray.push(<AmazonItem name={item.ItemAttributes[0].Title[0]}  price={price} pictureUrl={picLink} buyLink={item.DetailPageURL[0]} />);

      })

         $('.next-result').css("display", "block");
         $('.previous-result').css("display", "block");


      if(this.state.resultStart === 0 ){

           $('.previous-result').css("display", "none");
           $('.next-result').css("display", "block");

      } else {

            $('.previous-result').css("display", "block");
      }

        console.log(queryArray.length)
        console.log(this.state.resultEnd)
      if(this.state.resultEnd > 27 ){

           $('.next-result').css("display", "none");

      } else {

        $('.next-result').css("display", "block");

      }
            // for each query 0-9

return(

  <div className="result-div">


                      <div className="result-container" >

                              {renderedArray}

                      </div>




                <div className="result-bottom-nav">
                      <div className="button-container">
                        <button  onClick={this.next} className="next-result"> Next </button>
                        <button  onClick={this.previous} className="previous-result"> Previous </button>
                        </div>
              </div>




  </div>


);
}
}


var mapStateToProps= function(state){

console.log(state);
return {
 user:state.user,
 layOutState:state.layOutState,
 mode:state.mode,
 loggedUser:state.loggedUser,
 callArray:state.callArray
}
}

var GiftResultsContainer= connect(mapStateToProps)(GiftResults)

module.exports = GiftResultsContainer;
