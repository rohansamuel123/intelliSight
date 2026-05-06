import AsyncStorage from '@react-native-async-storage/async-storage';
import { CognitiveDomain, GAMES } from '../data/gameRegistry';

export interface GameSession {
  gameId: string;
  domain: CognitiveDomain;
  score: number;        // raw score (game-specific)
  maxScore: number;     // maximum possible raw score
  accuracy: number;     // 0-100
  timeTaken: number;    // seconds
  level: number;        // highest level reached
  stars: number;        // 1-3 stars earned
  playedAt: string;     // ISO date string
}

export interface DomainScore {
  domain: CognitiveDomain;
  score: number;        // 0-100 normalized
  gamesPlayed: number;
}

export interface CognitiveProfile {
  overallScore: number;
  domainScores: DomainScore[];
  totalGamesPlayed: number;
  totalStars: number;
  lastPlayedAt: string | null;
}

const SESSIONS_KEY = 'game_sessions';
const UNLOCKED_KEY = 'unlocked_games';

/**
 * Calculate star rating based on normalized score
 */
export function calculateStars(normalizedScore: number): number {
  if (normalizedScore >= 80) return 3;
  if (normalizedScore >= 50) return 2;
  return 1;
}

/**
 * Normalize a game's raw metrics into a 0-100 score
 */
export function normalizeScore(
  accuracy: number,
  timeTaken: number,
  level: number,
  maxLevel: number
): number {
  const accuracyWeight = 0.5;
  const levelWeight = 0.3;
  const speedWeight = 0.2;

  const accuracyScore = Math.min(100, accuracy);
  const levelScore = (level / maxLevel) * 100;
  // Speed bonus: faster = better. Cap at 60 seconds baseline.
  const speedScore = Math.max(0, 100 - (timeTaken / 60) * 100);

  return Math.round(
    accuracyScore * accuracyWeight +
    levelScore * levelWeight +
    speedScore * speedWeight
  );
}

/**
 * Save a game session to AsyncStorage
 */
export async function saveGameSession(session: GameSession): Promise<void> {
  try {
    const existingStr = await AsyncStorage.getItem(SESSIONS_KEY);
    const sessions: GameSession[] = existingStr ? JSON.parse(existingStr) : [];
    sessions.push(session);
    await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error('Failed to save game session:', e);
  }
}

/**
 * Get all game sessions
 */
export async function getGameSessions(): Promise<GameSession[]> {
  try {
    const str = await AsyncStorage.getItem(SESSIONS_KEY);
    return str ? JSON.parse(str) : [];
  } catch (e) {
    console.error('Failed to load sessions:', e);
    return [];
  }
}

/**
 * Get the best session for a specific game
 */
export async function getBestSession(gameId: string): Promise<GameSession | null> {
  const sessions = await getGameSessions();
  const gameSessions = sessions.filter(s => s.gameId === gameId);
  if (gameSessions.length === 0) return null;
  return gameSessions.reduce((best, curr) =>
    normalizeScore(curr.accuracy, curr.timeTaken, curr.level, 3) >
    normalizeScore(best.accuracy, best.timeTaken, best.level, 3)
      ? curr : best
  );
}

/**
 * Build the full cognitive profile from all sessions
 */
export async function getCognitiveProfile(): Promise<CognitiveProfile> {
  const sessions = await getGameSessions();

  const domains: CognitiveDomain[] = ['memory', 'attention', 'logic', 'processing_speed', 'comprehension'];

  const domainScores: DomainScore[] = domains.map(domain => {
    const domainSessions = sessions.filter(s => s.domain === domain);
    if (domainSessions.length === 0) {
      return { domain, score: 0, gamesPlayed: 0 };
    }

    // Use best score per game, then average across games
    const gameIds = [...new Set(domainSessions.map(s => s.gameId))];
    const bestScores = gameIds.map(gameId => {
      const gameSessions = domainSessions.filter(s => s.gameId === gameId);
      const best = gameSessions.reduce((b, c) => {
        const bScore = normalizeScore(b.accuracy, b.timeTaken, b.level, 3);
        const cScore = normalizeScore(c.accuracy, c.timeTaken, c.level, 3);
        return cScore > bScore ? c : b;
      });
      return normalizeScore(best.accuracy, best.timeTaken, best.level, 3);
    });

    const avgScore = Math.round(bestScores.reduce((a, b) => a + b, 0) / bestScores.length);
    return { domain, score: avgScore, gamesPlayed: domainSessions.length };
  });

  const scoredDomains = domainScores.filter(d => d.gamesPlayed > 0);
  const overallScore = scoredDomains.length > 0
    ? Math.round(scoredDomains.reduce((a, b) => a + b.score, 0) / scoredDomains.length)
    : 0;

  const totalStars = sessions.reduce((sum, s) => sum + s.stars, 0);
  const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;

  return {
    overallScore,
    domainScores,
    totalGamesPlayed: sessions.length,
    totalStars,
    lastPlayedAt: lastSession?.playedAt || null,
  };
}

/**
 * Get number of unlocked games (based on games completed)
 */
export async function getUnlockedGameCount(): Promise<number> {
  const sessions = await getGameSessions();
  const completedGameIds = new Set(sessions.map(s => s.gameId));
  // Always unlock game 1, plus one more for each completed game
  return Math.min(GAMES.length, completedGameIds.size + 1);
}

/**
 * Check if a specific game is unlocked
 */
export async function isGameUnlocked(gameOrder: number): Promise<boolean> {
  const unlockedCount = await getUnlockedGameCount();
  return gameOrder <= unlockedCount;
}

/**
 * Clear all game data (for testing)
 */
export async function clearAllGameData(): Promise<void> {
  await AsyncStorage.removeItem(SESSIONS_KEY);
  await AsyncStorage.removeItem(UNLOCKED_KEY);
}
