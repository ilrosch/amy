import { useCallback, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { Input, InputType } from '../../texts/Input';
import { Btn, BtnType } from '../../buttons/Btn';

export type FormType = {
  inputProps: Omit<InputType, 'value' | 'onChangeText' | 'isEditable'>;
  btnProps: Omit<BtnType, 'isLoading' | 'onPress'>;
  initValue?: string;
  onSubmit: (v: string) => void;
} & ViewProps;

export function Form({
  inputProps,
  btnProps,
  onSubmit,
  initValue = '019e6854-bf3b-7464-816d-3a9fb648408f',
  ...props
}: FormType) {
  const [value, setValue] = useState<string>(initValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    if (!value || !value.trim()) return;

    setIsLoading(true);
    await onSubmit(value.trim());
    setIsLoading(false);
  }, [onSubmit, value]);

  return (
    <View style={{ gap: 12 }} {...props}>
      <Input
        value={value}
        onChangeText={setValue}
        isEditable={!isLoading}
        initialFocused
        {...inputProps}
      />
      <Btn variant="primary" isLoading={isLoading} onPress={handleSubmit} {...btnProps} />
    </View>
  );
}
