import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import helper from '../helper'
const Category = () => {
  const navigation = useNavigation()
  const [category, setCategory] = useState([])

  useEffect(() => {
    getCategory();
  }, [])

  const getCategory = async () => {
    const categoryData = await helper.fetchCategoriesData();
    setCategory(categoryData)
  }

  const backgroundColors = ['#c9ddf3', '#c5eaea', '#e4e3e3', '#f6e1c2', '#f6e1c2'];
  return (
    <View className="mt-4">
      {category.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{ backgroundColor: backgroundColors[index % backgroundColors.length], }}
          className="flex-row h-[180] bg-slate-200 px-3 my-1 rounded-xl "
          onPress={() => {
            navigation.navigate('item-list', { category: item.name })
          }}
        >
          <Text className="text-[24px] p-6 font-semibold">{item.name}</Text>
          <Image className="absolute right-0 h-full w-[170px] object-cover object-center rounded-r-xl rounded-bl-[100px] rounded-tl-[30px]" source={{ uri: item.img_url }} />
        </TouchableOpacity>
      ))}
    </View>
  )
}
export default Category