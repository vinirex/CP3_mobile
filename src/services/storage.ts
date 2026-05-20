import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormData } from '../types/form';

const STORAGE_KEY = '@dynamic_form_user_data';

/**
 * Saves the form data locally using AsyncStorage.
 * @param data The form data object to save.
 */
export const saveFormData = async (data: FormData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving form data to storage:', error);
    throw error;
  }
};

/**
 * Loads the saved form data from AsyncStorage.
 * @returns The parsed form data, or null if no data is saved.
 */
export const loadFormData = async (): Promise<FormData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? (JSON.parse(jsonValue) as FormData) : null;
  } catch (error) {
    console.error('Error loading form data from storage:', error);
    return null;
  }
};

/**
 * Clears the saved form data from AsyncStorage.
 */
export const clearFormData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing form data from storage:', error);
    throw error;
  }
};
