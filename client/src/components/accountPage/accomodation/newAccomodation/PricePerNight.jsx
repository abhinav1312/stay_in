import React from 'react'

const PricePerNight = ({pricePerNight, handleEdit}) => {
  return (
    <div>
      <h2 className="accomodationFormHeading">
        Price Per Night <span className="text-red-600">*</span>
      </h2>
      <p className="accomodationFormSubheading">
        Enter the price of each night (inclusive of everything)
      </p>
      <input
        type="number"
        name="pricePerNight"
        id="pricePerNight"
        placeholder="2199 /-"
        className="w-full"
        value={pricePerNight}
        onChange={handleEdit}
      />
    </div>
  )
}

export default PricePerNight
