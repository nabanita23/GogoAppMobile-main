import React from 'react';
import { Spacings, View } from 'react-native-ui-lib';

type size = 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8' | 's9' | 's10';

const getSize = (size: size): number => {
  switch (size) {
    case 's1':
      return Spacings.s1;
    case 's2':
      return Spacings.s2;
    case 's3':
      return Spacings.s3;
    case 's4':
      return Spacings.s4;
    case 's5':
      return Spacings.s5;
    case 's6':
      return Spacings.s6;
    case 's7':
      return Spacings.s7;
    case 's8':
      return Spacings.s8;
    case 's9':
      return Spacings.s9;
    case 's10':
      return Spacings.s10;

    default:
      return Spacings.s4;
  }
};

const DummySpace = ({ size = 's4' }: { size?: size }): React.ReactElement => {
  return <View style={{ marginTop: getSize(size) }} />;
};

export default React.memo(DummySpace);
