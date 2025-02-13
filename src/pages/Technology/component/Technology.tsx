import React from "react";
import BreakingNews from "../../../features/article/breakingNews/component/BreakingNews";
import useFetchNews from '../../CommonHook/fetchNewsHook'

const Technology: React.FC = () => {
  const { articles, isLoading, error } = useFetchNews("technology");

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
    </div>
  );
};

export default Technology;
