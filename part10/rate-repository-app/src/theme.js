import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      header: '#ffffff',
    },
    fontSizes: {
      body: 15,
      subheading: 17,
      header: 19,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'system',
      })
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;