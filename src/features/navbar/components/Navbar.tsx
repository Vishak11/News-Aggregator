import React, { useState } from "react";
import '../styles/Navbar.css';
import SearchBar from "../../search/components/Searchbar";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isLive?: boolean;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const primaryNavItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Sports", href: "/sports" },
    { label: "Business", href: "/business" },
    { label: "Politics", href: "/politics" },
    { label: "Entertainment", href: "/entertainment" },
    { label: "Technology", href: "/technology" },
    { label: "Watch Live", href: "https://www.youtube.com/watch?v=YDfiTGGPYCk" ,isExternal: true}
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <div className="nav-main">
          <div className="logo">ABC NEWS</div>
          
          <button className="hamburger" onClick={toggleMenu}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
           
            <div className="search-container">
              <SearchBar/>
            </div>
            {primaryNavItems.map((item) => (
              <a
              key={item.label}
              href={item.href}
              className={`nav-link ${item.isLive ? "live" : ""}`}
              target={item.isExternal ? "_blank" :""}
              rel={item.isExternal ? "noopener noreferrer":""}
            >
              {item.isLive && <span className="live-dot"></span>}
              {item.label}
            </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;