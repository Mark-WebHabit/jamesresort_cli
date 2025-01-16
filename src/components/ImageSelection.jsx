import PropTypes from "prop-types";
import { images } from "../assets/images";

function ImageSelection({ room, setSelectedImage, selectedImage }) {
  return (
    <div className="images w-[150px] h-full mr-2">
      {room &&
        room?.images.map((img, i) => (
          <img
            src={`..${images[img]}`}
            alt="image"
            key={i}
            className={`cursor-pointer border-2  ${
              selectedImage == img ? "border-red-800" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
    </div>
  );
}

ImageSelection.propTypes = {
  room: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.number),
    name: PropTypes.string,
    id: PropTypes.number,
  }),
  selectedImage: PropTypes.number,
  setSelectedImage: PropTypes.func,
};

export default ImageSelection;
