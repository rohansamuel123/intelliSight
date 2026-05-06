import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Button from '../components/Button';

export default function GameResults() {
  const router = useRouter();
  const { gameType, score, time, accuracy } = useLocalSearchParams();

  // In a real implementation, we would send these results to the backend here.
  useEffect(() => {
    console.log('Sending to backend:', { gameType, score, time, accuracy });
    // TODO: POST /session
  }, []);

  const getGameName = () => {
    if (gameType === 'memory') return 'Memory Pattern';
    if (gameType === 'reaction') return 'Reaction Dash';
    return 'Game';
  };

  const getPerformanceMessage = () => {
    const s = Number(score);
    if (gameType === 'memory') {
      if (s > 6) return "Incredible Memory! 🧠";
      if (s > 3) return "Great Job! 🌟";
      return "Good Try! Keep practicing! 💪";
    } else {
      const t = Number(time);
      if (t < 5) return "Lightning Fast! ⚡";
      if (t < 10) return "Great Speed! 🏃";
      return "Good focus! 🎯";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Results</Text>
        <Text style={styles.subtitle}>{getGameName()}</Text>

        <View style={styles.card}>
          <Text style={styles.message}>{getPerformanceMessage()}</Text>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Score/Level:</Text>
            <Text style={styles.statValue}>{score}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Time Taken:</Text>
            <Text style={styles.statValue}>{Number(time).toFixed(1)}s</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Accuracy:</Text>
            <Text style={styles.statValue}>{Number(accuracy).toFixed(0)}%</Text>
          </View>
        </View>

        <Button 
          title="Back to Dashboard" 
          onPress={() => router.replace('/dashboard')} 
          variant="primary" 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF9F0' },
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 36, color: '#FF7A00', fontWeight: '900', marginBottom: 8 },
  subtitle: { fontSize: 20, color: '#8B5A2B', fontWeight: 'bold', marginBottom: 32 },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFE0B2',
    marginBottom: 32,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 24,
    textAlign: 'center'
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statLabel: { fontSize: 18, color: '#666', fontWeight: '500' },
  statValue: { fontSize: 18, color: '#333', fontWeight: 'bold' }
});
