import React from "react";
import { View, Text, } from "react-native";
import styles from "../styles";
import EmailSendend from "../../../assets/icons/EmailSendend"

const SuccessReset: React.FC = () => (
    <View style={styles.successContainer}>
        <Text style={styles.title}>
        Reset Password
      </Text>
      <EmailSendend></EmailSendend>
      <Text style={styles.successText}>
        We've sent you an email for your password recovery. Please check your inbox.
      </Text>
    </View>
  );
export default SuccessReset