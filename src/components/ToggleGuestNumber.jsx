import PropTypes from "prop-types";

function ToggleGuestNumber({ numberOfGuests, setNumberOfGuests, pax }) {
  return (
    <div className="flex items-center gap-4">
      <p
        className="font-bold text-3xl cursor-pointer select-none"
        onClick={() =>
          setNumberOfGuests((old) => {
            if (old >= pax) return old;

            return old + 1;
          })
        }
      >
        +
      </p>
      <p>{numberOfGuests}</p>
      <p
        className="font-bold text-4xl cursor-pointer select-none"
        onClick={() => {
          setNumberOfGuests((old) => {
            if (old <= 1) return old;

            return old - 1;
          });
        }}
      >
        -
      </p>
    </div>
  );
}

ToggleGuestNumber.propTypes = {
  numberOfGuests: PropTypes.number,
  setNumberOfGuests: PropTypes.func,
  pax: PropTypes.number,
};

export default ToggleGuestNumber;
