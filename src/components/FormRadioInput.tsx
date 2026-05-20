import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FormField } from '../types/form';

interface FormRadioInputProps {
  field: FormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export const FormRadioInput: React.FC<FormRadioInputProps> = ({ field, value, error, onChange }) => {
  const options = field.options || [];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, error ? styles.labelError : null]}>
        {field.label} {field.required && <Text style={styles.required}>*</Text>}
      </Text>

      <View style={styles.optionsContainer}>
        {options.map(option => {
          const isSelected = value === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionRow,
                isSelected ? styles.optionRowSelected : null,
                error ? styles.optionRowError : null,
              ]}
              onPress={() => onChange(option.value)}
              activeOpacity={0.7}
            >
              <View style={[styles.radioCircle, isSelected ? styles.radioCircleSelected : null]}>
                {isSelected && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={[styles.optionText, isSelected ? styles.optionTextSelected : null]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },
  labelError: {
    color: '#e11d48',
  },
  required: {
    color: '#f43f5e',
  },
  optionsContainer: {
    width: '100%',
    gap: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  optionRowSelected: {
    borderColor: '#4f46e5',
    backgroundColor: '#f5f3ff',
  },
  optionRowError: {
    borderColor: '#fca5a5',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioCircleSelected: {
    borderColor: '#4f46e5',
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4f46e5',
  },
  optionText: {
    fontSize: 15,
    color: '#475569',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#1e1b4b',
    fontWeight: '600',
  },
  errorText: {
    color: '#f43f5e',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
    paddingLeft: 4,
  },
});
