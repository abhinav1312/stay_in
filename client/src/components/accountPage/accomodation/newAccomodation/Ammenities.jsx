import React from 'react'
import {
    EntryIcon,
    FlagIcon,
    RadioIcon,
    TruckIcon,
    TvIcon,
    WifiIcon,
  } from "../../../../images/SVG";

const Ammenities = ({handleAmmenities}) => {
  return (
    <div>
          <h2 className="accomodationFormHeading">
            Ammenities <span className="text-red-600">*</span>
          </h2>
          <p className="accomodationFormSubheading">
            Add ammenities provided in the accomodation
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <label
              htmlFor="airConditioner"
              className="flex gap-2 items-center border p-4"
            >
              <input
                type="checkbox"
                id="airConditioner"
                value="air conditioner"
                className="h-4 w-4"
                onChange={(e) =>
                  handleAmmenities(e.target.value, e.target.checked)
                }
              />
              <span>Air Conditioner</span>
              {FlagIcon}
            </label>
            <label
              htmlFor="wifi"
              className="flex gap-2 items-center border p-4"
            >
              <input
                type="checkbox"
                id="wifi"
                value="wifi"
                className="h-4 w-4"
                onChange={(e) =>
                  handleAmmenities(e.target.value, e.target.checked)
                }
              />
              <span>Wifi</span>
              {WifiIcon}
            </label>
            <label
              htmlFor="parking"
              className="flex gap-2 items-center border p-4"
            >
              <input
                type="checkbox"
                id="parking"
                value="free parking spot"
                className="h-4 w-4"
                onChange={(e) =>
                  handleAmmenities(e.target.value, e.target.checked)
                }
              />
              <span> Free parking spot </span>
              {TruckIcon}
            </label>
            <label
              htmlFor="radio"
              className="flex gap-2 items-center border p-4"
            >
              <input
                type="checkbox"
                id="radio"
                value="radio"
                className="h-4 w-4"
                onChange={(e) =>
                  handleAmmenities(e.target.value, e.target.checked)
                }
              />
              <span>Radio</span>
              {RadioIcon}
            </label>
            <label htmlFor="tv" className="flex gap-2 items-center border p-4">
              <input
                type="checkbox"
                id="tv"
                value="tv"
                className="h-4 w-4"
                onChange={(e) =>
                  handleAmmenities(e.target.value, e.target.checked)
                }
              />
              <span>TV</span>
              {TvIcon}
            </label>
            <label
              htmlFor="pets"
              className="flex gap-2 items-center border p-4"
            >
              <input
                type="checkbox"
                id="pets"
                value="pets"
                className="h-4 w-4"
                onChange={(e) =>
                  handleAmmenities(e.target.value, e.target.checked)
                }
              />
              <span>Pets</span>
              {EntryIcon}
            </label>
          </div>
        </div>
  )
}

export default Ammenities
