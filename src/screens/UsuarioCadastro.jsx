import { View, TouchableOpacity } from "react-native"
import { Button, Dialog, Divider, IconButton, Text, TextInput } from "react-native-paper"
import { useEffect, useState } from "react"
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import styles from "../config/styles"
import { ScrollView } from "react-native-web"

export default function UsuarioCadastro() {
    const [nome, setNome] = useState({ value: "", erro: false })
    const [email, setEmail] = useState({ value: "", erro: false })
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "usuarios"),
            (querySnapshot) => {
                const usersTemp = []
                querySnapshot.forEach((doc) => {
                    usersTemp.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setUsers(usersTemp)
            }
        )

        return () => unsubscribe()
    }, [])

    function showDialog(user) {
        setConfirmDelete(true)
        setUserToDelete(user)
    }

    function hideDialog() {
        setConfirmDelete(false)
        setUserToDelete(null)
    }

    function handleExcluir() {
        deleteDoc(
            doc(db, "usuarios", userToDelete.id)
        )
            .then(() => {
                console.log("Usuário excluído com sucesso")
            })
            .catch((error) => {
                console.log("Erro ao excluir usuário: ", error)
            })
            .finally(() => {
                hideDialog()
            });
    }

    function handleRegister() {
        if (!nome.value) {
            setNome({ value: nome.value, erro: true })
            return
        }
        if (!email.value) {
            setEmail({ value: email.value, erro: true })
            return
        }

        const docRef = addDoc(
            collection(db, "usuarios"),
            {
                nome: nome.value,
                email: email.value
            }
        ).then((docRef) => {
            console.log("Id do usuário: ", docRef.id)
            setNome({ value: "", erro: false })
            setEmail({ value: "", erro: false })
        })
    }

    function handleEditar(user) {
        setSelectedUser(user)
        setNome(user.nome)
        setEmail(user.email)
    }

    function handleUpdate() {
        updateDoc(doc(db, "usuarios", selectedUser.id), {
            nome: nome.value,
            email: email.value
        }).then(() => {
            console.log("Usuário atualizado com sucesso")
            setSelectedUser(null)
            setNome({ value: "", erro: false })
            setEmail({ value: "", erro: false })
        })
    }

    return (
        <View style={{ ...styles.container, gap: 0 }}>
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignSelf: "stretch",
                }}
            >
                <Text style={{ margin: 20 }} variant="bodyLarge">Cadastro do Usuário</Text>
                <ScrollView style={styles.containerInside}>
                    {users.map((user) => (
                        <View
                            key={user.id}
                            style={styles.listBlock}
                        >
                            <View style={{ flexGrow: 1 }}>
                                <Text style={styles.fullWidth}>Nome: {user.nome}</Text>
                                <Text style={styles.fullWidth}>E-mail: {user.email}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <IconButton
                                    icon="pencil"
                                    onPress={() => handleEditar(user)}
                                    color="#5cb85c"
                                />
                                <IconButton
                                    icon="delete"
                                    onPress={() => showDialog(user)}
                                    color="#d9534f"
                                />
                            </View>
                        </View>
                    ))}

                </ScrollView>
            </View>

            <Divider />
            <View
                style={{
                    ...styles.containerInside,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "stretch",
                    justifyContent: "space-between",
                    flexShrink: 0,
                }}
            >
                <TextInput
                    label="Nome"
                    mode="outlined"
                    value={nome.value}
                    onChangeText={(nome) => setNome({ value: nome.value, erro: false })}
                    style={{ ...styles.fullWidth, marginRight: 10 }}
                    // error={nome.erro}
                />
                <TextInput
                    label="E-mail"
                    mode="outlined"
                    value={email.value}
                    onChangeText={(email) => setEmail({ value: email.value, erro: false })}
                    style={styles.fullWidth}
                    // error={email.erro}

                />
                {selectedUser && (
                    <Button mode="contained" onPress={handleUpdate}>
                        Atualizar
                    </Button>
                )}
                {!selectedUser && (
                    <Button mode="contained" onPress={handleRegister}>
                        Cadastrar
                    </Button>
                )}
            </View>

            {/* Aqui inserimos o componente pop up de Dialog */}
            <Dialog
                /* ele é visível somente quando confirmDelete é diferente de false 
                    ou seja, quando o usuário clica na lixeira ele chama a função 
                    function showDialog(user)  que realiza setConfirmDelete(true)
                    e assim o Dialog é exibido
                */
                visible={confirmDelete}
                /*
                    quando o usuário clica em não, a função hideDialog() é chamada
                    que realiza setConfirmDelete(false) e assim o Dialog é escondido
        
                */
                onDismiss={() => setConfirmDelete(false)}
            >
                <Dialog.Title>Confirmação</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">Confirma excluir este usuário?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    {/* 
                        quando o usuário clica em sim, a função handleExcluir() é chamada
                        que realiza a exclusão do usuário e esconde o Dialog
                     */}
                    <Button onPress={() => handleExcluir(selectedUser)}>Sim</Button>
                    {/* 
                        quando o usuário clica em não, a função hideDialog() é chamada
                        que realiza setConfirmDelete(false) e assim o Dialog é escondido
                     */}
                    <Button onPress={() => setConfirmDelete(false)}>Não</Button>
                </Dialog.Actions>
            </Dialog>
        </View>

    );

}

