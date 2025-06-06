import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress"; // Alternative for seek bar
import { Toggle } from "@/components/ui/toggle";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1
} from 'lucide-react';

interface MusicPlayerControlsProps {
  currentTrack?: {
    imageUrl?: string;
    title: string;
    artist: string;
    duration: number; // in seconds
  };
  isPlaying: boolean;
  progress: number; // Current playback time in seconds
  volume: number; // 0-100
  isShuffle: boolean;
  repeatMode: 'off' | 'context' | 'track'; // off, repeat playlist/album, repeat track
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (newTime: number) => void; // newTime in seconds
  onVolumeChange: (newVolume: number) => void;
  onShuffleToggle: () => void;
  onRepeatToggle: () => void;
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const MusicPlayerControls: React.FC<MusicPlayerControlsProps> = ({
  currentTrack,
  isPlaying,
  progress,
  volume,
  isShuffle,
  repeatMode,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onShuffleToggle,
  onRepeatToggle,
}) => {
  console.log("Rendering MusicPlayerControls. Playing:", isPlaying, "Track:", currentTrack?.title);

  const handleSeekChange = (value: number[]) => {
    if (currentTrack) {
        onSeek(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    onVolumeChange(value[0]);
  };

  const progressPercent = currentTrack && currentTrack.duration > 0 ? (progress / currentTrack.duration) * 100 : 0;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-50 /* Doraemon light background */ border-t border-gray-200 /* Doraemon border */ p-3 z-50 flex items-center justify-between space-x-4 shadow-t-lg">
      {/* Track Info */}
      <div className="flex items-center space-x-3 w-1/4 min-w-[200px]">
        {currentTrack ? (
          <>
            <Avatar className="h-12 w-12 rounded /* Doraemon rounded corners */">
              <AvatarImage src={currentTrack.imageUrl || '/placeholder.svg'} alt={currentTrack.title} />
              <AvatarFallback className="bg-blue-200 /* Doraemon fallback bg */ text-blue-700 /* Doraemon fallback text */">
                {currentTrack.title.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-800 /* Doraemon primary text */ truncate" title={currentTrack.title}>
                {currentTrack.title}
              </p>
              <p className="text-xs text-gray-500 /* Doraemon secondary text */ truncate" title={currentTrack.artist}>
                {currentTrack.artist}
              </p>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-400">No track playing</div>
        )}
      </div>

      {/* Player Controls & Seek Bar */}
      <div className="flex flex-col items-center flex-grow max-w-xl">
        <div className="flex items-center space-x-2 mb-1">
          <Toggle
            pressed={isShuffle}
            onPressedChange={onShuffleToggle}
            aria-label="Shuffle"
            size="sm"
            className="data-[state=on]:bg-blue-100 /* Doraemon active toggle */ data-[state=on]:text-blue-600 /* Doraemon active icon */"
          >
            <Shuffle className="h-4 w-4" />
          </Toggle>
          <Button variant="ghost" size="icon" onClick={onPrevious} aria-label="Previous track" disabled={!currentTrack}>
            <SkipBack className="h-5 w-5 text-gray-700 /* Doraemon icon text */" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full /* Doraemon primary button */ w-10 h-10"
            disabled={!currentTrack}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} aria-label="Next track" disabled={!currentTrack}>
            <SkipForward className="h-5 w-5 text-gray-700 /* Doraemon icon text */" />
          </Button>
          <Toggle
            pressed={repeatMode !== 'off'}
            onPressedChange={onRepeatToggle}
            aria-label="Repeat"
            size="sm"
            className="data-[state=on]:bg-blue-100 /* Doraemon active toggle */ data-[state=on]:text-blue-600 /* Doraemon active icon */"
          >
            {repeatMode === 'track' ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
          </Toggle>
        </div>
        <div className="flex items-center w-full space-x-2">
            <span className="text-xs text-gray-500 w-10 text-right">{formatTime(progress)}</span>
            <Slider
                defaultValue={[0]}
                value={[currentTrack && currentTrack.duration > 0 ? progress : 0]}
                max={currentTrack?.duration || 100}
                step={1}
                onValueChange={handleSeekChange}
                className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-blue-500 /* Doraemon primary slider */"
                aria-label="Seek bar"
                disabled={!currentTrack}
            />
            {/* Or use Progress for non-interactive display: */}
            {/* <Progress value={progressPercent} className="w-full h-1 bg-gray-300 [&>div]:bg-blue-500 Doraemon primary progress" /> */}
            <span className="text-xs text-gray-500 w-10 text-left">{currentTrack ? formatTime(currentTrack.duration) : '0:00'}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2 w-1/4 justify-end min-w-[120px] max-w-[150px]">
        <Button variant="ghost" size="icon" onClick={() => onVolumeChange(volume > 0 ? 0 : 50)} aria-label={volume > 0 ? "Mute" : "Unmute"}>
          {volume === 0 ? <VolumeX className="h-5 w-5 text-gray-700" /> : <Volume2 className="h-5 w-5 text-gray-700" />}
        </Button>
        <Slider
          defaultValue={[50]}
          value={[volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 [&>span:first-child]:h-1 [&>span:first-child>span]:bg-blue-500 /* Doraemon primary slider */"
          aria-label="Volume control"
        />
      </div>
    </footer>
  );
};

export default MusicPlayerControls;