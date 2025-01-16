import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-screen min-h-screen grid place-items-center  relative bg-bg bg-center bg-no-repeat">
      <div className="absolute w-screen h-screen bg-[rgba(0,0,0,0.3)]"></div>
      <img
        src="/images/resort_logo.png"
        alt="Logo"
        className=" w-36 h-36 z-50 absolute top-6 left-6"
      />
      <div className="w-full flex flex-col items-center justify-center ">
        <h1 className="text-white text-[100px] font-logo z-50 text-center w-8/12 font-bold drop-shadow-xl leading-[100px] mb-20">
          Your Perfect Getaway Awaits
        </h1>

        <button className="bg-black px-10 py-4 text-white z-50 text-lg rounded-3xl">
          <Link to={"/rooms"}>Book now</Link>
        </button>
      </div>
      <p className="text-center text-xl font-bold text-white z-50 absolute bottom-16 ">
        James G Resort and Hotel
      </p>
    </div>
  );
}

export default Home;
