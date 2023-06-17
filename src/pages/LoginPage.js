import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

import { initializeApp } from "firebase/app";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBu2u70wmf3WLG_T9NqEGMi2Yu4jP75fuo",
  authDomain: "heera-b7f16.firebaseapp.com",
  projectId: "heera-b7f16",
  storageBucket: "heera-b7f16.appspot.com",
  messagingSenderId: "968834525982",
  appId: "1:968834525982:web:3cf0f9696c28e63910f70f",
  measurementId: "G-MMQ9WKKHJP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push("/HomePage");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      router.push("/HomePage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <video
          src="https://i.imgur.com/e0So3IN.mp4"
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ boxShadow: "0 25px 50px -12px rgba(1, 1, 1, 1)" }}>
            <button
              style={{
                display: "flex",
                padding: "0.75rem",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.5rem",
                cursor: "pointer",
                outline: "0",
                color: "whitesmoke",
                backgroundColor: "",
                fontWeight: "semi-bold",
                fontSize: "30px",
              }}
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <button className='button-17' onClick={signInWithGoogle}>
          Sign in with Google
      </button> */
}
