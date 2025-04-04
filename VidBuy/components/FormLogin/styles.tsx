import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50,
        marginBottom: 15,
    },
    inputField: {
        flex: 1,
    },
    icon: {
        position: "absolute",
        right: 10,
    }
});

export default styles