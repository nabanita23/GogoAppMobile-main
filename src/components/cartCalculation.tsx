import { formatCurrency } from '@/utils/help';
import { ICartData } from '@/utils/types';
import React, { useCallback } from 'react';
import { Colors, Text, View } from 'react-native-ui-lib';
import AnimatedNumber from 'rn-animated-number';

const CartCalculation = ({ cartData }: { cartData?: ICartData }) => {
  const AnimPrice = useCallback(({ value }: { value: number }) => {
    return (
      <AnimatedNumber
        textStyle={{ color: Colors.text1, fontSize: value > 10000 ? 18 : 20, fontFamily: 'Outfit-Bold' }}
        format={'₹ %&%'}
        duration={0.5}
        value={value}
      />
    );
  }, []);

  return (
    <View>
      <View row spread>
        <View>
          <Text body text2>
            Total MRP
          </Text>
        </View>
        <View>
          <Text body text2 style={{ textAlign: 'right' }}>
            {formatCurrency(cartData?.totalMrp!)}
          </Text>
        </View>
      </View>
      {cartData?.discount !== 0 && (
        <>
          <View row spread>
            <View>
              <Text body text2>
                Discount
              </Text>
            </View>
            <View>
              <Text body text2 style={{ textAlign: 'right' }}>
                -{formatCurrency(cartData?.discount!)}
              </Text>
            </View>
          </View>
          <View row spread>
            <View>
              <Text body bold text1>
                Discounted Total
              </Text>
            </View>
            <View>
              <Text body bold text1 style={{ textAlign: 'right' }}>
                {formatCurrency(cartData?.productTotal || cartData?.total || 0)}
              </Text>
            </View>
          </View>
        </>
      )}

      <View row spread>
        <View>
          <Text body text2>
            Minimum Cart Fee
          </Text>
        </View>
        <View>
          <Text body text2 style={{ textAlign: 'right' }}>
            {formatCurrency(cartData?.cartCalculation?.minimumCartFee || 0)}
          </Text>
        </View>
      </View>
      <View row spread>
        <View>
          <Text body text2>
            Handling Fee
          </Text>
        </View>
        <View>
          <Text body text2 style={{ textAlign: 'right' }}>
            {formatCurrency(cartData?.cartCalculation?.handlingFee || 0)}
          </Text>
        </View>
      </View>
      <View row spread>
        <View>
          <Text body text2>
            Packaging Fee
          </Text>
        </View>
        <View>
          <Text body text2 style={{ textAlign: 'right' }}>
            {formatCurrency(cartData?.cartCalculation?.packagingFee || 0)}
          </Text>
        </View>
      </View>
      <View row spread>
        <View>
          <Text body text2>
            Quick Delivery Fee
          </Text>
        </View>
        <View>
          <Text body text2 style={{ textAlign: 'right' }}>
            {formatCurrency(cartData?.cartCalculation?.quickDeliveryFee || 0)}
          </Text>
        </View>
      </View>
      <View row spread marginT-s2>
        <View>
          <Text h2 text1>
            Total
          </Text>
        </View>
        <View>
          <AnimPrice value={cartData?.value || cartData?.grandTotal || 0} />
        </View>
      </View>
    </View>
  );
};

export default CartCalculation;
