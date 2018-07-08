import React from 'react'

const Content = ({children, ...props}) => (
    <div className={`row ${props.className}`}>
        <div className="col-12">
            {children}
        </div>
    </div>
)

export default Content
