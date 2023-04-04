import { View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import styles from "../config/styles"

export default function UsuarioCadastro() {
    const [nome, setNome] = useState("")

    async function handleRegister() {
        console.log(nome);
        await setDoc(
            doc(
                db, 
                "users", 
                "alovelace"
            ), 
            {
                primeiroNome: "Ada",
                ultimoNome: "Lovelace",
                dtNascimento: 1815

            }
        );
    }

    return (
        <View style={styles.container}>
            <Text>Cadastro do Usuário</Text>
            <TextInput
                label="Nome"
                mode="outlined"
                value={nome}
                onChangeText={setNome}
            />
            <Button
                mode="contained"
                onPress={handleRegister}
            >Cadastrar Usuário </Button>
        </View>
    )
}