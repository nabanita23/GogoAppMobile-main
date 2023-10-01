import { IButtonBase } from '@/utils/types';
import React from 'react';
import { Colors } from 'react-native-ui-lib';
import ButtonBase from './buttonBase';

const SecondaryButton: React.FC<Omit<IButtonBase, 'backgroundColor'>> = props => {
  return <ButtonBase {...props} color={Colors.text1} backgroundColor={Colors.transparent} ghost />;
};

export default SecondaryButton;
