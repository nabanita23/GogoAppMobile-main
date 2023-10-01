import React from 'react';
import { Pressable } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

type ActionProps = {
  title: string;
  icon?: string;
  rightIcon?: string;
  info?: string;
  disabled?: boolean;
  onPress?: () => void;
};

export const Action: React.FC<ActionProps> = ({ title, icon, rightIcon, info, disabled, onPress }: ActionProps) => {
  const b = { disabled, onPress };

  return (
    <View padding-s4>
      <Pressable {...b}>
        <View row centerV style={{ justifyContent: 'space-between' }}>
          <View row centerV>
            {icon ? <View marginR-s2 /> : null}

            {title ? (
              <Text textColor text60R>
                {title}
              </Text>
            ) : null}
          </View>

          <View row centerV>
            {info ? (
              <Text textColor text80BL>
                {info}
              </Text>
            ) : null}

            {rightIcon ? <View marginL-s2 /> : null}
          </View>
        </View>
      </Pressable>
    </View>
  );
};
