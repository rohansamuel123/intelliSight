import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

const { width } = Dimensions.get('window');
const GRID_SIZE = 3;
const TOTAL_TARGETS = 10; // Number of successful taps needed

export default function GameReaction() {
  const router = useRouter();
  
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setStartTime(Date.now());
    spawnTarget();
  };

  const spawnTarget = () => {
    const nextIndex = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
    setActiveIndex(nextIndex);
  };

  const handleTap = (index: number) => {
    if (gameState !== 'playing') return;

    if (index === activeIndex) {
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore >= TOTAL_TARGETS) {
        endGame(true);
      } else {
        spawnTarget();
      }
    }
  };

  const endGame = (completed: boolean) => {
    setGameState('gameover');
    setActiveIndex(null);
    const timeTaken = (Date.now() - startTime) / 1000; // in seconds
    
    router.replace({
      pathname: '/game-results',
      params: { 
        gameType: 'reaction', 
        score: score, 
        time: timeTaken,
        accuracy: completed ? 100 : Math.max(0, (score / TOTAL_TARGETS) * 100)
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Reaction Dash</Text>
          <Text style={styles.subtitle}>Tap the orange circle fast!</Text>
          {gameState === 'playing' && <Text style={styles.score}>Targets: {score} / {TOTAL_TARGETS}</Text>}
        </View>

        <View style={styles.grid}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
            <Pressable
              key={index}
              onPress={() => handleTap(index)}
              style={styles.cell}
            >
              {activeIndex === index && (
                <View style={styles.target} />
              )}
            </Pressable>
          ))}
        </View>

        {gameState === 'idle' && (
          <View style={styles.controls}>
            <Button title="Start Game" onPress={startGame} />
            <View style={{ height: 16 }} />
            <Button title="Back" onPress={() => router.back()} variant="outline" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF9F0' },
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, color: '#8B5A2B', fontWeight: '900', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 8 },
  score: { fontSize: 20, color: '#FF7A00', fontWeight: 'bold' },
  grid: {
    width: width * 0.85,
    height: width * 0.85,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 16,
    borderRadius: 24,
  },
  cell: {
    width: '30%',
    height: '30%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  target: {
    width: '70%',
    height: '70%',
    backgroundColor: '#FF7A00',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#FFE0B2',
  },
  controls: { marginTop: 40, width: '100%' }
});
