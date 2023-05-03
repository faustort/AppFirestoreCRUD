import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { auth } from "../config/firebase";
import styles from "../config/styles";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('MBTNavigation')
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <View
            style={styles.container}
        >
            <Text>Faça seu Login</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button
                onPress={handleLogin}
            >Fazer login</Button>

            <Button
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                Não é cadastrado? Cadastre-se
            </Button>
        </View>
    )
}