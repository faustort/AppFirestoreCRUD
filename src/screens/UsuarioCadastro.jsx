import { View } from "react-native"
import { Button, IconButton, Text, TextInput } from "react-native-paper"
import { useEffect, useState } from "react"
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import styles from "../config/styles"
import { ScrollView } from "react-native-web"

export default function UsuarioCadastro() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        // onSnapshot é responsável por escutar as alterações na coleção
        const unsubscribe = onSnapshot(
            // Primeiro parâmetro é a coleção que é a origem dos dados
            collection(db, "usuarios"),
            // Segundo parâmetro é os dados que serão inseridos
            (querySnapshot) => {
                // usersTemp neste caso é um array temporário
                const usersTemp = []
                // forEach é um método do array que percorre cada item do array
                // neste caso o item é o doc que é um objeto com os dados do 
                querySnapshot.forEach((doc) => {
                    usersTemp.push({
                        // ...doc.data() é um operador que recebe todos os dados do objeto pare serem concatenados com outro valor de objeto
                        ...doc.data(),
                        // id é um campo que não existe no objeto doc.data()
                        // por isso é necessário criar um campo id para o objeto
                        id: doc.id
                    })
                })
                // setUsers é o método que atualiza o estado do array users
                setUsers(usersTemp)
            }
        )
        // componentDidUnmount o componete saiu de cena
        // unsubscribe é o método que cancela a escuta da coleção
        // para evitar que o componente fique escutando a coleção mesmo que ele não esteja em cena
        // o retorno da função useEffect é o componentDidUnmount

        return () => unsubscribe()
    }, [])
    async function handleRegister() {
        // inicializa o banco de dados
        // addDoc é responsável pela inserção do dado em uma coleção "Tabela"
        const docRef = await addDoc(
            // Primeiro parâmetro é a coleção que é a origem dos dados
            collection(db, "usuarios"),
            // Segundo parâmetro são os dados a serem inseridos
            // note que obrigatoriamente deve ser um objeto
            {
                nome: nome,
                email: email
            }
        ).then((docRef) => {
            console.log("Id do usuário: ", docRef.id)
            setNome('')
            setEmail('')
        })
    }



    function handleExcluir(user) {
        // deleteDoc é responsável pela exclusão do dado em uma coleção "Tabela"

        deleteDoc(
            doc(db, "usuarios", user.id)
        ).then(() => {
            console.log("Usuário excluído com sucesso")
        })
    }

    function handleEditar(user) {
        setSelectedUser(user)
        setNome(user.nome)
        setEmail(user.email)
    }

    function handleUpdate() {
        updateDoc(doc(db, "usuarios", selectedUser.id), {
            nome: nome,
            email: email
        }).then(() => {
            console.log("Usuário atualizado com sucesso")
            setSelectedUser(null)
            setNome('')
            setEmail('')
        })
    }

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

                        <View key={user.id} style={
                            {
                                ...styles.fullWidth,
                                flexDirection: "row",
                                alignItems: "center",
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#000",
                                paddingHorizontal: 10,
                                marginBottom: 10,
                            }
                        }>
                            <Text style={styles.fullWidth}>{user.nome}</Text>
                            <Text style={styles.fullWidth}>{user.email}</Text>
                            <IconButton
                                icon={selectedUser && selectedUser.id === user.id ? "close" : "pencil"}
                                onPress={() => handleEditar(user)}>Editar</IconButton>
                            <IconButton
                                icon={"trash-can-outline"}
                                onPress={() => handleExcluir(user)}>Excluir</IconButton>
                        </View>
                    ))}
            </ScrollView>

            {selectedUser && (
                <>
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
                    <Button mode="contained" onPress={handleUpdate}>Atualizar Usuário</Button>
                </>
            )}

            {!selectedUser && (
                <>
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
                    <Button mode="contained" onPress={handleRegister}>Cadastrar Usuário</Button>
                </>
            )}
        </View>

    )
}
