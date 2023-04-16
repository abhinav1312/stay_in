import React from 'react'

const Title = ({title, handleEdit}) => {
  return (
    <div>
          <h2 className="accomodationFormHeading">
            Title <span className="text-red-600">*</span>
          </h2>
          <p className="accomodationFormSubheading">
            Catchy title for your place to grab more attention
          </p>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="A serenic bungalow..."
            value={title}
            // onChange={(e) => setTitle(e.target.value)}
            onChange={handleEdit}
          />
        </div>
  )
}

export default Title
