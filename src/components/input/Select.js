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
        const { name, label } = this.props
        const className = this.getValidationClassName()

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <div className="input-group">
                    <select className={className} {...this.props}>
                        {this.props.children}
                    </select>
                    { this.buildErrorMessage() }
                </div>
            </div>
        )
    }
}
