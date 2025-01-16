import PropTypes from "prop-types";

function AdditionalAmmenity({ addAmenities, setAddAmenities, amenitiesFee }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <p>Additional Amenity:</p>
        <p></p>
        <p>Php {amenitiesFee}</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="w-[100px]">Beds</p>
        <div className="flex items-center gap-4">
          <p
            className="font-bold text-3xl cursor-pointer select-none"
            onClick={() =>
              setAddAmenities((old) => ({
                ...old,
                bed: old.bed + 1,
              }))
            }
          >
            +
          </p>
          <p>{addAmenities.bed}</p>
          <p
            className="font-bold text-4xl cursor-pointer select-none"
            onClick={() =>
              setAddAmenities((old) => ({
                ...old,
                bed: old.bed > 0 ? old.bed - 1 : 0,
              }))
            }
          >
            -
          </p>
        </div>
        <p></p>
      </div>
      <div className="flex items-center justify-between">
        <p className="w-[100px]">Pillows</p>
        <div className="flex items-center gap-4">
          <p
            className="font-bold text-3xl cursor-pointer select-none"
            onClick={() =>
              setAddAmenities((old) => ({
                ...old,
                pillow: old.pillow + 1,
              }))
            }
          >
            +
          </p>
          <p>{addAmenities.pillow}</p>
          <p
            className="font-bold text-4xl cursor-pointer select-none"
            onClick={() =>
              setAddAmenities((old) => ({
                ...old,
                pillow: old.pillow > 0 ? old.pillow - 1 : 0,
              }))
            }
          >
            -
          </p>
        </div>
        <p></p>
      </div>
      <div className="flex items-center justify-between">
        <p className="w-[100px]">Comforter</p>
        <div className="flex items-center gap-4">
          <p
            className="font-bold text-3xl cursor-pointer select-none"
            onClick={() =>
              setAddAmenities((old) => ({
                ...old,
                comforter: old.comforter + 1,
              }))
            }
          >
            +
          </p>
          <p>{addAmenities.comforter}</p>
          <p
            className="font-bold text-4xl cursor-pointer select-none"
            onClick={() =>
              setAddAmenities((old) => ({
                ...old,
                comforter: old.comforter > 0 ? old.comforter - 1 : 0,
              }))
            }
          >
            -
          </p>
        </div>
        <p></p>
      </div>
    </>
  );
}

AdditionalAmmenity.propTypes = {
  addAmenities: PropTypes.shape({
    bed: PropTypes.number,
    pillow: PropTypes.number,
    comforter: PropTypes.number,
  }),
  setAddAmenities: PropTypes.func,
  amenitiesFee: PropTypes.number,
};

export default AdditionalAmmenity;
