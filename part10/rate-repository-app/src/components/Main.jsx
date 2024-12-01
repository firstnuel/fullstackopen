import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import RepositoryInfo from './RepositoryInfo';
import SignIn from './SignIn';
import AppBar from './AppBar';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    marginTop: Constants.statusBarHeight,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/myreviews" element={<UserReviews />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/repo/:id" element={<RepositoryInfo />} />
      </Routes>
    </View>
  );
};

export default Main;