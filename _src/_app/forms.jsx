import React from 'react';

export default class Select extends React.Component {
    /**
     * needed props: options: [{}, {}]
     * @param props
     */
    constructor(props) {
    super(props);
    this.state = {
        value: this.props.value,
        checkmarkVisible: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

    confirmChange() {
        this.setState({checkmarkVisible: true});
    }

  handleChange(event) {
    this.setState({value: event.target.value});
  this.confirmChange();
  }

    getSelectOptions(){
        return this.props.options.map(function(object, i){
            return <option key={object.value}>{object.label}</option>;
        });
    }

    render(){
        return (
            <div>
                <label>
                    <p>{this.props.label}</p>
                  <select value={this.state.value} onChange={this.handleChange}>
                      {this.getSelectOptions()}
                  </select>
                    {this.state.checkmarkVisible ? <span className="glyphicon glyphicon-check"></span> : null}
                </label>
            </div>
            );
        }
}