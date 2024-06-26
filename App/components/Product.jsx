import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import helper from '../helper';
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from '../Screens/LoadingScreen';

const Product = ({ data }) => {
    const navigation = useNavigation()
    if (!data || !Object.keys(data).length)
        return <LoadingScreen/>;
    return (
        <View className="m-[-4px]">  
            <View className="flex-row flex-wrap">
                {data.map((item, index) => (
                    <View key={index} className="p-1 w-1/2">
                        <TouchableOpacity
                            className=" w-full p-2 bg-[#f2f3f8] rounded-xl "
                            onPress={() => {
                                navigation.navigate('detail', { detail: item.name })
                            }}
                        >
                            <Image className="h-[180px]" source={{ uri: item.images[0] }} />
                            <Text numberOfLines={1} className="whitespace-nowrap overflow-hidden w-full h-[50px] mt-2 text-[12px] text-gray-700 font-semibold leading-4" >{item.name}</Text>
                            <Text className="p-2 absolute bottom-1 text-[16px] text-gray-800 font-semibold">${helper.convertToFormattedString(item.price)}.00</Text> 
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};
export default Product;
