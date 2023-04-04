import { View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { useEffect, useState } from "react"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { db } from "../config/firebase"
// importa a aplicação em Firebase
import styles from "../config/styles"

export default function UsuarioCadastro() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [users, setUsers] = useState([])

    async function handleRegister() {
        // inicializa o banco de dados
        // addDoc é responsável pela inserção do dado em uma coleção "Tabela"
        const docRef = await addDoc(
            // Primeiro parâmetro é a coleção que é a origem dos dados
            collection(db, "usuarios"),
            // Segundo parâmetro é os dados que serão inseridos
            {
                nome: nome,
                email: email,

            }
        ).then((docRef) => {
            console.log("Id do usuário: ", docRef.id);
            setNome('');
        });
    }

    useEffect(() => {
        // onSnapshot é responsável por escutar as alterações na coleção
        const unsubscribe = onSnapshot(
            // Primeiro parâmetro é a coleção que é a origem dos dados
            collection(db, "usuarios"),
            // Segundo parâmetro é os dados que serão inseridos
            // querySnapshot é o retorno da coleção
            (querySnapshot) => {
                // users neste caso é um array temporário
                const usersTemp = [];
                querySnapshot.forEach((doc) => {
                    usersTemp.push(
                        {
                            ...doc.data(),
                            id: doc.id
                        }
                    );
                });
                setUsers(usersTemp);
            }
        );
        console.log(users);
        // componentDidUnmount o componete saiu de cena
        return () => unsubscribe;
    }, [])

    return (
        <View style={styles.container}>
            <Text>Cadastro do Usuário</Text>

            {
                users.map((user) => (
                    <View key={user.id}>
                        <Text>{user.nome}</Text>
                        <Text>{user.email}</Text>
                    </View>
                ))

            }

            <TextInput
                label="Nome"
                mode="outlined"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
            />
            <Button
                mode="contained"
                onPress={handleRegister}
            >Cadastrar Usuário </Button>
        </View>
    )
}