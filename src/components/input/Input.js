import React from 'react'

const textInput = ({error, ...props}) => {
    const errorMessage = error ?
          (<div className="invalid-feedback">{ error }</div>) :
          (<div/>)

    const definedClassName = props.className || ''

    const fieldClassName = error ?
          "is-invalid" :
          "is-valid"

    return (
        <div>
            <label htmlFor="basic-url">{props.label}</label>
            <div className="input-group mb-3">
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
