import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MediaItemCard from '@/components/MediaItemCard';
import TrackListItem from '@/components/TrackListItem';
import MusicPlayerControls, { MusicPlayerControlsProps } from '@/components/MusicPlayerControls';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Home, Search as SearchIcon, Library, Music, Disc, Mic2, ListMusic } from 'lucide-react';

const mockTracks = [
  { id: 't1', title: 'Future Funk', artist: 'DJ Dora', album: 'Electric Dreams', duration: '3:45', imageUrl: 'https://source.unsplash.com/random/100x100?music,track,funk' },
  { id: 't2', title: 'Anywhere Doorstep', artist: 'Nobita & The Beats', album: 'Pocket Grooves', duration: '2:50', imageUrl: 'https://source.unsplash.com/random/100x100?music,track,pop' },
];
const mockAlbums = [
  { id: 'al1', title: 'Electric Dreams', description: 'DJ Dora', imageUrl: 'https://source.unsplash.com/random/400x400?music,album,electronic', itemType: 'album' as const },
];
const mockArtists = [
  { id: 'ar1', title: 'DJ Dora', description: 'Electronic Music Producer', imageUrl: 'https://source.unsplash.com/random/400x400?music,artist,dj', itemType: 'artist' as const },
];
const mockPlaylists = [
    { id: 'pl1', title: "Doraemon's Search Mix", description: 'Found these for you!', imageUrl: 'https://source.unsplash.com/random/400x400?music,playlist,mix', itemType: 'playlist' as const },
];


const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
    console.log('SearchPage loaded');
  }, []);
  
  const handlePlayTrack = (track: typeof mockTracks[0]) => {
    console.log('Playing track:', track.title);
    setPlayerState(s => ({
      ...s,
      currentTrack: {
        title: track.title,
        artist: track.artist,
        imageUrl: track.imageUrl,
        duration: 180, // Placeholder
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
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start bg-blue-200 text-blue-700`}>
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
        <header className="p-4 border-b border-blue-200 bg-white sticky top-0 z-30">
          <Input
            placeholder="Search for songs, artists, albums, playlists..."
            className="w-full text-lg p-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<SearchIcon className="text-gray-400"/>}
          />
        </header>

        <ScrollArea className="flex-1 p-6 pb-24">
          {searchTerm ? (
            <Tabs defaultValue="tracks" className="w-full">
              <TabsList className="mb-4 bg-blue-100">
                <TabsTrigger value="tracks" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><Music className="mr-2 h-4 w-4" />Tracks</TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><Disc className="mr-2 h-4 w-4" />Albums</TabsTrigger>
                <TabsTrigger value="artists" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><Mic2 className="mr-2 h-4 w-4" />Artists</TabsTrigger>
                <TabsTrigger value="playlists" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"><ListMusic className="mr-2 h-4 w-4" />Playlists</TabsTrigger>
              </TabsList>
              <TabsContent value="tracks">
                <div className="space-y-2">
                  {mockTracks.map((track, index) => (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockAlbums.map(album => (
                    <MediaItemCard key={album.id} {...album} onPlayClick={() => handlePlayMediaItem(album)} onClick={() => console.log('View album', album.id)} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="artists">
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockArtists.map(artist => (
                    <MediaItemCard key={artist.id} {...artist} onClick={() => console.log('View artist', artist.id)} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="playlists">
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockPlaylists.map(playlist => (
                    <MediaItemCard key={playlist.id} {...playlist} onPlayClick={() => handlePlayMediaItem(playlist)} onClick={() => console.log('View playlist', playlist.id)} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <SearchIcon className="mx-auto h-12 w-12 mb-4 text-blue-300" />
              <p className="text-xl">Search for your favorite music</p>
              <p>Find songs, artists, albums, and playlists.</p>
            </div>
          )}
        </ScrollArea>
        
        <MusicPlayerControls {...playerState} />
      </div>
    </div>
  );
};

export default SearchPage;