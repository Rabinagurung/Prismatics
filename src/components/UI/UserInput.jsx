import { TextInput, HelperText } from 'react-native-paper';

export default function UserInput({
  // label,
  // mode,
  // value,
  // onChangeText,
  right,
  error,
  visible,
  ...rest
}) {
  return (
    <>
      <TextInput
        // label={label}
        // mode={mode}
        // value={value}
        // onChangeText={onChangeText}
        right={right}
        error={error}
        autoCapitalize={false}
        {...rest}
      />

      <HelperText type="error" visible={visible}>
        {error?.message}
      </HelperText>
    </>
  );
}
