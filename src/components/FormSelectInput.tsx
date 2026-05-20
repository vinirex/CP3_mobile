import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native';
import { FormField } from '../types/form';

interface FormSelectInputProps {
  field: FormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export const FormSelectInput: React.FC<FormSelectInputProps> = ({ field, value, error, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const options = field.options || [];

  // Find the label of the currently selected option
  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : field.placeholder || 'Selecione uma opção';

  const handleSelect = (val: string) => {
    onChange(val);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, error ? styles.labelError : null]}>
        {field.label} {field.required && <Text style={styles.required}>*</Text>}
      </Text>

      <TouchableOpacity
        style={[
          styles.pickerTrigger,
          modalVisible ? styles.pickerTriggerActive : null,
          error ? styles.pickerTriggerError : null,
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.pickerTriggerText, !selectedOption ? styles.placeholderText : null]}>
          {displayText}
        </Text>
        <Text style={styles.chevron}>▼</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{field.label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={item => item.value}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <TouchableOpacity
                    style={[styles.optionItem, isSelected ? styles.optionItemSelected : null]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text style={[styles.optionText, isSelected ? styles.optionTextSelected : null]}>
                      {item.label}
                    </Text>
                    {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>

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
  pickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    height: 52,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pickerTriggerActive: {
    borderColor: '#4f46e5',
  },
  pickerTriggerError: {
    borderColor: '#f43f5e',
  },
  pickerTriggerText: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#94a3b8',
  },
  chevron: {
    fontSize: 12,
    color: '#64748b',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    maxHeight: '60%',
    paddingBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: '600',
  },
  listContainer: {
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  optionItemSelected: {
    backgroundColor: '#f5f3ff',
  },
  optionText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#4f46e5',
    fontWeight: '600',
  },
  checkIcon: {
    fontSize: 18,
    color: '#4f46e5',
    fontWeight: '700',
  },
  errorText: {
    color: '#f43f5e',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
    paddingLeft: 4,
  },
});
