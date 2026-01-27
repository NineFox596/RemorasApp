# RemorasApp

# Pasos para la instalacion correcta del proyecto

npx rn-new RemorasApp --nativewind --yarn  
cd RemorasApp  
yarn  
yarn add react-native-safe-area-context  
yarn add react-native-tab-view  
yarn add react-navigation  
yarn add @react-navigation/native  
yarn add @react-navigation/native-stack  
yarn add @react-navigation/bottom-tabs  
npx expo install react-native-screens react-native-safe-area-context

Tras creacion de proyecto, crear un archivo .env

# Importante

Crear un archivo .env para la url, y usar EXPO_PUBLIC_API_URL="tu_url".  
Si en algun momento se planea usar mas de una url, el archivo .gitignore pasara a tener las url's correspondientes
Este readme se ira expandiendo con las futuras dependencias que se vayan instalando.
