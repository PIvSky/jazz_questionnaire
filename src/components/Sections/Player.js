import {React, useRef} from 'react';
import './Player.css';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';

const Player = ({songs, audioElem, isPlaying, setIsPlaying, currentSong, setCurrentSong})=> {

  const resetRef = useRef(0);
  const clickRef = useRef();
  
  const PlayOrPause = () => {
    setIsPlaying(prev => !prev)
    // change boolean in isPlaying useState on true
  }

  // function that change duration of song by seek bar
  const checkWidth = (event) => {
    let width = clickRef.current.clientWidth;
    // it gives 100% width of seekbar (depends of viewport);
    const offset = event.nativeEvent.offsetX;
    // it gives an access to seek bar - where you click, you are on audio timeline;
    // returns poin on seekbar, where we click

    const seekBarProgress = (offset / width) * 100;
    // count to percentage our click on seekbar

    if(audioElem.current.style.width === '0%') {
      audioElem.current.currentTime = width;
    } else {
      audioElem.current.currentTime = (seekBarProgress / 100) * audioElem.current.duration;
    }

    // console.log(currentSong.length) after skipBack/Next returns NaN;
    // console.log(audioElem.current.duration) this solution works fine
  };

  // change audio file to previous one
  const skipBack = () => {
    const index = songs.findIndex(song => song.title === currentSong.title)
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1] )
    } else {
      setCurrentSong(songs[index - 1])
    }
    // when user change song to previous one, play button is changin for pause button
    if (isPlaying === true) {
      setIsPlaying(false)
    }
    audioElem.current.currentTime = 0;
    // take changed audio file to beggining
    resetRef.current.style.width = '0%';
  }

  // change audio file to next one
  const skipNext = () => {
    const index = songs.findIndex(song => song.title === currentSong.title)
    if (index === songs.length - 1) {
      setCurrentSong(songs[0] )
    } else {
      setCurrentSong(songs[index + 1])
    }
    // when user change song to next one, play button is changin for pause button
    if (isPlaying === true) {
      setIsPlaying(false)
    }
    audioElem.current.currentTime = 0;
    resetRef.current.style.width = '0%';
  }

  return (
    <div className='player-container'>
      <div className="title">
        <p>{currentSong.title}</p>
      </div>
      <div className="navigation">
        <div className="navigation-wrapper" onClick={checkWidth} ref={clickRef}>
          <div className="seek-bar" style={{width:`${currentSong.progress+"%"}`}} ref={resetRef} ></div>
        </div>
      </div>
      <div className="controls-btn">
        <BsFillSkipStartCircleFill className='controls-btn__action' onClick={skipBack}/>
        {!isPlaying ? <BsFillPlayCircleFill className='controls-btn__action pp' onClick={PlayOrPause}/>
        : <BsFillPauseCircleFill className='controls-btn__action pp' onClick={PlayOrPause}/>
        }
        <BsFillSkipEndCircleFill className='controls-btn__action' onClick={skipNext}/>        
      </div>
    </div>
  
  )
}

export default Player