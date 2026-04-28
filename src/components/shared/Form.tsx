import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import Btn from './Btn';
import Input from './Input';

export type FormDataType = {
  value: string;
  setError: Dispatch<SetStateAction<string>>;
};

export type FormType = {
  buttonText: string;
  placeholder: string;
  handler: (data: FormDataType | any) => void;
  valueField?: string;
  style?: {
    input?: StyleProp<TextStyle>;
    button?: ViewStyle | ViewStyle[];
  };
};

export default function Form({
  buttonText,
  placeholder,
  handler,
  style = {},
  valueField = '',
}: FormType) {
  const [value, setValue] = useState<string>(valueField);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const inputElement = useRef<TextInput>(null);

  const handleSubmit = async () => {
    setLoading(true);
    await handler({ value: value.trim(), setError });
    setLoading(false);
  };

  return (
    <View>
      <View>
        <Input
          ref={inputElement}
          style={{ input: style.input }}
          onChangeText={setValue}
          placeholder={placeholder}
          editable={!loading}
          error={!!error}
          value={value}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      <Btn btnText={buttonText} color={'success'} handler={handleSubmit} loadStatus={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#E41D30',
  },
});
