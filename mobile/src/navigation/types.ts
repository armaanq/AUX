import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Track } from '../data/types';

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Global: undefined;
  Friends: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Compare: { track: Track };
  FriendProfile: { friendId: string };
};
