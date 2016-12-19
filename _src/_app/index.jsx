import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';
import ListoSearch from './search.jsx';
import Modal from 'react-modal';
import Settings from './settings.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Stylesheets
require('./style.scss');

class Menu extends React.Component {
    render() {
        return (
            <div className="overlayMenu slideInLeft">
                <ul>
                    <li className="menuTitle">Your lists</li>
                    <li>🛍 Weekly shopping</li>
                    <li>🎉 New Year's Eve</li>
                    <li>⚽️ Champions League final</li>
                    <li className="menuNewList">+ Create New List</li>
                </ul>
            </div>
        );
    }
}

class NavTop extends React.Component {
  render(){
    return (
        <div className="nav_wrapper_top">
            <div className="nav_top">
                <p>🎉 New Year's Eve</p>
            </div>
        </div>
    );
  }
}

class NavBottom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            showTeam: false,
            showSettings: false,
            modalIsOpen: false,
        }
        this.handleMenu = this.handleMenu.bind(this);
        this.handleTeam = this.handleTeam.bind(this);
        this.handleSettings = this.handleSettings.bind(this);
        /*
        this.displayModal = this.displayModal.bind(this);
        this.closeModal = this.closeModal.bind(this);*/
    }

    handleMenu(e) {
        this.setState({showMenu: !this.state.showMenu});
    }

    handleTeam(e) {
        this.setState({ showTeam: !this.state.showTeam });
    }

    handleSettings(e) {
        this.setState({ showSettings: !this.state.showSettings });
    }
    /*
    displayModal() {
        this.handleMenu();
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }*/

    render() {
        return (
            <div className="nav_wrapper">
                {this.state.showMenu ? <Menu />: null }
                {this.state.showTeam ? <Team closePopup={this.handleTeam} />: null }
                {this.state.showSettings ? <Settings closePopup={this.handleSettings} /> : null }
                <div className="nav">
                    <ul>
                        <li className="menu" onClick={this.handleMenu}><span>Menu</span></li>
                        <li className="collaborate" onClick={this.handleTeam}><span>Team</span></li>
                        <li className="menu" onClick={this.handleSettings}><span>Settings</span></li>
                    </ul>
                </div>
            </div>
        );
    }
}

class Team extends React.Component {

  constructor(props){
    super(props);
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup(e){
    this.props.closePopup();
  }

  render(){
    return(
      <div className="popup_wrapper">
        <div className="popup_box bounceInUp">
          <h1>Cooking Bros</h1>
          <button onClick={this.closePopup}>Close</button>
          <div className="team_wrapper">
            <div className="team_person">
              <img src="basil_menz.png" />
              <p>You</p>
            </div>
            <div className="team_person">
              <img src="oliver_fischer.png" />
              <p>Marcel Bühler</p>
            </div>
            <div className="team_person">
              <img src="simeon_bieri.png" />
              <p>David Haas</p>
            </div>
            <div className="team_person">
              <img src="new_member.png" />
              <p>+ Add Member</p>
            </div>
          </div>
          <button onClick={this.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}

class DetailPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="detailWrapper">

            </div>
        );
    }
}

class Item extends React.Component {

