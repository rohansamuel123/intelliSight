import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ScoreRingProps {
  score: number;        // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export default function ScoreRing({
  score,
  size = 140,
  strokeWidth = 12,
  color = '#FF7A00',
  label = 'Score',
}: ScoreRingProps) {
  // Pure RN implementation using border trick
  // We'll show score as a large number inside a styled circle
  const borderSize = size - strokeWidth * 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background ring */}
      <View
        style={[
          styles.ring,
          {
            width: borderSize,
            height: borderSize,
            borderRadius: borderSize / 2,
            borderWidth: strokeWidth,
            borderColor: '#F0E6D9',
          },
        ]}
      />
      {/* Foreground indicator */}
      <View
        style={[
          styles.ring,
          {
            width: borderSize,
            height: borderSize,
            borderRadius: borderSize / 2,
            borderWidth: strokeWidth,
            borderColor: 'transparent',
            borderTopColor: color,
            borderRightColor: score > 25 ? color : 'transparent',
            borderBottomColor: score > 50 ? color : 'transparent',
            borderLeftColor: score > 75 ? color : 'transparent',
            transform: [{ rotate: '-45deg' }],
          },
        ]}
      />
      {/* Center content */}
      <View style={styles.textContainer}>
        <Text style={[styles.scoreText, { color, fontSize: size * 0.22 }]}>{score}</Text>
        <Text style={[styles.labelText, { fontSize: size * 0.09 }]}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontWeight: '900',
  },
  labelText: {
    color: '#8B7355',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
});
