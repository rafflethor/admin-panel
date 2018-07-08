import React from 'react'

export const Text = ({ error, ...props }) => {

    const errorMessage = error ?
          (<div className="invalid-feedback">{ error }</div>) :
          (<div/>)

    const fieldClassName = error ?
          "is-invalid" :
          "is-valid"

    return (
        <div>
            <label htmlFor="basic-url">{props.label}</label>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className={ `form-control ${fieldClassName}` }
                    onChange={props.onChange}
                    value={props.value}
                    name={props.name}
                    aria-describedby="basic-addon3" />
                { errorMessage }
            </div>
        </div>
    )
}
