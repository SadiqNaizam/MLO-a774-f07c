import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MediaItemCard from '@/components/MediaItemCard';
import TrackListItem from '@/components/TrackListItem';
import MusicPlayerControls, { MusicPlayerControlsProps } from '@/components/MusicPlayerControls';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Home, Search as SearchIcon, Library, PlusCircle, ListMusic, Disc, Mic2, Heart } from 'lucide-react';

const mockUserPlaylists = [
  { id: 'upl1', title: "My Chill Vibes", description: '23 tracks', imageUrl: 'https://source.unsplash.com/random/400x400?music,playlist,chill', itemType: 'playlist' as const },
  { id: 'upl2', title: "Workout Power Hour", description: '15 tracks', imageUrl: 'https://source.unsplash.com/random/400x400?music,playlist,gym', itemType: 'playlist' as const },
];
const mockFollowedArtists = [
  { id: 'far1', title: 'Doraemon Beats', description: 'Future Funk Artist', imageUrl: 'https://source.unsplash.com/random/400x400?music,artist,cartoon', itemType: 'artist' as const },
];
const mockSavedAlbums = [
  { id: 'sal1', title: 'Time Capsule Hits', description: 'Various Artists', imageUrl: 'https://source.unsplash.com/random/400x400?music,album,vintage', itemType: 'album' as const },
];
const mockLikedTracks = [
  { id: 'lt1', title: 'Pocket Bell Melody', artist: 'DJ Gadget', album: 'Toolbox Trax', duration: '4:02', imageUrl: 'https://source.unsplash.com/random/100x100?music,track,bell' },
];

const LibraryPage = () => {
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
    console.log('LibraryPage loaded');
  }, []);
  
  const handlePlayTrack = (track: typeof mockLikedTracks[0]) => {
    console.log('Playing track:', track.title);
    setPlayerState(s => ({
      ...s,
      currentTrack: {
        title: track.title,
        artist: track.artist,
        imageUrl: track.imageUrl,
        duration: 242, // Placeholder
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
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start bg-blue-200 text-blue-700`}>
                  <Library className="mr-2 h-5 w-5" /> Library
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Sidebar>

      <div className="flex-1 ml-64 flex flex-col">
        <header className="p-4 py-6 border-b border-blue-200 bg-white sticky top-0 z-30 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">My Library</h1>
        </header>

        <ScrollArea className="flex-1 p-6 pb-24">
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="mb-6 bg-blue-100">
              <TabsTrigger value="playlists" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><ListMusic className="mr-2 h-4 w-4" />Playlists</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><Mic2 className="mr-2 h-4 w-4" />Artists</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><Disc className="mr-2 h-4 w-4" />Albums</TabsTrigger>
              <TabsTrigger value="liked" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><Heart className="mr-2 h-4 w-4" />Liked Songs</TabsTrigger>
            </TabsList>

            <TabsContent value="playlists">
              <Button variant="outline" className="mb-6 border-blue-500 text-blue-500 hover:bg-blue-100 hover:text-blue-600">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Playlist
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockUserPlaylists.map(playlist => (
                  <MediaItemCard key={playlist.id} {...playlist} onPlayClick={() => handlePlayMediaItem(playlist)} onClick={() => console.log('View playlist', playlist.id)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="artists">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockFollowedArtists.map(artist => (
                  <MediaItemCard key={artist.id} {...artist} onClick={() => console.log('View artist', artist.id)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="albums">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockSavedAlbums.map(album => (
                  <MediaItemCard key={album.id} {...album} onPlayClick={() => handlePlayMediaItem(album)} onClick={() => console.log('View album', album.id)} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="liked">
              <div className="space-y-2">
                {mockLikedTracks.map((track, index) => (
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
          </Tabs>
        </ScrollArea>
        
        <MusicPlayerControls {...playerState} />
      </div>
    </div>
  );
};

export default LibraryPage;