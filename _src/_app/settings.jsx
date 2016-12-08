import Select from './forms.jsx';
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
         <div>
             <h2>Settings</h2>
             <Select label="Choose your preferred item ordering: " options={this.orderOptions} value={this.state.activeOrderOption} />
         </div>
    );
  }
}
