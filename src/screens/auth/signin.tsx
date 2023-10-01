import { ArrowRightOutlineSvgImage } from '@/components/SVGIcons';
import AnimatedLogo from '@/components/animatedLogo';
import { PrimaryButton } from '@/components/button';
import DummySpace from '@/components/dummySpace';
import Headline from '@/components/headline';
import Input from '@/components/input';
import LayoutWrapper from '@/components/layoutWrapper';
import ProgressiveImage from '@/components/progressiveImage';
import { useDimensions } from '@/hooks/useDimensions';
import { useServices } from '@/services';
import { SIGN_IN_WITH_PHONE } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { cleanFormattedNumber, formatPhoneNumber } from '@/utils/help';
import { MessageBoundary } from '@/utils/types';
import React, { useCallback, useState } from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { ButtonSize, Text, View } from 'react-native-ui-lib';

export const SignIn: React.FC = () => {
  const toast = useToast();
  const { nav } = useServices();
  const { dim } = useDimensions();
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState('sms');
  const [error, setError] = useState<MessageBoundary | null>(null);

  const handleTextChange = (inputText: string) => {
    setMobile(formatPhoneNumber(inputText));
  };

  const handleLinkClick = useCallback(async (url: string) => {
    await Linking.openURL(url);
  }, []);

  const handleSignIn = async () => {
    setProvider('sms');
    if (cleanFormattedNumber(mobile)?.length < 10) {
      setError({ type: 'error', message: 'Please enter a valid mobile number', inline: true });
      return;
    }
    if (isLoading || cleanFormattedNumber(mobile)?.length < 10) {
      return;
    }
    setError(null);
    setIsLoading(true);
    const { status } = await fetcher(SIGN_IN_WITH_PHONE, {
      method: 'POST',
      body: {
        identifier: cleanFormattedNumber(mobile),
        channel: 'sms',
      },
    });
    if (status === 200) {
      setIsLoading(false);
      toast.show('OTP sent successfully', { type: 'success' });
      nav.push('OTP', { params: { phoneNumber: mobile?.trim() } });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <LayoutWrapper withSafeView withContainer centered>
      <View centerH marginH-s4>
        <AnimatedLogo />
        <DummySpace size="s4" />
        <Headline center title="Welcome to Gogo App!" subtitle={'Access your account with phone'} />
        <DummySpace />
        <Input
          maxLength={14}
          keyboardType="number-pad"
          placeholder="Enter 10 digit mobile number"
          value={mobile}
          onChangeText={handleTextChange}
          error={error}
          centered
        />
        <DummySpace size="s4" />
        <PrimaryButton
          fullWidth
          size={ButtonSize.large}
          label="Send OTP"
          onPress={handleSignIn}
          iconPosition="right"
          iconSVG={ArrowRightOutlineSvgImage}
          loading={provider === 'sms' && isLoading}
        />
        <Text text2 small marginT-s2>
          By continuing you accept the
        </Text>
        <View row centerV>
          <TouchableOpacity onPress={() => handleLinkClick('https://mygogo.app/terms')}>
            <Text text2 small underline>
              Terms
            </Text>
          </TouchableOpacity>
          <Text marginH-s1 text2 small>
            &
          </Text>
          <TouchableOpacity onPress={() => handleLinkClick('https://mygogo.app/privacy-policy')}>
            <Text text2 small underline>
              Privacy policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        absB
        absR
        absL
        style={{
          transform: [{ translateY: 40 }],
          zIndex: -1,
        }}>
        <ProgressiveImage
          source={{
            uri: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1687343903/large-set-isolated-vegetables-white-background_m6fjv4_xiiskj',
          }}
          thumbnailSource={{
            uri: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/w_10,q_10/v1687343903/large-set-isolated-vegetables-white-background_m6fjv4_xiiskj',
          }}
          style={{ width: dim.width, height: dim.width * 0.35 }}
          resizeMode="cover"
        />
      </View>
    </LayoutWrapper>
  );
};
