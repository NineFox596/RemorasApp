# RemorasApp

# Pasos para la instalacion correcta del proyecto

npx rn-new RemorasApp --nativewind --yarn  
cd RemorasApp  
yarn  
yarn add expo  
yarn add react@19.1.0  
yarn add react-native@0.81.5  
yarn add expo-status-bar  
yarn add nativewind  
yarn add @react-native-picker/picker  
yarn add react-native-safe-area-context  
yarn add react-native-reanimated  
yarn add react-native-worklets  
yarn add -D @babel/core  
yarn add -D @types/react  
yarn add -D eslint  
yarn add -D eslint-config-expo  
yarn add -D eslint-config-prettier  
yarn add -D prettier  
yarn add -D prettier-plugin-tailwindcss  
yarn add -D tailwindcss  
yarn add -D typescript

Tras creacion de proyecto, crear un archivo .env

Tuve que investigar todas y cada una de las dependencias, porque no me las dejaste expresadas y no soy un adivino -.-
Porfavor, coloca las dependencias que vayas utilizando abajo de las que añadi

# Importante

Crear un archivo .env para la url, y usar EXPO_PUBLIC_API_URL="tu_url".  
Si en algun momento se planea usar mas de una url, el archivo .gitignore pasara a tener las url's correspondientes
Este readme se ira expandiendo con las futuras dependencias que se vayan instalando.
