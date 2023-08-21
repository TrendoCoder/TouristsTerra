import React from 'react'
import './breadcrumb.css'
import { Link, useLocation } from 'react-router-dom'
const BreadCrumb = () => {
    const location = useLocation()
    console.log(location)
    let currentLink = ''
    const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
        currentLink += `/${crumb}`
        return (
            <div className='crumb' key={crumb}>
            <Link to={currentLink}>{crumb}</Link>
            </div>
        )
    })
return (
    <div>
    {crumbs}        
    </div>
  )
}

export default BreadCrumb