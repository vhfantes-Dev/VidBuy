import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styles';
import { ReactElement } from 'react';

type Props = {
  label: string;
  description: string;
  selected: boolean;
  icon: ReactElement;
  onPress: () => void;
};

const ProfileOption = ({ label, description, selected, onPress, icon }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.selected]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{label}</Text>
          <Text style={styles.subtext}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileOption;
