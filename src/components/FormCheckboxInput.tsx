import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FormField } from '../types/form';

interface FormCheckboxInputProps {
  field: FormField;
  value: boolean;
  error?: string;
  onChange: (value: boolean) => void;
}

export const FormCheckboxInput: React.FC<FormCheckboxInputProps> = ({ field, value, error, onChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pressableRow}
        onPress={() => onChange(!value)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkboxBox,
            value ? styles.checkboxBoxSelected : null,
            error ? styles.checkboxBoxError : null,
          ]}
        >
          {value && <Text style={styles.checkIcon}>✓</Text>}
        </View>

        <Text style={[styles.label, error ? styles.labelError : null]}>
          {field.label} {field.required && <Text style={styles.required}>*</Text>}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  pressableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#ffffff',
  },
  checkboxBoxSelected: {
    borderColor: '#4f46e5',
    backgroundColor: '#4f46e5',
  },
  checkboxBoxError: {
    borderColor: '#f43f5e',
  },
  checkIcon: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: -2,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    lineHeight: 20,
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
    paddingLeft: 36, // Align error text with the label text
  },
});
