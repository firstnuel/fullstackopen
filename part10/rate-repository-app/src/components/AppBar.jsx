import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },
  scrollView: {
    flexGrow: 0, 
  },
  scrollViewContent: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 15,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
      >
        <Link to="/">
          <Text fontSize='header' fontWeight='bold' color='header'>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text fontSize='header' fontWeight='bold' color='header'>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
