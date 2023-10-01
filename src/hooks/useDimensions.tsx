import { Dimensions } from 'react-native';

export const useDimensions = () => {
  const dim = Dimensions.get('window');

  return {
    dim,
  };
};
