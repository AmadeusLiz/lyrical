//Importar módulos necesarios
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, Dimensions } from "react-native";
import { Container, Input, Item, H1, Header, Spinner, View } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

//Obtener valores del ancho y alto del dispositivo
const { width, height } = Dimensions.get("window");

//Acces Token de Genius para peticiones
const { apiAccessTokenGenius }=getEnvVars();

//Variable que contiene la pantalla
const SongListScreen = () => {

  //Hook para el estado de las canciones
  const [songs, setSongs] = useState(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const getSongs = async () => {
    //Consulta a API Genius y for para sacar 10 ids de canciones para mostrar en la pantalla principal
    //random de 10 a 2000, luego se sacan 10 canciones desde el numero que salga random en adelante
    let randomIdSong = Math.round(Math.random()*(2000-10)+parseInt(10));
    const randomSongs = []; //arreglo de objetos
    try {
      //Buscamos 10 canciones aleatorias para mostrar en la primera pantalla de la APP
      for (let numero = randomIdSong; numero < (randomIdSong + 10); numero++) {
          randomSongs.push(
          await backend.get(`songs/${numero}?access_token=${apiAccessTokenGenius}`)
        );
      }
      //Se asignan los valores recopilados a nuestra variable song
      randomSongs.forEach(randomSong => {
        setSongs(randomSong.data);
      });
    } catch (error) {
      setError(true);
    }
  }

  //Hook de Efecto
  useEffect (() =>{
    //Efecto secundario, realizar la petición a la API
    getSongs();
  },[]);


  if (!songs) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="#f05454" />
      </View>
    );
  }

  return (
    <Container>
      <Header searchBar backgroundColor="#f05454">
        <Item>
        {/* value="search" onChange={setSearch} */}
          <Input placeholder="¡Busca una canción!" />
          <FontAwesome.Button
            backgroundColor="transparent"
            name="search"
            size={25}
            color="#214252"
          />
        </Item>
      </Header>
      <Image
        source={require("../../assets/lyricalLogoLarge.png")}
        style={styles.lyricalImage}
      />
      <H1>Recomendados hoy</H1>
      <Text>Titulo de la cancion</Text>
      <Text>Artista</Text>
      <Text>Album</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lyricalImage: {
    width: width,
    height: height * 0.33,
    resizeMode: "contain",
  }
});

export default SongListScreen;