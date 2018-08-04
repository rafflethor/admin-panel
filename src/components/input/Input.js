import React from 'react'

const textInput = ({error, iconText, ...props}) => {
    const errorMessage = error ?
          (<div className="invalid-feedback">{ error }</div>) :
          (<div/>)

    const definedClassName = props.className || ''

    const fieldClassName = error ?
          "is-invalid" :
          "is-valid"

    const icon = (icon) => {
        return icon ? (
            <div className="input-group-prepend">
                <div className="input-group-text">{icon}</div>
            </div>
        ) : null
    }

    return (
        <div>
            <label htmlFor="basic-url">{props.label}</label>
            <div className="input-group">
                { icon(iconText) }
                <input
                    {...props}
                    className={ `form-control ${fieldClassName} ${definedClassName}` }
                    aria-describedby="basic-addon3" />
                { errorMessage }
            </div>
        </div>
    )
}

const hiddenInput = (props) => {
    return (
        <input {...props} aria-describedby="basic-addon3" />
    )
}

export const Input = (props) => {
    return props.type === 'hidden' ? hiddenInput(props) : textInput(props)
}
