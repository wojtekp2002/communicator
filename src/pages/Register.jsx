import React, { useState } from "react"
import Add from "../img/addavatar.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc} from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            uploadTask.on( 
           
            (error) => {
                setErr(true);
            }, 
            () => {
            
                    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,  
                        });
                    
                         await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        });

                        await setDoc(doc(db, "usersChats", res.user.uid), {});
                        navigate("/");
                    });
                }
            );

        } catch (err) {
            setErr(true);
        }
        

    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Pasiu Chat</span>
                <span className="title">Rejestracja</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="podaj imie"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="hasło"/>
                    <input style={{display: "none"}} type="file" id="file"/>
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Dodaj awatar</span>
                    </label>
                    <button>Utwórz konto</button>
                    {err && <span>Taki użytkownik juz istnieje...</span>}
                </form> 
                <p>Masz już konto? <Link to="/login">Zaloguj</Link></p>
            </div>
        </div>
        
    )
}

export default Register