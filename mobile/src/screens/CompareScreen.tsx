import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Artwork } from '../components/Artwork';
import { myRankings } from '../data/mockMusic';
import type { Track } from '../data/types';
import type { RootStackParamList } from '../navigation/types';
import { colors, fontSizes, radii, scoreColor, spacing } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Compare'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function computeScore(rankIndex: number): number {
  if (myRankings.length === 0) return 7;
  if (rankIndex === 0) return Math.min(10, myRankings[0].score + 0.3);
  if (rankIndex >= myRankings.length) {
    return Math.max(0, myRankings[myRankings.length - 1].score - 0.3);
  }
  const above = myRankings[rankIndex - 1].score;
  const below = myRankings[rankIndex].score;
  return Math.round(((above + below) / 2) * 10) / 10;
}

function TrackCard({ track, onPress }: { track: Track; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Artwork seed={track.id} title={track.title} size={96} />
      <Text style={styles.cardTitle} numberOfLines={2}>
        {track.title}
      </Text>
      <Text style={styles.cardSubtitle} numberOfLines={1}>
        {track.artist}
      </Text>
    </TouchableOpacity>
  );
}

export function CompareScreen({ route }: Props) {
  const navigation = useNavigation<NavigationProp>();
  const newTrack = route.params.track;

  const [lo, setLo] = useState(0);
  const [hi, setHi] = useState(myRankings.length);
  const [round, setRound] = useState(1);

  const done = lo >= hi;
  const pivotIndex = Math.floor((lo + hi) / 2);
  const pivot = !done ? myRankings[pivotIndex] : null;

  const finalRank = done ? lo : null;
  const finalScore = useMemo(() => (finalRank !== null ? computeScore(finalRank) : null), [finalRank]);

  function choose(winner: 'new' | 'pivot') {
    if (winner === 'new') {
      setHi(pivotIndex);
    } else {
      setLo(pivotIndex + 1);
    }
    setRound(r => r + 1);
  }

  if (done) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.revealContainer}>
          <Text style={styles.revealLabel}>Added to your rankings</Text>
          <Artwork seed={newTrack.id} title={newTrack.title} size={140} />
          <Text style={styles.revealTitle}>{newTrack.title}</Text>
          <Text style={styles.revealSubtitle}>{newTrack.artist}</Text>
          <Text style={[styles.revealScore, { color: scoreColor(finalScore ?? 0) }]}>
            {finalScore?.toFixed(1)}
          </Text>
          <Text style={styles.revealRank}>#{(finalRank ?? 0) + 1} on your list</Text>
          <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.header}>Which is better?</Text>
      <Text style={styles.roundLabel}>Round {round}</Text>
      <View style={styles.matchup}>
        <TrackCard track={newTrack} onPress={() => choose('new')} />
        <Text style={styles.vs}>VS</Text>
        {pivot && <TrackCard track={pivot} onPress={() => choose('pivot')} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  header: {
    fontSize: fontSizes.lg,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  roundLabel: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  matchup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: fontSizes.md,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  cardSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    textAlign: 'center',
  },
  vs: {
    color: colors.textSecondary,
    fontWeight: '800',
    fontSize: fontSizes.sm,
  },
  revealContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  revealLabel: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    marginBottom: spacing.md,
  },
  revealTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.lg,
    fontWeight: '800',
    marginTop: spacing.md,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  revealSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    marginBottom: spacing.md,
  },
  revealScore: {
    fontSize: 56,
    fontWeight: '800',
  },
  revealRank: {
    color: colors.textSecondary,
    fontSize: fontSizes.sm,
    marginBottom: spacing.xl,
  },
  doneButton: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    marginTop: spacing.lg,
  },
  doneButtonText: {
    color: colors.onColor,
    fontWeight: '700',
    fontSize: fontSizes.md,
  },
});
