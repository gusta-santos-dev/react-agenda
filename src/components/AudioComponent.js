import React, {useRef, useState} from "react";
import { faVolumeXmark, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AudioComponent() {
    const audioRef = useRef(null);
    const [tocando, setTocando] = useState(false);

    function alternar(){
        const audio = audioRef.current;

        if(audio.paused) {
            audio.muted = false;
            audio.volume = 0.2;
            audio.play().catch(console.error);
            setTocando(true);
        }else{
            audio.pause(true);
            setTocando(false);
        }
    }

    return (
        <div className="audio-popup" onClick={alternar}>
            <FontAwesomeIcon icon={tocando ? faVolumeHigh : faVolumeXmark}/>
            <audio ref={audioRef} src="audio-bg.mp3" muted loop></audio>
        </div>
    )
}