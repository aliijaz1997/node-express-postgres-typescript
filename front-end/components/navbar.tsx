import axios from "axios";
import Link from "next/link";
import "../styles/Home.module.css";

interface User {
  user: { id: string; username: string; iat: number };
}

const Navbar = ({ user }: User) => {
  console.log(user?.username);
  const signOut = async () => {
    await axios.post("http://localhost:5000/api/auth/signout", null, {
      withCredentials: true,
    });
  };
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
          {!user ? (
            <>
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
            </>
          ) : (
            <>
              <br />
              <Link href="/">
                <button
                  onClick={signOut}
                  className="mr-1  bg-red-600 hover:bg-blue-700 text-white  py-1 px-2 rounded-full"
                >
                  SignOut
                </button>
              </Link>
              <span className="font-bold text-xl mt-2 text-yellow-400">
                Welcome {user?.username}
              </span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
