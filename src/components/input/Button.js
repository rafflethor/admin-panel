import React from 'react'

export const Button = (props) => {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className="btn btn-primary">{props.value}</button>
    )
}
