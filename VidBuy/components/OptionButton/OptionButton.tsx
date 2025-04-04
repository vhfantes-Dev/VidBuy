import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import styles from './styles';
import ArrowRigth from '../../assets/icons/ArrowRigth'

type Props = {
  title: string,
} & TouchableOpacityProps;

const OptionButton = ({ title, ...rest }: Props) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
      <ArrowRigth></ArrowRigth>
    </TouchableOpacity>
  );
};

export default OptionButton;


