import {Picker, StyleSheet} from "react-native";
import React from "react";

const SimplePicker = ({selectedItem, setSelectedItem, data, style})=> {
    return <Picker
        enabled={!!data.length}
        selectedValue={selectedItem}
        style={style||styles.picker}
        onValueChange={(itemValue) => setSelectedItem(itemValue)}
    >
        {data.map(item=><Picker.Item label={item} value={item} key={item} />)}
    </Picker>
}

const styles = StyleSheet.create({
    picker:{
        height:40,
        width: 200,
    },

});

export default SimplePicker