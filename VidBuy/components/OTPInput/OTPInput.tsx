import React, { useRef } from "react";
import { View, TextInput, Text } from "react-native";
import styles from "./styles";

interface OTPInputProps {
  value: string[];
  setValue: (value: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ value, setValue }) => {
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === "") {
      const newValue = [...value];
      newValue[index] = text;
      setValue(newValue);

      if (text !== "" && index < value.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={styles.inputWrapper}>
          <Text style={styles.placeholderZero}>
            {value[index] === "" ? "0" : ""}
          </Text>
          <TextInput
            ref={(ref) => (inputRefs.current[index] = ref!)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={value[index]}
            onChangeText={(text) => handleChange(text, index)}
          />
        </View>
      ))}
    </View>
  );
};


export default OTPInput;
