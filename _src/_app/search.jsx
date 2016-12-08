import React from 'react';
import Search from 'react-search';
import Firebase from 'firebase';

export default class ListoSearch extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: [
      ],
    };
    /* Bind methods */
  }

  componentWillMount() {
    this.firebaseRef = Firebase.database().ref();

    var newActiveData = [];

    /* Adds all items from Firebase database once */
    this.firebaseRef.child("allItems").on("child_added", function(dataSnapshot){
        var data = {};
      data.value = dataSnapshot.val().name;
        data.id = dataSnapshot.key;
        newActiveData.push(data);
      this.setState({items: newActiveData});
    }.bind(this));
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }


  render(){
    return(
         <Search items={this.state.items}  />
    );
  }
}