import styles from "./styles.module.scss"
import { useContext, useRef, useEffect, useState} from 'react';
import { playerContext } from '../../contexts/PlayerContext';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";


export function Player(){
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    function setupProgressListener(){
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () =>{
            setProgress(Math.floor((audioRef.current.currentTime)));
        });
    }
    function handleSeek(amount: number){ 
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }
    function handleNext(){
        if(hasNext){
            playNext();
        }
        else if(!isLooping){
            clearPlayerState();
            setProgress(0);
        }
    }
    

    const {episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay,
        playNext,
        playPrevious, 
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        isShuffle,
        toggleShuffle,
        clearPlayerState,
        setPlayingState} = useContext(playerContext)

    const episode = episodeList[currentEpisodeIndex];
    useEffect(() => {
        if(!audioRef.current)
        return;{
        }
        if(isPlaying){
            audioRef.current.play();
        }
        if(!isPlaying){
            audioRef.current.pause();
        }
    },[isPlaying])

    

       return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando Agora</strong>
            </header>

            {episode ? (
                    <div className={styles.currentEpisode}>
                        <Image width={592} height={592} src={episode.thumbnail} objectFit = 'cover'/>
                        <strong>{episode.title}</strong>
                        <span>{episode.members}</span>
                    </div>
            ) : (
                <div className={styles.emptyPlayer}>
            <strong>Selecione um podcast para ouvir</strong>
                 </div>
            )}

        <footer className ={!episode ? styles.empty : ''}>
            <div className={styles.progress}>
                <span>{convertDurationToTimeString(progress)}</span>
                <div className={styles.slider}>
                    {episode ? (
                        <Slider
                        max={episode.duration}
                        value={progress}
                        onChange={handleSeek}
                        trackStyle = {{backgroundColor:'#04d361'}}
                        railStyle = {{backgroundColor:'#9f75ff'}}
                        handleStyle = {{borderColor:'#04d361', borderWidth:4}}
                        />
                    ):(
                        <div className={styles.emptySlider}/>
                    )}
                </div>               
                <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
            </div>

            <div className={styles.buttons}>
                <button type="button" 
                disabled = {!episode || episodeList.length == 1}
                onClick={toggleShuffle}
                className={isShuffle ? styles.isActive : ''}>
                    <img src="/shuffle.svg" alt="Embaralhar"/>
                </button>
                <button type="button" disabled = {!episode || !hasPrevious} onClick={playPrevious}>
                    <img src="/play-previous.svg" alt="TocarAnterior"/>
                </button>
                <button type="button" disabled = {!episode} onClick={togglePlay} className={styles.playButton}>
                    {isPlaying ? 
                        <img src="/pause.svg" alt="Pausar"/>
                     : 
                        <img src="/play.svg" alt="Tocar"/>
                    }
                </button>
                <button type="button" disabled = {!episode || !hasNext} onClick={() =>playNext()}>                    
                        <img src="/play-next.svg" alt="TocarProxima"/>                    
                </button>
                <button type="button" 
                disabled = {!episode}
                onClick={toggleLoop}
                className={isLooping ? styles.isActive : ''}>
                    <img src="/repeat.svg" alt="Repetir"/>
                </button>
            </div>
            {episode && (
                <audio src={episode.url}
                 ref = {audioRef}
                 loop={isLooping}
                 onPlay={() => setPlayingState(true)}
                 onPause={() => setPlayingState(false)}
                 autoPlay
                 onEnded={handleNext}
                 onLoadedMetadata={setupProgressListener} 
                />                
            )}
        </footer>
        </div>
    );
}