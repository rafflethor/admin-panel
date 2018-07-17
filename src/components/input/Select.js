import React from 'react'

import './Select.css'

export class Select extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: props.value
        }
    }

    handleOnChange (event) {
        this.setState({
            value: event.target.value
        })
    }

    getClassName () {
        return this.props.className ? this.props.className : ''
    }

    getSelectClassName () {
        const fieldClassName = this.props.error ?
              "is-invalid" :
              "is-valid"

        return `${this.props.className || 'form-control'} ${fieldClassName}`
    }

    render () {
        const options = this.props.options ?
              this.props.options.map(opt => {
                  return (
                      <option key={opt.value}
                              value={opt.value}>{opt.label}</option>)
              }) : ('')
        const errorMessage = this.props.error ?
              (<div className="invalid-feedback">{ this.props.error }</div>) :
              (<div/>)

        return (
            <div>
                <label htmlFor="basic-url">{this.props.label}</label>
                <div className="input-group mb-3">
                    <select id={`select-${this.props.name}`}
                            name={`select-${this.props.name}`}
                            onChange={(event) => this.handleOnChange(event) }
                        value={this.state.value}
                        className={ this.getSelectClassName() }>
                        {options}
                    </select>
                    { errorMessage }
                    <input type="hidden"
                           id={this.props.name}
                           name={this.props.name}
                           value={this.state.value} />
                </div>
            </div>
        )
    }
}
