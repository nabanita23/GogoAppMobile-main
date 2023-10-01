import { useDimensions } from '@/hooks/useDimensions';
import { useStores } from '@/stores';
import React from 'react';
import { ButtonSize, Colors, View } from 'react-native-ui-lib';
import DummySpace from '../dummySpace';
import SQCard from '../sqCard';

export const ProductListingShimmer = () => {
  const { ui } = useStores();
  const { dim } = useDimensions();
  return (
    <View row>
      <View paddingH-s4 flexS width={110} height={dim.height}>
        {[...new Array(5)].map?.(i => (
          <View key={`shimmer-${Math.random()}`} center>
            <SQCard
              size={ButtonSize.medium}
              backgroundColor={ui.appearance === 'light' ? Colors.screen2 : Colors.transparent}
              borderColor={ui.appearance === 'light' ? Colors.transparent : Colors.border1}>
              <View height={60} width={60} />
            </SQCard>
            <View marginT-s2 bg-screen2 height={10} br20 width={56} />
            <DummySpace size="s8" />
          </View>
        ))}
      </View>
      <View>
        <View row flexG>
          <View marginR-s4>
            <SQCard
              size={ButtonSize.medium}
              backgroundColor={ui.appearance === 'light' ? Colors.screen2 : Colors.transparent}
              borderColor={ui.appearance === 'light' ? Colors.transparent : Colors.border1}>
              <View height={100} width={100} />
            </SQCard>
            <View marginT-s2 bg-screen2 height={16} br20 width={66} />
            <View marginT-s2 bg-screen2 height={10} br20 width={56} />
            <View marginT-s2 bg-screen2 height={24} br20 width={80} />
            <DummySpace size="s8" />
          </View>
          <View>
            <SQCard
              size={ButtonSize.medium}
              backgroundColor={ui.appearance === 'light' ? Colors.screen2 : Colors.transparent}
              borderColor={ui.appearance === 'light' ? Colors.transparent : Colors.border1}>
              <View height={100} width={100} />
            </SQCard>
            <View marginT-s2 bg-screen2 height={16} br20 width={66} />
            <View marginT-s2 bg-screen2 height={10} br20 width={56} />
            <View marginT-s2 bg-screen2 height={24} br20 width={80} />
            <DummySpace size="s8" />
          </View>
        </View>
        <View row flexG>
          <View marginR-s4>
            <SQCard
              size={ButtonSize.medium}
              backgroundColor={ui.appearance === 'light' ? Colors.screen2 : Colors.transparent}
              borderColor={ui.appearance === 'light' ? Colors.transparent : Colors.border1}>
              <View height={100} width={100} />
            </SQCard>
            <View marginT-s2 bg-screen2 height={16} br20 width={66} />
            <View marginT-s2 bg-screen2 height={10} br20 width={56} />
            <View marginT-s2 bg-screen2 height={24} br20 width={80} />
            <DummySpace size="s8" />
          </View>
          <View>
            <SQCard
              size={ButtonSize.medium}
              backgroundColor={ui.appearance === 'light' ? Colors.screen2 : Colors.transparent}
              borderColor={ui.appearance === 'light' ? Colors.transparent : Colors.border1}>
              <View height={100} width={100} />
            </SQCard>
            <View marginT-s2 bg-screen2 height={16} br20 width={66} />
            <View marginT-s2 bg-screen2 height={10} br20 width={56} />
            <View marginT-s2 bg-screen2 height={24} br20 width={80} />
            <DummySpace size="s8" />
          </View>
        </View>
        <View row flexG>
          <View marginR-s4>
            <SQCard
              size={ButtonSize.medium}
              backgroundColor={ui.appearance === 'light' ? Colors.screen2 : Colors.transparent}
              borderColor={ui.appearance === 'light' ? Colors.transparent : Colors.border1}>
              <View height={100} width={100} />
            </SQCard>
            <View marginT-s2 bg-screen2 height={16} br20 width={66} />
            <View marginT-s2 bg-screen2 height={10} br20 width={56} />
            <View marginT-s2 bg-screen2 height={24} br20 width={80} />
            <DummySpace size="s8" />
          </View>
          <View>
            <SQCard
              size={ButtonSize.medium}
              backgroundColor={ui.appearance === 'light' ? Colors.screen2 : Colors.transparent}
              borderColor={ui.appearance === 'light' ? Colors.transparent : Colors.border1}>
              <View height={100} width={100} />
            </SQCard>
            <View marginT-s2 bg-screen2 height={16} br20 width={66} />
            <View marginT-s2 bg-screen2 height={10} br20 width={56} />
            <View marginT-s2 bg-screen2 height={24} br20 width={80} />
            <DummySpace size="s8" />
          </View>
        </View>
        <View row flexG>
          <View marginR-s4>
            <SQCard
              size={ButtonSize.medium}
              backgroundColor={ui.appearance === 'light' ? Colors.screen2 : Colors.transparent}
              borderColor={ui.appearance === 'light' ? Colors.transparent : Colors.border1}>
              <View height={100} width={100} />
            </SQCard>
            <View marginT-s2 bg-screen2 height={16} br20 width={66} />
            <View marginT-s2 bg-screen2 height={10} br20 width={56} />
            <View marginT-s2 bg-screen2 height={24} br20 width={80} />
            <DummySpace size="s8" />
          </View>
          <View>
            <SQCard
              size={ButtonSize.medium}
              backgroundColor={ui.appearance === 'light' ? Colors.screen2 : Colors.transparent}
              borderColor={ui.appearance === 'light' ? Colors.transparent : Colors.border1}>
              <View height={100} width={100} />
            </SQCard>
            <View marginT-s2 bg-screen2 height={16} br20 width={66} />
            <View marginT-s2 bg-screen2 height={10} br20 width={56} />
            <View marginT-s2 bg-screen2 height={24} br20 width={80} />
            <DummySpace size="s8" />
          </View>
        </View>
      </View>
    </View>
  );
};
