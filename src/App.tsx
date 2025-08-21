import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { updateBreak } from 'typescript';

import msgbox from "./assets/msgbox.png";
import pausebtn from "./assets/pause.png"
//import pikahappy from "./assets/pikahappy.gif"
//import pikapicfocus from "./assets/pikastillwork.png"
import pikafocus from "./assets/focuspika.png";
import startbtn from "./assets/startbtn.png";
import breakbtn from "./assets/breakbtn.png";
import workbtn from "./assets/workbtn.png";
import xbutton from "./assets/xbutton.png";
import pikabreak from "./assets/pikabreak.png";



function App() {

  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning]= useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [gifImage, setGifImage] = useState(pikafocus);
  const [breakButtonImage, setBreakButtonImage]= useState(breakbtn);
  const [workButtonImage, setWorkButtonImage]= useState(workbtn);
  const [encouragement, setEncouragement]= useState("");
  const [pauseButton, setPauseButton]= useState(pausebtn);

  const cheerMessages=[
    "You’re making progress—keep going!",
    "One small step now builds big results later.",
    "Stay focused, future-you will thank you.",
    "Your effort today is an investment.",
    "You’ve got this—keep the momentum alive.",
    "Deep work now, rest later—you deserve both.",
    "Every minute counts—make it meaningful.",
    "Focus is your superpower."
  ];

  const breakMessages = [
    "Rest is preparation.",
    "Recenter yourself.",
    "Breathe—this too is discipline.",
    "The body recovers, the mind sharpens.",
    "Step back to return stronger.",
    "Stillness is strength.",
    "Pause, but do not waste the pause.",
    "Recovery is part of the work.",
    "Let go of striving, just for a moment.",
    "Balance is endurance."
  ];
  
  //encouragement message updater
  useEffect(() => {
    let messageInterval: NodeJS.Timeout;
    if(isRunning){
      const messages= isBreak? breakMessages: cheerMessages;
      setEncouragement(messages[0]); //set first message

      let index=1
      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index= (index+1) % messages.length;
      },4000); //every 5 seconds
    } else{
      setEncouragement("");
    }

    return() => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  //countdown timer
  useEffect( ()=> {
    let timer: NodeJS.Timeout;
    if(isRunning && timeLeft >0){
      timer = setInterval( () => {
        setTimeLeft(prev=>prev-1);
      }, 1000);
    }
    return() => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds/60).toString().padStart(2, '0');

    const s= (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const switchMode = (breakMode: boolean)=> {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5*60: 25*60)
    setGifImage(pikafocus)
  };

 const handleClick = () => {
  setIsRunning(prev => {
    const next = !prev;
    setGifImage(next ? (isBreak ? pikabreak : pikafocus) : pikafocus);
    return next;
  });
};
 
  const containerClass= `home-container ${isRunning ? "pokebackground": ""}`;
 
  return (
    <div className= {containerClass} style={{position: 'relative'}}>
    <div>
      <div className="home-content"> 
      <button className="close-button">
        <img src = {xbutton} alt="Close"/>
      </button>
      <h1 className= "home-timer">{formatTime(timeLeft)}</h1>
    </div>
      <div className="home-controls">
        <button className="image-button" onClick={() => switchMode(false)}>
          <img src = {workbtn} alt = "Work" />
        </button>
        <button className="image-button" onClick={() => switchMode(true)}>
          <img src = {breakbtn} alt = "break" />
        </button>
        <button className= "start-button" onClick= {handleClick}>
          <img src={isRunning ? pausebtn : startbtn} alt={isRunning ? "pause" : "start"} />
        </button>
      </div>
        <img src={gifImage} alt= "Timer Status" className='gif-image' />
    <div className="dialogue-wrap">
  <img src={msgbox} alt="Messages" className="dialogue-box" />
  <p className="encouragement-text">
  {isRunning ? encouragement : "What will Pikachu do?"}
</p>
</div>
      </div>
      
    </div>
  );
}

export default App;
