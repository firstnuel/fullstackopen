import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    username: yup
    .string()
    .min(3, 'Username must be greater or equal to 3')
    .required('Username is required'),
    password: yup
    .string()
    .required('Password is required'),
});


const SignIn = () => {
    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        onSubmit: values => {
          console.log(values);
        },
        validationSchema
      })


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.input}
      />
        {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={styles.input}
        secureTextEntry
      /> 
        {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
      )}  
       <Pressable onPress={formik.handleSubmit} style={styles.button} >
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        gap: 10
    },
    input: {
        borderWidth: 1, 
        borderColor: 'black', 
        marginBottom: 10, 
        fontSize: 20,
        borderRadius: 4, 
        padding: 20,
        height: 70,
    },
    button: {
        backgroundColor: '#0065D3',
        borderRadius: 4, 
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    }
})