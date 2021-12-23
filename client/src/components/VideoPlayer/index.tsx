import { useCallback } from "react";
import { CloseModalButton } from "../../pages/foodDetail/style";

interface IProps {
  onCloseVideo: () => void;
  url: string | undefined;
}

const VideoPlayer: React.VFC<IProps> = ({ onCloseVideo, url }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div onClick={stopPropagation}>
      <CloseModalButton onClick={onCloseVideo}>
        <span>&times;</span>
      </CloseModalButton>
      <div style={{ marginTop: "2.5rem" }}>
        <iframe
          width="85%"
          height="400"
          src={`https://www.youtube.com/embed/${url}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
