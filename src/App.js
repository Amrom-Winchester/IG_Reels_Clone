import React, { useEffect, useState } from 'react';
import './App.css';
import VideoCard from './VideoCard';
import {db, storage} from "./firebase";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function App() {
  let [user,setUser] = useState([]);
  const[reels,setReels] = useState([]);

  // useEffect( async ()=> {
  //   db.collection("Users").onSnapshot(snapshot=>{
  //     setReels(snapshot.docs.map(
  //       doc=>doc.data()
  //     ))
  //   })
  //   db.collection("IG-User").onSnapshot(snapshot=>{
  //     setUser(snapshot.docs.map(
  //       doc=>doc.data()
  //     ))
  //   })
  // },[])

  useEffect( ()=>{
    db.collection("Reels").onSnapshot( (querySnapshot)=>{
        let docArr = querySnapshot.docs;
        let arr = [];
        for( let i = 0; i<docArr.length; i++ ){
            arr.push( {
                id: docArr[i].id,
                ...docArr[i].data(),
            } );
        }
        setReels(arr);
    });

    console.log(reels);

    db.collection("IG-User").onSnapshot(snapshot=>{
          setUser(snapshot.docs.map(
            doc=>doc.data()
          ))
        })
},[]);
  
  console.log(user);
  console.log(reels);
  return (
    
    <div className="App">
      <div className="app_top">
        <img className="app_logo"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
             />
      </div>
      <input 
                type="file"
                onClick={ (e)=>{
                    e.currentTarget.value=null;
                  }}
                onChange = { (e)=>{
                  let videoObj = e.currentTarget.files[0];
                  let { name , size , type } = videoObj;

                  size = size/1000000;
                  if( size>10 ){
                    alert("File size exceeds 10mb");
                        return;
                    }
                    let song = name.split("_")[1];
                    type = type.split("/")[0];
                    
                    if( type!="video" ){
                      alert("Please upload a video file");
                      return;
                    }
                    console.log(videoObj);
                    
                    let user0 = user[0];
                    console.log(user0.id);
                    console.log(song);

                    let uploadTask = storage.ref(`Reels/${user0.id}/${Date.now()+"-"+name}`).put(videoObj);
                    console.log(uploadTask);
                    
                    
                    uploadTask.on("state-changed",null,null, ()=> {
                      uploadTask.snapshot.ref.getDownloadURL().then( (url)=>{
                        console.log(url);
                        console.log(user0.displayName);
                        console.log(user0.imgsrc);
                        let likes = 0;
                        let shares = 0;
                        

                            db.collection("Reels").add({
                              displayname : user0.displayName , imgsrc : user0.imgsrc , url , likes , shares , song 
                            });
                        });
                    });
                  }}
                   
                />
      <div className='upload'>
        <CloudUploadIcon />
      </div>
      <div className="app_videos">
        {reels.map( ({username , imgsrc , song , url , likes , shares , id})=>(
          <VideoCard 
            username = {username}
            imgsrc = {imgsrc}
            song = {song}
            url = {url}
            likes = {likes}
            shares = {shares}
            id = {id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
