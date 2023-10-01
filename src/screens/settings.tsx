import { BSheet } from '@/components/bSheet';
import Partner from '@/components/banner/partner';
import { PrimaryButton, SecondaryButton } from '@/components/button';
import Container from '@/components/container';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import OrderPlaced from '@/components/orderPlaced';
import OrderReceived from '@/components/orderReceived';
import ProgressiveImage from '@/components/progressiveImage';
import ScrollWrapper from '@/components/scrollWrapper';
import SettingItem from '@/components/settingItem';
import StateEmpty from '@/components/stateEmpty';
import { useDimensions } from '@/hooks/useDimensions';
import useFetcher from '@/hooks/useFetcher';
import { resetStores } from '@/stores';
import { GET_CART, GET_USER, UPDATE_STORE_DATA } from '@/utils/apiPaths';
import { formatPhoneNumber } from '@/utils/help';
import { getImageUrl, getThumbnailUrl } from '@/utils/imagePaths';
import { ICartData, IUser } from '@/utils/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, { useRef } from 'react';
import { ButtonSize, Colors, Spacings, TabController, Text, View } from 'react-native-ui-lib';

type PickersStateKey = keyof Omit<PickersState, 'show' | 'hide'>;
type PickersState = {
  appearance: boolean;
  language: boolean;

  show: <T extends PickersStateKey>(what: T) => void;
  hide: <T extends PickersStateKey>(what: T) => void;
};

export const Settings = observer(({ route }: { route: any }) => {
  useFetcher(UPDATE_STORE_DATA, false, true);
  const { dim } = useDimensions();
  const bSheetRef = useRef<BottomSheetModal>(null);
  const { data: userData, loading: userLoading }: { data: IUser; loading: boolean } = useFetcher(GET_USER, false, true);
  const { data, loading }: { data: ICartData; loading: boolean } = useFetcher(GET_CART, false, true);

  const openBottomSheet = () => bSheetRef?.current?.present();
  const closeBottomSheet = () => bSheetRef?.current?.close();

  const tabWidth = dim.width / 3;

  const handleLogout = async () => {
    await resetStores();
  };

  const profileData: Record<string, any>[] = [
    {
      label: 'Name',
      editable: true,
      external: false,
      value:
        userData?.firstName && userData?.lastName ? userData?.firstName + ' ' + userData?.lastName : 'Update your name',
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/w_40/v1686981963/gogo-app/icons/emoji-normal_lctiku',
      onPressStack: 'SellerStack',
      onPressScreen: 'SellerUserDetails',
    },
    {
      label: 'Current Address',
      editable: true,
      external: false,
      value:
        data?.userAddress?.formattedAddressByGoogle || data?.unsavedAddress?.formattedAddressByGoogle
          ? data?.userAddress?.formattedAddressByGoogle || data?.unsavedAddress?.formattedAddressByGoogle
          : 'Update your address',
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/w_40/v1686981963/gogo-app/icons/location_sdaclt',
      onPressStack: 'ModalStack',
      onPressScreen: 'LocationSuggest',
    },
    {
      label: 'Mobile',
      editable: false,
      external: false,
      value: formatPhoneNumber(userData?.phoneNumber),
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/w_40/v1686981963/gogo-app/icons/call_tbw1uj',
      onPressStack: 'SellerStack',
      onPressScreen: 'SellerUserDetails',
    },
    {
      label: 'Report',
      editable: true,
      external: true,
      value: 'In app issues: App, Images, Feature',
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/w_40/v1686981963/gogo-app/icons/danger_ybcbly',
      onPressStack: '',
      onPressScreen: 'mailto:report@mygogo.app?subject=Issue',
    },
    {
      label: 'T&C',
      editable: true,
      external: true,
      value: 'Terms of use',
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/w_40/v1689924312/gogo-app/icons/receipt-item_yuvmfw',
      onPressStack: '',
      onPressScreen: 'https://mygogo.app/terms',
    },
    {
      label: 'Policies',
      editable: true,
      external: true,
      value: 'Privacy policy',
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/w_40/v1689924312/gogo-app/icons/receipt-item_yuvmfw',
      onPressStack: '',
      onPressScreen: 'https://mygogo.app/privacy-policy',
    },
    {
      label: 'Logout',
      editable: false,
      external: false,
      value: 'Logout',
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/w_40/v1689924312/gogo-app/icons/logout_lxomz6',
      onPressStack: '',
      onPressScreen: '',
    },
  ];

  return (
    <LayoutWrapper withSafeView>
      <Container>
        <PageHeader title="Account" />
      </Container>
      <TabController
        initialIndex={route?.params?.tabScreen === 'orderPlaced' ? 1 : 0}
        asCarousel
        items={[
          { label: 'Profile', width: tabWidth },
          { label: 'Orders', width: tabWidth },
          {
            label: userData?.isSeller ? 'Business' : '',
            ...(userData?.isSeller && { badge: { size: 6 } }),
            width: tabWidth,
            ignore: !userData?.isSeller,
          },
        ]}>
        <TabController.TabBar
          centerSelected
          indicatorInsets={Spacings.s4}
          labelColor={Colors.text2}
          selectedLabelColor={Colors.text1}
          activeBackgroundColor={Colors.transparent}
          indicatorStyle={{ backgroundColor: Colors.button1, height: 1 }}
        />
        <View flex>
          <TabController.PageCarousel>
            <TabController.TabPage index={0}>
              {userLoading && loading ? (
                <Container>
                  <StateEmpty />
                </Container>
              ) : (
                <ScrollWrapper>
                  <Container>
                    {profileData?.map?.((item, i) => (
                      <SettingItem
                        key={item?.label}
                        data={item}
                        lastItem={profileData?.length - 1 === i}
                        cb={openBottomSheet}
                      />
                    ))}
                  </Container>
                  {!userData?.isSeller && <Partner />}
                </ScrollWrapper>
              )}
            </TabController.TabPage>
            <TabController.TabPage index={1} lazy>
              <OrderPlaced />
            </TabController.TabPage>
            {userData?.isSeller && (
              <TabController.TabPage index={2} lazy>
                <OrderReceived />
              </TabController.TabPage>
            )}
          </TabController.PageCarousel>
        </View>
      </TabController>
      <BSheet ref={bSheetRef} points={['43%']}>
        <View spread centerH>
          <ProgressiveImage
            source={{ uri: getImageUrl('gogoConfused') }}
            thumbnailSource={{ uri: getThumbnailUrl('gogoConfused') }}
            style={{ width: dim.width * 0.5, height: dim.width * 0.5 }}
            resizeMode="cover"
          />
          <Text text1 body center marginB-s4>
            Please confirm if you wish to logout?
          </Text>
          <View spread centerV row>
            <View marginR-s2>
              <SecondaryButton size={ButtonSize.large} label="Logout" onPress={handleLogout} />
            </View>
            <View marginL-s2>
              <PrimaryButton size={ButtonSize.large} label="Cancel" onPress={() => closeBottomSheet()} />
            </View>
          </View>
        </View>
      </BSheet>
    </LayoutWrapper>
  );
});
