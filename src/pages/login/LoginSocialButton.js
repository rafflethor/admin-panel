import React from 'react'

const Button = ({ value, icon, onLogin, ...props }) => (
    <a onClick={onLogin} {...props} className={`btn btn-block btn-social btn-lg btn-${icon}`}>
        <i className={`fa fa-${icon} mr-3`}></i>
        { value }
    </a>
)

export default Button
