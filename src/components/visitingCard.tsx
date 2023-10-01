import { useDimensions } from '@/hooks/useDimensions';
import { IMerchant, IUser } from '@/utils/types';
import React from 'react';

import { formatPhoneNumber } from '@/utils/help';
import FastImage from 'react-native-fast-image';
import { Colors, Spacings, Text, View } from 'react-native-ui-lib';
import { LocationOutlineSvgImage } from './SVGIcons';

const VisitingCard: React.FC<
  Pick<IUser, 'firstName' | 'lastName'> & Pick<IMerchant, 'address' | 'phoneNumber' | 'whatsApp' | 'slug'>
> = ({ firstName, lastName, address, phoneNumber, whatsApp, slug }) => {
  const { dim } = useDimensions();

  const cardWidth = dim.width - Spacings.s4 * 2;

  return (
    <View
      br20
      spread
      padding-s4
      height={cardWidth / 1.67}
      width={cardWidth}
      style={{ borderWidth: 1, borderColor: Colors.border1 }}>
      <View row spread>
        <View spread width={'60%'}>
          <View spread>
            <Text h2 text1>
              {firstName} {lastName}
            </Text>
            <Text small text2>
              Verified Seller on Gogo
            </Text>
            <Text small text1 marginV-s1>
              {formatPhoneNumber('9036074291')}
            </Text>
          </View>
          <View marginT-s6>
            <Text h3 marginB-s1 text1>
              Maa Bhagwati Store
            </Text>
            <View row marginB-s1>
              <View marginR-s1>{LocationOutlineSvgImage(Colors.text1, 14)}</View>
              <View>
                <Text xSmall text1>
                  #1, Store address
                </Text>
                <Text xSmall text1>
                  will appear here, Please select store location in next screen
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View row>
          <FastImage
            source={{
              uri: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1684304667/gogo-app/Vishal_GoGoApp_zuszef',
            }}
            style={{ width: 110, height: 110 }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
      <View row centerV>
        <View marginR-s1>{LocationOutlineSvgImage(Colors.text1, 14)}</View>
        <View>
          <Text xSmall text1>
            www.mygogo.app/store-unique-code
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VisitingCard;
