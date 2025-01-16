import PropTypes from "prop-types";
import { useState } from "react";
import FinalConfirmation from "./FinalConfirmation";
import ShowReceipt from "./ShowReceipt";

function GetGuestInfo({
  name,
  email,
  address,
  contact,
  setName,
  setEmail,
  setAddress,
  setContact,
  setShowGuestInfio,
  handleConfirm,
  reservationId,
}) {
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidContact = (contact) => {
    const contactRegex = /^(\+63|0)9\d{9}$/;
    return contactRegex.test(contact);
  };

  const handleNext = () => {
    if (name && isValidEmail(email) && isValidContact(contact) && address) {
      setFinalConfirmation(true);

      setFinalConfirmation(true);
    } else {
      alert("Please ensure all fields are valid.");
    }
  };

  const handleCancel = () => {
    setShowGuestInfio(false);
    setShowReceipt(true);
  };

  const confirm = () => {
    handleConfirm();
    setShowReceipt(true);
  };

  return (
    <div className="absolute w-screen h-screen bg-[rgba(255,255,255,0.4)] grid place-items-center">
      {!finalConfirmation && !showReceipt && (
        <div className="modal bg-white p-4 rounded-lg border border-black">
          <h2 className="text-3xl">Guest Information</h2>

          <div className="wrapper w-full md:w-[700px] flex">
            <div className="flex-1 px-4">
              <div className="mt-4">
                <label className="pl-4">Name</label>
                <input
                  type="text"
                  className="w-full py-2 pl-4 border border-black rounded-full"
                  maxLength={100}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="pl-4">Email</label>
                <input
                  type="email"
                  className="w-full py-2 pl-4 border border-black rounded-full"
                  maxLength={100}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="pl-4">Address</label>
                <input
                  type="text"
                  className="w-full py-2 pl-4 border border-black rounded-full"
                  maxLength={100}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="pl-4">Contact Number</label>
                <input
                  type="text"
                  className="w-full py-2 pl-4 border border-black rounded-full"
                  maxLength={13}
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-center">
              <img src="/images/resort_logo.png" alt="logo" />
              <div className="flex">
                <button
                  className="px-10 py-4 rounded-xl bg-red-700 font-bold text-white block mx-auto"
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
                <button
                  className="px-10 py-4 rounded-xl bg-black font-bold text-white block mx-auto"
                  onClick={handleNext}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {finalConfirmation && !showReceipt && (
        <FinalConfirmation
          cancel={() => setShowGuestInfio(false)}
          confirm={confirm}
        />
      )}
      {showReceipt && reservationId && (
        <ShowReceipt reservationId={reservationId} />
      )}
    </div>
  );
}

GetGuestInfo.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  contact: PropTypes.string,
  setName: PropTypes.func,
  setEmail: PropTypes.func,
  setAddress: PropTypes.func,
  setContact: PropTypes.func,
  setShowGuestInfio: PropTypes.func,
  setShhowFinalConfirmation: PropTypes.func,
  handleConfirm: PropTypes.func,
  reservationId: PropTypes.string,
};

export default GetGuestInfo;
