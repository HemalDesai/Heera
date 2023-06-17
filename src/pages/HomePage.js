import MonthButton from '../components/MonthButton';
import { getAuth, onAuthStateChanged,signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
const firebaseConfig = {
  apiKey: "AIzaSyBu2u70wmf3WLG_T9NqEGMi2Yu4jP75fuo",
  authDomain: "heera-b7f16.firebaseapp.com",
  projectId: "heera-b7f16",
  storageBucket: "heera-b7f16.appspot.com",
  messagingSenderId: "968834525982",
  appId: "1:968834525982:web:3cf0f9696c28e63910f70f",
  measurementId: "G-MMQ9WKKHJP"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const buttons = [
  { label: 'January', link: '/january' },
  { label: 'February', link: '/february' },
  { label: 'March', link: '/march' },
  { label: 'April', link: '/april' },
  { label: 'May', link: '/may' },
  { label: 'June', link: '/june' },
  { label: 'July', link: '/july' },
  { label: 'August', link: '/august' },
  { label: 'September', link: '/september' },
  { label: 'October', link: '/october' },
  { label: 'November', link: '/november' },
  { label: 'December', link: '/december' },
];

const HomePage = () => {
  const router = useRouter();
  // const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || '');
      } else {
        setUsername('');
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clean up the subscription
    return () => {
      unsubscribe();
    };
  }, []);
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/LoginPage');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

 
  
  


  return (
    
    <div>
   
      
    <h1 style={{ marginLeft:'60px', fontWeight:'lighter', fontSize:'30px', color:"#92a8c9"
  }}>Welcome {username}</h1> 
     <h1 style={{ marginLeft:'60px', fontWeight:'lighter', fontSize:'30px', color:"#92a8c9"
    }}>Select a month</h1> 
     
    <div style={gridStyles}>
      {buttons.map((button, index) => (
        <MonthButton key={index} label={button.label} link={button.link} />
      ))}
    </div>
    
      <button style={{ marginLeft:'60px', fontWeight:'lighter', fontSize:'30px',
      // add border 
      border: '1px solid #ccc',
      // add padding
      padding: '2px 5px',
      // add border radius
      borderRadius: '10px',
      // add background color
      backgroundColor: '#333',
      color:"#92a8c9",
      //add box shadow
      boxShadow: '0 5px 5px rgba(0,0,0,0.1)',
      marginTop:'25px',
      // bring the button at the center
      margin: 'auto',
      display: 'block',
      width: '100px', 
      height: '50px',

      

      }} onClick={() => handleLogout()}>
        Logout
      </button>
      
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />

<Player
  autoplay
  loop
  src="https://assets6.lottiefiles.com/packages/lf20_lxcwc92z.json"
  style={{ height: '200px', width: '200px', marginTop:'10px' }}
  
>
</Player>
<div style={{display:"flex", justifyContent:"center", 
    //bring this part to the bottom of the page
     width:"100%", height:"50px", 
    color:"#92a8c9", alignItems:"center",position: "fixed", bottom:"0",
    }}>
        <p>Made with ❤️ by Hemal</p>
      </div>
      </div>
    
    
  );
};

export default HomePage;
