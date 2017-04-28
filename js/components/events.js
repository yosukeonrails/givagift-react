

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';


export class Events extends React.Component{

  constructor(props){
    super(props);
  
  }


  render(){




    return (

      <div className="events-coming">

           <div className="events-coming-head">
           <h1>Events Coming Soon</h1>
           </div>


     <div className="events-coming-content">

       <div className="event-card-container">
                   <div  className="event-card w3-panel w3-card-4">
                   <h1>April Fools</h1>

                       <div className="calendar-box">
                               <div className="calendar-month">
                               <h1>April</h1>
                               </div>
                               <div className="calendar-day">
                               <h1> 1 st</h1>
                               </div>
                       </div>


                             <div className="event-info">
                                 <p> Its the time of the year we prank all our closest friends!
                                     Come find the best April Fools gift reccomendations!
                                 </p>
                             </div>

                   </div>
               </div>


                 <div className="event-card-container">
                   <div  className="event-card w3-panel w3-card-4">
                             <h1>April Fools</h1>

                             <div className="calendar-box">
                                   <div className="calendar-month">
                                   <h1>April</h1>
                                   </div>
                                   <div className="calendar-day">
                                   <h1> 1 st</h1>
                                   </div>
                             </div>


                             <div className="event-info">
                                   <p> Its the time of the year we prank all our closest friends!
                                   Come find the best April Fools gift reccomendations!
                                   </p>
                             </div>
                         </div>
                   </div>


           </div>
           </div>


    );
  }
}


var mapStateToProps= function(state){


};


var EventsContainer= connect(mapStateToProps)(Events);

export default EventsContainer;
