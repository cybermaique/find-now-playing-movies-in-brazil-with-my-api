import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
// import api from './src/services/api'

let baseURL= 'https://api-filmes-em-cartaz.herokuapp.com/portoalegre'

export default function App() {
  const [state, setState] = useState({
    results: [],
  });

    //puxa dados da pi
    const Filmes = () => {
      axios(baseURL).then(({ data }) => {
        let results = data
        setState(prevState => {
          return { ...prevState, results: results }
        })
      })
    }

    useEffect(() => {
        Filmes()
    }, [])

  return (
    <ScrollView>
        {state.results.map(result => ( //puxa filme pesquisado
          <View key = {result.id}>
            <Image 
              source={{ uri : result.url_capa }}
              style={{
                width: 300,
                height: 300
              }}
              resizeMode = "cover"
            />
            <Text>{result.titulo} {result.media_votos}</Text>
            <Text>{result.descricao}</Text>
          </View>
        ))}
      </ScrollView>
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
