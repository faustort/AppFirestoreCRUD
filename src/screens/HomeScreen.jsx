import { View } from "react-native"
import { Text } from "react-native-paper"
import styles from "../config/styles"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../config/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export default function HomeScreen() {
    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Usuário UID: ", user.uid)
                setUsuario({ uid: user.uid })
            } else {
                console.log("Usuário não logado")
            }
        })

        return () => { unsub() }
    }, [])

    useEffect(() => {

        // verifica se uid não é vazio
        if (!usuario.uid) return

        // seleciona a coleção usuarios
        const usuariosRef = collection(db, "usuarios"),

        // começa a preparar a busca
        const q = query(
            usuariosRef,
            // define a cláusula where
            where("userUID", "==", usuario.uid)
        )

        // executa a busca
        getDocs(q)
            .then((querySnapshot) => {
                // caso não esteja vazio
                if (!querySnapshot.empty) {
                    // pega o primeiro documento
                    const userData = querySnapshot.docs[0].data()
                    // define o usuário
                    setUsuario(userData)
                    // ou se preferir pode definir assim:
                    setUsuario({
                        nome: userData.nome,
                        telefone: userData.telefone,
                        email: userData.email,
                        uid: userData.userUID
                    })
                } else {
                    console.log("Usuário não encontrado")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [usuario.uid])

    return (
        <View style={styles.container}>
            <Text>Olá {usuario.nome}</Text>
        </View>
    )
}
