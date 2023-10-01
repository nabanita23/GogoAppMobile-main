import { CallSolidSvgImage, IdSolidSvgImage, LocationSolidSvgImage, MapSolidSvgImage } from '@/components/SVGIcons';

export const profiledata: Record<string, any>[] = [
  {
    label: 'Name',
    editable: true,
    value: 'Vishal Jain',
    icon: IdSolidSvgImage,
    onPressStack: 'SellerStack',
    onPressScreen: 'SellerUserDetails',
  },
  {
    label: 'Mobile',
    editable: false,
    value: '+91 (9000) 876 983',
    icon: CallSolidSvgImage,
    onPressStack: 'SellerStack',
    onPressScreen: 'SellerUserDetails',
  },
  {
    label: 'Current Address',
    editable: true,
    value: '983/23 Block I, Antiya tal, Jhansi 284003',
    icon: LocationSolidSvgImage,
    onPressStack: 'ModalStack',
    onPressScreen: 'LocationSuggest',
  },
  {
    label: 'Logout',
    editable: false,
    value: 'Logout',
    icon: MapSolidSvgImage,
    onPressStack: 'ModalStack',
    onPressScreen: 'LocationSuggest',
  },
];
