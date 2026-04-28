import { Colors } from '@/src/assets/tokens';
import { useState } from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';

export type InputType = {
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  loading?: boolean;
  multiline?: boolean;
  style?: { input?: StyleProp<TextStyle>; placeholder?: ColorValue };
} & TextInputProps;

export default function Input({
  value,
  setValue,
  placeholder = '',
  loading = false,
  multiline = false,
  style = {},
  ...props
}: InputType) {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <TextInput
      style={[
        styles.input,
        style.input,
        loading && styles.inputDisable,
        focused && styles.inputFocus,
      ]}
      placeholderTextColor={style.placeholder ?? Colors.label}
      onChangeText={setValue}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      editable={!loading}
      value={value}
      multiline={multiline}
      numberOfLines={5}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 45,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.borderLight,
    fontSize: 16,
    color: Colors.textDark,
  },
  inputDisable: {
    opacity: 0.7,
  },
  inputFocus: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});
