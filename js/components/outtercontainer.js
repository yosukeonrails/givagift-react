

var React = require('react');
var ReactDOM = require('react-dom');
import InnerContainer from './innercontainer.js';
import {ArrowLeft, ArrowRight, initializeResults} from '../actions/index.js'
import {connect} from 'react-redux';
import cssStyle from '../css-variables.js'

 export class OutterContainer extends React.Component{


      constructor(props){
       super(props);

       this.leftClick= this.leftClick.bind(this);
       this.rightClick= this.rightClick.bind(this);

      }

      leftClick(){


        this.props.dispatch(ArrowLeft(this.props.id));

      }

      rightClick(){


          this.props.dispatch(ArrowRight(this.props.id));

      }

      render(){



        return (

          <div style={{borderRadius:'4px'}} className='outtercontainer'>

          <div style={{height:'350px', width:'50px', float:'left'}}>
            <i  style={{color:cssStyle.white ,float:'left', marginTop:'150px', marginLeft:'10px'}} className="fa fa-chevron-left" aria-hidden="true" onClick = {this.leftClick} ></i>
            </div>

          <InnerContainer id={this.props.id}/>

            <div style={{height:'350px', width:'50px',  float:'right'}}>
              <i style={{color:cssStyle.white, float:'right', marginTop:'150px', marginRight:'10px'}} className="fa fa-chevron-right" aria-hidden="true" onClick = {this.rightClick} ></i>
            </div>

          </div>
        );
      }
 }


var mapStateToProps= function(state){

  return {
    contents:state.contents
  }

}

var Container= connect(mapStateToProps)(OutterContainer);

export default Container;
