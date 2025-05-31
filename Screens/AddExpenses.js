// Screens/AddExpenses.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExpenses({ navigation }) {
  const [category, setCategory] = useState('');
  const [eventName, setEventName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleAddExpense = async () => {
    if (!category || !eventName || !amount) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      category,
      eventName,
      amount,
      date: date.toDateString(),
    };

    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      expenses.push(newExpense);
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));

      Alert.alert('Expense added successfully!');
      navigation.navigate('Expenses');
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to save expense');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Food, Travel"
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Event Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Friend's Birthday"
          value={eventName}
          onChangeText={setEventName}
        />

        <Text style={styles.label}>Amount (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 250"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Date: {date.toDateString()}</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
  <Text style={styles.button}>Pick a Date</Text>
</TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <View style={{ marginTop: 200 }}>
  <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
    <Text style={styles.addButtonText}>Add Expense</Text>
  </TouchableOpacity>
</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor:'#463239',
     color: '#fff',
   
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
     color: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
     color: '#fff',
  },

  button:{
    backgroundColor:'#FAB3A9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:10,
  
  },
});
