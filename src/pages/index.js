import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Import your Firebase authentication instance
import HomePage from '@/pages/HomePage';

const IndexPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/LoginPage'); // Redirect to the login page if the user is not logged in
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <HomePage />;
};

export default IndexPage;
