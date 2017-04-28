
var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import cssStyle from '../css-variables.js'

var ItemPic= function(props){



  return(
<div className='item-pic'>
  <a href={props.content.buyLink}> <img src={props.content.picLink}/></a>
</div>

  );
};

var ItemName= function(props){

   var newTitleOfItem= props.content.titleOfItem.substr(0, 21) + '....'


    return (
      <div className='item-info'>

        <a  href={props.content.buyLink} target="_blank"  >{newTitleOfItem}</a>

      </div>
    );
};


var ItemPrice= function(props){

    return (
      <div className='item-price'>

        <a>{props.content.LowestNewItemPrice}</a>

      </div>
    );
};



var Item= function(props){


    var item_content= props.content

    return(

      <div style={{backgroundColor:'white', border:' 4px solid white', padding:'5px', borderRadius:'4px'}} className='itemdiv'>

            <a   target="_blank" href={ item_content.buyLink}>
              <ItemPic content={ item_content }/>
              </a>

          <ItemName content={ item_content }/>

          <ItemPrice content={ item_content }/>

      </div>
    );
};

var mapStateToProps= function(state){

  return {
  contents:state.contents,
  callArray:state.callArray
  }

}

var Itemdiv= connect(mapStateToProps)(Item);


export default Itemdiv;
