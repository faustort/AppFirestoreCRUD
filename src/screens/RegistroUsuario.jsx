import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import styles from "../config/styles";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";


export default function RegisterUsuario({ navigation }) {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");

    function handleRegister() {
        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const docRef = addDoc(collection(db, "usuarios"), {
                    nome: nome,
                    email: email,
                    uid: userCredential.user.uid,
                    dataDaCriacao: new Date()
                })
                    .then(() => {
                        navigation.navigate("MTB")
                    })
                    .catch((error) => {
                        console.log("Erro ao addDoc usuário: ", error)
                    })
            })
            .catch((error) => {
                console.log("Erro ao cadastrar usuário: ", error)
            })
    }

    return (
        <View style={styles.container}>
            <Text>Registro</Text>
            <TextInput
                onChangeText={setNome}
                value={nome}
                label={"Nome"}
                placeholder="Digite seu nome"
            />
            <TextInput
                onChangeText={setEmail}
                value={email}
                label={"E-mail"}
                placeholder="Digite seu e-mail"
            />
            <TextInput
                onChangeText={setSenha}
                value={senha}
                label={"Senha"}
                placeholder="Digite a senha desejada"
                secureTextEntry={true}
            />
            <Button
                onPress={handleRegister}
            >Realizar Cadastro</Button>
        </View>
    )

}