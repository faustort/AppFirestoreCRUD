import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width * .9;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    containerInside: {
        width: "100%",
        alignSelf: 'stretch',
        padding: 20
    },
    fullWidth: {
        alignSelf: 'stretch'
    },
    input: {
        marginBottom: 10,
    }
});

export default styles;