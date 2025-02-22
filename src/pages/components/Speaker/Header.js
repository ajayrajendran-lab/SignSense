import React from "react";

import Logo from "./Logo";

function Header(){
  return(
    <header className="w-full bg-white top-0 left-0 shadow-xl flex flex-col sm:flex-row items-center">
      <Logo />
      <h1 className="m-2 text-orange-500 text-3xl font-bold">Speaker</h1>
    </header>
  );
}
export default Header;