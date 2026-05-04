import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic validation
    if (email && password) {
      // In the future, this will connect to the backend API
      console.log('Logging in with:', email, password);
      // Simulating successful login by routing to dashboard
      // router.push('/dashboard'); 
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <Image 
                source={require('../../assets/mascot.png')} 
                style={styles.mascotImage} 
                resizeMode="contain"
              />
              <Text style={styles.title}>IntelliSight</Text>
              <Text style={styles.subtitle}>Let's play and learn together!</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="parent@example.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              <Button title="Login" onPress={handleLogin} />
              
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
              </View>
              
              <Button 
                title="Create Profile" 
                variant="secondary" 
                onPress={() => router.push('/profile')} 
              />
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F0', // Soft, warm cream background
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mascotImage: {
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FF7A00', // Vibrant orange
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8B5A2B', // Warm brown/gray
    textAlign: 'center',
    fontWeight: '500',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FF7A00',
    marginBottom: 8,
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFE0B2',
    borderRadius: 24, // High border radius for soft look
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333333',
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  forgotPassword: {
    color: '#FF7A00',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: -8,
    marginRight: 4,
  },
  actionContainer: {
    marginTop: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: '#FFE0B2',
    borderRadius: 2,
  },
  dividerText: {
    color: '#FFB74D',
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '800',
  },
});
