import React from 'react';

export default class SearchBar extends React.Component {
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
        return(
        <div className="searchfield">
          <input onChange={this.onChangeSearch} placeholder="Search..." ></input>
        </div>
        );
      }
}