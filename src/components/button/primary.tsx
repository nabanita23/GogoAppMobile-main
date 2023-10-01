import { IButtonBase } from '@/utils/types';
import React from 'react';
import { Colors } from 'react-native-ui-lib';
import ButtonBase from './buttonBase';

const PrimaryButton: React.FC<IButtonBase> = props => {
  return <ButtonBase {...props} color={Colors.white} backgroundColor={props.backgroundColor || Colors.button1} />;
};

export default PrimaryButton;
