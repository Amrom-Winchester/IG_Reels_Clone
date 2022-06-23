import React from "react";
import "./VideoHeader.css";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

function VideoHeader(){
    return(
        <div className="videoHeader">
            <ArrowBackIosNewOutlinedIcon/>
            <h3>Reels</h3>
            <CameraAltOutlinedIcon/>
        </div>
    )
}

export default VideoHeader;