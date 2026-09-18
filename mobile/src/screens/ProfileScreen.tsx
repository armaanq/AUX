import React from 'react';
import { RankingsProfileView } from '../components/RankingsProfileView';
import { myRankings } from '../data/mockMusic';

export function ProfileScreen() {
  return <RankingsProfileView seed="me" name="armaanq" rankings={myRankings} />;
}
