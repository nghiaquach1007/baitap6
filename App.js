import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Hàm xử lý định dạng số điện thoại
  const formatPhoneNumber = (number) => {
    // Xóa các ký tự không phải số
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return number;
  };

  // Hàm kiểm tra tính hợp lệ của số điện thoại
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/; // Định dạng hợp lệ 123-456-789
    return phoneRegex.test(number);
  };

  // Xử lý khi người dùng nhấn nút Tiếp tục
  const handleContinue = () => {
    if (validatePhoneNumber(phoneNumber)) {
      // Nếu số điện thoại hợp lệ
      setErrorMessage('');
      console.log('Phone number:', phoneNumber);
      // Điều hướng hoặc gửi OTP
    } else {
      // Nếu số điện thoại không hợp lệ
      setErrorMessage('Số điện thoại không hợp lệ. Vui lòng nhập số theo định dạng 123-456-789');
    }
  };

  // Hàm xử lý khi nhập số điện thoại
  const handlePhoneNumberChange = (input) => {
    const formattedPhoneNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.subtitle}>Nhập số điện thoại</Text>
      <Text style={styles.description}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>

      {/* Input cho số điện thoại */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Nhập số điện thoại của bạn"
        onChangeText={handlePhoneNumberChange}
        value={phoneNumber}
        maxLength={11} // Độ dài tối đa bao gồm các dấu gạch ngang
      />

      {/* Thông báo lỗi */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Nút tiếp tục */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
