import RootNavigation from "./src"
import { Provider as NativeProvider } from "react-native-paper"
export default function App() {
  return (
    <NativeProvider>
      <RootNavigation />
    </NativeProvider>
  )
}