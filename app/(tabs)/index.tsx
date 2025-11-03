import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Page() {
  const [display, setDisplay] = useState('');

  const handlePress = (value: string) => {
    if (value === 'C') {
      setDisplay('');
    } else if (value === '=') {
      try {
        // Substitui × e ÷ por * e / para avaliação
        const result = eval(display.replace(/×/g, '*').replace(/÷/g, '/'));
        setDisplay(String(result));
      } catch {
        setDisplay('Erro');
      }
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = [
    ['C', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display || '0'}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  btn === '=' ? styles.equalsButton : btn === 'C' ? styles.clearButton : null,
                ]}
                onPress={() => handlePress(btn)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    btn === '=' ? styles.equalsButtonText : btn === 'C' ? styles.clearButtonText : null,
                  ]}
                >
                  {btn}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    fontSize: 48,
    color: 'white',
  },
  buttonsContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#333',
    flex: 1,
    marginHorizontal: 5,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 28,
    color: 'white',
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  equalsButton: {
    backgroundColor: '#4CAF50',
  },
  equalsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
