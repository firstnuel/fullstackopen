import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  textPrinary: {
    color: theme.colors.textPrimary
  },
  colorWhite:{
    color: theme.colors.header,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeBody: {
    fontSize: theme.fontSizes.body,
  },
  fontSizHeader: {
    fontSize: theme.fontSizes.header,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
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