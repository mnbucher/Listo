import SimpleFormDemo from './forms.jsx';
import React from 'react';


export default class Settings extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        orderOptions: [
            { name: 'manual', description: 'You manually select the order (see below).'},
            { name: 'automatic', description: 'The order is automatically adjusted when you enter a shop. For example, when you enter a COOP supermarket, the items are displayed in the correct order.'},
            { name: 'alphabetical', description: 'Items are ordered in alphabetical order (ascending).'},
        ],
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
             hi
             <SimpleFormDemo></SimpleFormDemo>
         </div>
    );
  }
}
