import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Protectfree({component: Comp, ...rest}) {
    if(!cookies.get('SID')) sessionStorage.clear();
    return (
    <Route
    {...rest}
    render = {(props)=> cookies.get('SID') ? <Redirect to="/dashboard" /> : <Comp {...props} /> }
    />
    )
}


