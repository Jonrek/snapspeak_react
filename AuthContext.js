import React, { createContext, useContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: action.payload };
    case 'SIGN_OUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const signIn = async (email, password) => {
    const users = await AsyncStorage.getItem('users');
    const user = JSON.parse(users).find(u => u.email === email && u.password === password);
    if (!user) throw new Error('بيانات الدخول غير صحيحة');
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    dispatch({ type: 'SIGN_IN', payload: user });
  };

  const signUp = async user => {
    const users = JSON.parse(await AsyncStorage.getItem('users') || '[]');
    if (users.some(u => u.email === user.email)) throw new Error('البريد الإلكتروني مستخدم مسبقًا');
    await AsyncStorage.setItem('users', JSON.stringify([...users, user]));
    dispatch({ type: 'SIGN_IN', payload: user });
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
