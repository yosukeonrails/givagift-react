require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
import {connect} from 'react-redux';
import SignUpContainer from './sign-up.js'
import SignUpLoginContainer from './signup-login.js'
import UserSignUpContainer from './user-signup.js'
import LoginContainer from './login.js'
import {getGiftLists} from '../actions/index.js'
var listarrayContainerVar;
import ListsArrayContainer from './listsarray.js'
var view='.givaquiz';
var viewModes=[ '.whatwedo','.affiliate','.givaquiz','.lists'];
var imageURL;
var username=''



export class UserPage extends React.Component{

  constructor(props){
    super(props)

    this.goTo= this.goTo.bind(this);


  }

  goTo(event){

        view=event.target.id;

        var element;

        for(var i=0 ; i <viewModes.length; i++){
          if(view == viewModes[i]){
            element=$(viewModes[i]);

            element.css("display", "block");
      }  else {
            element=$(viewModes[i]);
            element.css("display", "none");

      }

  }

    this.setState({
      random:'random'
    });
  }

  render () {
var imageUrl=''


if(this.props.loggedUser){


    username= this.props.loggedUser.username;
    listarrayContainerVar= <ListsArrayContainer user={this.props.loggedUser.facebookId}/>
     imageUrl="https://graph.facebook.com/"+this.props.loggedUser.facebookId+"/picture?width=300&height=300";

   if(this.props.loggedUser.token=== 'random'){
     imageUrl= 'https://source.unsplash.com/1lnDA2RQRqA/300x300';
   }

} else {
   listarrayContainerVar=""
   username=""
}



var element;


    $('body').css("background-color", "#FFD488");
  $('body').css("background-image", "url(http://i1149.photobucket.com/albums/o592/Yosuke_Ayrton_Hishinuma/ian-schneider-108618_zpsmxarsa3k.jpeg)");

    return(


<div className='user-dashboard'>

      <div className="profile-side-bar">

          <div className="user-information">
            <div className="user-image" style={{ backgroundImage: 'url('+imageUrl+')' }}></div>
              <h1>{username}</h1>
                </div>

          <div className= "user-nav">
            <li>  <i className="fa fa-check-square-o" aria-hidden="true"><h2 onClick ={this.goTo} id=".givaquiz"> GivaQuiz </h2></i> </li>
              <li><i className="fa fa-list-alt" aria-hidden="true"></i><h2 onClick ={this.goTo} id=".lists">Gift Lists</h2></li>


            </div>

            <div className="menu-bar">
            <i className="fa fa-bars" aria-hidden="true"></i><h2>Menu</h2>
            <Link to="/home"><button> <li>Sign Out</li></button></Link>
              <button><li onClick ={this.goTo} id=".whatwedo">About</li> </button>
            <button><li onClick ={this.goTo} id=".affiliate" >Affiliate</li> </button>
            <button><li onClick ={this.goTo} id=".givaquiz" >GivaQuiz</li> </button>
            </div>
         </div>
      <div className="rightside-content">

         <div  className="givaquiz fadeinfast"  id="givaquiz">
            <h1> GivaQuiz </h1>
            <i className="fa fa-check-square-o" aria-hidden="true"></i>
         <p> Take this short quiz and let us help you find an awesome gift!</p>
        <Link to="/quizinfo"><h2>Start Quiz</h2></Link>
         </div>

          <div className="lists fadeinfast">
          <h4>Gift Lists</h4>
          <i className="fa fa-list-alt" aria-hidden="true"></i>
                {listarrayContainerVar}
           </div>


         <div  className="affiliate fadeinslow"  id="affiliate">
          <h1>  Givagift is an Amazon Affiliate </h1>
           <i className="fa fa-amazon" aria-hidden="true"></i>
           <p>  Givagifts is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.com. Amazon, the Amazon logo, AmazonSupply, and the AmazonSupply logo are trademarks of Amazon.com, Inc. or its affiliates.
           If you require any more information or have any questions about our site&#x27;s disclaimer, please feel free to contact us at givagifts-support@gmail.com .</p>
         </div>

         <div  className="whatwedo fadeinslow" id="whatwedo">
            <h1>What We Do</h1>
            <p> We have all faced the akward situations in life.Like that day you forgot it was your mother&rsquo;s birthday, or that day when you were so in a hurry to buy a Christmas gift that you bought a gift just above &ldquo;okay&rdquo;.What we do is very simple. We will let you know in advance , the birthdays that are most important to you. Then when the time comes, we help you find a gift that is most suitible for them. This is done thhrough the GivaQuiz which is a series of questions that leads you to a set of results depending on the answers you give in the quiz.   </p>
         </div>


        </div>
</div>


    );
  }
}


  var mapStateToProps= function(state){
  
        return {
            loggedUser:state.loggedUser,
            giftlists:state.giftlists
        }
  }

   var UserPageContainer= connect(mapStateToProps)( UserPage);

export default  UserPageContainer;
