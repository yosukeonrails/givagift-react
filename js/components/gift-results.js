var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'

export class GiftResults extends React.Component{

constructor(props){
super(props);

}

render () {


return(

  <div>

            <div className="header">
                 <h2  id="/">Givagift</h2>


                         <div   className="signin">
                         <button ><h3>Log In</h3></button>
                         <button ><h3>Sign Up</h3></button>
                         </div>

            </div>


                          <div className="amazon-item" >

                                    <div className="item-image" id="toaster">
                                    </div>

                                    <div className="amazon-item-info">
                                            <h1>Blue Toaster </h1>
                                            <h2> 19.99  $  </h2>
                                    </div>
                          </div>



                        <div className="amazon-item" >

                                  <div className="item-image" id="couch">
                                  </div>

                                  <div className="amazon-item-info">
                                          <h1>Yellow Couch</h1>
                                          <h2> 24.99 $  </h2>
                                  </div>
                        </div>



                        <div className="amazon-item" >

                                  <div className="item-image" id="fit-bit">
                                  </div>

                                  <div className="amazon-item-info">
                                          <h1>Fit Bit </h1>
                                          <h2> 7.99 $ </h2>
                                  </div>
                        </div>



                        
                  <div className="amazon-item" >

                            <div className="item-image"  id="bottle">
                            </div>

                            <div className="amazon-item-info">
                                    <h1>Contigo AUTOSEAL  </h1>
                                    <h2> 19.99  $ </h2>
                            </div>
                  </div>




                  <div className="amazon-item" >

                            <div className="item-image" id="stand">
                            </div>

                            <div className="amazon-item-info">
                                    <h1> Catchall. A handmade stand </h1>
                                    <h2> 34.99 $ </h2>
                            </div>
                  </div>




                <div className="amazon-item" >

                          <div className="item-image" id="spinner">
                          </div>

                          <div className="amazon-item-info">
                                  <h1> Fidget Spinner </h1>
                                  <h2> 3.99 $ </h2>
                          </div>
                </div>





                <div className="amazon-item" >

                          <div className="item-image" id="fit-bit">
                          </div>

                          <div className="amazon-item-info">
                                  <h1>Fit Bit </h1>
                                  <h2> 7.99 $ </h2>
                          </div>
                </div>




                  <div className="amazon-item" >

                            <div className="item-image" id="couch">
                            </div>

                            <div className="amazon-item-info">
                                    <h1>Blue Toaster </h1>
                                    <h2> 19.99 $ </h2>
                            </div>
                  </div>


              <div className="amazon-item" >

                            <div className="item-image" id="mac">
                            </div>

                            <div className="amazon-item-info">
                                    <h1>Blue Toaster </h1>
                                    <h2> 19.99  $ </h2>
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
 loggedUser:state.loggedUser
}
}

var GiftResultsContainer= connect(mapStateToProps)(GiftResults)

module.exports = GiftResultsContainer;
