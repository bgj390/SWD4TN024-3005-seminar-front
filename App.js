import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const url = 'http://192.168.0.102:3001/allGroceries';
  const [allGroceries, setAllGroceries] = useState([]);
  const valueList = [];

  useEffect(() => {
    let mounted = true;
    const fetchGroceries = async () => {
      try {
        let response = await fetch(url);
        let groceriesJson = await response.json();
        if (mounted) {
          setAllGroceries(groceriesJson);
        }
      } catch (error) {
        console.log("FETCH ERROR", error);
      }
    }
    fetchGroceries();
    setValues();
    return () => {
      mounted = false;
    }
  }, []);

  const calculateValues = (salt, energyKcal, fat, protein, carbohydrate, sugar, fiber) => {
    return salt / energyKcal + fat + protein - carbohydrate + sugar + fiber * 5;
  }

  const setValues = () => {

    for (let item of allGroceries) {
      let value = calculateValues(
        item.salt,
        item.energyKcal,
        item.fat,
        item.protein,
        item.carbohydrate,
        item.sugar,
        item.fiber
      );
      valueList.push(value);
    }
    let sorted = valueList.sort((a, b) => a - b);
    console.log('sorted ', sorted[150]);

    for (let item of allGroceries) {
      if (calculateValues(
        item.salt,
        item.energyKcal,
        item.fat,
        item.protein,
        item.carbohydrate,
        item.sugar,
        item.fiber) === sorted[150]
      ) {
        console.log('matches sorted[150] ', item);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text>Go to localhost:3001</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
