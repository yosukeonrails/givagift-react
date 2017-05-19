var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
var age= 25;

export class Age extends React.Component{

      constructor(props){

        super(props);
        this.slideAge= this.slideAge.bind(this);
        this.handleMonth= this.handleMonth.bind(this);
        this.handleDay= this.handleDay.bind(this);
      }

      componentDidMount(){
      }

      handleMonth(e){

          if(e.target.value > 12){
              console.log('less than 12 please');
          }
      }

      handleDay(e){

        if(e.target.value > 31){
              console.log('less than 31 please');
        }

      }

      slideAge(e){

        if(e.target.value==100){

          age="100+";
          console.log('100 ++');

        } else {
            age= e.target.value;
        }

        var slideValue= ((e.target.value * 4)- 50 )
        var slideValuePx= slideValue + 'px';

        this.setState({age:age});
        $('.age-tag').animate({left:slideValuePx} , 10);


      }

      render () {
        return(
        <div className="age-page">

            <div className="age-question">
              <h1>How young is your</h1>
                    <select>
                    <option value="friend">Friend ?</option>
                    <option value="relative">Relative ?</option>
                    <option value="girlfriend">Girlfriend ?</option>
                    <option value="boyfriend">Boyfriend ?</option>
                      <option value="Mom">Mom ?</option>
                      <option value="Dad">Dad  ?</option>
                  </select>




            </div>

                <div className="age-slider">

                    <div className="age-tag"><h1>{age}</h1> <h2>years old</h2>
                      <div className="arrow-down"></div>
                      </div>

                    <input onChange={this.slideAge} type="range" min="0" max="100" id="fader"></input>
                </div>


              <button className="next-button"> Next </button>

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
 loggedUser:state.loggedUser
}
}

var AgeContainer= connect(mapStateToProps)(Age)

module.exports = AgeContainer;
