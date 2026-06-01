import { COLORS } from '@/shared/config/theme';
import {
  ColorValue,
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import { styles } from './Input.style';
import { useCallback, useEffect, useRef, useState } from 'react';
import CloseIcon from '@/assets/icons/close';

export type InputType = {
  value: string;
  onChangeText: (v: string) => void;
  isEditable?: boolean;
  isMultiline?: boolean;
  allowClear?: boolean;
  initialFocused?: boolean;
  placeholder?: string;
  style?: {
    input?: StyleProp<TextStyle>;
    placeholder?: ColorValue;
  };
} & TextInputProps;

export function Input({
  value,
  onChangeText,
  isEditable = true,
  isMultiline = false,
  initialFocused = false,
  allowClear = true,
  placeholder = '',
  style = {},
  ...props
}: InputType) {
  const inputElement = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (initialFocused) inputElement?.current?.focus?.();
  }, [initialFocused, inputElement]);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleClear = useCallback(() => {
    onChangeText('');
    inputElement?.current?.focus?.();
  }, [onChangeText]);

  return (
    <View style={[styles.container]}>
      <TextInput
        ref={inputElement}
        value={value}
        onChangeText={onChangeText}
        editable={isEditable}
        multiline={isMultiline}
        placeholder={placeholder}
        placeholderTextColor={style.placeholder ?? COLORS.textSecondary}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        style={[
          styles.input,
          !isEditable && styles.disabled,
          isFocused && styles.focused,
          style.input,
        ]}
        {...props}
      />
      {allowClear && isEditable && isFocused && value.length > 0 && (
        <Pressable style={styles.clearBtn} onPress={handleClear}>
          <CloseIcon color={COLORS.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}
