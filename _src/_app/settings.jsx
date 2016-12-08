import {Select, Username} from './forms.jsx';
import React from 'react';


export default class Settings extends React.Component {

  constructor(props){
    super(props);

    this.orderOptions = [
        { value: 'manual', label: 'manual', description: 'You manually select the order (see below).'},
        { value: 'automatic', label: 'automatic', description: 'The order is automatically adjusted when you enter a shop. For example, when you enter a COOP supermarket, the items are displayed in the correct order.'},
        { value: 'alphabetical', label: 'alphabetical', description: 'Items are ordered in alphabetical order (ascending).'},
    ],
    this.state = {
        activeOrderOption: 'alphabetical',
        userName: '',
        preferences: ['vegan', 'vegetarian', 'lactose intolerant']
    };
    /* Bind methods */
  }

    onOrderOptionsSelect(){

    }

  render(){
    return(
         <div className="container-fluid">
             <h2>Settings</h2>
             <div className="row">
                 <div className="col-xs-12">Username</div>
                 <Username />
             </div>
             <div className="row">
                 <div className="col-xs-12">Choose your preferred item ordering: </div>
                 <div className="col-xs-12"><Select  options={this.orderOptions} value={this.state.activeOrderOption} /></div>
             </div>

         </div>
    );
  }
}
