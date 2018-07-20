import React from 'react'

export const Text = ({ error, enabled = true, ...props }) => {

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
                    type="text"
                    disabled={!enabled}
                    className={ `form-control ${fieldClassName} ${definedClassName}` }
                    onChange={props.onChange}
                    value={props.text}
                    name={props.name}
                    aria-describedby="basic-addon3" />
                { errorMessage }
            </div>
        </div>
    )
}
