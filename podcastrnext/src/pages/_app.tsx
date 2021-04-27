import '../styles/global.scss';
import {Header} from '../components/header';
import styles from '../styles/app.module.scss';
import {Player} from '../components/player';
import { PlayerContextProvider} from '../contexts/PlayerContext'
import { DarkModeContextProvider } from '../contexts/DarkModeContext'


function MyApp({ Component, pageProps }) {
 return(
  <PlayerContextProvider>
    <DarkModeContextProvider>
    <div className={styles.wrapper}>
      <main>
      <Header/>      
      <Component {...pageProps} />
      </main>
      <Player/>
    </div>
    </DarkModeContextProvider>
    </PlayerContextProvider>
    
  )
}
export default MyApp
