import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../components/Avatar';
import { friendSuggestions, friends as initialFriends } from '../data/mockFriends';
import type { Friend, FriendSuggestion } from '../data/types';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts, fontSizes, radii, spacing } from '../theme/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function FriendsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return friendSuggestions.filter(
      s => !addedIds.includes(s.id) && s.username.toLowerCase().includes(trimmed),
    );
  }, [query, addedIds]);

  function handleAdd(suggestion: FriendSuggestion) {
    setFriends(current => [...current, { id: suggestion.id, username: suggestion.username, rankings: [] }]);
    setAddedIds(current => [...current, suggestion.id]);
    setQuery('');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Friends</Text>
      <TextInput
        style={styles.input}
        placeholder="Find friends by username"
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {suggestions.length > 0 && (
        <View style={styles.suggestions}>
          {suggestions.map(suggestion => (
            <View key={suggestion.id} style={styles.suggestionRow}>
              <Avatar seed={suggestion.id} name={suggestion.username} size={40} />
              <Text style={styles.suggestionName}>{suggestion.username}</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(suggestion)}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <Text style={styles.sectionTitle}>Your Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.friendRow}
            onPress={() => navigation.navigate('FriendProfile', { friendId: item.id })}
          >
            <Avatar seed={item.id} name={item.username} size={48} />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.username}</Text>
              <Text style={styles.friendMeta}>{item.rankings.length} ranked</Text>
            </View>
          </TouchableOpacity>
        )}
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
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    fontSize: fontSizes.md,
  },
  suggestions: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  suggestionName: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  addButtonText: {
    color: colors.onColor,
    fontWeight: '700',
    fontSize: fontSizes.sm,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: '700',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  friendInfo: {
    gap: 2,
  },
  friendName: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  friendMeta: {
    color: colors.textSecondary,
    fontSize: fontSizes.xs,
  },
});
