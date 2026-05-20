import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native';
import { FormField } from '../types/form';

interface FormDatePickerProps {
  field: FormField;
  value: string; // Expected format: DD/MM/AAAA
  error?: string;
  onChange: (value: string) => void;
}

const MONTH_LABELS = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

export const FormDatePicker: React.FC<FormDatePickerProps> = ({ field, value, error, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Split value into temp selections (defaults to today's date parts if empty)
  const today = new Date();
  const defaultDay = String(today.getDate()).padStart(2, '0');
  const defaultMonth = String(today.getMonth() + 1).padStart(2, '0');
  const defaultYear = String(today.getFullYear());

  const [tempDay, setTempDay] = useState(defaultDay);
  const [tempMonth, setTempMonth] = useState(defaultMonth);
  const [tempYear, setTempYear] = useState(defaultYear);

  // Sync state with current value when modal opens
  useEffect(() => {
    if (value) {
      const parts = value.split('/');
      if (parts.length === 3) {
        setTempDay(parts[0]);
        setTempMonth(parts[1]);
        setTempYear(parts[2]);
      }
    }
  }, [value, modalVisible]);

  // Generate lists
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')), []);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')), []);
  const years = useMemo(() => {
    const currentYear = today.getFullYear();
    return Array.from({ length: 100 }, (_, i) => String(currentYear - i));
  }, []);

  const handleConfirm = () => {
    // Format output as DD/MM/AAAA
    const formattedDate = `${tempDay}/${tempMonth}/${tempYear}`;
    onChange(formattedDate);
    setModalVisible(false);
  };

  const handleOpen = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, error ? styles.labelError : null]}>
        {field.label} {field.required && <Text style={styles.required}>*</Text>}
      </Text>

      <TouchableOpacity
        style={[
          styles.dateTrigger,
          modalVisible ? styles.dateTriggerActive : null,
          error ? styles.dateTriggerError : null,
        ]}
        onPress={handleOpen}
        activeOpacity={0.7}
      >
        <Text style={[styles.dateTriggerText, !value ? styles.placeholderText : null]}>
          {value || field.placeholder || 'DD/MM/AAAA'}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>
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

            {/* Selection Grid */}
            <View style={styles.selectionContainer}>
              {/* Day Column */}
              <View style={styles.column}>
                <Text style={styles.columnHeader}>Dia</Text>
                <FlatList
                  data={days}
                  keyExtractor={item => item}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    const isSelected = item === tempDay;
                    return (
                      <TouchableOpacity
                        style={[styles.item, isSelected ? styles.itemSelected : null]}
                        onPress={() => setTempDay(item)}
                      >
                        <Text style={[styles.itemText, isSelected ? styles.itemTextSelected : null]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              {/* Month Column */}
              <View style={styles.column}>
                <Text style={styles.columnHeader}>Mês</Text>
                <FlatList
                  data={months}
                  keyExtractor={item => item}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    const isSelected = item === tempMonth;
                    const index = parseInt(item, 10) - 1;
                    return (
                      <TouchableOpacity
                        style={[styles.item, isSelected ? styles.itemSelected : null]}
                        onPress={() => setTempMonth(item)}
                      >
                        <Text style={[styles.itemText, isSelected ? styles.itemTextSelected : null]}>
                          {MONTH_LABELS[index]}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              {/* Year Column */}
              <View style={styles.column}>
                <Text style={styles.columnHeader}>Ano</Text>
                <FlatList
                  data={years}
                  keyExtractor={item => item}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    const isSelected = item === tempYear;
                    return (
                      <TouchableOpacity
                        style={[styles.item, isSelected ? styles.itemSelected : null]}
                        onPress={() => setTempYear(item)}
                      >
                        <Text style={[styles.itemText, isSelected ? styles.itemTextSelected : null]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmBtnText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
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
  dateTrigger: {
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
  dateTriggerActive: {
    borderColor: '#4f46e5',
  },
  dateTriggerError: {
    borderColor: '#f43f5e',
  },
  dateTriggerText: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#94a3b8',
  },
  calendarIcon: {
    fontSize: 18,
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
    height: '50%',
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
  selectionContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  column: {
    flex: 1,
    height: '100%',
  },
  columnHeader: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 8,
  },
  item: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  itemSelected: {
    backgroundColor: '#f5f3ff',
  },
  itemText: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '500',
  },
  itemTextSelected: {
    color: '#4f46e5',
    fontWeight: '700',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  confirmBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  errorText: {
    color: '#f43f5e',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
    paddingLeft: 4,
  },
});
