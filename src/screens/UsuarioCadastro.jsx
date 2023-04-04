import { View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { useEffect, useState } from "react"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { db } from "../config/firebase"
// importa a aplicação em Firebase
import styles from "../config/styles"
import { ScrollView } from "react-native-web"

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
                // forEach é um método do array que percorre cada item do array
                // neste caso o item é o doc que é um objeto com os dados do usuário
                querySnapshot.forEach((doc) => {
                    usersTemp.push(
                        {
                            // ...doc.data() é um operador que pega todos os dados do objeto
                            // e coloca dentro do objeto que está sendo criado
                            ...doc.data(),
                            // id é um campo que não existe no objeto doc.data()
                            // por isso é necessário criar um campo id para o objeto
                            id: doc.id
                        }
                    );
                });
                // setUsers é o método que atualiza o estado do array users
                // users é o estado que contém os dados dos usuários
                setUsers(usersTemp);
            }
        );

        // componentDidUnmount o componete saiu de cena
        // unsubscribe é o método que cancela a escuta da coleção
        // para evitar que o componente fique escutando a coleção mesmo que ele não esteja em cena
        // o retorno da função useEffect é o componentDidUnmount
        return () => unsubscribe;
    }, [])

    return (
        <View style={{ ...styles.container, gap: 20 }}>
            <Text>Cadastro do Usuário</Text>
            <ScrollView>
                {
                    // map é um método do array que percorre cada item do array
                    // neste caso o item é o user que é um objeto com os dados do usuário
                    // o retorno do map é um array de componentes do React
                    users.map((user) => (
                        // key é um atributo obrigatório do React
                        <View key={user.id} style={styles.fullWidth}>
                            <Text style={styles.fullWidth}>{user.nome}</Text>
                            <Text style={styles.fullWidth}>{user.email}</Text>
                        </View>
                    ))

                }
            </ScrollView>

            <TextInput
                label="Nome"
                mode="outlined"
                value={nome}
                style={styles.fullWidth}
                onChangeText={setNome}
            />
            <TextInput
                label="Email"
                mode="outlined"
                style={styles.fullWidth}
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