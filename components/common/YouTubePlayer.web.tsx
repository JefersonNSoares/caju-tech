import React from 'react';

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
  title = 'Vídeo do YouTube',
}) => {
  return (
    <iframe
      width="100%"
      height={height}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{
        width: '100%',
        height: '100%',
        border: 0,
        backgroundColor: '#000000',
      }}
    />
  );
};
