import React, { useState } from "react";
import SearchBar from "../../search/components/Searchbar";
import { NavItem } from "../types/Navbar";
import '../styles/Navbar.css'
import { NavLink } from "react-router-dom";


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const primaryNavItems: NavItem[] = [
    { label: "Home", href: "/home" },
    { label: "Sports", href: "/sports" },
    { label: "Business", href: "/business" },
    { label: "Politics", href: "/politics" },
    { label: "Science", href: "/science" },
    { label: "Technology", href: "/technology" },
    { label: "My news", href: "/mynews" },

    { 
      label: "Watch Live", 
      href: "https://www.youtube.com/watch?v=YDfiTGGPYCk",
      isExternal: true,
      isLive: true 
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <div className="nav-main">
          <div className="logo"><h2>Prime News</h2></div>

          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <SearchBar onSearch={handleSearch} />

            {primaryNavItems.map((item) =>
              item.isExternal ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  {item.label}
                </NavLink>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;