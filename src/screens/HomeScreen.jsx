import { View } from "react-native"
import { Text } from "react-native-paper"
import styles from "../config/styles"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../config/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export default function HomeScreen() {
    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        telefone: "",
        uid: ""
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Usuário UID: ", user.uid)
                setUsuario({
                    ...usuario,
                    uid: user.uid,
                })
            } else {
                console.log("Usuário não logado")
            }
        })

    }, [])


    useEffect(() => {
        if (usuario?.uid === "") return

        // Seleciono a coleção de usuários
        const usersRef = collection(db, "usuarios");

        // crio a query para buscar o usuário
        const q = query(usersRef, where("userUID", "==", usuario.uid));
        const querySnapshot = getDocs(q)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();
                    setUsuario({
                        ...usuario,
                        nome: userData.nome,
                        email: userData.email,
                        telefone: userData.telefone

                    })
                } else {
                    console.log("User not found");
                    return null;
                }
            })
    }, [usuario?.uid])



    return (
        <View style={styles.container}>
            <Text>Olá {usuario.nome}</Text>
        </View>
    )
}