import React from 'react'

import './Select.css'

export class Select extends React.Component {

    buildOptions () {
        return this.props.options.map(opt => (<option key={opt.value}value={opt.value}>{opt.label}</option>))
    }

    buildErrorMessage () {
        return (<div className="invalid-feedback">{ this.props.error }</div>)
    }

    getValidationClassName () {
        return this.props.error ? "form-control is-invalid" : "form-control is-valid"
    }

    render () {
        return (
            <div>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="input-group mb-3">
                    <select error={this.props.error}
                            className={this.getValidationClassName()}
                            name={this.props.name}
                            value={this.props.value}
                            onChange={this.props.onChange} >
                        {this.buildOptions()}
                    </select>
                    { this.buildErrorMessage() }
                </div>
            </div>
        )
    }
}
