import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp } = useContext(AuthContext);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'البريد الإلكتروني غير صالح';
    if (password.length < 8) return 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    return null;
  };

  const handleSubmit = async (isSignUp) => {
    const error = validateForm();
    if (error) return Alert.alert('خطأ', error);

    try {
      if (isSignUp) {
        await signUp({ email, username, password });
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      Alert.alert('خطأ', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="اسم المستخدم"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="تسجيل الدخول" onPress={() => handleSubmit(false)} />
      <Button title="إنشاء حساب" onPress={() => handleSubmit(true)} />
    </View>
  );
}
