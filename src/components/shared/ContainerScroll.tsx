import { ScrollView, ScrollViewProps } from 'react-native';

export default function ContainerScroll({ ...props }: ScrollViewProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, padding: 12 }}
      {...props}
    />
  );
}
