import { Alert, StyleSheet, View } from 'react-native';
import UserInput from '../../components/UI/UserInput';
import { useContext, useState } from 'react';
import ContainedButton from '../../components/UI/ContainedButton';
import TextButton from '../../components/UI/TextButtton';
import { signUpUser } from '../../utils/auth';
import { AuthContext } from '../../store/auth-context';
import { api } from '../../api/users';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';

const schema = z
  .object({
    name: z.string().min(3, { message: 'User name is required' }),
    email: z
      .string()
      .min(5, { message: 'Invalid email' })
      .email('Invalid email'),
    password: z
      .string()
      .min(8, { message: 'Password should be at least 8 characters long' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password should be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords didn't match",
    path: ['confirmPassword'],
  });

export default function SignUpScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    resolver: zodResolver(schema),
  });

  //console.log(errors, isDirty, isSubmitting);

  //sign Up HANDLER WILL RECEIVE email and password
  async function signUpHandler({ name, email, password }) {
    try {
      const { token, userId, refreshToken } = await signUpUser(email, password);

      authCtx.authenticate(token, userId, refreshToken);
      await api.signUpUser(userId, name, email);
    } catch (error) {
      Alert.alert('Sign up Failed', 'Try again later');
    }
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.logoContainer}>
        <LottieView
          source={require('../../../assets/splash_2.json')}
          style={styles.logo}
          autoPlay={false}
          loop
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <UserInput
              label="Username"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              error={errors.name}
              onChangeText={onChange}
              visible={!!errors.name}
              style={{ width: '100%' }}
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <UserInput
              label="Email"
              mode="outlined"
              value={value}
              onBlur={onBlur}
              error={errors.email}
              onChangeText={onChange}
              visible={!!errors.email}
              style={{ width: '100%' }}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <UserInput
              label="Password"
              mode="outlined"
              secureTextEntry={secureTextEntry}
              value={value}
              onBlur={onBlur}
              error={errors.password}
              onChangeText={onChange}
              visible={!!errors.password}
              style={{ width: '100%' }}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye-off' : 'eye'}
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}
                />
              }
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <UserInput
              label="Confirm Password"
              mode="outlined"
              secureTextEntry={secureTextEntry}
              value={value}
              error={errors.confirmPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              visible={!!errors.confirmPassword}
              style={{ width: '100%' }}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye-off' : 'eye'}
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}
                />
              }
            />
          )}
          name="confirmPassword"
        />
        <View style={{ width: '100%' }}>
          <ContainedButton
            title="Sign Up"
            mode="contained"
            loading={isSubmitting}
            onPress={handleSubmit(signUpHandler)}
            disabled={!isDirty || isSubmitting}
          />
        </View>
      </View>

      <View style={styles.textButtonContainer}>
        <TextButton
          text="Already have an account? "
          title="Login In"
          onPress={() => navigation.pop()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
  },

  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  logo: {
    height: 100,
    width: 100,
    objectFit: 'contain',
  },

  formContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    marginTop: 20,
  },

  textButtonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
