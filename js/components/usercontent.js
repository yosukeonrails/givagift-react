


var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
 import cssStyle from '../css-variables.js';
import loremipsum from '../loremipsum.js'
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Link = router.Link;
import Hammer from '../hammer.min.js'
export class UserContent extends React.Component{

  constructor(props){
    super(props);
  }



  render(){


// how to implement left / right swipes!
   document.body.style.backgroundColor = "#252525";
  var clickable= $('#user-info');

  clickable.hammer().on("swipeleft", function(ev) {


  });

var imageUrl='https://graph.facebook.com/'+this.props.loggedUser.facebookId+'/picture?width=300&height=300';

var defaultBool=false;

$('.hamburger').click(function(){



  if(defaultBool===false){
    defaultBool=true;

       $(".responsive-menu").animate({
              height: '350px',
          });
           $('.responsive-menu').css({"display" :"block"});
  }  else {
    defaultBool=false;

    $(".responsive-menu").animate({
           height:'0px',
       });
          $('.responsive-menu').css({"display" :"none"});

  }




});


    var buttonStyle= {
    fontSize:'17px',
    width: "200px",
    height:"40px",
    display:'block',
    backgroundColor: cssStyle.pink,
    border: "0px",
    borderRadius:"5px",
    fontFamily:cssStyle.baloo,
    color:cssStyle.white,
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'30px'
    };


    return (
<div className="user-content-container" >

      <div className="user-content" >
<div className="hamburger"><i className="fa fa-bars" aria-hidden="true"></i></div>

   <div className="responsive-menu">
   <li><i className="fa fa-plus-square-o" aria-hidden="true"></i> Create New Quiz </li>
    <li><i className="fa fa-list-alt" aria-hidden="true"></i> Lists </li>
    <li><i className="fa fa-birthday-cake" aria-hidden="true"></i> Birthdays </li>
    <li><i className="fa fa-users" aria-hidden="true"></i> Friends </li>
   </div>

      <div className="user-info" id="user-info">
      <h1>Welcome {this.props.loggedUser.username} !</h1>
       <img src={imageUrl} />

       <Link to='/quizinfo' >
         <button style={{backgroundColor: cssStyle.pink, color:cssStyle.white}} className="buttonStyle" >Create New Quiz!</button>
         </Link>
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

var UserContentContainer= connect(mapStateToProps)(UserContent);

export default UserContentContainer;
