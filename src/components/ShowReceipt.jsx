import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ShowReceipt({ reservationId }) {
  const navigate = useNavigate();
  return (
    <div className="modal bg-white p-8 rounded-lg border border-black max-w[500px]">
      <p className="text-3xl font-semibold">
        Thank You! Your booking has been placed. Your reservation ID is #
        {reservationId}.
      </p>

      <button
        className="px-16 mt-8 py-4 text-3xl bg-black text-white rounded-full block mx-auto cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Ok
      </button>
    </div>
  );
}

ShowReceipt.propTypes = {
  reservationId: PropTypes.string,
};

export default ShowReceipt;
