import React, { useState } from 'react';
import { KeyboardTypeOptions, TextInput, Text, View, StyleSheet, Pressable } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import Moment from "moment";

interface InputCustomProps {
    placeholder?: string;
    //value: string | number;
    value: string;
    onChangeDateCallBack: (date: string) => void;
    error?: boolean;
    errorDetails?: string;
}

export const InputDatePickerCustom: React.FC<InputCustomProps> = ({
    placeholder,
    value,
    onChangeDateCallBack,
    error = false,
    errorDetails,
}) => {

    
    // DATE PICKER
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const [date, setDate] = useState<string | undefined>('');
    const onsubmit = (date: Date) => {
        setDatePickerVisibility(false);
        console.log( Moment(date).format("DD/MM/YYYY") );
        setDate(Moment(date).format("DD/MM/YYYY"))
        onChangeDateCallBack(Moment(date).format("DD/MM/YYYY"));
    }

    return (
        <View>
            <TextInput
                style={[styles.inputBase, error ? styles.inputError : styles.input]}
                placeholder={placeholder}
                value={date}
                onChangeText={onChangeDateCallBack}
                editable={false}
            />
            <Pressable onPress={() => { showDatePicker() }} style={styles.icon}>
                <Icon name="calendar" size={35} color="#ccc" />
            </Pressable>
            {isDatePickerVisible && <DateTimePicker
                mode="date"
                value={new Date()}
                onChange={(event, date) => {
                    if (date !== undefined) {
                        onsubmit(date)
                    }
                }}
                dateFormat="day month year"
            />}
            {!!errorDetails && (
                <Text style={styles.txtError}>{errorDetails}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputBase: {
        marginTop: 30,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    input: {
        borderWidth: 0,
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#ac0000',
    },
    txtError: {
      color: '#ac0000',
    },
    icon: {
        position: "absolute",
        right: 10,
        top: 40,
    },
});
