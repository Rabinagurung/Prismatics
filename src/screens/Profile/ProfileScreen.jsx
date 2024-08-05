import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import ContainedButton from '../../components/UI/ContainedButton';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../store/auth-context';
import { api } from '../../api/users';
import { Avatar, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/UI/LoadingView';
import { deleteUserAccount } from '../../utils/auth';

export default function ProfileScreen() {
  const [userName, setUserName] = useState('');
  const [numFav, setFav] = useState(0);
  const [numDownloads, setDownloads] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const userId = authCtx.userId;
  const token = authCtx.token;
  //const logout = authCtx.logout;

  //console.log('Profile screen', userId);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (!userId) return;
        try {
          setIsLoading(true);
          const data = await api.getUser(userId);
          const fav = await api.getUserFavourites(userId);
          const downloads = await api.getUserDownloads(userId);

          setUserName(data?.fields?.userName?.stringValue);
          setFav(fav?.documents?.length || 0);
          setDownloads(downloads?.documents?.length || 0);
        } catch (_) {
        } finally {
          setIsLoading(false);
        }
      })();
    }, [userId])
  );

  const userFavData = async () => {
    try {
      const favDocuments = await api.getUserFavourites(userId);

      const favUserIdS =
        favDocuments?.documents?.map(
          (item) => item.fields.id_API.stringValue
        ) ?? [];

      const favPromises =
        favUserIdS?.map((item) => api.deleteUserFavourites(userId, item)) ?? [];

      if (favPromises.length === 0) {
        return;
      }

      return Promise.all(favPromises);
    } catch (error) {
      console.warn(error);
    }
  };

  const resolveFavPromises = async () => {
    setIsLoading(true);
    try {
      await userFavData();
      setFav(0);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  const userDownloadData = async () => {
    try {
      const downloadDocument = await api.getUserDownloads(userId);

      const downloadUserIdS =
        downloadDocument?.documents?.map(
          (item) => item.fields.id_API.stringValue
        ) ?? [];

      const downloadPromises =
        downloadUserIdS?.map((item) => api.deleteUserDownloads(userId, item)) ??
        [];

      if (downloadPromises.length === 0) {
        return;
      }

      return Promise.all(downloadPromises);
    } catch (error) {
      console.warn(error);
    }
  };

  const resolveDownloadPromises = async () => {
    setIsLoading(true);
    try {
      const res = await userDownloadData();
      setDownloads(0);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAccount = () => {
    resolveDownloadPromises();
    resolveFavPromises();
  };

  const resetButtonHandler = () => {
    getAlert(
      'Reset Account',
      'Are you sure to reset the account ?',
      'OK',
      'default',
      resetAccount
    );
  };

  const deleteUserAccountHandler = async () => {
    setIsLoading(true);
    let deletePromises = [
      deleteUserAccount(token),
      api.deleteUserDocument(userId),
    ];
    try {
      await Promise.all(deletePromises); //Delets the account in firebase and firestore database.
      authCtx.logout(); //Log out the user
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteButtonHandler = () => {
    getAlert(
      'Delete Account',
      'Are you sure to delete the account?',
      'Delete',
      'destructive',
      deleteUserAccountHandler
    );

    // Alert.alert('DeleteAccount', '\n Are you sure to delete the account?', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => {},
    //     style: 'cancel',
    //   },
    //   {
    //     text: 'delete',
    //     style: 'destructive',
    //     onPress: deleteUserAccountHandler,
    //   },
    // ]);
  };

  //Different comp
  function getAlert(title, message, buttonText2, style2, onPress2) {
    return Alert.alert(`${title}`, `${message}`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: `${buttonText2}`,
        style: `${style2}`,
        onPress: () => onPress2(),
      },
    ]);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ImageBackground
      src={require(`../../../assets/background.png`)}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        {/* {isLoading && <Loading style={{ flex: 1 }} />} */}
        <Avatar.Image
          size={100}
          source={require('../../../assets/giirlAvatar.png')}
        />
        <Text variant="displayMedium" style={{ paddingTop: 20 }}>
          {userName}
        </Text>
        <Text variant="titleMedium">
          {' '}
          {numFav} Favorites | {numDownloads} Downloads{' '}
        </Text>

        <View style={styles.buttonContainer}>
          <ContainedButton
            title="Sign Out"
            mode="contained"
            onPress={authCtx.logout}
            disabled={false}
            loading={false}
            style={styles.containedButton}
          />

          <ContainedButton
            title="Reset Account"
            mode="contained"
            disabled={false}
            loading={false}
            onPress={resetButtonHandler}
            style={styles.containedButton}
          />

          <ContainedButton
            title="Delete Account"
            mode="contained"
            disabled={false}
            loading={false}
            onPress={deleteButtonHandler}
            style={styles.containedButton}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },

  imageContainer: {
    marginBottom: 100,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    gap: 16,
  },

  containedButton: {
    width: '100%',
  },
});
