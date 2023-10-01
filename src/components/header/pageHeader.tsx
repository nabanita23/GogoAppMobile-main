import { useServices } from '@/services';
import { PageWithBottomTab } from '@/utils/constants';
import { PromiseFunc, PureFunc } from '@/utils/types';
import { useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ButtonSize, Text, View } from 'react-native-ui-lib';
import { ArrowLeftOutlineSvgImage } from '../SVGIcons';
import { SecondaryButton } from '../button';

const PageHeader = ({
  title,
  subtitle,
  rightIcon,
  rightAction,
  withSpace,
}: {
  title: string;
  subtitle?: string;
  rightIcon?: Function;
  rightAction?: PureFunc | PromiseFunc;
  withSpace?: boolean;
}) => {
  const route = useRoute();
  const { nav } = useServices();
  const withTab = useMemo(() => PageWithBottomTab.includes(route.name), [route.name]);
  return (
    <View
      row
      paddingV-s2={!withSpace}
      paddingV-s4={withSpace}
      paddingH-s4={withSpace}
      centerV
      absT={!title}
      marginL-s4={!title}
      style={{ zIndex: 100 }}>
      {!withTab && (
        <View flexS marginR-s4>
          <SecondaryButton
            size={ButtonSize.small}
            onPress={nav.pop}
            iconPosition="right"
            iconSVG={ArrowLeftOutlineSvgImage}
          />
        </View>
      )}
      <View flexG>
        {!!title && (
          <Text text1 medium style={{ fontSize: 18 }}>
            {title}
          </Text>
        )}
        {!!subtitle && <Text text2>{subtitle}</Text>}
      </View>
      {!!rightIcon && !!rightAction && (
        <View flexS right>
          <SecondaryButton size={ButtonSize.small} onPress={rightAction} iconPosition="left" iconSVG={rightIcon} />
        </View>
      )}
    </View>
  );
};

export default PageHeader;
