import React from 'react'
import "./featuredaccomodation.css"
import pic from "../../../../images/h_ad1.jfif";
import useFetch from '../../../../Hooks/usefetch';
const FeaturedAccomodation = () => {
    const {data, loading, error} = useFetch("http://localhost:3001/api/hotels/countByCity?cities=Lahore,Karachi,Islamabad"); 
    console.log(data);
  return (
    <div id="featured-acc" >
    {loading? ("Loading please wait"):(
        <>
        <div id="featured-acc-item">
        <img src={pic} alt="" />
        <div id="featured-acc-tile">
            <h1>Lahore</h1>
            <h2>{data[0]} properties</h2>
        </div>
    </div>
    <div id="featured-acc-item">
        <img src={pic} alt="" />
        <div id="featured-acc-tile">
            <h1>Karachi</h1>
            <h2>{data[1]} properties</h2>
        </div>
    </div>
    <div id="featured-acc-item">
        <img src={pic} alt="" />
        <div id="featured-acc-tile">
            <h1>Islamabad</h1>
            <h2>{data[2]} properties</h2>
        </div>
    </div>
        </>
    )}
   
    </div>
  )
}

export default FeaturedAccomodation