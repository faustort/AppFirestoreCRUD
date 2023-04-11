import { View } from "react-native";
import { TextInput } from "react-native-paper";



export default function BuscarUsuarioScreen() {


    return (
        <View>
            <Text>Buscar Usuario</Text>
            <TextInput
                label="Buscar Usuario"
                mode="outlined"
                style={{ margin: 10 }}
            />
            

        </View>
    )
}