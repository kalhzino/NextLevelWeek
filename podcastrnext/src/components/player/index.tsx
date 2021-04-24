import styles from "./styles.module.scss"
import { useContext, useRef, useEffect} from 'react';
import { playerContext } from '../../contexts/PlayerContext';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'


export function Player(){
    const audioRef = useRef<HTMLAudioElement>(null);

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
                <span>00:00</span>
                <div className={styles.slider}>
                    {episode ? (
                        <Slider
                        trackStyle = {{backgroundColor:'#04d361'}}
                        railStyle = {{backgroundColor:'#9f75ff'}}
                        handleStyle = {{borderColor:'#04d361', borderWidth:4}}
                        />
                    ):(
                        <div className={styles.emptySlider}/>
                    )}
                </div>               
                <span>00:00</span>
            </div>

            <div className={styles.buttons}>
                <button type="button" disabled = {!episode}>
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
                autoPlay/>                
            )}
        </footer>
        </div>
    );
}