import React, {useState, useEffect, createContext} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthenticatedStack, UnauthenticatedStack} from '../../Navigator';
import { AuthContext } from './utils';



const AuthNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  return user ? (
    <AuthContext.Provider value={user}>
      <AuthenticatedStack />
    </AuthContext.Provider>
  ) : (
    <UnauthenticatedStack />
  );
};

export default AuthNavigator;
