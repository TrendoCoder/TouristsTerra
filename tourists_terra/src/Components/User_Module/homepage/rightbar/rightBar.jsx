import React from 'react'
import './rightBar.css'
import pic from '../images/profile2.jpeg'
import FeaturedAd from '../homepage/Featured_Ads/featuredAd'
const RightBar = () => {
  return (
    <div id="rightbar">
    <div id="f-ads">
    <FeaturedAd/>
    </div>
    <div id="f-ads">
    <FeaturedAd/>
    </div>
    {/* <div id='friend'>
    <div id='friend-list'>
        <div>
            <img src={pic} alt="" />
        </div>
        <div>
            <span>Umair Nazar</span>
        </div>
    </div>
    <div id='friend-list'>
        <div>
            <img src={pic} alt="" />
        </div>
        <div>
            <span>Umer</span>
        </div>
    </div>
    <div id='friend-list'>
        <div>
            <img src={pic} alt="" />
        </div>
        <div>
            <span>Shehryar</span>
        </div>
    </div>
    <div id='friend-list'>
        <div>
            <img src={pic} alt="" />
        </div>
        <div>
            <span>Nouman</span>
        </div>
    </div>
    </div> */}
  </div>
  )
}

export default RightBar