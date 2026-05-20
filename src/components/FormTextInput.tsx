import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { FormField } from '../types/form';

interface FormTextInputProps {
  field: FormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({ field, value, error, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isMultiline = field.type === 'multiline';
  const isPassword = field.type === 'password';

  // Determine keyboard types based on field type
  let keyboardType: 'default' | 'email-address' | 'numeric' = 'default';
  if (field.type === 'email') {
    keyboardType = 'email-address';
  } else if (field.type === 'number') {
    keyboardType = 'numeric';
  }

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, error ? styles.labelError : null]}>
        {field.label} {field.required && <Text style={styles.required}>*</Text>}
      </Text>

      <View
        style={[
          styles.inputContainer,
          isMultiline ? styles.multilineContainer : null,
          isFocused ? styles.inputFocused : null,
          error ? styles.inputError : null,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            isMultiline ? styles.multilineInput : null,
            Platform.select({
              web: { outlineStyle: 'none' } as any, // Disable outline on web browsers
              default: {},
            }),
          ]}
          value={value}
          onChangeText={onChange}
          placeholder={field.placeholder || `Digite o(a) ${field.label.toLowerCase()}`}
          placeholderTextColor="#94a3b8"
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !isPasswordVisible}
          multiline={isMultiline}
          numberOfLines={isMultiline ? 4 : 1}
          onFocus={handleFocus}
          onBlur={handleBlur}
          textAlignVertical={isMultiline ? 'top' : 'center'}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.6}
          >
            <Text style={styles.eyeText}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        )}
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
    marginBottom: 8,
  },
  labelError: {
    color: '#e11d48',
  },
  required: {
    color: '#f43f5e',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    height: 52,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  multilineContainer: {
    height: 110,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
    height: '100%',
    padding: 0,
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: '100%',
  },
  inputFocused: {
    borderColor: '#4f46e5',
    shadowColor: '#4f46e5',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  inputError: {
    borderColor: '#f43f5e',
  },
  eyeButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeText: {
    fontSize: 18,
  },
  errorText: {
    color: '#f43f5e',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
    paddingLeft: 4,
  },
});
