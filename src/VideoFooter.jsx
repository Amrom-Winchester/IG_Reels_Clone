import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./VideoFooter.css";
import { Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Ticker from "react-ticker";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import db from "./firebase";

function VideoFooter( { username , imgsrc , song , likes , shares , id } ){
    const[totalLikes,setLikes] = useState(likes);
    const[liked,setLiked] = useState(null);
    useEffect( async () => {
        let docRef = db.collection("Reels").doc(id);
        let snapShot =  await docRef.get();
        let doc = snapShot.data();
        if( doc.liked ){
            setLiked(true);
        }
        else{
            doc.liked = false;
            setLiked(false);
        }
        console.log(doc);
    },totalLikes)
    return(
        <div className="videoFooter">
            <div className="innerVFooter">
                <Avatar src = {imgsrc}/>
                <h3>
                    {username} •
                    <Button>Follow</Button>
                </h3>
            </div>
            <div className="vF_Ticker">
                <MusicNoteIcon 
                className="vF_icon"/>
                <Ticker mode="smooth">
                    {({index})=>(
                        <>
                            <h1>{song}</h1>
                        </>
                    )}
                </Ticker>
            </div>
            <div className="videoFooter_Actions">
                <div className="vF_ActionsLeft">
                    { (liked) ? <FavoriteIcon
                        onClick = { async (e)=> {
                            if( liked==true ){
                                setLiked(false);
                                await db.collection("Reels").doc(id).update({
                                    liked : false,
                                })
                                setLikes(totalLikes-1);
                            }
                            else{
                                setLiked(true);
                                await db.collection("Reels").doc(id).update({
                                    liked : true,
                                })
                                setLikes(totalLikes+1);
                            }
                            
                        }}
                    /> : <FavoriteBorderIcon
                            onClick = {  async (e)=> {
                            if( liked==true ){
                                setLiked(false);
                                await db.collection("Reels").doc(id).update({
                                    liked : false,
                                })
                                setLikes(totalLikes-1);
                            }
                            else{
                                setLiked(true);
                                await db.collection("Reels").doc(id).update({
                                    liked : true,
                                })
                                setLikes(totalLikes+1);
                            }
                        }}/> 
                    }
                    <ModeCommentIcon/>
                    <SendIcon/>
                    <MoreHorizIcon/>
                </div>
                <div className="vF_ActionsRight">
                    <div className="vFActionsStats">
                        <FavoriteIcon/>
                        <p>{totalLikes}</p>
                    </div>
                    <div className="vFActionsStats">
                        <ModeCommentIcon/>
                        <p>{shares}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoFooter;

