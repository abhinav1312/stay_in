import React from 'react'

const Description = ({description, handleEdit}) => {
  return (
    <div>
    <h2 className="accomodationFormHeading">
      Description <span className="text-red-600">*</span>
    </h2>
    <p className="accomodationFormSubheading">
      describe your place in brief
    </p>
    <textarea
      name="description"
      id="description"
      placeholder="A beautiful cottage residing in the heart of city..."
      value={description}
      onChange={handleEdit}
    />
  </div>
  )
}

export default Description
