import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorWhite:{
    color: theme.colors.header,
  },
  fontSizHeader: {
    fontSize: theme.fontSizes.header,
  },
  fontSizeBody: {
    fontSize: theme.fontSizes.body,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  text: {
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
  },
  textPrinary: {
    color: theme.colors.textPrimary
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'textPrimary' && styles.textPrinary,
    color === 'header' && styles.colorWhite,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'body' && styles.fontSizeBody,
    fontSize === 'header' && styles.fontSizHeader,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return (<NativeText style={textStyle} {...props} />);
};

export default Text;