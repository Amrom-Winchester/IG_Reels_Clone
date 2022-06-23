import { createContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";

export const authContext = createContext();

let AuthProvider = (props) => {

    let [user,setUser] = useState(null);
    let [loading,setLoading] = useState(true);

    useEffect ( ()=> {

        let unsub = auth.onAuthStateChanged( async (user)=> {

            if(user){
                let {displayName,email,uid,photoURL} = user;
                console.log(user);
                let docRef = db.collection("users").doc(uid);
                let documentSnapshot = await docRef.get();
                let obj = documentSnapshot.data()

                // Here we are setting the data for a given new user everytime he/she login through google
                // so we are checking whether the document with the given Id exists in our collection or not
                // if it doesnt exist we are making it into a real document with given fields of data which 
                // are passed into set function
                if( !documentSnapshot.exists ){
                    docRef.set({
                        displayName,
                        email,
                        photoURL,
                    })
                }

                setUser( {displayName,email,uid,photoURL} );
            }
            else{
                setUser(null);
            }

            setLoading(false);
        });

        return ()=> {
            unsub();
        };
    },[]);


    return (
        <authContext.Provider value = {user}>
            {!loading && props.children}
            
        </authContext.Provider>
    );
};

export default AuthProvider;