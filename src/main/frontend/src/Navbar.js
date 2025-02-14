import React from 'react'
import { Link } from 'react-router-dom'

export default function 
() {
  return (
    <nav>
        <Link  to="/">Home</Link>
        <span> | </span>
        <Link  to="/page2">Page 2</Link>
    </nav>
  )
}
