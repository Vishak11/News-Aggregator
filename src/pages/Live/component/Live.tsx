import IframeComponent from "../../../features/iframe/component/Iframe";

const Live: React.FC = () => {
  
    return (
      <div className="home-container">
        <IframeComponent src="https://www.youtube.com/embed/5qap5aO4i9A" />
      </div>
    );
  };

  export default Live;
