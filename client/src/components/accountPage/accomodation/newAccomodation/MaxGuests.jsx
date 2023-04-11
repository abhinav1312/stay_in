import React from 'react'

const MaxGuests = ({maxGuests, setMaxGuests}) => {
  return (
  
    <div>
    <h2 className="accomodationFormHeading">
      Max Guests <span className="text-red-600">*</span>
    </h2>
    <p className="accomodationFormSubheading">
      add max number of guests allowed{" "}
    </p>
    <input
      type="number"
      name="maxGuest"
      id="maxGuest"
      placeholder="Enter max no. of guests allowed"
      className="w-full"
      value={maxGuests}
      onChange={(e) => setMaxGuests(e.target.value)}
    />
  </div>
  )
}

export default MaxGuests;
