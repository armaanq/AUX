import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScoreBadge } from '../components/ScoreBadge';
import { TrackRow } from '../components/TrackRow';
import { globalRankings } from '../data/mockGlobalRankings';
import type { GlobalRanking } from '../data/types';
import { colors, fonts, fontSizes, spacing } from '../theme/theme';

function GlobalRow({ item, index }: { item: GlobalRanking; index: number }) {
  return (
    <TrackRow
      track={item.track}
      rank={index + 1}
      right={
        <View style={styles.rightCol}>
          <ScoreBadge score={item.avgScore} />
          <Text style={styles.logCount}>{item.logCount} logs</Text>
        </View>
      }
    />
  );
}

export function GlobalRankingsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerWrap}>
        <Text style={styles.header}>Global Rankings</Text>
        <Text style={styles.tagline}>what everyone's ranking</Text>
      </View>
      <FlatList
        data={globalRankings}
        keyExtractor={item => item.track.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => <GlobalRow item={item} index={index} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrap: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  header: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.display,
    color: colors.textPrimary,
  },
  tagline: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 2,
  },
  logCount: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
  },
});
