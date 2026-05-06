import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CognitiveDomain, DOMAIN_LABELS, DOMAIN_COLORS } from '../data/gameRegistry';

interface CognitiveRadarProps {
  scores: Record<CognitiveDomain, number>; // 0-100 per domain
  size?: number;
}

const DOMAINS: CognitiveDomain[] = ['memory', 'attention', 'logic', 'processing_speed', 'comprehension'];

/**
 * Pure React Native implementation of a cognitive profile display.
 * Uses horizontal bars instead of SVG radar chart for compatibility.
 */
export default function CognitiveRadar({ scores, size = 280 }: CognitiveRadarProps) {
  return (
    <View style={[styles.container, { width: size }]}>
      <Text style={styles.title}>Cognitive Map</Text>
      {DOMAINS.map(domain => {
        const score = scores[domain] || 0;
        const color = DOMAIN_COLORS[domain];
        return (
          <View key={domain} style={styles.row}>
            <View style={styles.labelContainer}>
              <View style={[styles.dot, { backgroundColor: color }]} />
              <Text style={[styles.label, { color }]}>{DOMAIN_LABELS[domain]}</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${score}%`, backgroundColor: color }]} />
              </View>
              <Text style={[styles.scoreValue, { color }]}>{score}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D1B0E',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barBg: {
    flex: 1,
    height: 14,
    backgroundColor: '#F0E6D9',
    borderRadius: 7,
    overflow: 'hidden',
  },
  barFill: {
    height: 14,
    borderRadius: 7,
  },
  scoreValue: {
    width: 36,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'right',
    marginLeft: 8,
  },
});
