import React from 'react'
import "./Listitem.css"

export default function Listitem(props) {
    return (
        <div className="list-item">
            <h4>{props.item}</h4>
        </div>
    )
}
