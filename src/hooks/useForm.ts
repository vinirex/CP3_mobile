import { useState, useEffect, useMemo, useCallback } from 'react';
import { FormConfig, FormData, FormDataValue, FormErrors, FormField } from '../types/form';
import { saveFormData, loadFormData, clearFormData } from '../services/storage';

export const useForm = (config: FormConfig) => {
  // Memoize default values based on configuration
  const defaultValues = useMemo(() => {
    const defaults: FormData = {};
    config.fields.forEach(field => {
      if (field.type === 'checkbox' || field.type === 'switch') {
        defaults[field.id] = false;
      } else {
        defaults[field.id] = '';
      }
    });
    return defaults;
  }, [config]);

  // Form states
  const [values, setValues] = useState<FormData>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [savedData, setSavedData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Load saved data on component mount
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const stored = await loadFormData();
        if (stored) {
          setSavedData(stored);
          // Pre-populate form values with saved values (merge with default values in case config changed)
          setValues(prev => ({
            ...prev,
            ...stored,
          }));
        }
      } catch (error) {
        console.error('Failed to load form data from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  // Validation function for a single field
  const validateField = useCallback((field: FormField, value: FormDataValue): string => {
    // Required check
    if (field.required) {
      if (value === undefined || value === null || value === '') {
        return `O campo "${field.label}" é obrigatório.`;
      }
      if (typeof value === 'boolean' && !value && field.type === 'checkbox') {
        return `Você precisa aceitar os termos: "${field.label}".`;
      }
    }

    // Specific format validations
    if (value && typeof value === 'string') {
      if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Insira um endereço de e-mail válido.';
        }
      }
      if (field.type === 'number') {
        const num = Number(value);
        if (isNaN(num)) {
          return 'Insira um número válido.';
        }
      }
      if (field.type === 'date') {
        // Simple date format validation (e.g. DD/MM/YYYY)
        const dateRegex = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(value)) {
          return 'Insira uma data válida no formato DD/MM/AAAA.';
        }
      }
    }

    return '';
  }, []);

  // Field change handler
  const handleChange = useCallback((id: string, value: FormDataValue) => {
    setValues(prev => ({
      ...prev,
      [id]: value,
    }));

    // Reset error when user changes the value
    setErrors(prev => {
      if (prev[id]) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return prev;
    });

    // Reset success banner if typing changes values
    setIsSuccess(false);
  }, []);

  // Form submission handler
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setIsSuccess(false);

    // Validate all fields
    const validationErrors: FormErrors = {};
    config.fields.forEach(field => {
      const error = validateField(field, values[field.id]);
      if (error) {
        validationErrors[field.id] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return false;
    }

    // Save valid form data
    try {
      await saveFormData(values);
      setSavedData(values);
      setIsSuccess(true);
      return true;
    } catch (error) {
      console.error('Failed to submit form:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [config, values, validateField]);

  // Clear data handler
  const handleClear = useCallback(async () => {
    try {
      await clearFormData();
      setValues(defaultValues);
      setErrors({});
      setSavedData(null);
      setIsSuccess(false);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }, [defaultValues]);

  return {
    values,
    errors,
    savedData,
    isLoading,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    handleClear,
  };
};
