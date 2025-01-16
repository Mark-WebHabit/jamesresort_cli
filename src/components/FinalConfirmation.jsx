import PropTypes from "prop-types";

function FinalConfirmation({ cancel, confirm }) {
  return (
    <div className="modal bg-white p-8 rounded-lg border border-black max-w[500px]">
      <p className="text-4xl font-bold">Final Confirmation</p>
      <p>
        Thank you for your booking. Once confirmed, your booking will be
        finalized. Kindly reply with {"'Confirm'"} to proceed.
      </p>

      <div className="flex items-center mt-4 gap-4">
        <button
          className="flex-1 border border-black py-4 rounded-full cursor-pointer text-white bg-black"
          onClick={() => {
            confirm();
          }}
        >
          Confirm
        </button>
        <button
          className="flex-1 border border-black  py-4 rounded-full cursor-pointer"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

FinalConfirmation.propTypes = {
  setShhowFinalConfirmation: PropTypes.func,

  cancel: PropTypes.func,
  confirm: PropTypes.func,
};

export default FinalConfirmation;
