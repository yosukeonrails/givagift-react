

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import featured_items from '../featured-items.js';
import {connect} from 'react-redux';
var renderedIndex= 0;
var nomargin= {
  margin:0,
  padding:0
};
var colorIndex= 0;

var colorScheme= [
{
color1:'#465668',
color2:'rgba(128, 192, 219, 0.97)'
},
{
color1:'#9a4848',
color2:'rgba(219, 128, 128, 0.97)'
},
{
color1:'#e0ae57',
color2:'rgba(246, 205, 130, 0.97)'
},
{
color1:'#6bb6a7',
color2:'rgba(130, 246, 171, 0.97)'
}


];



export class Featured extends React.Component{

  constructor(props){
    super(props);
      this.goLeft= this.goLeft.bind(this);
        this.goRight= this.goRight.bind(this);
        this.goToItem= this.goToItem.bind(this);
  }

  goToItem(){


        window.open(featured_items[renderedIndex].url);
  }

  goLeft(){

var dis=this;

$('.featured-inner-container img').stop();
  $('.featured-outter-container').stop();
  $('.featured-description-outter').stop();

    $('.featured-inner-container img').animate({width:'0%'},300,function(){

          if(colorIndex===0){
            colorIndex = colorScheme.length -1;
          } else {
            colorIndex=colorIndex-1;
          }

      $('.featured-outter-container').css('background-color' , colorScheme[colorIndex].color1);
   $('.featured-description-outter').css('background-color' , colorScheme[colorIndex].color2);


          if(renderedIndex===0){
            renderedIndex= featured_items.length-1;

              dis.setState({
              renderedIndex:renderedIndex
            });
              $('.featured-inner-container img').animate({width:'50%'}, 300);
              return;
          }

          renderedIndex= renderedIndex-1;
          dis.setState({
            renderedIndex:renderedIndex
          });
            $('.featured-inner-container img').animate({width:'50%'}, 300);

    });


  }

  goRight(){

var dis=this;
          $('.featured-inner-container img').stop();
            $('.featured-outter-container').stop();
            $('.featured-description-outter').stop();

          if(colorIndex===colorScheme.length-1){
            colorIndex=0;
          } else {
            colorIndex=colorIndex+1;
          }
            $('.buy-button button').css('border-color' , colorScheme[colorIndex].color1);
      $('.featured-outter-container').css('background-color' , colorScheme[colorIndex].color1);
       $('.featured-description-outter').css('background-color' , colorScheme[colorIndex].color2);
  $('.featured-inner-container img').animate({width:'0%'}, 300 , function(){

    if(renderedIndex===featured_items.length-1){
      renderedIndex=0;

          dis.setState({
            renderedIndex:renderedIndex
          });
            $('.featured-inner-container img').animate({width:'50%'}, 300);
        return;
    }

    renderedIndex= renderedIndex+1;

      dis.setState({
      renderedIndex:renderedIndex
    });

        $('.featured-inner-container img').animate({width:'50%'}, 300);

  });


  }

  render(){



    return (
        <div className="featured-container">




                                    <div  style={nomargin}  className="row">
                                    <div  style={nomargin} className="col-md-6">

                                    <div className="featured-outter-container">

                                    <div className="featured-diamond">
                                    <div className="featured-inner-container">
                                    <div className="featured-image-container">
                                    <button onClick={this.goLeft}><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
                                    <img  onClick={this.goToItem}  src={featured_items[renderedIndex].imageURL} alt=""></img>
                                    <button onClick={this.goRight}>  <i className="fa fa-chevron-right" aria-hidden="true"></i></button>
                                    </div>
                                    </div>

                                    </div>

                                    </div>

                                    </div>
                                    <div  style={nomargin}  className="featured-description col-md-6">
                                    <div className="featured-description-outter">
                                    <div className="featured-description-inner">
                                    <h1>{featured_items[renderedIndex].name}</h1>
                                    <h1>{featured_items[renderedIndex].price} </h1>
                                    <p>{featured_items[renderedIndex].description}</p>

                                    <div  onClick={this.goToItem} className="buy-button">
                                        <button>Buy</button>
                                    </div>

                                  </div>



                                  </div>
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

var FeaturedContainer= connect(mapStateToProps)(Featured );

export default  FeaturedContainer;
