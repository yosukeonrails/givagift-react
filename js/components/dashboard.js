

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
var listarrayContainerVar;

export class Dashboard extends React.Component{

  constructor(props){
    super(props);
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
     imageUrl="https://graph.facebook.com/"+this.props.loggedUser.facebookId+"/picture?width=100&height=100";
     userName=this.props.loggedUser.username;
      listarrayContainerVar= <UserListsContainer user={this.props.loggedUser.facebookId}/>
    }



    return (


<div className="userpage">
    			<div className="user-header">
        			<div className="logo">
        							<h1>Givagifts</h1>
        			</div>

        			<div className="user-profile">
        			<img  src={imageUrl} alt=""></img>
        			<h1>{userName}</h1>
        			</div>


          		<div className="nav">
          		<ul >
          		<button  onClick={this.selectNav} id="home" type="button" name="button"> <i  id="home" className="fa fa-home" aria-hidden="true"></i> <h1  id="home" >Home</h1> </button>
          		<button  onClick={this.selectNav}  id="userlists" name="button"><i  id="userlists"  className="fa fa-list-alt" aria-hidden="true"></i><h1 id="userlists"  >Lists</h1></button>
          		<button   onClick={this.selectNav} id="birthdays" name="button"> <i  id="birthdays" className="fa fa-birthday-cake" aria-hidden="true"></i> <h1 id="birthdays">Birthdays</h1></button>
          		<button   onClick={this.selectNav} id="userquiz" name="button"> <i id="userquiz" className="fa fa-check-square-o" aria-hidden="true"></i><h1 id="userquiz">GivaQuiz</h1></button>
          		</ul>
          		</div>

        	</div>


	<div className="userpage-content">


        <div className="home">
        <EventsContainer/>
        </div>

        <div className="userlists">
          {listarrayContainerVar}
        </div>

        <div className="userquiz">
            <QuizInfoContainer/>
        </div>


    </div>
</div>

    );
  }
}


var mapStateToProps= function(state){


  return {
    user:state.user,
    userImageURL:state.userImageURL,
    loggedUser:state.loggedUser
  }
}

var DashboardContainer= connect(mapStateToProps)(Dashboard);

export default DashboardContainer;
