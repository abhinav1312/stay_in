import React from "react";

const Address = ({ address, setAddress }) => {
  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div>
      <h2 className="accomodationFormHeading">
        Address <span className="text-red-600">*</span>
      </h2>
      <p className="accomodationFormSubheading">
        Enter precise address for hassle free services
      </p>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="houseNo"
          id="houseNo"
          placeholder="Enter house no."
          value={address.houseNo}
          onChange={handleAddress}
        />
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Enter city"
          value={address.city}
          onChange={handleAddress}
        />
        <input
          type="text"
          name="state"
          id="state"
          placeholder="Enter state"
          value={address.state}
          onChange={handleAddress}
        />
        <input
          type="text"
          name="country"
          id="country"
          placeholder="Enter country"
          value={address.country}
          onChange={handleAddress}
        />
      </div>
    </div>
  );
};

export default Address;
