import { Colors } from '@/assets/tokens';
import { RefObject } from 'react';
import { ColorValue, StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';

export type InputType = {
  ref?: RefObject<TextInput | null>;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  style?: { input?: StyleProp<TextStyle>; placeholder?: ColorValue };
  error?: boolean;
  props?: TextInputProps;
};

export default function Input({
  value,
  setValue,
  placeholder,
  loading,
  error = false,
  style = {},
  ref,
  ...props
}: InputType) {
  return (
    <TextInput
      ref={ref}
      style={[styles.input, style.input, error ? styles.inputInValid : styles.inputValid]}
      placeholderTextColor={style.placeholder ?? Colors.label}
      onChangeText={setValue}
      placeholder={placeholder}
      editable={!loading}
      value={value}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',

    paddingVertical: 12,
    paddingHorizontal: 16,

    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 24,
    color: '#1E1E1E',
  },

  inputValid: {
    borderColor: 'rgba(217, 217, 217, 1.0)',
  },

  inputInValid: {
    borderColor: '#E41D30',
  },
});
