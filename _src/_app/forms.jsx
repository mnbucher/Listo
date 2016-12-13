import React from 'react';
import ReactBootstrapToggle from 'react-bootstrap-toggle';

class Input extends React.Component {
    /* inherit from this class in order to use the fading in and out checkmark
    * after the input element insert:
    * {this.state.checkmarkVisible ?  this.checkmark : null}
    * */
    constructor(props) {
        super(props);

        this.checkmark = <span className="fading"><span className="glyphicon glyphicon-ok green"></span></span>;
        this.state = {
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
        this.confirmChange();
    }
}


export class Select extends Input {
    /**
     * needed props: options: [{}, {}]
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            //checkmarkVisible: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.confirmChange();
    }

    getSelectOptions() {
        return this.props.options.map(function (object, i) {
            return <option key={object.value}>{object.label}</option>;
        });
    }

    render() {
        return (
            <div>
                <label>
                    <p>{this.props.label}</p>
                    <select value={this.state.value} onChange={this.handleChange}>
                        {this.getSelectOptions()}
                    </select>
                    {this.state.checkmarkVisible ?
                        this.checkmark : null}
                </label>
            </div>
        );
    }
}

export class Username extends Input {
    render() {
        return ( <div>
                <input placeholder="username" name="username" value={this.props.value} type="text"></input>
                {this.state.checkmarkVisible ? <span className="glyphicon glyphicon-ok green"></span> : null}
            </div>
        )
    }
}

export class Checkbox extends Input {
    render() {
        return (
                        <div className="form-group">

                            <input type="checkbox" name={this.props.key} id={this.props.key} onChange={this.handleChange} />&nbsp;
                            <label for={this.props.key}>{this.props.label}</label>
                            {this.state.checkmarkVisible ? <span className="glyphicon glyphicon-ok green"></span> : null}
                        </div>

        )
    }
}