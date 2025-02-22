import React from "react";

import Logo from "./Logo";

function Header(){
  return(
    <header className="w-full bg-white top-0 left-0 shadow-xl flex flex-col sm:flex-row items-center">
      <Logo />
      <h1 className="m-2 text-violet-400 text-3xl font-bold">Performer</h1>
    </header>
  );
}
export default Header;