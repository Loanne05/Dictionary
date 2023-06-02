import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { TextInput } from 'react-native';
import { StatusBar } from 'react-native';

import * as Speech from "expo-speech";

export default function App() {
  const [newWord, setNewWord] = useState("") //store the words the user entered in the textInput
  const [checkedWord, setCheckedWord] = useState("")
  const [definition, setDefinition] = useState("")
  const [example, setExample] = useState("")
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;

  const searchWord = (enteredWord) => {
    setNewWord(enteredWord)
  }

  const getInfo = () => {
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word
        setCheckedWord(word);

        var def = response[0].meanings[0].definitions[0].definition;
        setDefinition(def)

        var eg = response[0].meanings[0].definitions[0].example;
        setExample(eg)
      })
  }
  const speak=()=>{
    Speech.speak(checkedWord)
  }

  const clear=()=>{
    setCheckedWord("");
    setDefinition("");
    setExample("");
    setNewWord("");;
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style={'auto'} />
      <View
        style={{ alignItems: 'center', }}
      >
        <TextInput
          style={styles.inputbox}
          placeholder='Search a word'
          placeholderTextColor='gray'
          clearButtonMode='always'
          onChangeText={searchWord}
          value={newWord}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '80%',
            marginVertical: 10,
            alignItems: 'center'
          }}
        >

          <TouchableOpacity
            onPress={() => {
              getInfo()
            }}
          >
            <Text style={styles.goButton}>
              Go
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{
              clear()
            }}
          >
            <Text style={styles.clearButton}>
              Clear
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{
              speak()
            }}
          >
            <Image
              source={require('./assets/audio.png')}
              style={styles.speakerButton}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dictcontainer} >
          <Text>
            Entered Word: {checkedWord}
          </Text>
            
          <Text>
            Definition: {definition}
          </Text>

          <Text>
            Example: {example}
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputbox: {
    backgroundColor: 'white',
    width: "80%",
    height: 50,
    borderWidth: 3,
    borderColor: 'gray',
    marginTop: 100,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  },
  speakerButton: {
    width: 50,
    height: 50,
    backgroundColor: 'pink'
  },
  goButton: {
    backgroundColor: 'gray',
    width: 100,
    height: 50,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  clearButton: {
    backgroundColor: 'lavender',
    width: 100,
    height: 50,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  dictcontainer:{
    marginVertical: 30,
    paddingHorizontal: 30
  }
});

//calculator
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//  export default function App() {
//   const [result, setResult] = useState('');

//   const handleButtonPress = (text) => {
//     setResult(result + text);
//   };

//   const calculateResult = () => {
//     setResult(eval(result));
//   };

//   const clearResult = () => {
//     setResult('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.result}>{result}</Text>
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('1')}
//         >
//           <Text style={styles.buttonText}>1</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('2')}
//         >
//           <Text style={styles.buttonText}>2</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('3')}
//         >
//           <Text style={styles.buttonText}>3</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('+')}
//         >
//           <Text style={styles.buttonText}>+</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('4')}
//         >
//           <Text style={styles.buttonText}>4</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('5')}
//         >
//           <Text style={styles.buttonText}>5</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('6')}
//         >
//           <Text style={styles.buttonText}>6</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('-')}
//         >
//           <Text style={styles.buttonText}>-</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('7')}
//         >
//           <Text style={styles.buttonText}>7</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('8')}
//         >
//           <Text style={styles.buttonText}>8</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('9')}
//         >
//           <Text style={styles.buttonText}>9</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('*')}
//         >
//           <Text style={styles.buttonText}>*</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('0')}
//         >
//           <Text style={styles.buttonText}>0</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={clearResult}
//         >
//           <Text style={styles.buttonText}>C</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={calculateResult}
//         >
//           <Text style={styles.buttonText}>=</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handleButtonPress('/')}
//         >
//                     <Text style={styles.buttonText}>/</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   result: {
//     fontSize: 30,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   button: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 20,
//     backgroundColor: '#DDDDDD',
//     margin: 1,
//   },
//   buttonText: {
//     fontSize: 20,
//   },
// });


