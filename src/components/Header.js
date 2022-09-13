import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdAddShoppingCart, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { actionType } from "../context/reducer.js";
import { useStateValue } from "../context/StateProvider.js";
import { app } from "../firebase.config.js";
import Avatar from "../images/avatar.png";
import Logo from "../images/download.png";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };
  const logout = () => {
    setIsMenu(false)
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <div className="fixed z-50 w-screen p-6 px-15">
      {/* pc */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">Ecomm</p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 ml-auto">
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out">
              Service
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out">
              About us
            </li>
          </ul>
          <div className="relative flex items-center justify-center">
            <FaShoppingCart className=" w-5 h-5 text-textColor text 2xl ml-8 cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-600 flex items-end justify-center animate-bounce pointer-events-auto">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 min-w-[40px] min-h-[40px] text-textColor text 2xl ml-8 cursor-pointer drop-shadow-md">
              <div className="relative">
                <motion.img
                  whileTap={{ scale: 0.7 }}
                  src={user ? user.photoURL : Avatar}
                  alt="Avatar"
                  className="shadow-xl rounded-lg"
                  onClick={login}
                />
              </div>
            </div>
            {isMenu && user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate = {{opacity:1, scale : 1}}
                exit = {{opacity:0, scale : 0.6}}
                className="{ w-40 shadow-xl flex flex-col rounded-lg bg-gray-300 absolute px-4 py-2 top-11 right-0">
                {user && user.email === "tamimcmrd@gmail.com" && (
                  <Link to={"./createItem"}>
                    <p className="cursor-pointer hover:bg-blue-100 transition-all duration-100 p-2 rounded-lg justify-center items-center gap-2">
                      Add Item <MdAddShoppingCart />
                    </p>
                  </Link>
                )}
                <p
                  className="cursor-pointer bg-red-300 hover:bg-red-400 transition-all duration-100 p-2 rounded-lg justify-center items-center gap-2"
                  onClick={logout}>
                  Log Out <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mbl */}
      <div className="flex md:hidden w-full h-full bg-blue-400 p-4"></div>
    </div>
  );
};

export default Header;
