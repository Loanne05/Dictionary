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