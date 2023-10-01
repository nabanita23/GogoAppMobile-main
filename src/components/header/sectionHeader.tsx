import React from 'react';
import { Colors, Text, View } from 'react-native-ui-lib';
import { ArrowRightOutlineSvgImage } from '../SVGIcons';

const SectionHeader = ({
  primaryTitle,
  secondaryTitle,
  enableSecondaryIcon = true,
}: {
  primaryTitle: string;
  secondaryTitle?: string;
  enableSecondaryIcon?: boolean;
}) => {
  return (
    <View row spread marginT-s4 marginB-s1>
      <View>
        <Text h3 text1>
          {primaryTitle}
        </Text>
      </View>
      {secondaryTitle && (
        <View flexS row centerV>
          <View>
            <Text xSmall text2>
              {secondaryTitle}
            </Text>
          </View>
          {enableSecondaryIcon && <View marginL-s1>{ArrowRightOutlineSvgImage(Colors.text2, 12)}</View>}
        </View>
      )}
    </View>
  );
};

export default SectionHeader;
