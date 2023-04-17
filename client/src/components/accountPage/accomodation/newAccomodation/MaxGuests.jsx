import React from "react";

const MaxGuests = ({ maxGuests, handleEdit }) => {
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
        name="maxGuests"
        id="maxGuests"
        placeholder="Enter max no. of guests allowed"
        className="w-full"
        value={maxGuests}
        onChange={handleEdit}
      />
    </div>
  );
};

export default MaxGuests;
