import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import TrackListItem from '@/components/TrackListItem';
import MusicPlayerControls, { MusicPlayerControlsProps } from '@/components/MusicPlayerControls';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Home, Search as SearchIcon, Library, Play, ListMusic } from 'lucide-react';

const mockPlaylistDetails = {
  pl1: {
    id: 'pl1',
    name: "Doraemon's Happy Mix",
    description: 'Upbeat tunes for a joyful day! Curated by Doraemon himself.',
    coverUrl: 'https://source.unsplash.com/random/400x400?music,happy,cartoon',
    creator: 'Doraemon',
    tracks: [
      { id: 'pt1', title: 'Blue Sky Beats', artist: 'DJ Shizuka', album: 'Playtime', duration: '3:15', imageUrl: 'https://source.unsplash.com/random/100x100?music,track,sky' },
      { id: 'pt2', title: 'Gadget Groove', artist: 'Gian & Suneo', album: 'Neighborhood Sounds', duration: '2:55', imageUrl: 'https://source.unsplash.com/random/100x100?music,track,gadget' },
      { id: 'pt3', title: 'Time Machine Funk', artist: 'Nobita Nobi', album: 'Future Past', duration: '4:05', imageUrl: 'https://source.unsplash.com/random/100x100?music,track,time' },
    ]
  },
  // Can add more mock playlists or albums by ID
};

const PlaylistViewPage = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [playlist, setPlaylist] = useState<(typeof mockPlaylistDetails.pl1) | null>(null);

  const [playerState, setPlayerState] = useState<Omit<MusicPlayerControlsProps, 'currentTrack'> & { currentTrack?: MusicPlayerControlsProps['currentTrack']}>({
    isPlaying: false,
    progress: 0,
    volume: 50,
    isShuffle: false,
    repeatMode: 'off',
    currentTrack: undefined,
    onPlayPause: () => setPlayerState(s => ({ ...s, isPlaying: !s.isPlaying })),
    onNext: () => console.log('Next track'), // Implement playlist logic
    onPrevious: () => console.log('Previous track'), // Implement playlist logic
    onSeek: (newTime) => setPlayerState(s => ({ ...s, progress: newTime })),
    onVolumeChange: (newVolume) => setPlayerState(s => ({ ...s, volume: newVolume })),
    onShuffleToggle: () => setPlayerState(s => ({ ...s, isShuffle: !s.isShuffle })),
    onRepeatToggle: () => setPlayerState(s => ({ ...s, repeatMode: s.repeatMode === 'off' ? 'context' : s.repeatMode === 'context' ? 'track' : 'off' })),
  });

  useEffect(() => {
    console.log('PlaylistViewPage loaded for playlist ID:', playlistId);
    if (playlistId && mockPlaylistDetails[playlistId as keyof typeof mockPlaylistDetails]) {
      setPlaylist(mockPlaylistDetails[playlistId as keyof typeof mockPlaylistDetails]);
    } else {
      // Handle playlist not found, maybe redirect or show error
      console.error('Playlist not found for ID:', playlistId);
    }
  }, [playlistId]);

  const handlePlayTrack = (track: typeof mockPlaylistDetails.pl1.tracks[0]) => {
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

  const handlePlayAll = () => {
    if (playlist && playlist.tracks.length > 0) {
        handlePlayTrack(playlist.tracks[0]);
        // Here you might want to set a queue in playerState if it supported it
        console.log("Playing all tracks from:", playlist.name);
    }
  };

  if (!playlist) {
    return (
        <div className="flex items-center justify-center h-screen bg-blue-50 text-blue-700">
            Loading playlist or playlist not found...
        </div>
    );
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
         <header className="p-4 border-b border-blue-200 bg-white sticky top-0 z-30">
           <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/library">Library</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                 <BreadcrumbLink asChild><Link to="/library?tab=playlists">Playlists</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{playlist.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <ScrollArea className="flex-1 pb-24">
          <div className="p-6 md:p-10 bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50">
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8 mb-10">
              <Avatar className="h-48 w-48 md:h-64 md:w-64 rounded-lg shadow-2xl border-4 border-white">
                <AvatarImage src={playlist.coverUrl} alt={playlist.name} />
                <AvatarFallback className="text-6xl bg-blue-300 text-white">{playlist.name.substring(0,1)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Playlist</p>
                <h1 className="text-5xl md:text-7xl font-bold text-blue-800 my-2">{playlist.name}</h1>
                <p className="text-blue-700 text-lg mb-2">{playlist.description}</p>
                <p className="text-sm text-blue-600">Created by: <span className="font-semibold">{playlist.creator}</span> · {playlist.tracks.length} songs</p>
                 <Button size="lg" className="mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3 text-lg" onClick={handlePlayAll}>
                    <Play className="mr-2 h-6 w-6 fill-white" /> Play All
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 md:px-10">
            {playlist.tracks.map((track, index) => (
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
        </ScrollArea>
        
        <MusicPlayerControls {...playerState} />
      </div>
    </div>
  );
};

export default PlaylistViewPage;