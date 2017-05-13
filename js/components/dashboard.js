

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import EventsContainer from './events.js'
import {getFacebookUser} from '../actions/index.js'
var loggedUser;
export class Dashboard extends React.Component{

  constructor(props){
    super(props);

     this.props.dispatch(getFacebookUser());
     this.goLink= this.goLink.bind(this);

  }

  goLink(e){
        console.log(e.target.id);
        var link= e.target.id
         window.location.href="/#/avatar"
  }


  render(){

      var imageUrl="";
      var userName="";

      if(this.props.loggedUser){
          loggedUser=this.props.loggedUser;
          imageUrl= "url(https://graph.facebook.com/"+this.props.loggedUser.facebookId+"/picture?width=800&height=800)";
          userName=loggedUser.first_name;

      }



    return (

<div>

                    <div className="profile-top">

                    	       <div className="profile-top-welcome">

                                    <h2>Givagifts</h2>
                                    <div style={{backgroundImage:imageUrl}} className="profile-image">
                                    </div>
                                    <h1>Hello, {userName} !</h1>
                    		    </div>

                          		<div className="side-nav">
                                            <div className="nav-item">
                                            <i className="fa fa-calendar" aria-hidden="true"></i> Events
                                            </div>

                                            <div className="nav-item">
                                            <i className="fa fa-user" aria-hidden="true"></i> Profile
                                            </div>


                                        		 <div className="nav-item">
                                        		 <i className="fa fa-check-square-o" aria-hidden="true"></i> GivaQuiz
                                        		 </div>


                                        		 <div className="nav-item">
                                        		 <i className="fa fa-star" aria-hidden="true"></i> Featured Gifts
                                        		 </div>
                          		</div>

                    </div>





                    <div className="profile-content">

                      <div className="gift-cta" >
                            <h2>Need help to find a gift?</h2>
                            <button  onClick={this.goLink} id="/#/avatar" > <h1>Find a gift now!</h1></button>

                      </div>
                                        <div className="event">

                                                    		<div className="event-top">
                                                    					<h2>April , Sunday</h2>

                                                    					<h1>Easter</h1>

                                                    				<span className="view-more"> <h3> view more</h3><i className="fa fa-sort-desc" aria-hidden="true"></i> </span>

                                                    		</div>



                                                  		<div className="event-bottom">

                                                  					<div className="event-like event-element">
                                                  					<i className="fa fa-heart" aria-hidden="true"></i>
                                                  						<h2>22</h2>
                                                  					</div>

                                                  					<div className="event-comment event-element">
                                                  					<i className="fa fa-comment-o" aria-hidden="true"></i>
                                                  						<h2>5</h2>
                                                  					</div>

                                                  					<div className="event-gift event-element">
                                                  					<i className="fa fa-gift" aria-hidden="true"></i>
                                                  						<h2>view gifts</h2>
                                                  					</div>

                                                  		</div>
                                        </div>



                                        <div className="event">




                                                    <div className="event-top">
                                                    <h2>April , Monday</h2>

                                                    <h1>Patriot's Day</h1>
                                                    </div>


                                                		<div className="event-bottom">

                                                					<div className="event-like event-element">
                                                					<i className="fa fa-heart" aria-hidden="true"></i>
                                                					<h2>22</h2>
                                                					</div>

                                                					<div className="event-comment event-element">
                                                					<i className="fa fa-comment-o" aria-hidden="true"></i>
                                                					<h2>4</h2>
                                                					</div>

                                                					<div className="event-gift event-element">
                                                					<i className="fa fa-gift" aria-hidden="true"></i>
                                                					<h2>view gifts</h2>
                                                					</div>

                                                		</div>


                                        </div>




                                        <div className="event">

                                                  		<div className="event-top">
                                                  			<h2>April , Thursday</h2>

                                                  	 	 			<h1>Thank You Thursday</h1>
                                                  		</div>


                                                  		<div className="event-bottom">

                                                                    <div className="event-like event-element">
                                                                              <i className="fa fa-heart" aria-hidden="true"></i>
                                                                              <h2>2</h2>
                                                                    </div>

                                                                    <div className="event-comment event-element">
                                                                            <i className="fa fa-comment-o" aria-hidden="true"></i>
                                                                            <h2>24</h2>
                                                                    </div>

                                                                    <div className="event-gift event-element">
                                                                            <i className="fa fa-gift" aria-hidden="true"></i>
                                                                            <h2>view gifts</h2>
                                                                    </div>

                                                  		</div>
                                        </div>






                                      <div className="bottom-nav-container">

                                                  <div className="bottom-nav">
                                                              <div className="nav-item">
                                                              <i className="fa fa-calendar" aria-hidden="true"></i>
                                                              </div>

                                                              <div className="nav-item">
                                                              <i className="fa fa-user" aria-hidden="true"></i>
                                                              </div>


                                                                <div className="nav-item">
                                                                <i className="fa fa-check-square-o" aria-hidden="true"></i>
                                                                </div>


                                                                <div className="nav-item">
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                </div>
                                          	         </div>
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
    userImageURL:state.userImageURL,
    loggedUser:state.loggedUser
  }
}

var DashboardContainer= connect(mapStateToProps)(Dashboard);

export default DashboardContainer;
