import React from 'react'

 const Card = (props) => (
    <div className="card">
        <div className="card-header">
            {props.header}
        </div>
        <div className="card-body">
            {props.children}
        </div>
    </div>
)

export default Card