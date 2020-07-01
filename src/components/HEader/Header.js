import React, { useState, useEffect } from "react";
import logo from "./IconeTwitch.svg";
import search from "./Search.svg";
import menuIco from "./Menulco.svg";
import croix from "./Coix.svg";
import { Link } from "react-router-dom";

function Header() {
  const [menu, showMenu] = useState(false);
  const [smallSceen, setSmallScreen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  });

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  };

  const toggleNaveRes = () => {
    showMenu(!menu);
  };

  const hideMenu = () => {
    if (menu === true) {
      showMenu(!menu);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  const handleKeyPress = e => {
    setSearchInput(e.target.value)
  }
 
  return (
    <div>
      <nav className="headerTop">
        {(menu || !smallSceen) && (
          <ul className="listeMenu">
            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/">
                <img src={logo} alt="logo twitch" />
              </Link>
            </li>

            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/">
                Top Games
              </Link>
            </li>
            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/top-streams">
                Top Screams
              </Link>
            </li>
            <li className="liensNav">
              <form className="formSubmit" onSubmit={handleSubmit}>
                <input
                  value={searchInput}
                  onChange={(e) => handleKeyPress(e)}
                  type="text"
                  className="inputRecherche"
                ></input>
                <Link
                  className="lien"
                  to={{
                    pathname: `/resultats/${searchInput}`,
                  }}
                >
                  <button type="submit">
                    <img src={search} alt="loupe" className="logoLoupe" />
                  </button>
                </Link>
              </form>
            </li>
          </ul>
        )}
      </nav>
      <div className="menuResBtn">
        <img
          onClick={toggleNaveRes}
          src={menu ? croix : menuIco}
          alt="responsive"
          className="menuIco"
        />
      </div>
    </div>
  );
}

export default Header;
