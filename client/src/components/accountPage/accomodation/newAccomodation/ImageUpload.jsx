import React from "react";
import {
  CancelIcon,
  UploadIcon,
} from "../../../../images/SVG";

const ImageUpload = ({setImgLink, imgLink, handleImageUpload, handleImgLinkUpload, imageUpload, removeImg, uploadedImages}) => {
  return (
    <div>
      <h2 className="accomodationFormHeading">
        Photos <span className="text-red-600">*</span>{" "}
        <span className="text-gray-400 text-sm">(min 5, max 10 photos)</span>
      </h2>
      <p className="accomodationFormSubheading">Upload from link</p>
      <div className="flex gap-4">
        <input
          type="text"
          name="imgLink"
          id="imgLink"
          placeholder="https://www.demo.com/image_url.jpg"
          value={imgLink}
          onChange={(e) => setImgLink(e.target.value)}
        />
        <button type='button' onClick={handleImgLinkUpload} className="primary">
          Add
        </button>
      </div>
      <h2 className="text-center text-xl mt-4 mb-4">OR</h2>
      <p className="accomodationFormSubheading">upload from device</p>
      <div className="grid md:grid-cols-3 gap-8">
        <button type="button"
          onClick={() => imageUpload.current.click()}
          className="p-16 h-44 bg-white border text-2xl text-gray-400 flex justify-center items-center gap-2"
        >
          {UploadIcon} Upload
        </button>

        <input
          multiple={true}
          onChange={handleImageUpload}
          type="file"
          accept="image/*"
          name="images"
          id="images"
          className="hidden"
          ref={imageUpload}
        />

        {uploadedImages.length > 0 &&
          uploadedImages.map((uploadImage, id) => {
            return (
              <div key={uploadImage} className="relative">
                <button
                  onClick={() => removeImg(uploadImage)}
                  className="absolute rounded-full p-2 font-bold bg-gray-300 right-[-12px] top-[-15px]"
                >
                  {CancelIcon}
                </button>
                <img
                  // src={"http://localhost:4000/uploads/" + uploadImage}
                  src={uploadImage}
                  alt="test"
                  className="h-44 flex w-full object-cover"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageUpload;
