import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>
      <Text style={styles.subtitle}>Let's set up a profile for your child.</Text>
      
      {/* Placeholder content */}
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>Profile form goes here...</Text>
      </View>

      <Button 
        title="Go Back" 
        variant="outline" 
        onPress={() => router.back()} 
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  placeholderBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    width: '100%',
  },
});
