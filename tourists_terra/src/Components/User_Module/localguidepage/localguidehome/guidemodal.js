import React from "react";

const GuideModal = (props) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Guide Registration
            </h3>
            <div className="mt-2 px-7 py-3">
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    CNIC (Computerized National Identity Card)
                  </label>
                  <input
                    type="text"
                    name="cnic"
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Enter your CNIC"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* <div className="items-center px-4 py-3">
                            <button
                                id="ok-btn"
                                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                onClick={() => {
                                    window.location.reload()
                                }}
                            >
                                Close
                            </button>
                        </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideModal;
