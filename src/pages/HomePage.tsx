import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MediaItemCard from '@/components/MediaItemCard';
import MusicPlayerControls, { MusicPlayerControlsProps } from '@/components/MusicPlayerControls';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Home, Search as SearchIcon, Library, User, Settings, LogOut, PlayCircle, Music } from 'lucide-react';

// Mock data for MediaItemCards
const featuredPlaylists = [
  { id: 'pl1', title: "Doraemon's Happy Mix", description: 'Upbeat tunes for a joyful day!', imageUrl: 'https://source.unsplash.com/random/400x400?music,happy,cartoon', itemType: 'playlist' as const },
  { id: 'pl2', title: 'Gadget Grooves', description: 'Futuristic beats and tech house.', imageUrl: 'https://source.unsplash.com/random/400x400?music,electronic,gadget', itemType: 'playlist' as const },
  { id: 'pl3', title: 'Time Travel Tunes', description: 'Classics from every era.', imageUrl: 'https://source.unsplash.com/random/400x400?music,vintage,time', itemType: 'playlist' as const },
];

const newReleases = [
  { id: 'al1', title: 'Cosmic Echoes', description: 'By The Space Cadets', imageUrl: 'https://source.unsplash.com/random/400x400?music,album,space', itemType: 'album' as const },
  { id: 'al2', title: 'Pocketful of Beats', description: 'By DJ Pocket', imageUrl: 'https://source.unsplash.com/random/400x400?music,album,hiphop', itemType: 'album' as const },
];

const HomePage = () => {
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
    console.log('HomePage loaded');
  }, []);

  const handlePlayItem = (item: { title: string; description?: string; imageUrl: string }) => {
    console.log('Playing item:', item.title);
    setPlayerState(s => ({
      ...s,
      currentTrack: {
        title: item.title,
        artist: item.description || 'Various Artists',
        imageUrl: item.imageUrl,
        duration: 180, // Placeholder duration
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
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full justify-start bg-blue-200 text-blue-700`}>
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
        <header className="p-4 border-b border-blue-200 flex justify-between items-center bg-white sticky top-0 z-30">
          <Input placeholder="Search everything..." className="w-1/2 sm:w-1/3" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-10 w-10">
                <AvatarImage src="https://source.unsplash.com/random/100x100?avatar,user" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /> Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <ScrollArea className="flex-1 p-6 pb-24">
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">Doraemon's Picks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {featuredPlaylists.map(item => (
                <MediaItemCard
                  key={item.id}
                  {...item}
                  onPlayClick={(e) => { e.stopPropagation(); handlePlayItem(item); }}
                  onClick={() => console.log('Navigate to playlist:', item.id)}
                  playButtonLabel={`Play ${item.title}`}
                />
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">New Releases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {newReleases.map(item => (
                <MediaItemCard
                  key={item.id}
                  {...item}
                  onPlayClick={(e) => { e.stopPropagation(); handlePlayItem(item); }}
                  onClick={() => console.log('Navigate to album:', item.id)}
                  playButtonLabel={`Play ${item.title}`}
                />
              ))}
            </div>
          </section>

           <section>
            <h2 className="text-3xl font-bold mb-6 text-blue-700">Recently Played</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...featuredPlaylists].reverse().slice(0,2).map(item => ( // Mock recently played
                <MediaItemCard
                  key={`recent-${item.id}`}
                  {...item}
                  title={`Recent: ${item.title}`}
                  onPlayClick={(e) => { e.stopPropagation(); handlePlayItem(item); }}
                  onClick={() => console.log('Navigate to item:', item.id)}
                  playButtonLabel={`Play ${item.title}`}
                />
              ))}
            </div>
          </section>
        </ScrollArea>
        
        <MusicPlayerControls {...playerState} />
      </div>
    </div>
  );
};

export default HomePage;