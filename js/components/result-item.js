
var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import cssStyle from '../css-variables.js'


      export class ResultItem extends React.Component {
            constructor(props){

            super(props);
        
            }

            render(){


              var newTitleOfItem= this.props.content.titleOfItem.substr(0, 21) + '....';
                 var item_content= this.props.content;

            return(

                  <div className="result-item">
                    <img src={this.props.content.picLink} alt=""></img>

                    <a  href={this.props.content.buyLink} target="_blank"  ><h1>{newTitleOfItem}</h1></a>
                    <h2>{this.props.content.LowestNewItemPrice}</h2>
                    </div>

            );

            }

      }



var mapStateToProps= function(state){

  return {
  contents:state.contents,
  callArray:state.callArray
  }

}

var ResultItemContainer= connect(mapStateToProps)(ResultItem);


export default ResultItemContainer;
