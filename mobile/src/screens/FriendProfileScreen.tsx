import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RankingsProfileView } from '../components/RankingsProfileView';
import { friends } from '../data/mockFriends';
import type { RootStackParamList } from '../navigation/types';
import { colors, fontSizes, spacing } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'FriendProfile'>;

export function FriendProfileScreen({ route }: Props) {
  const friend = friends.find(f => f.id === route.params.friendId);

  if (!friend) {
    return <Text style={styles.notFound}>Friend not found</Text>;
  }

  return <RankingsProfileView seed={friend.id} name={friend.username} rankings={friend.rankings} />;
}

const styles = StyleSheet.create({
  notFound: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    padding: spacing.md,
  },
});
