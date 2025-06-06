import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PlayCircle } from 'lucide-react'; // Icon for play button

interface MediaItemCardProps {
  imageUrl: string;
  title: string;
  description?: string;
  itemType: 'playlist' | 'album' | 'artist' | 'track'; // To style or behave differently
  onPlayClick?: (e: React.MouseEvent) => void; // To handle play action, stops propagation
  onClick?: () => void; // To handle card click for navigation
  playButtonLabel?: string;
}

const MediaItemCard: React.FC<MediaItemCardProps> = ({
  imageUrl,
  title,
  description,
  itemType,
  onPlayClick,
  onClick,
  playButtonLabel = "Play"
}) => {
  console.log("Rendering MediaItemCard:", title, "Type:", itemType);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if play button is clicked
    if (onPlayClick) {
      onPlayClick(e);
    }
    console.log("Play clicked on:", title);
  };

  return (
    <Card
      className="w-full max-w-xs overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl group bg-white /* Doraemon card background */ rounded-lg /* Doraemon rounded corners */ border border-gray-200 /* Doraemon subtle border */"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-gray-100 /* Doraemon image placeholder */">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlayClick && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 text-white /* Doraemon icon color */ hover:bg-blue-500 /* Doraemon primary hover */"
              onClick={handlePlayClick}
              aria-label={playButtonLabel + " " + title}
            >
              <PlayCircle className="h-12 w-12" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-md font-semibold truncate text-gray-800 /* Doraemon title text */">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs text-gray-500 /* Doraemon description text */ line-clamp-2 mt-1">
            {description}
          </CardDescription>
        )}
      </CardContent>
      {/* Optional Footer for actions specific to itemType */}
      {/* <CardFooter className="p-3 pt-0">
        <Button variant="outline" size="sm" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">More Info</Button>
      </CardFooter> */}
    </Card>
  );
};

export default MediaItemCard;