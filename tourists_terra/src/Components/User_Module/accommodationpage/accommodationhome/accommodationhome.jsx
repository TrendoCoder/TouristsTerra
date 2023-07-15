import React from 'react'
import './accommodationhome.css'
import AccommodationAdSection from '../accomoadsection/accomoadsection'
import MenuBar from '../../homepage/menubar/menuBar'
import AccomoFilter from '../accomofiltersection/accomofilter'
import AccomoList from '../accomolist/accomolist'
import Footer from '../footer/footer'
import { Link } from 'react-router-dom'
const AccommodationHome = () => {
  return (
    <div id='accomo-ad-big-container'>
    <div id='accomo-ad-container'>
    <AccommodationAdSection/>
    <div id='opacity-ad'>
    <Link to=""><h1>Wana Accommodation?</h1></Link>
    </div>
    </div>
    
    <div id='menu-acc'>
    <MenuBar />
    </div>
    <br />
    <br />
    <div id='main-container-accomo'>
    <div id='container-filter-accomo'>
    <AccomoFilter/>
    </div>
    <div id='container-accomo-cards'>
<AccomoList/>
    </div>

    </div>
    <div>
    <Footer/>
    </div>
    </div>
  )
}

export default AccommodationHome