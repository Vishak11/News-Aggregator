// Home.tsx
import React, { useState } from "react";
import BreakingNews from "../../../features/article/breakingNews/component/BreakingNews";
import useFetchNews from '../../../common/CommonHook/fetchNewsHook';
import PreferencesPopup from '../../../features/preferedNewsFilter/component/PreferencePopUp'; // Adjust the import path as needed
import { Settings } from 'lucide-react';
import '../styles/Home.css';

const Home: React.FC = () => {
  const { articles, isLoading, error } = useFetchNews("home");
  const [showPreferences, setShowPreferences] = useState(false);

  const handleSavePreferences = (selectedCategories: string[]) => {
    // Handle the saved categories - you can integrate this with your news fetching logic
    console.log('Selected categories:', selectedCategories);
  };

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <BreakingNews articles={articles} isLoading={isLoading} />
      
      <button
        className="preferences-button"
        onClick={() => setShowPreferences(true)}
        aria-label="Open preferences"
      >
      <Settings size={24} /> Choose your preferences 
      </button>

      {showPreferences && (
        <PreferencesPopup
          onClose={() => setShowPreferences(false)}
          onSave={handleSavePreferences}
        />
      )}
    </div>
  );
};

export default Home;