import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Searchbar.css";
import { SearchBarProps } from "../types/SearchBar";

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch = () => {},
  placeholder = "Search news...",
}) => {
  const [query, setQuery] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      // Navigate to search page with query parameter
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className={`search-container ${isActive ? "search-active" : ""}`}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          placeholder={placeholder}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;