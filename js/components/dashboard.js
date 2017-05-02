

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
import UserListsContainer from './user-lists.js'
var contentArray=['home', 'userlists', 'userquiz']
import QuizInfoContainer from './quizinfo.js'
import {getFacebookUser} from '../actions/index.js'
var listarrayContainerVar;
var loggedUser;
export class Dashboard extends React.Component{

  constructor(props){
    super(props);

     this.props.dispatch(getFacebookUser());
     this.selectNav=this.selectNav.bind(this);

  }

   selectNav(event){


        $('.question').css('color','black');

     for(var i=0 ; i< contentArray.length ; i++){



       if(event.target.id == contentArray[i]){

              $("."+contentArray[i]).css('display', 'block');


              if(event.target.id=== 'userquiz'){
              $('.quiz-information').animate({opacity:'1'},200 , function(){
              $('.quiz-content').animate({opacity:"1"}, 200);

              });

            $("html, body").animate({ scrollTop: $(".quiz-information").offset().top }, 1000);
          }
       }
       else
        {

           $("."+contentArray[i]).css('display', 'none');
       }

     }

    $('.nav button').css("backgroundColor" , "#ff5a5a");
      $('.nav button').css("color" , "white");

     var targetElement= $('#'+event.target.id ) ;
     targetElement.css("backgroundColor" , "white");
      targetElement.css("color" , "black");


                     var element= $("."+event.target.id);

                     element.css('display', 'block');


   }

  render(){

      var imageUrl="";
      var userName="";

      if(this.props.loggedUser){
          loggedUser=this.props.loggedUser;

          imageUrl= "url(https://graph.facebook.com/"+this.props.loggedUser.facebookId+"/picture?width=800&height=800)";
          console.log(imageUrl);
          userName=loggedUser.first_name;
          listarrayContainerVar= <UserListsContainer user={loggedUser.facebookId}/>
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
