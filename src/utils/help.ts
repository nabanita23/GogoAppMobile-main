import RNRestart from 'react-native-restart';
import { Spacings } from 'react-native-ui-lib';
import { ButtonSize, ButtonSizeProp } from 'react-native-ui-lib/src/components/button/ButtonTypes';

export const randomNum = (max = 100): number => Math.floor(Math.random() * max);

export const randomNumInRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const restartApp = RNRestart.Restart;

export const getPadding = (size: ButtonSizeProp) => {
  switch (size) {
    case ButtonSize.xSmall:
      return Spacings.s1;
    case ButtonSize.small:
      return Spacings.s2;
    case ButtonSize.medium:
      return Spacings.s3;
    case ButtonSize.large:
      return Spacings.s4;

    default:
      return Spacings.s3;
  }
};
export const getRadius = (size: ButtonSizeProp) => {
  switch (size) {
    case ButtonSize.xSmall:
      return Spacings.s2;
    case ButtonSize.small:
      return Spacings.s3;
    case ButtonSize.medium:
      return Spacings.s3;
    case ButtonSize.large:
      return Spacings.s4;

    default:
      return Spacings.s4;
  }
};
export const getIconSize = (size: ButtonSizeProp) => {
  switch (size) {
    case ButtonSize.xSmall:
      return Spacings.s3;
    case ButtonSize.small:
      return Spacings.s4;
    case ButtonSize.medium:
      return Spacings.s5;
    case ButtonSize.large:
      return Spacings.s6;

    default:
      return Spacings.s4;
  }
};
export const formatProductWeight = (weightInGrams: number | null) => {
  if (!weightInGrams) {
    return weightInGrams;
  }
  return weightInGrams >= 1000 ? `${weightInGrams / 1000}Kg` : `${weightInGrams}gm`;
};

export const numericInput = (value: string): string => {
  return value.replace(/[^\d]/g, '');
};

export const formatPhoneNumber = (value: string): string => {
  if (!value) {
    return value;
  }

  const phoneNumber = numericInput(value);

  var match = phoneNumber.match(/^(91|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    var intlCode = match[91] ? '+91 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }

  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) {
    return phoneNumber;
  }
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const cleanFormattedNumber = (phone: string) => {
  return phone.replace(/\D+/gm, '');
};

export const formatCurrency = (data: number): string => {
  return data?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

export const isEmpty = (value: string | number | null | undefined) =>
  value === null || value === undefined || value === '';

export const formatDistance = (distanceInMeters: number | null | undefined) => {
  if (distanceInMeters === 0 || distanceInMeters) {
    const kms = distanceInMeters / 1000;
    return `${kms > 100 ? Math.ceil(kms) : Math.ceil(kms * 10) / 10}km`;
  }
  return distanceInMeters;
};

export const gogolog = (data: any, label?: string) => {
  console.log(label ?? 'gogo-log', JSON.stringify(data, null, 2));
};

export const formatAddressFromGoogle = (data: any[]): Record<string, string> => {
  return data?.reduce?.(
    (seed: any, { long_name, types }: { long_name: string; types: string[] }) => (
      types?.forEach(t => (seed[t] = long_name)), seed
    ),
    {},
  );
};

export const formatAadharNumber = (value: string): string => {
  const aadharNumber = numericInput(value);
  if (!value || aadharNumber?.length === 16) {
    return value;
  }

  const regex = /\d{4}(?=.)/g;
  return aadharNumber.replace(regex, '$&-');
};
