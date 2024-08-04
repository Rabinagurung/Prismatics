import { createContext, useCallback, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  userId: '',
  refreshToken: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [localUserId, setUserId] = useState(null);
  const [userRefreshToken, setRefreshToken] = useState(null);

  const authenticate = useCallback((token, userId, refreshToken) => {
    if (token && userId && refreshToken) {
      setAuthToken(token);
      setUserId(userId);
      setRefreshToken(refreshToken);
      AsyncStorage.setItem('token', token);
      AsyncStorage.setItem('userId', userId);
      AsyncStorage.setItem('refreshToken', refreshToken);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setUserId(null);
    AsyncStorage.multiRemove(['token', 'userId']);
  }, [setAuthToken]);

  const value = useMemo(
    () => ({
      token: authToken,
      userId: localUserId,
      refreshToken: userRefreshToken,
      isAuthenticated: !!authToken,
      authenticate: authenticate,
      logout: logout,
    }),
    [authToken, localUserId, userRefreshToken, authenticate, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* Create and manage the AuthContext which will be used in the overall app. 
Default values used for auto-completion. 
When the user is succesfullly logged in or signed up, authenticate() will be triggered.
logout is used to clear the authentication status and erase token. 

AuthContextProvider(): This is responsible for managing the actual AuthContext state
(ie: token, isAuthenticated, authenticate and logout ).  
It will be used as a wrapper around our app comoponents that wanna interact with the 
context.

The value object created which will be passed to all context users. 
context users = components that use 
We exposed auth-context to any part of app that want to work with it. 
To truly expose auth-context, we need to wrap our root component with AuthContextProvider f(). 


Usage of this fun comp: 
1. Signup screen: 
After user is successfully signed up, authenticate() fun of AuthContext is called and  
token received from Firebase is passed to context. So, that we can set the authentication status 
to authenticated in the end. 
The useContext hook is imported where AuthContext object is passed in order to access our context 
and store it in a constant or variable.  

2. Same for Login Screen. 


*/