    constructor(props) {
        super(props);
        /* Bind methods */
        this.handleEventClick = this.handleEventClick.bind(this);
        this.addItemToActiveList = this.addItemToActiveList.bind(this);
        this.deleteItemFromActiveList = this.deleteItemFromActiveList.bind(this);
        this.fakeButton = this.fakeButton.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            showDetail: false,
            modalIsOpen: false,
            wasAdded: false,
            strings: {0: 'no', 1: 'yes'}
        };

    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentWillMount() {
        this.firebaseRef = Firebase.database().ref();
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    handleEventClick(e) {
        if (e.ctrlKey) {// Ctrl key has been pressed -> simulate long click
            this.openModal();
        } else if (this.props.category.match("searchData")) {
            if(!this.props.alreadyAdded){
              this.setState({ wasAdded: true });
              this.addItemToActiveList(this.props.item);
                this.props.closeSearch();
            }
            else if(this.props.alreadyAdded || this.state.wasAdded){
              this.deleteItemFromActiveList(this.props.item.id);
              this.showStepBackButton(this.props.item);
            }
        }
        else {
            this.deleteItemFromActiveList(this.props.item.id);
            this.showStepBackButton(this.props.item);
        }
    }

    addItemToActiveList(item) {
        this.firebaseRef.child("activeItems/" + item.id).set(item);
    }

    deleteItemFromActiveList(itemID) {
        if (itemID) {
            console.log("id:" + itemID);
            this.firebaseRef.child("activeItems/" + itemID).remove();
        }
    }

    fakeButton(e) {
        this.openModal();
        this.setState({showDetail: true});
    }

    showStepBackButton(item) {
      this.props.showStepBackButton(item);
    }

    render() {
        return (
            <div className={(this.state.wasAdded || this.props.alreadyAdded) ? "item_wrapper popIn wasAdded" : "item_wrapper popIn"}>
                {this.state.showDetail ? <DetailPage item={this.props.item}/> : null}
                <div className="item" onClick={this.handleEventClick}>
                    <h1>{this.props.item.name}</h1>
                    <img src={this.props.item.url}/>
                    {this.props.item.comment ? <h2>{this.props.item.comment}</h2> :
                        <h2 className="emptyComment">empty</h2>}
                </div>
                <div className="fakeButton" onClick={this.fakeButton}>Press</div>

                {/* Details about product */}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                >
      <div className="popup_wrapper">
        <div className="popup_box bounceInUp">
                    <div className="container">
                        <div className="col-xs-12"><h1><p className="detail_product">{this.props.item.name}</p></h1></div>
                    {/* fill here all other aspects */}
                    <div className="col-xs-6"><span className="">fat:</span></div><div className="col-xs-6">{this.props.item.fat}</div>
                    <div className="col-xs-6"><span className="">salt:</span></div><div className="col-xs-6">{this.props.item.salt}</div>
                    <div className="col-xs-6"><span className="">sugar:</span></div><div className="col-xs-6">{this.props.item.sugar}</div>
                    <div className="col-xs-6"><span className="">glutenfree:</span></div><div className="col-xs-6">{this.state.strings[this.props.item.glutenfree]}</div>
                    <div className="col-xs-6"><span className="">vegan:</span></div><div className="col-xs-6">{this.state.strings[this.props.item.vegan]}</div>
                    <div className="col-xs-12 detail_image"><img src={this.props.item.url} width="150px"/></div>
                    <button onClick={this.closeModal}>Close</button>
                        </div>
            </div>
          </div>
                </Modal>

            </div>


        );
    }
}

class Listing extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var allElements = [];

        /* Iterate through array and add DOM element for each item */
        for (var i = 0; i < this.props.items.length; i++) {
           // Search Data Listing
           if(this.props.category == "searchData") {
             var alreadyAdded = false;
              for(var j=0; j<this.props.activeData.length ;j++){
                if(this.props.activeData[j].name == this.props.items[i].name){
                  alreadyAdded = true;
                }
              }
              allElements.push(
                <Item closeSearch={this.props.closeSearch} item={this.props.items[i]} key={"search_" + this.props.items[i].id} category={this.props.category} alreadyAdded={alreadyAdded} showStepBackButton={this.props.showStepBackButton} />
              );
            }
            // Active Data Listing
            else {
              allElements.push(
                <Item item={this.props.items[i]} showStepBackButton={this.props.showStepBackButton} key={"active_" + this.props.items[i].id} category={this.props.category}/>
              );
            }
        }

        if (!this.props.items || this.props.items.length == 0) {
            return (null);
        }

        else {
            return (
                <div className={this.props.category}>
                    {allElements}
                </div>
            );
        }
    }
}

class Main extends React.Component {

    constructor(props) {
        super(props);

        /* Initializing all States */
        this.state = {
            searchData: [],
            activeData: [],
            allData: [],
        }

        /* Binding all methods. ES16 FTW */
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.getActiveData = this.getActiveData.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
        this.showStepBackButton = this.showStepBackButton.bind(this);
        this.stepBackAction = this.stepBackAction.bind(this);
    }

    componentWillMount() {
        this.firebaseRef = Firebase.database().ref();
        this.getActiveData();
        this.getAllData();
    }

    componentWillUnmount() {
        Firebase.off();
    }

    resolve() {
        console.log('test');
    }

    closeSearch(){
        this.state.searchData = [];
        document.getElementById('searchBar').value = "";
    }

