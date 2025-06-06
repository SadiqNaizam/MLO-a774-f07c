import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MediaItemCard from '@/components/MediaItemCard';
import TrackListItem from '@/components/TrackListItem';
import MusicPlayerControls, { MusicPlayerControlsProps } from '@/components/MusicPlayerControls';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Home, Search as SearchIcon, Library, UserPlus, CheckCircle, Music, Disc } from 'lucide-react';

const mockArtistDetails = {
  ar1: {
    id: 'ar1',
    name: 'DJ Dora',
    bio: 'DJ Dora is a futuristic funk artist known for upbeat tracks and innovative use of gadget sounds. Hailing from the 22nd century, DJ Dora brings a unique temporal twist to modern music.',
    imageUrl: 'https://source.unsplash.com/random/400x400?music,artist,dj,cartoon',
    topTracks: [
      { id: 'dtt1', title: 'Future Funk Fiesta', artist: 'DJ Dora', album: 'Electric Dreams', duration: '3:45', imageUrl: 'https://source.unsplash.com/random/100x100?music,track,funk' },
      { id: 'dtt2', title: 'Robotic Rhythms', artist: 'DJ Dora', album: 'Electric Dreams', duration: '4:02', imageUrl: 'https://source.unsplash.com/random/100x100?music,track,robot' },
    ],
    albums: [
      { id: 'dal1', title: 'Electric Dreams', description: 'Full Album - 2024', imageUrl: 'https://source.unsplash.com/random/400x400?music,album,electronic', itemType: 'album' as const },
      { id: 'dal2', title: 'Pocket Grooves EP', description: 'EP - 2023', imageUrl: 'https://source.unsplash.com/random/400x400?music,album,future', itemType: 'album' as const },
    ]
  }
};

const ArtistPage = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<(typeof mockArtistDetails.ar1) | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const [playerState, setPlayerState] = useState<Omit<MusicPlayerControlsProps, 'currentTrack'> & { currentTrack?: MusicPlayerControlsProps['currentTrack']}>({
    isPlaying: false,
    progress: 0,
    volume: 50,
    isShuffle: false,
    repeatMode: 'off',
    currentTrack: undefined,
    onPlayPause: () => setPlayerState(s => ({ ...s, isPlaying: !s.isPlaying })),
    onNext: () => console.log('Next track'),
    onPrevious: () => console.log('Previous track'),
    onSeek: (newTime) => setPlayerState(s => ({ ...s, progress: newTime })),
    onVolumeChange: (newVolume) => setPlayerState(s => ({ ...s, volume: newVolume })),
    onShuffleToggle: () => setPlayerState(s => ({ ...s, isShuffle: !s.isShuffle })),
    onRepeatToggle: () => setPlayerState(s => ({ ...s, repeatMode: s.repeatMode === 'off' ? 'context' : s.repeatMode === 'context' ? 'track' : 'off' })),
  });

  useEffect(() => {
    console.log('ArtistPage loaded for artist ID:', artistId);
     if (artistId && mockArtistDetails[artistId as keyof typeof mockArtistDetails]) {
      setArtist(mockArtistDetails[artistId as keyof typeof mockArtistDetails]);
    } else {
      console.error('Artist not found for ID:', artistId);
    }
  }, [artistId]);

  const handlePlayTrack = (track: typeof mockArtistDetails.ar1.topTracks[0]) => {
    console.log('Playing track:', track.title);
    setPlayerState(s => ({
      ...s,
      currentTrack: {
        title: track.title,
        artist: track.artist,
        imageUrl: track.imageUrl,
        duration: 200, // Placeholder
      },
      isPlaying: true,
      progress: 0,
    }));
  };
  
  const handlePlayMediaItem = (item: { title: string; description?: string; imageUrl: string }) => {
    console.log('Playing media item:', item.title);
     setPlayerState(s => ({
      ...s,
      currentTrack: {
        title: item.title,
        artist: item.description || 'Various Artists',
        imageUrl: item.imageUrl,
        duration: 180, 
      },
      isPlaying: true,
      progress: 0,
    }));
  };

  if (!artist) {
    return <div className="flex items-center justify-center h-screen bg-blue-50 text-blue-700">Loading artist or artist not found...</div>;
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-blue-50">
      <Sidebar>
        <NavigationMenu orientation="vertical" className="w-full">
          <NavigationMenuList className="flex flex-col space-y-1 w-full">
            <NavigationMenuItem className="w-full">
              <Link to="/" className="w-full">
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  <Home className="mr-2 h-5 w-5" /> Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link to="/search" className="w-full">
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  <SearchIcon className="mr-2 h-5 w-5" /> Search
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link to="/library" className="w-full">
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  <Library className="mr-2 h-5 w-5" /> Library
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Sidebar>

      <div className="flex-1 ml-64 flex flex-col">
        <ScrollArea className="flex-1 pb-24">
          <div className="p-6 md:p-10 bg-gradient-to-b from-indigo-200 via-purple-100 to-pink-50"> {/* Artist specific gradient */}
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8 mb-10">
              <Avatar className="h-48 w-48 md:h-64 md:w-64 rounded-full shadow-2xl border-4 border-white"> {/* Rounded for artist */}
                <AvatarImage src={artist.imageUrl} alt={artist.name} />
                <AvatarFallback className="text-6xl bg-indigo-300 text-white">{artist.name.substring(0,1)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                 <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Artist</p>
                <h1 className="text-5xl md:text-7xl font-bold text-indigo-800 my-2">{artist.name}</h1>
                <Button 
                    variant={isFollowing ? "secondary" : "default"}
                    size="lg" 
                    className="mt-4 rounded-full px-6 py-2 text-md"
                    onClick={() => setIsFollowing(!isFollowing)}
                >
                    {isFollowing ? <CheckCircle className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />}
                    {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:px-10">
            <Tabs defaultValue="topTracks" className="w-full">
              <TabsList className="mb-6 bg-blue-100">
                <TabsTrigger value="topTracks" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><Music className="mr-2 h-4 w-4" />Top Tracks</TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><Disc className="mr-2 h-4 w-4" />Albums</TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><UserPlus className="mr-2 h-4 w-4" />About</TabsTrigger>
              </TabsList>

              <TabsContent value="topTracks">
                <div className="space-y-1">
                  {artist.topTracks.map((track, index) => (
                    <TrackListItem
                      key={track.id}
                      trackNumber={index + 1}
                      {...track}
                      onPlayClick={() => handlePlayTrack(track)}
                      isPlaying={playerState.currentTrack?.title === track.title && playerState.isPlaying}
                      isActive={playerState.currentTrack?.title === track.title}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="albums">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {artist.albums.map(album => (
                    <MediaItemCard key={album.id} {...album} onPlayClick={() => handlePlayMediaItem(album)} onClick={() => console.log('View album', album.id)}/>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="about">
                <div className="p-4 bg-white rounded-lg shadow border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Biography</h3>
                    <p className="text-gray-700 leading-relaxed">{artist.bio}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
        
        <MusicPlayerControls {...playerState} />
      </div>
    </div>
  );
};

export default ArtistPage;