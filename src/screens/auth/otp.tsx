import { ArrowRightOutlineSvgImage, MobileOutlineSvgImage, WhatsAppOutlineSvgImage } from '@/components/SVGIcons';
import { PrimaryButton, SecondaryButton } from '@/components/button';
import CountdownLabel from '@/components/countdownLabel';
import Divider from '@/components/divider';
import DummySpace from '@/components/dummySpace';
import Headline from '@/components/headline';
import LayoutWrapper from '@/components/layoutWrapper';
import OtpInput from '@/components/otpInput';
import useOTPCounter from '@/hooks/useOTPCounter';
import { useStores } from '@/stores';
import { RESEND_PHONE_OTP, VERIFY_PHONE_OTP } from '@/utils/apiPaths';
import { hapticOptions } from '@/utils/constants';
import { fetcher } from '@/utils/fetcher';
import { cleanFormattedNumber } from '@/utils/help';
import React, { useRef, useState } from 'react';
import { trigger } from 'react-native-haptic-feedback';
import { useToast } from 'react-native-toast-notifications';
import { ButtonSize, Colors, View } from 'react-native-ui-lib';

export const OTP: React.FC<{ route: any }> = ({ route }: { route: any }) => {
  const toast = useToast();
  const { canResendOTP, resetCounter } = useOTPCounter();
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [otp, setOtp] = useState('');
  const phoneNumber = route?.params?.params?.phoneNumber || route?.params?.phoneNumber;
  const { auth, user } = useStores();
  const otpInputRef = useRef();

  const submitOTP = async (otpValue: string) => {
    if (loading) {
      return;
    }
    setLastAction('otp');
    setLoading(true);
    const { data, isError } = await fetcher(VERIFY_PHONE_OTP, {
      method: 'POST',
      body: {
        phoneNumber: cleanFormattedNumber(phoneNumber),
        code: otpValue,
      },
    });
    setLoading(false);
    if (isError) {
      trigger('notificationError', hapticOptions);
      toast.show('Incorrect OTP', { type: 'error', id: 'wrong-otp' });
      setOtp('');
    } else if (data?.jwt) {
      auth.setToken(data.jwt);
      user.setUserName(data.user?.firstName!, data.user?.lastName!);
      auth.setAuthenticated();
    }
  };

  const resendOTP = async (channel: string) => {
    if (loading) {
      return;
    }
    setLastAction(channel === 'whatsapp' ? 'resend-otp-whatsapp' : 'resend-otp');
    setLoading(true);
    const { status } = await fetcher(RESEND_PHONE_OTP, {
      method: 'POST',
      body: {
        phoneNumber: cleanFormattedNumber(phoneNumber),
        channel,
      },
    });
    if (status === 200) {
      resetCounter();
    }
    setLoading(false);
  };

  return (
    <LayoutWrapper withSafeView withContainer>
      <View centerH marginH-s4>
        <DummySpace size="s10" />
        <DummySpace size="s10" />
        <Headline center title="Verify OTP" subtitle={`We have sent you 6 digit OTP on \n ${phoneNumber}`} />
        <DummySpace size="s4" />
        <View centerH>
          <OtpInput otp={otp} setOtp={setOtp} onFilled={submitOTP} otpInputRef={otpInputRef} isError={false} />
        </View>
        <DummySpace size="s4" />
        <PrimaryButton
          fullWidth
          disabled={otp?.length !== 6}
          size={ButtonSize.large}
          label="Submit & Continue"
          onPress={submitOTP}
          iconPosition="right"
          iconSVG={ArrowRightOutlineSvgImage}
          loading={lastAction === 'otp' && loading}
        />
        {canResendOTP ? (
          <>
            <Divider label="Or resend OTP" />
            <SecondaryButton
              fullWidth
              disabled={!canResendOTP}
              size={ButtonSize.medium}
              label="Resend OTP on mobile number"
              onPress={() => resendOTP('sms')}
              iconPosition="right"
              iconSVG={MobileOutlineSvgImage}
              loading={lastAction === 'resend-otp' && loading}
            />
            <DummySpace size="s4" />
            <PrimaryButton
              fullWidth
              disabled={!canResendOTP}
              backgroundColor={Colors.green30}
              size={ButtonSize.medium}
              label="Resend OTP on WhatsApp"
              onPress={() => resendOTP('whatsapp')}
              iconPosition="right"
              iconSVG={WhatsAppOutlineSvgImage}
              loading={lastAction === 'resend-otp-whatsapp' && loading}
            />
          </>
        ) : (
          <CountdownLabel seconds={60} />
        )}
      </View>
    </LayoutWrapper>
  );
};
