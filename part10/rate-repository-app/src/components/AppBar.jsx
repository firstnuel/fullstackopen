import { View, StyleSheet, ScrollView } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useQuery, useApolloClient } from '@apollo/client';
import { Link } from "react-router-native";
import { GET_USER } from '../graphql/queries';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';



const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textPrimary,
    paddingTop: Constants.statusBarHeight,
  },
  scrollView: {
    flexGrow: 0, 
  },
  scrollViewContent: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
    margin: 15,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient();

  const {  data, loading, error  } = useQuery(GET_USER)

  if (loading) return <Text>Loading...</Text>;  // Show a loading message or spinner
  if (error) return <Text>Error: {error.message}</Text>; // Show error message

  const user = data.me

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }


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
      { user ?        
          <Text onPress={handleSignOut}  fontSize='header' fontWeight='bold' color='header'>Sign Out</Text>
        : <Link to="/signin">
          <Text fontSize='header' fontWeight='bold' color='header'>Sign In</Text>
        </Link>
        }


      </ScrollView>
    </View>
  );
};

export default AppBar;
