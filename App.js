import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpensesScreen from './Screens/ExpensesScreen';
import AddExpenses from './Screens/AddExpenses';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Expenses" 
          component={ExpensesScreen}
          options={{ headerShown:true}}
        />
        <Stack.Screen 
          name="AddExpenses" 
          component={AddExpenses}
          options={{ title: 'Add New Expense' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
