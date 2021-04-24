import { createContext } from 'react';
import { useState, ReactNode, useContext } from 'react';


type Episode ={
    title:string,
    members:string,
    thumbnail:string,
    duration: number,
    url:string,
}
type playerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    isLooping: boolean,
    hasPrevious:boolean,
    hasNext:boolean,
    isShuffle:boolean,
    play:(episode:Episode) => void;
    playList:(list: Episode[], index: number) => void;
    togglePlay:() => void;
    toggleLoop:() => void;
    toggleShuffle:() => void;
    playNext:() => void;
    playPrevious:() => void;    
    clearPlayerState:() => void;
    setPlayingState:(sate:boolean) => void;

}

export const playerContext = createContext({} as playerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({children}: PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
  
    
    function play(episode: Episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true)
    }
    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);        
    }
    function toggleShuffle(){
        setIsShuffle(!isShuffle)
    }
    function togglePlay(){
      setIsPlaying(!isPlaying)
    }
    function toggleLoop(){
        setIsLooping(!isLooping);
    }
    function setPlayingState(state : boolean){
      setIsPlaying(state);
    } 
    function playList(list: Episode[], index: number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    } 
    const hasNext = isShuffle || (currentEpisodeIndex +1) < episodeList.length;
    const hasPrevious = currentEpisodeIndex > 0;
    function playNext(){
        if(isShuffle){
            const randomEpisode = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(randomEpisode)
        }
        else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex+1)
        }
    }
    function playPrevious(){
       
        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }
   

    return (
        <playerContext.Provider
    value={{ episodeList, 
        currentEpisodeIndex, 
        play,
        playList, 
        isPlaying, 
        togglePlay,
        playNext,
        playPrevious,
        hasPrevious,
        hasNext,
        isLooping,
        toggleLoop,
        isShuffle,
        toggleShuffle,
        clearPlayerState,
        setPlayingState }}>

            {children}
        </playerContext.Provider >)
    }

    export const usePlayer = () =>{
        return useContext(playerContext);
    }