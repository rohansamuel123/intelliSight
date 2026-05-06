import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

const COLORS = ['#FF5722', '#4CAF50', '#2196F3', '#FFEB3B'];
const FLASH_DURATION = 500;
const DELAY_BETWEEN_FLASHES = 250;

export default function GameMemory() {
  const router = useRouter();
  
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [level, setLevel] = useState(1);
  const [startTime, setStartTime] = useState<number>(0);

  // Pad animations
  const padAnims = useRef(COLORS.map(() => new Animated.Value(1))).current;

  const startGame = () => {
    setGameState('playing');
    setLevel(1);
    setSequence([Math.floor(Math.random() * 4)]);
    setPlayerSequence([]);
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (gameState === 'playing' && sequence.length > 0) {
      playSequence();
    }
  }, [sequence, gameState]);

  const flashPad = (index: number) => {
    return new Promise<void>((resolve) => {
      setActiveColor(index);
      Animated.sequence([
        Animated.timing(padAnims[index], { toValue: 0.6, duration: 100, useNativeDriver: true }),
        Animated.timing(padAnims[index], { toValue: 1, duration: FLASH_DURATION, useNativeDriver: true })
      ]).start(() => {
        setActiveColor(null);
        setTimeout(resolve, DELAY_BETWEEN_FLASHES);
      });
    });
  };

  const playSequence = async () => {
    setIsPlayingSequence(true);
    for (let i = 0; i < sequence.length; i++) {
      await flashPad(sequence[i]);
    }
    setIsPlayingSequence(false);
  };

  const handlePadPress = (index: number) => {
    if (isPlayingSequence || gameState !== 'playing') return;

    // Flash on tap
    Animated.sequence([
      Animated.timing(padAnims[index], { toValue: 0.6, duration: 50, useNativeDriver: true }),
      Animated.timing(padAnims[index], { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();

    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);

    // Check correctness
    const currentIndex = newPlayerSeq.length - 1;
    if (newPlayerSeq[currentIndex] !== sequence[currentIndex]) {
      // Game Over
      endGame(false);
      return;
    }

    if (newPlayerSeq.length === sequence.length) {
      // Level Passed
      setTimeout(() => {
        setLevel(l => l + 1);
        setPlayerSequence([]);
        setSequence(seq => [...seq, Math.floor(Math.random() * 4)]);
      }, 1000);
    }
  };

  const endGame = (completed: boolean) => {
    setGameState('gameover');
    const timeTaken = (Date.now() - startTime) / 1000;
    
    // Navigate to results screen
    router.replace({
      pathname: '/game-results',
      params: { 
        gameType: 'memory', 
        score: level - 1, 
        time: timeTaken,
        accuracy: completed ? 100 : Math.max(0, 100 - (10 / level))
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Memory Pattern</Text>
          <Text style={styles.level}>Level: {level}</Text>
        </View>

        <View style={styles.board}>
          {COLORS.map((color, index) => (
            <Pressable
              key={index}
              onPress={() => handlePadPress(index)}
              disabled={isPlayingSequence || gameState !== 'playing'}
            >
              <Animated.View
                style={[
                  styles.pad,
                  { backgroundColor: color },
                  { transform: [{ scale: padAnims[index] }] },
                  activeColor === index && styles.padActive,
                  (isPlayingSequence || gameState !== 'playing') && styles.padDisabled
                ]}
              />
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
        
        {gameState === 'playing' && isPlayingSequence && (
          <Text style={styles.hintText}>Watch the pattern...</Text>
        )}
        {gameState === 'playing' && !isPlayingSequence && (
          <Text style={styles.hintText}>Your turn!</Text>
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
  level: { fontSize: 20, color: '#FF7A00', fontWeight: 'bold' },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  pad: {
    width: 140,
    height: 140,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  padActive: {
    borderColor: '#FFF',
    borderWidth: 6,
    shadowColor: '#FFF',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  padDisabled: {
    opacity: 0.8,
  },
  controls: { marginTop: 40, width: '100%' },
  hintText: { marginTop: 32, fontSize: 22, fontWeight: 'bold', color: '#666' }
});
