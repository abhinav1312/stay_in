import React from 'react'

const Address = ({address, setAddress}) => {
  return (
    <div>
    <h2 className="accomodationFormHeading">
      Address <span className="text-red-600">*</span>
    </h2>
    <p className="accomodationFormSubheading">
      Enter precise address for hassle free services
    </p>
    <input
      type="text"
      name="address"
      id="address"
      placeholder="A-12 New Street, Los Angeles"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
  </div>
  )
}

export default Address
