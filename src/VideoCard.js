import React, { useState,useRef } from "react";
import "./VideoCard.css";
import VideoFooter from "./VideoFooter";
import VideoHeader from "./VideoHeader";

function VideoCard({ url , likes , shares , username , imgsrc , song , id }){
    // useState
    const[isVideoPlaying,setIsVideoPlaying] = useState(false);

    //useRef
    const videoRef = useRef(null);

    const onVideoPress = () => {
        if( isVideoPlaying ){
            //stop the video
            videoRef.current.pause();
            setIsVideoPlaying(false);
        }
        else{
            // play the video
            videoRef.current.play();
            setIsVideoPlaying(true);
        }
    }

    return(
        <div className="videoCard">
            <VideoHeader/>
            <video
                ref={videoRef}
                onClick={onVideoPress}
                className="videoCard_player"
                src={url}
                alt=""
                loop={true}
            />
            <VideoFooter
                username = {username}
                song = {song}
                likes = {likes}
                imgsrc = {imgsrc}
                shares = {shares}
                id = {id}
            />
        </div>
    )
}

export default VideoCard;