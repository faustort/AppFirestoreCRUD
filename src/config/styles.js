import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    fullWidth: {
        width: width,
    }
});

export default styles;