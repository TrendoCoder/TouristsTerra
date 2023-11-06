import React from "react";
import "./propertylist.css";
import useFetch from "../../../../Hooks/usefetch";

const PropertyList = () => {
  const { data, loading } = useFetch(
    "http://localhost:3001/api/hotels/countByType"
  );

  const images = [
    "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/7045712/pexels-photo-7045712.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=236.25&fit=crop&h=382.5",
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2294125/pexels-photo-2294125.jpeg?auto=compress&cs=tinysrgb&w=400",
  ];

  return (
    <div id="p-list-acc">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data &&
            data.map((item, i) => (
              <div key={i} id="p-list-acc-item">
                <img src={images[i]} alt="" />
                <div id="p-list-acc-tile">
                  {item.type && <h1>{item.type}</h1>}
                  {item.count && (
                    <h2>
                      {item.count} {item.type}
                    </h2>
                  )}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
