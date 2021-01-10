import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Proatected({component:Cmp, ...rest}) {
    return (
        <Route
        {...rest}
        render = {(props)=> cookies.get('SID') ?(<Cmp {...props} />) : <Redirect to="/" />
      }
        />
    )
}
