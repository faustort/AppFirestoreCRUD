import { View } from "react-native";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import styles from "../config/styles";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
    // Aqui definimos nome e setNome como um objeto
    // assim podemos utilizar dentro de uma variável 
    // o valor e o erro
    const [nome, setNome] = useState({
        value: "",
        erro: false
    })
    const [telefone, setTelefone] = useState({
        value: "",
        erro: false
    })
    const [email, setEmail] = useState({
        value: "",
        erro: false
    })
    const [password, setPassword] = useState({
        value: "",
        erro: false
    })
    const [confirmPassword, setConfirmPassword] = useState('')

    const [dialog, setDialog] = useState({
        visible: false,
        errorMessage: ""
    })

    function handleRegister() {
        if (password.value !== confirmPassword) {
            setPassword({
                value: password.value,
                erro: true
            })
            setDialog({
                visible: true,
                errorMessage: "As senhas não conferem"
            })
            return
        }
        if (nome.value === '') {
            setNome({
                value: nome.value,
                erro: true
            })
            setDialog({
                visible: true,
                errorMessage: "Você precisa preencher seu nome"
            })
            return
        }
        if (telefone.value === '') {
            setTelefone({
                value: telefone.value,
                erro: true
            })
            setDialog({
                visible: true,
                errorMessage: "Você não preencheu o telefone"
            })
            return
        }
        if (email.value === '') {
            setEmail({
                value: email.value,
                erro: true
            })
            setDialog({
                visible: true,
                errorMessage: "Não preencheu seu e-mail"
            })
            return
        }
        if (password.value === '') {
            setPassword({
                value: password.value,
                erro: true
            })
            return
        }

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                const userUID = user.uid;
                // criar um registro na coleção 'usuários'
                // com os dados do usuário
                // aqui eu seleciono a coleção "tabela"
                const collectionRef = collection(db, 'usuarios');
                // aqui eu crio um registro na coleção "tabela"
                // com os dados do usuário
                const dadosAInserir = {
                    nome: nome.value,
                    telefone: telefone.value,
                    email: email.value,
                    userUID: userUID
                }

                const docRef = addDoc(collectionRef, dadosAInserir)
                    .then((docRef) => {
                        console.log(docRef)
                        navigation.navigate('LoginScreen')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })

    }

    function hideDialog() {
        setDialog({
            visible: false,
            errorMessage: ""
        })
    }

    return (
        <View
            style={styles.container}
        >
            <Text>Faça seu registro</Text>
            <TextInput
                label="Nome"
                // Value agora passa ser a propriedade value do objeto nome
                value={nome.value}
                // onChangeText agora passa a ser uma 
                // função que recebe o texto inserido
                // e atualiza o objeto nome com o valor
                onChangeText={(textoInserido) => setNome(
                    {
                        value: textoInserido,
                        erro: false
                    }
                )}
            />
            <TextInput
                label="Telefone"
                value={telefone.value}
                onChangeText={(textoInserido) => setTelefone(
                    {
                        value: textoInserido,
                        erro: false
                    }
                )}
            />
            <TextInput
                label="Email"
                value={email.value}
                onChangeText={(textoInserido) => setEmail(
                    {
                        value: textoInserido,
                        erro: false
                    }
                )}
            />
            <TextInput
                label="Senha"
                value={password.value}
                onChangeText={(textoInserido) => setPassword(
                    {
                        value: textoInserido,
                        erro: false
                    }
                )}
                secureTextEntry={true}
                error={password.erro}
            />
            <TextInput
                label="Confirme sua senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />
            <Button
                onPress={handleRegister}
            >Fazer registro</Button>
            <Portal>
                <Dialog visible={dialog.visible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{dialog.errorMessage}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}