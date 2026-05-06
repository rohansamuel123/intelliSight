import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getGameById, DOMAIN_LABELS, DOMAIN_COLORS, GAMES } from '../data/gameRegistry';
import ScoreRing from '../components/ScoreRing';
import Button from '../components/Button';

export default function GameResults() {
  const router = useRouter();
  const { gameId, score, stars } = useLocalSearchParams();

  const game = getGameById(gameId as string);
  const numScore = Number(score) || 0;
  const numStars = Number(stars) || 1;

  const getMessage = () => {
    if (numStars === 3) return { text: 'Outstanding! 🏆', sub: 'You mastered this challenge!' };
    if (numStars === 2) return { text: 'Great Job! 🌟', sub: 'Keep going, you\'re doing well!' };
    return { text: 'Good Try! 💪', sub: 'Practice makes perfect!' };
  };

  const msg = getMessage();

  // Find next game
  const currentOrder = game?.order || 1;
  const nextGame = GAMES.find(g => g.order === currentOrder + 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Stars */}
        <View style={styles.starsRow}>
          {[1, 2, 3].map(i => (
            <Text key={i} style={[styles.star, i <= numStars ? styles.starEarned : styles.starEmpty]}>
              ★
            </Text>
          ))}
        </View>

        {/* Message */}
        <Text style={styles.message}>{msg.text}</Text>
        <Text style={styles.subMessage}>{msg.sub}</Text>

        {/* Score Ring */}
        <View style={styles.ringContainer}>
          <ScoreRing
            score={numScore}
            size={160}
            color={game ? DOMAIN_COLORS[game.domain] : '#FF7A00'}
            label="Score"
          />
        </View>

        {/* Game Info */}
        {game && (
          <View style={styles.gameInfoCard}>
            <Text style={styles.gameName}>{game.emoji} {game.name}</Text>
            <View style={[styles.domainBadge, { backgroundColor: DOMAIN_COLORS[game.domain] + '20' }]}>
              <Text style={[styles.domainText, { color: DOMAIN_COLORS[game.domain] }]}>
                {DOMAIN_LABELS[game.domain]}
              </Text>
            </View>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Play Again"
            onPress={() => router.replace(game?.route as any || '/dashboard')}
            variant="outline"
          />
          {nextGame && (
            <Button
              title={`Next: ${nextGame.name} →`}
              onPress={() => router.replace(nextGame.route as any)}
              variant="primary"
            />
          )}
          <Pressable onPress={() => router.replace('/dashboard')} style={styles.dashboardLink}>
            <Text style={styles.dashboardLinkText}>Back to Dashboard</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF9F0' },
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },

  starsRow: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  star: { fontSize: 48 },
  starEarned: { color: '#FFB300' },
  starEmpty: { color: '#E0D5C8' },

  message: { fontSize: 32, fontWeight: '900', color: '#2D1B0E', textAlign: 'center' },
  subMessage: { fontSize: 16, color: '#8B7355', fontWeight: '500', marginTop: 8, marginBottom: 24, textAlign: 'center' },

  ringContainer: { marginBottom: 24 },

  gameInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0E6D9',
    marginBottom: 32,
  },
  gameName: { fontSize: 18, fontWeight: '800', color: '#2D1B0E' },
  domainBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  domainText: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },

  actions: { width: '100%' },
  dashboardLink: { alignSelf: 'center', marginTop: 8, padding: 12 },
  dashboardLinkText: { fontSize: 15, fontWeight: '700', color: '#8B7355' },
});
