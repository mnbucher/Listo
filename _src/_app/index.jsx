import React from 'react';
import {render} from 'react-dom';
import Firebase from 'firebase';
import ListoSearch from './search.jsx'
// Stylesheets
require('./style.scss');

class Navigation extends React.Component {
  render(){
    return(
      <div className="nav_wrapper">
        <div className="nav">
          <ul>
            <li className="menu"><span>Menu</span></li>
            <li className="logo"><span>Listo</span></li>
            <li className="collaborate"><span>Team</span></li>
          </ul>
        </div>
      </div>
    );
  }
}

class Listing extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    var allElements = [];

    /* Add H1 title if there is a title */
    if(this.props.title != ""){
      allElements.push(<h1 key={this.props.title}>{this.props.title}</h1>);
    }

    /* Iterate through array and add DOM element for each item */
    for (var i=0; i<this.props.items.length; i++){
      allElements.push(
        <Item item={this.props.items[i]} key={this.props.items[i].id} category={this.props.category} />
      );
    }

    if(!this.props.items || this.props.items.length == 0){ return(null); }
    else {
      return(
        <div className={this.props.category}>
        {allElements}
        </div>
      );
    }

  }
}

class Item extends React.Component {

  constructor(props){
    super(props);
    /* Bind methods */
    this.handleEventClick = this.handleEventClick.bind(this);
    this.addItemToActiveList = this.addItemToActiveList.bind(this);
    this.deleteItemFromActiveList = this.deleteItemFromActiveList.bind(this);
  }

  componentWillMount(){
    this.firebaseRef = Firebase.database().ref();
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  handleEventClick(e) {
    if(this.props.category.match("searchData|frequentData|allData")){
      this.addItemToActiveList(this.props.item.id);
    }
    else {
      this.deleteItemFromActiveList(this.props.item.id);
    }
  }

  addItemToActiveList(itemID){
    console.log(item.id);
  }

  deleteItemFromActiveList(itemID){
    var c = confirm("Wills du dieses Element wirklich löschen? (Wag es ja nicht...) ");
    if(c){
      console.log(itemID);
      if(itemID){
        this.firebaseRef.child("activeItems/" + itemID).remove();
      }
    }
  }

  render(){
    return(
      <div className="item" onClick={this.handleEventClick}>
        <h1>{this.props.item.name}</h1>
        <h2>{this.props.item.comment}</h2>
      </div>
    );
  }
}

class Main extends React.Component {

  constructor(props){
    super(props);

    /* Initializing all States */
    this.state = {
      searchString: null,
      searchData: [],
      activeData: [],
      frequentData: [],
      allData: []
    }

    /* Binding all methods. ES16 FTW */
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.getActiveData = this.getActiveData.bind(this);
    this.getFrequentData = this.getFrequentData.bind(this);
    this.getAllData = this.getAllData.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);

  }

  componentWillMount(){
    this.firebaseRef = Firebase.database().ref();
    this.getActiveData();
    this.getFrequentData();
    this.getAllData();
  }

  componentWillUnmount() {
    Firebase.off();
  }
  resolve(){console.log('test');}

  /* Get all items that the user have to buy */
  getActiveData(){

    var newActiveData = [];

    /* Adds all items from Firebase database once */
    this.firebaseRef.child("activeItems").on("child_added", function(dataSnapshot){
        var data = dataSnapshot.val();
        data.id = dataSnapshot.key;
        newActiveData.push(data);
        this.setState({ activeData: newActiveData });
    }.bind(this));

    /* Changes information about item if database was updates (realtime and blanzingly fast) */
    this.firebaseRef.child("activeItems").on("child_changed", function(dataSnapshot){
      for(var i in newActiveData){
        if(newActiveData[i].id == dataSnapshot.key){
          var data = dataSnapshot.val();
          data.id = dataSnapshot.key;
          newActiveData[i] = data;
          this.setState({ activeData: newActiveData });
        }
      }
    }.bind(this));

    /* Removes item from the list in the app (for collaboration) */
    this.firebaseRef.child("activeItems").on("child_removed", function(dataSnapshot){
      for(var i in newActiveData){
        if(newActiveData[i].id == dataSnapshot.key){
          newActiveData.splice(i,1);
          this.setState({ activeData: newActiveData });
        }
      }
    }.bind(this));

  }

  /* Get all items that the user adds often (in reality based on special algorithm, history, etc...) */
  getFrequentData(){

  }

  /* Get all items to display in the app */
  getAllData(){

  }

  onChangeSearch(e){
    if(e.target.value && e.target.value == " "){
      this.setState({
        searchString: e.target.value
      });
      //document.getElementById("content_optional_wrapper").addClassName = "hidden";
      //console.log(document.getElementById("content_optional_wrapper"));
    }
  }

  render(){

    return (
      <div className="content_wrapper">

        <Listing items={this.state.searchData} category="searchData" title=""/>

        <ListoSearch />

        <div id="content_optional_wrapper">

          {/* Show active Items */}
          <Listing items={this.state.activeData} category="activeData" title=""/>

          {/* Show frequent Items */}
          <Listing items={this.state.frequentData} category="frequentData" title="Recently added"/>

          {/* Show all Items */}
          <Listing items={this.state.allData} category="allData" title="All Products"/>

        </div>

      </div>
    );
  }

}

class App extends React.Component {

  componentWillMount() {
    this.initializeFirebase();
  }

  initializeFirebase() {
    /* Firebase Initialization
       The config variable is stored in another file (see HTML header) and is not stored over Github */
    Firebase.initializeApp(config);
  }

  render() {
    return (
      <div>
        <Navigation />
        <Main />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
