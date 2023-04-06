import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';

const AppPicker = ({ data = [{title : "Title 1" , value : 't1' }],value ,onBlur=()=>{},onChange=()=>{}, placeholder = "", ...rest }) => {
    const [selectedIndex, setSelectedIndex] = React.useState();
    useEffect(()=>{
        if(value){
            data.map((item,i)=>{
                if(item.value == value){
                    console.log({row : i});
                    setSelectedIndex(new IndexPath(i))
                }
            })
        }
    },[])
    return (
        <Select
            selectedIndex={selectedIndex}
            value={selectedIndex ? data[selectedIndex.row].title : ""}
            placeholder={() => <Text appearance='hint' style={{ paddingLeft: 10 }} >{ (data.length == 0) ? "No data.." :placeholder}</Text>}
            onSelect={index =>{setSelectedIndex(index); onChange(data[index.row].value);}}
            onBlur={onBlur}
            {...rest}
            >
            {
                data.map((item, i) => (
                    <SelectItem  title={()=> <Text>{item.title}</Text>} key={i}  />
                ))
            }

        </Select>
    )
}

export default AppPicker

const styles = StyleSheet.create({})