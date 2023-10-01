import { useEffect, useRef, useState } from 'react';

export const RESEND_OTP_TIME_LIMIT = 60000; // milliseconds

const useOTPCounter = () => {
  const [canResendOTP, setCanResendOTP] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetCounter = (isInitialLoad?: boolean) => {
    if (!isInitialLoad) {
      setCanResendOTP(false);
    }
    clearTimeout(timeoutRef.current as NodeJS.Timeout);
    timeoutRef.current = setTimeout(() => {
      setCanResendOTP(true);
    }, RESEND_OTP_TIME_LIMIT);
  };

  useEffect(() => {
    resetCounter(true);

    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, []);

  return { canResendOTP, resetCounter };
};

export default useOTPCounter;
