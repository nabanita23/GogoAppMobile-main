import { useDebounce } from '@/hooks/useDebounce';
import { useLoading } from '@/hooks/useLoading';
import { useStores } from '@/stores';
import { UPDATE_ITEM_IN_CART } from '@/utils/apiPaths';
import { hapticOptions } from '@/utils/constants';
import { fetcher } from '@/utils/fetcher';
import { PureFunc } from '@/utils/types';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';
import { trigger } from 'react-native-haptic-feedback';
import { Colors, Spacings, Text, View } from 'react-native-ui-lib';
import { MinusOutlineSvgImage, PlusOutlineSvgImage } from './SVGIcons';

interface IProductQuantity {
  slim?: boolean;
  pid: string;
  sid: number;
  price: number;
  cb?: PureFunc;
}

const ProductQuantity: React.FC<IProductQuantity> = observer(({ slim = false, pid, sid, price, cb }) => {
  const { cart } = useStores();
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);

  const slimFactor = slim ? 1.5 : 2;

  const styles = StyleSheet.create({
    button: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Spacings.s1 * slimFactor,
      paddingHorizontal: Spacings.s4,
    },
  });

  const handleCountChange = async () => {
    setLoadingTrue();
    const { data, isError } = await fetcher(UPDATE_ITEM_IN_CART, {
      method: 'POST',
      body: {
        storeId: sid,
        productId: pid,
        quantity: cart.quantity(pid),
      },
    });
    setLoadingFalse();
    if (!isError) {
      // verify the total price from remote post the animation
      cart?.updateTotalPrice(data?.summary?.total);
    }
  };

  const handleIncrement = () => {
    trigger('impactLight', hapticOptions);
    cb?.();
    cart.inc(pid);
    // locally adding single unit price to just start the animation
    cart?.updateTotalPrice(cart.totalPrice + price);
    debouncedOnChange();
  };

  const handleDecrement = () => {
    trigger('impactLight', hapticOptions);
    cb?.();
    if (cart.quantity(pid) > 0) {
      cart.dec(pid);
      // locally adding single unit price to just start the animation
      cart?.updateTotalPrice(cart.totalPrice - price);
      debouncedOnChange();
    }
  };

  const debouncedOnChange = useDebounce(handleCountChange);

  return (
    <>
      {!cart.quantity(pid) ? (
        <Pressable onPress={handleIncrement}>
          <View right>
            <SquircleView
              style={{
                paddingHorizontal: Spacings.s2,
                paddingVertical: Spacings.s1 * slimFactor,
                width: slim ? 80 : '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              squircleParams={{
                cornerSmoothing: 0.7,
                cornerRadius: Spacings.s2,
                fillColor: Colors.screen2,
                strokeColor: Colors.border2,
                strokeWidth: 1,
              }}>
              <View row centerV height={22}>
                <Text small medium text1>
                  ADD
                </Text>
              </View>
            </SquircleView>
          </View>
        </Pressable>
      ) : (
        <SquircleView
          style={{ width: slim ? 80 : '100%' }}
          squircleParams={{
            cornerSmoothing: 0.7,
            cornerRadius: Spacings.s2,
            fillColor: slim ? Colors.screen1 : Colors.screen2,
            strokeColor: Colors.border2,
            strokeWidth: 1,
          }}>
          <View centerV row spread height={38}>
            {loading && (
              <View absF center>
                <ActivityIndicator />
              </View>
            )}
            <Pressable disabled={cart.quantity(pid) === 0} style={styles.button} onPress={handleDecrement}>
              {MinusOutlineSvgImage(Colors.text1, 20)}
            </Pressable>
            <View flexS width={Spacings.s8} flex center>
              <Text h3 text1>
                {cart.quantity(pid)}
              </Text>
            </View>
            <Pressable style={styles.button} onPress={handleIncrement}>
              {PlusOutlineSvgImage(Colors.text1, 20)}
            </Pressable>
          </View>
        </SquircleView>
      )}
    </>
  );
});

export default ProductQuantity;
