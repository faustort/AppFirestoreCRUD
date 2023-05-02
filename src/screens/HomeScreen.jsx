import { View } from "react-native"
import { Text } from "react-native-paper"
import styles from "../config/styles"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"

export default function HomeScreen() {

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Usuário logado: ", user)
                console.log("Usuário UID: ", user.uid)

            } else {
                console.log("Usuário não logado")
            }
        })

    }, [])




    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    )
}