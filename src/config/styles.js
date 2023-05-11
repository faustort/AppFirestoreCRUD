import { StyleSheet } from "react-native";

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
    },
    listBlock: {
        alignSelf: 'stretch',
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
        paddingHorizontal: 10,
        marginBottom: 10,
        alignSelf: "stretch",
        justifyContent: "space-between",
    }

});

export default styles;