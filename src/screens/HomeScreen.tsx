import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { formConfig } from '../config/formConfig';
import { useForm } from '../hooks/useForm';
import { DynamicField } from '../components/DynamicField';

export const HomeScreen: React.FC = () => {
  const {
    values,
    errors,
    savedData,
    isLoading,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    handleClear,
  } = useForm(formConfig);

  const onSubmit = async () => {
    await handleSubmit();
  };

  // Utility to convert raw stored boolean or select values into human-readable text
  const formatSavedValue = (fieldId: string, val: string | boolean) => {
    const field = formConfig.fields.find(f => f.id === fieldId);
    if (!field) return String(val);

    if (field.type === 'checkbox' || field.type === 'switch') {
      return val ? 'Sim' : 'Não';
    }

    if (field.type === 'password') {
      return '••••••••';
    }

    if (field.type === 'select' || field.type === 'radio') {
      const option = field.options?.find(opt => opt.value === val);
      return option ? option.label : String(val);
    }

    return String(val);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{formConfig.title}</Text>
        <Text style={styles.headerSubtitle}>Formulário Dinâmico via JSON</Text>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Success Banner */}
          {isSuccess && (
            <View style={styles.successBanner}>
              <Text style={styles.successEmoji}>✓</Text>
              <View style={styles.successTextContainer}>
                <Text style={styles.successTitle}>Sucesso!</Text>
                <Text style={styles.successDescription}>
                  Os dados foram validados e salvos localmente no AsyncStorage.
                </Text>
              </View>
            </View>
          )}

          {/* Validation Warning Banner */}
          {Object.keys(errors).length > 0 && (
            <View style={styles.warningBanner}>
              <Text style={styles.warningEmoji}>⚠</Text>
              <View style={styles.successTextContainer}>
                <Text style={styles.warningTitle}>Atenção!</Text>
                <Text style={styles.warningDescription}>
                  Por favor, corrija os erros sinalizados no formulário antes de enviar.
                </Text>
              </View>
            </View>
          )}

          {/* Render Dynamic Fields */}
          {formConfig.fields.map(field => (
            <DynamicField
              key={field.id}
              field={field}
              value={values[field.id]}
              error={errors[field.id]}
              onChange={handleChange}
            />
          ))}

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting ? styles.submitButtonDisabled : null]}
            onPress={onSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Enviar Dados</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Saved Data Preview Card */}
        {savedData && (
          <View style={[styles.card, styles.previewCard]}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewTitle}>Dados Salvos (AsyncStorage)</Text>
              <Text style={styles.previewSubtitle}>Preview dos últimos dados gravados no dispositivo</Text>
            </View>

            <View style={styles.previewContent}>
              {formConfig.fields.map(field => {
                const rawVal = savedData[field.id];
                if (rawVal === undefined || rawVal === '') return null;
                return (
                  <View key={field.id} style={styles.previewRow}>
                    <Text style={styles.previewKey}>{field.label}:</Text>
                    <Text style={styles.previewValue}>{formatSavedValue(field.id, rawVal)}</Text>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={handleClear}
              activeOpacity={0.7}
            >
              <Text style={styles.clearButtonText}>Limpar Histórico Local</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#475569',
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#4f46e5',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    ...Platform.select({
      web: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginTop: 20,
      } as any,
      default: {},
    }),
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#c7d2fe',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    width: '100%',
    ...Platform.select({
      web: {
        maxWidth: 600,
        alignSelf: 'center',
        paddingHorizontal: 0,
        paddingBottom: 40,
      } as any,
      default: {
        paddingBottom: 32,
      },
    }),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  successBanner: {
    flexDirection: 'row',
    backgroundColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  successEmoji: {
    fontSize: 20,
    color: '#10b981',
    marginRight: 12,
    fontWeight: '700',
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#065f46',
    marginBottom: 2,
  },
  successDescription: {
    fontSize: 13,
    color: '#047857',
    lineHeight: 18,
  },
  warningBanner: {
    flexDirection: 'row',
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  warningEmoji: {
    fontSize: 20,
    color: '#d97706',
    marginRight: 12,
    fontWeight: '700',
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#78350f',
    marginBottom: 2,
  },
  warningDescription: {
    fontSize: 13,
    color: '#b45309',
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
      default: {},
    }),
  },
  submitButtonDisabled: {
    backgroundColor: '#94a3b8',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  previewCard: {
    backgroundColor: '#f1f5f9',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    shadowOpacity: 0,
    elevation: 0,
  },
  previewHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 12,
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  previewSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  previewContent: {
    gap: 10,
    marginBottom: 20,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e8f0',
  },
  previewKey: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    flex: 1,
  },
  previewValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0f172a',
    textAlign: 'right',
    flex: 1,
  },
  clearButton: {
    height: 48,
    borderRadius: 12,
    borderColor: '#ef4444',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
      default: {},
    }),
  },
  clearButtonText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '700',
  },
});
