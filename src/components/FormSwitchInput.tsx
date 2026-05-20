import React from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { FormField } from '../types/form';

interface FormSwitchInputProps {
  field: FormField;
  value: boolean;
  error?: string;
  onChange: (value: boolean) => void;
}

export const FormSwitchInput: React.FC<FormSwitchInputProps> = ({ field, value, error, onChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.label, error ? styles.labelError : null]}>
          {field.label} {field.required && <Text style={styles.required}>*</Text>}
        </Text>

        <Switch
          trackColor={{ false: '#cbd5e1', true: '#c7d2fe' }}
          thumbColor={value ? '#4f46e5' : '#f1f5f9'}
          ios_backgroundColor="#cbd5e1"
          onValueChange={onChange}
          value={value}
          style={Platform.select({
            web: { cursor: 'pointer' } as any,
            default: {},
          })}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginRight: 16,
  },
  labelError: {
    color: '#e11d48',
  },
  required: {
    color: '#f43f5e',
  },
  errorText: {
    color: '#f43f5e',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
    paddingLeft: 4,
  },
});
