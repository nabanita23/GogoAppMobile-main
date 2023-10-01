import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import { BorderRadiuses, Colors } from 'react-native-ui-lib';

const OtpInput = ({
  otp,
  setOtp,
  onFilled,
  onChanged,
  otpInputRef,
  isError,
}: {
  otp: string;
  setOtp: (v: string) => void;
  onFilled?: (v: string) => void;
  onChanged?: (v: string) => void;
  otpInputRef?: React.RefObject<any>;
  isError?: boolean;
}) => {
  return (
    <OTPInputView
      ref={otpInputRef}
      style={{ width: '100%', height: 80 }}
      pinCount={6}
      code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
      onCodeChanged={code => {
        setOtp(code);
        if (onChanged) {
          onChanged(code);
        }
      }}
      editable
      autoFocusOnLoad={false}
      keyboardType="number-pad"
      codeInputFieldStyle={{
        width: 48,
        height: 48,
        backgroundColor: Colors.white,
        color: Colors.text1,
        borderColor: isError ? Colors.red500 : Colors.border1,
        borderRadius: BorderRadiuses.br40,
        fontFamily: 'Outfit-Regular',
        fontWeight: '400',
        fontSize: 16,
      }}
      codeInputHighlightStyle={{
        borderWidth: 1,
        borderColor: isError ? Colors.red500 : Colors.border1,
      }}
      onCodeFilled={onFilled}
    />
  );
};

export default OtpInput;
