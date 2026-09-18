import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScoreBadge } from '../components/ScoreBadge';
import { TrackRow } from '../components/TrackRow';
import { feed } from '../data/mockMusic';
import type { FeedActivity } from '../data/types';
import { cardShadow, colors, fonts, fontSizes, spacing } from '../theme/theme';

function FeedCard({ item }: { item: FeedActivity }) {
  return (
    <View style={styles.card}>
      <Text style={styles.activityLine}>
        <Text style={styles.username}>{item.username}</Text> ranked this
      </Text>
      <TrackRow track={item.track} right={<ScoreBadge score={item.score} />} />
    </View>
  );
}

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerWrap}>
        <Text style={styles.header}>AUX</Text>
        <Text style={styles.tagline}>your sound, ranked</Text>
      </View>
      <FlatList
        data={feed}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <FeedCard item={item} />}
        contentContainerStyle={styles.listContent}
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
    alignItems: 'center',
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  },
  header: {
    fontSize: fontSizes.xxl,
    fontFamily: fonts.display,
    color: colors.textPrimary,
    letterSpacing: 4,
  },
  tagline: {
    fontSize: fontSizes.xs,
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  card: {
    ...cardShadow,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  activityLine: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
    marginBottom: spacing.xs,
  },
  username: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
});
