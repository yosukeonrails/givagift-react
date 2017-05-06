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
export class Avatar extends React.Component{

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
        <div className="avatar-maker">

              <div className="avatar-maker-background">
                    <h1>Tell us about who this gift is for.</h1>

                      <div className="avatar-maker-top">
                                <div className="avatar-image">
                                 <div className="avatar-body head">head</div>
                                    <div className="avatar-body upper">upper</div>
                                    <div className="avatar-body bottom">bottom</div>
                                       <div className="avatar-body shoes">shoes</div>
                                </div>
                                <div className="avatar-nav">
                                    <button type="button" name="button">Skin</button>
                                    <button type="button" name="button">Gender</button>
                                </div>

                                        <input type="text" name="" placeholder="Name" ></input>
                      </div>


                          <div className="avatar-maker-bottom">



                              <h2>Born In</h2>

                                      <div className="avatar-date">
                                            <div className="avatar-month">
                                            <input onChange={this.handleMonth} type="text" placeholder="M" name="" ></input>
                                            </div>
                                            <div className="avatar-day">
                                            <input  onChange={this.handleDay}  type="text" name="" placeholder="D" ></input>
                                            </div>

                                     </div>

                                              <div className="age-slider">
                                                      <h1>Age</h1>
                                                  <div className="age-tag"><h1>{age}</h1> <h2>years old</h2>
                                                    <div className="arrow-down"></div>
                                                    </div>

                                                  <input onChange={this.slideAge} type="range" min="0" max="100" id="fader"></input>
                                              </div>


                            </div>


                            <button className="next" type="button" name="button">Next</button>

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
 loggedUser:state.loggedUser
}
}

var AvatarContainer= connect(mapStateToProps)(Avatar)

module.exports = AvatarContainer;
