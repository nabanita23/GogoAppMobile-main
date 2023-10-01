import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import DummySpace from './dummySpace';

type SectionProps = {
  children: React.ReactNode;
  title: string;
};

export const Section: React.FC<SectionProps> = ({ children, title }: SectionProps) => {
  return (
    <View paddingV-s2>
      <Text textColor section>
        {title}
      </Text>
      <DummySpace size="s1" />
      <View>
        <View br40 bg-grey70>
          {children}
        </View>
      </View>
    </View>
  );
};
