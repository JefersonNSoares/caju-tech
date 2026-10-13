import React from 'react';

export interface YouTubePlayerProps {
  videoId: string;
  height: number;
  play: boolean;
  onStateChange?: (state: string) => void;
  title?: string;
}

export { YouTubePlayer } from './YouTubePlayer.web';
