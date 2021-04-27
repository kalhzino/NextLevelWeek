import {useState, useContext} from "react";
import Switch from 'react-switch';
import React from 'react';
import styles from "./styles.module.scss";
import {darkModeContext, useDarkMode} from '../../contexts/DarkModeContext'


export function SwitchOptions(){
    const{ toggleDarkMode } = useContext(darkModeContext)


    const [checked, setChecked] = useState(false);
    const handleChange = nextChecked => {
      toggleDarkMode();
      setChecked(nextChecked);
    };    
   
    return (
        <div className={styles.buttonSwitch}>
          <span>DarkMode? - </span>
          <Switch                     
            onChange={handleChange}
            checked={checked} 
            uncheckedIcon={true}
            checkedIcon={false}  
          />
        </div>
    );
  };