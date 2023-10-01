import React, { useEffect } from 'react';
import { Text } from 'react-native-ui-lib';

const CountdownLabel = ({ seconds = 60 }: { seconds?: number }) => {
  const [counter, setCounter] = React.useState(seconds);

  useEffect(() => {
    const timer: any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);

  return <Text body text2 marginT-s4>{`Resend code in 00:${counter < 10 ? `0${counter}` : counter}`}</Text>;
};

export default CountdownLabel;
