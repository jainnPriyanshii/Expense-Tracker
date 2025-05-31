import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExpensesScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      const parsed = storedExpenses ? JSON.parse(storedExpenses) : [];
      setExpenses(parsed.reverse()); 
    } catch (e) {
      console.log('Error loading expenses:', e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadExpenses);
    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('AddExpenses')}>
  <Text style={styles.buttonText}>Add Expense</Text>
</TouchableOpacity>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}><Text style={styles.label}>Event:</Text> {item.eventName}</Text>
            <Text style={styles.text}><Text style={styles.label}>Category:</Text> {item.category}</Text>
            <Text style={styles.text}><Text style={styles.label}>Amount:</Text> ₹{item.amount}</Text>
            <Text style={styles.text}><Text style={styles.label}>Date:</Text> {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#463239',
    padding: 16,
    flex: 1,
    color:'#fff'
  },
  card: {
    backgroundColor: '#BBA0A9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    
  },
  button:{
    backgroundColor:'#FAB3A9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:10,
  
  },
  label: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});
