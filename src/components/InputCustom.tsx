import React from 'react';
import { KeyboardTypeOptions, TextInput, Text, View, StyleSheet } from 'react-native';

interface InputCustomProps {
    placeholder?: string;
    value: string;
    password?: boolean;
    keyboard?: KeyboardTypeOptions;
    onChangeText: (value: string) => void;
    onBlur?: () => void;
    error?: boolean;
    errorDetails?: string;
}

export const InputCustom: React.FC<InputCustomProps> = ({
    placeholder,
    value,
    password,
    keyboard = 'default',
    onChangeText,
    onBlur,
    error = false,
    errorDetails,
}) => {
    return (
        <View>
            <TextInput
                style={[styles.inputBase, error ? styles.inputError : styles.input]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                secureTextEntry={password}
                keyboardType={keyboard}
            />
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
    }
});
