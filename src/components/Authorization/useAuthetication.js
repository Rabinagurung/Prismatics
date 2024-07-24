import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../database/config';

export function useAuthentication() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    signInWithEmailAndPassword(auth, 'test@gmail.com', '123456')
      .then((userCredential) => {
        // Signed in
      })
      .catch((error) => {
        console.log(error?.message);
      });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in
        setUser(user);
      } else {
        //user is signed out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}
