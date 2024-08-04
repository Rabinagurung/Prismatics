import { Button } from 'react-native-paper';

export default function ContainedButton({
  title,
  mode,
  onPress,
  loading,
  disabled,
}) {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={{ height: 45, justifyContent: 'center' }}
      loading={loading}
      disabled={disabled}
    >
      {loading ? '' : title}
    </Button>
  );
}
