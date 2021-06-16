import Link from "next/link";
import Image from "next/image";
import "../styles/Home.module.css";

const Navbar = () => {
  return (
    <nav className=" bg-blue-700 p-3">
      <div className="flex justify-between text-white mr-6">
        <div className="font-bold text-xl">FaceBook</div>
        <div className="flex">
          <Link href="/">
            <button className="mr-1 bg-blue-500 hover:bg-blue-700 text-white  py-1 px-2 rounded-full">
              Home
            </button>
          </Link>
          <br />
          <Link href="/auth/signin">
            <button className="mr-1  bg-blue-500 hover:bg-blue-700 text-white  py-1 px-2 rounded-full">
              SignIn
            </button>
          </Link>
          <br />
          <Link href="/auth/signup">
            <button className="mr-1  bg-blue-500 hover:bg-blue-700 text-white  py-1 px-2 rounded-full">
              SignUp
            </button>
          </Link>
          <br />
          <Link href="/">
            <button className="mr-1  bg-red-600 hover:bg-blue-700 text-white  py-1 px-2 rounded-full">
              SignOut
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
