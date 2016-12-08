import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            checkmarkVisible: false,
    };
       this.handleChange = this.handleChange.bind(this);
    this.confirmChange = this.confirmChange.bind(this);
  }

    confirmChange() {
        this.setState({checkmarkVisible: true});
    }

  handleChange(event) {
  this.confirmChange();
  }
}


export class Select extends React.Component {
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
    this.confirmChange = this.confirmChange.bind(this);
    this.hideCheckmark = this.hideCheckmark.bind(this);
  }

    confirmChange() {
        this.setState({checkmarkVisible: true});
        setTimeout(this.hideCheckmark, 5000);
    }

    hideCheckmark() {
        this.setState({checkmarkVisible: false});
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
                    {this.state.checkmarkVisible ? <span className="fading" ><span className="glyphicon glyphicon-ok green"></span></span> : null}
                </label>
            </div>
            );
        }
}

export class Username extends Input {
    render(){
        return ( <div>
                <input placeholder="username" type="text"/>
                {this.state.checkmarkVisible ? <span className="glyphicon glyphicon-ok green"></span> : null}
            </div>
    )
    }
}