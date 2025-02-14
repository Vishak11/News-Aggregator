import React from "react";
import BreakingNews from "../../../features/article/breakingNews/component/BreakingNews";
import useFetchNews from '../../../common/CommonHook/fetchNewsHook'

const Sports: React.FC = () => {
  const { articles, isLoading, error } = useFetchNews("sports");

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

export default Sports;
