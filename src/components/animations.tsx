import useFetcher from '@/hooks/useFetcher';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native-ui-lib';

const CDNBaseUrl = 'https://res.cloudinary.com/dxc5ccfcg/raw/upload/';

interface ILottieAnimations {
  name: string;
  height: number;
  width: number;
  speed?: number;
  loop?: boolean;
  auto?: boolean;
  playOnce?: number[];
}

const getAnimation = (name: string) => {
  switch (name) {
    case 'offer':
      return 'v1684474765/gogo-app/animation/offer-box_lhggd6.json';
    case 'confetti':
      return 'v1686131810/gogo-app/animation/confetti_uyr3gv.json';
    case 'qr-scan':
      return 'v1686151576/gogo-app/animation/qr-scan-successful_q7mm06.json';
    case 'delivery':
      return 'v1686483611/gogo-app/animation/delivery-cycle_winpi7.json';
    case 'map-marker':
      return 'v1686481858/gogo-app/animation/map-marker_wevvyv.json';
    case 'shopping':
      return 'v1688098789/gogo-app/animation/shopping-bag_twyk3l.json';
    case 'success':
      return 'v1687430627/gogo-app/animation/success_tiitwz.json';
    case 'share-location':
      return 'v1687767306/gogo-app/animation/share-location_uvzdpp.json';
    case 'loading':
      return 'v1687772010/gogo-app/animation/loading_wjov13.json';
    case 'empty':
      return 'v1691142991/gogo-app/animation/animation_lkwev7pv_cor4uj.json';
    case 'ready-to-ship':
      return 'v1688312729/gogo-app/animation/delivery-bag_bli8ku.json';
    case 'grocery':
      return 'v1689226064/gogo-app/animation/grocery_ax7rah.json';
    default:
      return 'v1688312729/gogo-app/animation/delivery-bag_bli8ku.json';
  }
};

const LottieAnimations: React.FC<ILottieAnimations> = ({ name, height, width, loop, speed, playOnce, auto }) => {
  const { data, loading, isError } = useFetcher(`${CDNBaseUrl}${getAnimation(name)}`, true);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (auto) {
      animationRef.current?.play();
    } else if (playOnce?.length === 2) {
      animationRef.current?.play(...playOnce);
    }

    // Or set a specific startFrame and endFrame with:
  }, [auto, playOnce, loop]);

  if (isError || loading) {
    return <ActivityIndicator />;
  }

  return (
    <View height={height} width={width}>
      {!data ? null : (
        <LottieView ref={animationRef} cacheComposition source={data} autoPlay={auto} loop={loop} speed={speed} />
      )}
    </View>
  );
};

export default LottieAnimations;
