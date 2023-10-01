import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Spacings, View } from 'react-native-ui-lib';
import Container from './container';

interface Props {
  children?: React.ReactNode;
  snapToIndex?: number;
  permanent?: boolean;
  points?: string[] | number[];
  footer?: React.ReactNode;
}
export type Ref = BottomSheetModal;

export const BSheet = forwardRef<Ref, Props>((props, ref) => {
  const points = props?.points ?? ['25%', '50%', '60%'];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const snapPoints = useMemo(() => points, []);
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const renderFooter = useCallback(
    (footerProps: any) => (
      <BottomSheetFooter {...footerProps} bottomInset={Spacings.s4 * 2}>
        <Container>{props?.footer}</Container>
      </BottomSheetFooter>
    ),

    [props?.footer],
  );

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        pressBehavior={props?.permanent ? 'none' : 'close'}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      footerComponent={renderFooter}
      keyboardBehavior="fillParent"
      // onChange={handleSheetChanges}
      enablePanDownToClose={!props?.permanent}>
      <View paddingH-s4>{props?.children}</View>
    </BottomSheetModal>
  );
});
