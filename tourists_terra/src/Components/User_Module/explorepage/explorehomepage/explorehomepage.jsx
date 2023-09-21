import React from 'react'
import './explorehomepage.css'
import NavBar from '../../homepage/navbar/navBar'
import Footer from '../../accommodationpage/footer/footer'
import ExploreSearchSection from '../exploresearchsection/exploresearchsection'
const ExploreHomepage = () => {
  return (
    <div>
<NavBar/>
<ExploreSearchSection/>
<Footer/>
    </div>
  )
}

export default ExploreHomepage