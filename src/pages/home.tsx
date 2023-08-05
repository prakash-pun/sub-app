import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link to={"/register"} rel="noopener noreferrer" className="w-fit">
        <button className="flex justify-center gap-[10px] text-white bg-black  rounded-[7px] px-4 py-2 text-sm mt-2">
          Creat an account
        </button>
      </Link>
    </div>
  );
};

export { Home };
