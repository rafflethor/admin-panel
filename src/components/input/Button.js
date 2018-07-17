import React from 'react'

export const Button = ({enabled = true, ...props}) => {
    const className = props.className ? props.className : ''

    return (
        <button
            type={props.type}
            onClick={props.onClick}
            disabled={!enabled}
            className={`btn btn-primary ${className}`}>{props.value}</button>
    )
}
