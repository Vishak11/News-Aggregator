import React from "react";
import '../styles/Navbar.css'
import SearchBar from "../../search/components/Searchbar";

interface NavItem {
  label: string;
  href: string;
  isLive?: boolean;
}

const Navbar: React.FC = () => {
  

  const primaryNavItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Sports", href: "/sports" },
    { label: "Business", href: "/business" },
    { label: "Politics", href: "/politics" },
    { label: "Entertainment", href: "/entertainment" },
    { label: "Technology", href: "/technology" },
  ];

 

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <div className="nav-main">
          <div className="logo">ABC NEWS</div>
          
          <div className="nav-links">
          <SearchBar/>
            {primaryNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${item.isLive ? "live" : ""}`}
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
