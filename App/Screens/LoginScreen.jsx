import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const signIn = async () => {
        try {
            if (!email || !password) {
                setError("Email and password are required.")
                return;
            }
            const response = await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error);
            setError('Check your email and password')
        }
    }
    return (
        <View className="bg-black">
            <View className=" bg-black p-6">
                <View className="flex-row justify-start">
                    <TouchableOpacity className="flex items-center justify-center w-[40px] h-[30px] rounded-tr-xl rounded-bl-xl bg-white mt-2" onPress={() => { navigation.goBack() }} >
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center h-[140px] items-center">
                    <View className="w-[70px] aspect-square bg-white rounded-b-xl rounded-tl-xl flex-row justify-center items-center">
                        <View className="w-[30px] aspect-square bg-black rounded-t-full rounded-br-full"></View>
                    </View>
                </View>
            </View>
            <View className="w-full h-full bg-white p-6 rounded-tl-[80]">
                <Text className="text-center text-[25px] font-semibold text-gray-700">Login</Text>
                <View className="mt-3">
                    <View className="my-2">
                        <Text className="text-gray-600 font-medium">Email Address</Text>
                        <TextInput
                            className="h-[45px] w-full border border-gray-400 rounded-md pl-2 mt-1"
                            placeholder='Email address'
                            onChangeText={(value) => { setEmail(value) }}
                        />
                    </View>
                    <View className="my-2">
                        <Text className="text-gray-600 font-medium">Password</Text>
                        <TextInput
                            className="h-[45px] w-full border border-gray-400 rounded-md pl-2 mt-1"
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(value) => { setPassword(value) }}
                        />
                    </View>
                    {error && <Text style={{ color: 'red' }}>{error}</Text>}
                </View>
                <View className="w-full flex-row justify-end">
                    <TouchableOpacity
                        className="mb-3"
                        onPress={()=>{navigation.navigate("UpdatePassWord")}}
                    >
                        <Text className="text-gray-500">Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    className="w-full h-[45px] bg-black items-center justify-center rounded-md"
                    onPress={() => { signIn() }}
                >
                    <Text className="text-white font-medium">Login</Text>
                </TouchableOpacity>
                <View className="flex-row justify-center mt-4">
                    <Text className="text-[15px] text-gray-500">New to Draco?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="text-[15px] ml-1">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;
