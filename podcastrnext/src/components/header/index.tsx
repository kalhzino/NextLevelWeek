import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import {SwitchOptions} from '../switchDarkMode'
import {darkModeContext, useDarkMode} from '../../contexts/DarkModeContext'



import styles from "./styles.module.scss"
import { useContext } from 'react';
export function Header(){
    const currentDate = format(new Date(), 'EEEEEEE, d MMMM', {
        locale: ptBR,
        
    });
    const{isDarkModeEnabled,
        toggleDarkMode,} = useContext(darkModeContext)
    return(
        <header className={isDarkModeEnabled? styles.headerContainerDarkMode : styles.headerContainer}>       
        
        <Link href="/">
            <button type="button">           
            <a></a>            
            <img src="/logo.svg" alt="Podcastr" />            
            </button>    
        </Link> 
        <button type="button">            
        </button>        
            <p>O melhor para você ouvir, sempre</p>
            <SwitchOptions/>
            <span>{currentDate}</span>            
        </header>
    );
}