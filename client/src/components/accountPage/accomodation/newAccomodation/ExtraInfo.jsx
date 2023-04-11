import React from "react";

const ExtraInfo = ({ extraInfo, setExtraInfo }) => {
  return (
    <div>
      <h2 className="accomodationFormHeading">
        Extra info <span className="text-red-600">*</span>
      </h2>
      <p className="accomodationFormSubheading">
        House rules, in timings, guests arrival etc..
      </p>
      <textarea
        name="extraInfo"
        id="extraInfo"
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
      />
    </div>
  );
};

export default ExtraInfo;
