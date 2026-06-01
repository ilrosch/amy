import { ScrollView, ScrollViewProps } from 'react-native';

export type ContainerScrollType = {} & ScrollViewProps;

export function ContainerScroll({ ...props }: ContainerScrollType) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 12, gap: 8, flexGrow: 1 }}
      {...props}
    />
  );
}