    showStepBackButton(item){
        this.setState({ showStepBackButtonItem: item });
        setTimeout(function(){
          this.setState({ showStepBackButtonItem: null });
        }.bind(this), 3000);
    }

    stepBackAction(e){
      if(this.state.activeData.indexOf(this.state.showStepBackButtonItem) == -1){
        this.firebaseRef.child("activeItems/" + this.state.showStepBackButtonItem.id).set(this.state.showStepBackButtonItem);
        this.setState({
          showStepBackButtonItem: null
        });
      }
    }

    /* Get all items that the user have to buy */
    getActiveData() {

        var newActiveData = [];

        /* Adds all items from Firebase database once */
        this.firebaseRef.child("activeItems").on("child_added", function (dataSnapshot) {
            var data = dataSnapshot.val();
            data.id = dataSnapshot.key;
            newActiveData.push(data);
            this.setState({activeData: newActiveData});
        }.bind(this));

        /* Changes information about item if database was updates (realtime and blanzingly fast) */
        this.firebaseRef.child("activeItems").on("child_changed", function (dataSnapshot) {
            for (var i in newActiveData) {
                if (newActiveData[i].id == dataSnapshot.key) {
                    var data = dataSnapshot.val();
                    data.id = dataSnapshot.key;
                    newActiveData[i] = data;
                    this.setState({activeData: newActiveData});
                }
            }
        }.bind(this));

        /* Removes item from the list in the app (for collaboration) */
        this.firebaseRef.child("activeItems").on("child_removed", function (dataSnapshot) {
            for (var i in newActiveData) {
                if (newActiveData[i].id == dataSnapshot.key) {
                    newActiveData.splice(i, 1);
                    this.setState({activeData: newActiveData});
                }
            }
        }.bind(this));

    }

    /* Get all items and store in array */
    getAllData() {

      var newAllData = [];

      /* Adds all items from Firebase database once */
      this.firebaseRef.child("allItems").on("child_added", function (dataSnapshot) {
          var data = dataSnapshot.val();
          data.id = dataSnapshot.key;
          newAllData.push(data);
          this.setState({allData: newAllData});
      }.bind(this));

      /* Changes information about item if database was updates (realtime and blanzingly fast) */
      this.firebaseRef.child("allItems").on("child_changed", function (dataSnapshot) {
          for (var i in newAllData) {
              if (newAllData[i].id == dataSnapshot.key) {
                  var data = dataSnapshot.val();
                  data.id = dataSnapshot.key;
                  newAllData[i] = data;
                  this.setState({allData: newAllData});
              }
          }
      }.bind(this));

      /* Removes item from the list in the app (for collaboration) */
      this.firebaseRef.child("allItems").on("child_removed", function (dataSnapshot) {
          for (var i in newAllData) {
              if (newAllData[i].id == dataSnapshot.key) {
                  newAllData.splice(i, 1);
                  this.setState({allData: newAllData});
              }
          }
      }.bind(this));

    }

    onChangeSearch(e) {
        var newSearchResults = [];
        if (e.target.value && e.target.value != " ") {
            for(var i in this.state.allData){
              if((this.state.allData[i].name.toLowerCase()).includes(e.target.value)){
                newSearchResults.push(this.state.allData[i]);
              }
            }
            this.setState({searchData: newSearchResults});
        }
        if (e.target.value == " " || e.target.value == ""){
          var newSearchResults = [];
          this.setState({searchData: newSearchResults});
        }
    }

    render() {

        return (

            <div className="content_wrapper">

                {this.state.showStepBackButtonItem ? <button className="back_button bounceInUp" onClick={this.stepBackAction}>↻ Undo</button> : null}

                <div className="searchfield">
                <input id="searchBar" className="serachBar" placeholder="Search..." onChange={this.onChangeSearch} />
                <Listing closeSearch={this.closeSearch} items={this.state.searchData} category="searchData" activeData={this.state.activeData} showStepBackButton={this.showStepBackButton} />
                </div>

                <div id="content_optional_wrapper">

                    {/* Show active Items */}
                    {this.state.searchData.length == 0 ? <Listing items={this.state.activeData} category="activeData" showStepBackButton={this.showStepBackButton} /> : null}

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
                <NavTop />
                <Main />
                <NavBottom />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
