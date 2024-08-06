import { TextInput, HelperText } from 'react-native-paper';

export default function UserInput({ right, error, visible, ...rest }) {
  return (
    <>
      <TextInput right={right} error={error} autoCapitalize={false} {...rest} />

      <HelperText type="error" visible={visible}>
        {error?.message}
      </HelperText>
    </>
  );
}
