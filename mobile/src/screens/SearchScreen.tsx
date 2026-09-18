import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrackRow } from '../components/TrackRow';
import { catalog } from '../data/mockMusic';
import type { Track } from '../data/types';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts, fontSizes, radii, spacing } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return catalog;
    return catalog.filter(
      track =>
        track.title.toLowerCase().includes(trimmed) ||
        track.artist.toLowerCase().includes(trimmed) ||
        track.albumTitle.toLowerCase().includes(trimmed),
    );
  }, [query]);

  function handleLog(track: Track) {
    navigation.navigate('Compare', { track });
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search songs, artists, albums"
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TrackRow
            track={item}
            right={
              <TouchableOpacity style={styles.logButton} onPress={() => handleLog(item)}>
                <Text style={styles.logButtonText}>Log</Text>
              </TouchableOpacity>
            }
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No results</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.display,
    color: colors.textPrimary,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  input: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    fontSize: fontSizes.md,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  logButton: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  logButtonText: {
    color: colors.onColor,
    fontWeight: '700',
    fontSize: fontSizes.sm,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
