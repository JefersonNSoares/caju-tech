import React from 'react';
import YoutubeIframe from 'react-native-youtube-iframe';

export interface YouTubePlayerProps {
  videoId: string;
  height: number;
  play: boolean;
  onStateChange?: (state: string) => void;
  title?: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  height,
  play,
  onStateChange,
}) => {
  return (
    <YoutubeIframe
      height={height}
      play={play}
      videoId={videoId}
      onChangeState={onStateChange}
    />
  );
};
