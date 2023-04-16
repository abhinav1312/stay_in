import React from "react";

const CheckInCheckOut = ({ checkIn, checkOut, handleEdit }) => {
  return (
    <div>
      <h2 className="accomodationFormHeading">
        Check-in and Check-out time <span className="text-red-600">*</span>
      </h2>
      <p className="accomodationFormSubheading">
        enter check-in & check-out-time for guests, remember to provide cleaning
        time between arrival of another guest
      </p>
      <div className="grid md:grid-cols-2 gap-2">
        <div className="flex gap-8 border p-4">
          <h2 className="font-semibold">Check-in time</h2>
          <input
            type="time"
            name="checkIn"
            id="checkIn"
            value={checkIn}
            onChange={handleEdit}
          />
        </div>
        <div className="flex gap-8 border p-4">
          <h2 className="font-semibold">Check-out time</h2>
          <input
            type="time"
            name="checkOut"
            id="checkOut"
            value={checkOut}
            onChange={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckInCheckOut;
