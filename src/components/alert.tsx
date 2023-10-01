import { MessageBoundary } from '@/utils/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

export const Alert: React.FC<{ error: MessageBoundary; centered?: boolean }> = ({ error, centered = true }) => {
  return (
    <View
      br40
      marginV-s2
      paddingV-s2={!error.inline}
      paddingH-s2
      style={{
        ...(error?.type === 'success' && !error.inline && styles.successContainer),
        ...(error?.type === 'info' && !error.inline && styles.infoContainer),
        ...(error?.type === 'warning' && !error.inline && styles.warningContainer),
        ...(error?.type === 'error' && !error.inline && styles.errorContainer),
      }}>
      <Text
        center={centered}
        style={{
          ...(error?.type === 'success' && styles.successText),
          ...(error?.type === 'info' && styles.infoText),
          ...(error?.type === 'warning' && styles.warningText),
          ...(error?.type === 'error' && styles.errorText),
        }}>
        {error?.message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoText: { color: Colors.sky600 },
  successText: { color: Colors.green600 },
  warningText: { color: Colors.orange600 },
  errorText: { color: Colors.red500 },
  infoContainer: { backgroundColor: Colors.sky100 },
  successContainer: { backgroundColor: Colors.green100 },
  warningContainer: { backgroundColor: Colors.orange100 },
  errorContainer: { backgroundColor: Colors.red100 },
});
