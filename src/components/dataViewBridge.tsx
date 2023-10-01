import { useDimensions } from '@/hooks/useDimensions';
import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import LottieAnimations from './animations';

const DataViewBridge = ({
  loading,
  loadingComponent,
  empty,
  emptyComponent,
  children,
}: {
  loading: boolean;
  loadingComponent?: React.ReactNode;
  empty?: boolean;
  emptyComponent?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const { dim } = useDimensions();

  if (loading) {
    if (loadingComponent) {
      return loadingComponent;
    }
    return (
      <View center height={dim.width}>
        <LottieAnimations name="loading" height={40} width={40} auto loop />
        <Text small text2 center marginT-s2>
          fetching results
        </Text>
      </View>
    );
  }
  if (empty || !children) {
    if (emptyComponent) {
      return emptyComponent;
    }
    return (
      <View center height={dim.width}>
        <LottieAnimations name="empty" height={240} width={240} auto loop={false} />
        <Text small text2 center>
          No Results
        </Text>
      </View>
    );
  }
  return <>{children}</>;
};

export default DataViewBridge;
