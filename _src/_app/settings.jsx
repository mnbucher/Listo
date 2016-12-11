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
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup(e){
    this.props.closePopup();
  }

  render(){
    return(
      <div className="popup_wrapper">
        <div className="popup_box bounceInUp popup_settings">
             <h1>Settings</h1>
             <div className="settings_wrapper">
                <p>Name:</p>
                <input value="Jamie Oliver"/>
             </div>
             <div className="settings_wrapper">
                 <p>Choose your preferred item ordering: </p>
                 <Select  options={this.orderOptions} value={this.state.activeOrderOption} />
             </div>
             <button onClick={this.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}
