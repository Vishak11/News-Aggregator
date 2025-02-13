import IframeComponent from "../../../features/iframe/component/Iframe";

const Live: React.FC = () => {
      return (
      <div className="home-container">
        <IframeComponent src="https://www.youtube.com/watch?v=YDfiTGGPYCk" />
      </div>
    );
  };

  export default Live;
