import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface GameCardProps {
  emoji: string;
  name: string;
  description: string;
  domainLabel: string;
  domainColor: string;
  stars: number;      // 0 = not played, 1-3 = earned stars
  locked: boolean;
  onPress: () => void;
}

export default function GameCard({
  emoji, name, description, domainLabel, domainColor, stars, locked, onPress,
}: GameCardProps) {
  return (
    <Pressable
      onPress={locked ? undefined : onPress}
      style={({ pressed }) => [
        styles.card,
        locked && styles.cardLocked,
        pressed && !locked && styles.cardPressed,
      ]}
    >
      {/* Left: Emoji */}
      <View style={[styles.emojiContainer, { backgroundColor: domainColor + '18' }]}>
        <Text style={styles.emoji}>{locked ? '🔒' : emoji}</Text>
      </View>

      {/* Center: Info */}
      <View style={styles.info}>
        <Text style={[styles.name, locked && styles.textLocked]}>{name}</Text>
        <Text style={[styles.description, locked && styles.textLocked]} numberOfLines={1}>
          {locked ? 'Complete previous games to unlock' : description}
        </Text>
        <View style={[styles.badge, { backgroundColor: domainColor + '20' }]}>
          <Text style={[styles.badgeText, { color: domainColor }]}>{domainLabel}</Text>
        </View>
      </View>

      {/* Right: Stars */}
      <View style={styles.starsContainer}>
        {[1, 2, 3].map(i => (
          <Text key={i} style={[styles.star, i <= stars ? styles.starEarned : styles.starEmpty]}>
            ★
          </Text>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#8B5A2B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#F5E6D3',
  },
  cardLocked: {
    opacity: 0.55,
    backgroundColor: '#F8F4F0',
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    shadowOpacity: 0.12,
  },
  emojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  emoji: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2D1B0E',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#8B7355',
    marginBottom: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textLocked: {
    color: '#B0A090',
  },
  starsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  star: {
    fontSize: 18,
    marginLeft: 2,
  },
  starEarned: {
    color: '#FFB300',
  },
  starEmpty: {
    color: '#E0D5C8',
  },
});
