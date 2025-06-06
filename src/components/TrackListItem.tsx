import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, Pause, MoreHorizontal, Music2 } from 'lucide-react'; // Icons
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // For more actions

interface TrackListItemProps {
  trackNumber?: number; // Optional track number
  title: string;
  artist: string;
  album?: string; // Optional album name
  duration: string; // Formatted duration e.g., "3:45"
  imageUrl?: string; // Album/track art
  isPlaying?: boolean; // Is this track currently playing?
  isActive?: boolean; // Is this track currently selected/active in the list (e.g. for styling)
  onPlayClick: () => void;
  // Example additional actions
  onAddToQueueClick?: () => void;
  onViewArtistClick?: () => void;
  onViewAlbumClick?: () => void;
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  trackNumber,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isPlaying = false,
  isActive = false,
  onPlayClick,
  onAddToQueueClick,
  onViewArtistClick,
  onViewAlbumClick,
}) => {
  console.log("Rendering TrackListItem:", title, "Playing:", isPlaying);

  const itemBaseClasses = "flex items-center space-x-3 p-2 hover:bg-gray-100 /* Doraemon hover */ rounded-md transition-colors duration-150 group";
  const activeClasses = isActive ? "bg-blue-100 /* Doraemon active item bg */ text-blue-700 /* Doraemon active item text */" : "text-gray-700";
  
  return (
    <div className={`${itemBaseClasses} ${activeClasses}`} role="button" tabIndex={0} onClick={onPlayClick} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onPlayClick(); }}>
      {/* Track Number or Play/Pause Icon */}
      <div className="w-8 text-center flex items-center justify-center">
        {isPlaying ? (
          <Pause className="h-5 w-5 text-blue-500 /* Doraemon primary icon */ cursor-pointer" onClick={(e) => { e.stopPropagation(); onPlayClick(); }}/>
        ) : (
          <span className="text-sm text-gray-500 group-hover:hidden w-full h-full flex items-center justify-center">
            {trackNumber || <Music2 className="h-4 w-4" />}
          </span>
        )}
        <Button variant="ghost" size="icon" className="hidden group-hover:flex items-center justify-center w-full h-full" onClick={(e) => { e.stopPropagation(); onPlayClick(); }} aria-label={isPlaying ? "Pause " + title : "Play " + title}>
            { isPlaying ? <Pause className="h-5 w-5 text-blue-500" /> : <Play className="h-5 w-5 text-blue-500 /* Doraemon primary icon */" /> }
        </Button>
      </div>

      {/* Track Art (Optional) */}
      {imageUrl && (
        <Avatar className="h-10 w-10 rounded">
          <AvatarImage src={imageUrl} alt={title} />
          <AvatarFallback className="bg-gray-200 /* Doraemon fallback */">
            {title.substring(0,1)}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Title and Artist */}
      <div className="flex-grow min-w-0">
        <p className={`text-sm font-medium truncate ${isActive ? 'text-blue-700' : 'text-gray-800 /* Doraemon primary text */'}`}>
          {title}
        </p>
        <p className={`text-xs truncate ${isActive ? 'text-blue-600' : 'text-gray-500 /* Doraemon secondary text */'}`}>
          {artist}
        </p>
      </div>
      
      {/* Album (Optional) - hidden on smaller screens example */}
      {album && <p className="text-xs text-gray-500 truncate hidden md:block w-1/4">{album}</p>}

      {/* Duration */}
      <p className="text-xs text-gray-500 w-12 text-right">{duration}</p>

      {/* More Actions Button */}
      {(onAddToQueueClick || onViewArtistClick || onViewAlbumClick) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 focus:opacity-100" aria-label="More actions">
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            {onAddToQueueClick && <DropdownMenuItem onClick={onAddToQueueClick}>Add to queue</DropdownMenuItem>}
            {onViewArtistClick && <DropdownMenuItem onClick={onViewArtistClick}>View artist</DropdownMenuItem>}
            {onViewAlbumClick && <DropdownMenuItem onClick={onViewAlbumClick}>View album</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default TrackListItem;