import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const pokemonApi = "https://pokeapi.co/api/v2/pokemon?limit=10";

export default function App() {
  const [pokemonList, setPokemonList] = useState();
  const [pokemonDetail, setPokemonDetail] = useState({
    name: "-",
    types: [],
    abilities: [],
    height: "-",
    weight: "-",
    image: "",
  });

  function handleClickDetail(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .then((res) => res.json())
      .then((pokemon) =>
        setPokemonDetail({
          abilities: pokemon.abilities,
          types: pokemon.types,
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          image: pokemon.sprites.front_default,
        })
      )
      .catch((err) => console.error("masuk error", err));
  }

  function fetchFirstData() {
    fetch(pokemonApi)
      .then((res) => res.json())
      .then((item) => setPokemonList(item.results))
      .catch((err) => console.error("masuk error", err));
  }

  useEffect(() => {
    fetchFirstData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.header}>
        <Image
          source={{
            uri: pokemonDetail.image,
          }}
          style={{
            height: 180,
            width: 180,
          }}
          resizeMode="contain"
        />
      </View>
      <View>
        <FlatList
          data={pokemonList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleClickDetail(item.name)}
              style={{
                padding: 10,
                backgroundColor: "#678B83",
                margin: 12,
                marginVertical: 24,
                width: 140,
                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 16, color: "white", fontWeight: 700 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          horizontal
        />
      </View>
      <View style={styles.detailContainer}>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontWeight: "900",
            marginBottom: 40,
          }}
        >
          Pokemon Detail
        </Text>
        <Text style={{ fontSize: 24, margin: 4 }}>
          Name: {pokemonDetail.name}
        </Text>
        <Text style={{ fontSize: 24, margin: 4 }}>
          Type: {pokemonDetail.types.map((item) => item.type.name).join(", ")}
        </Text>
        <Text style={{ fontSize: 24, margin: 4 }}>
          Skills:{" "}
          {pokemonDetail.abilities.map((item) => item.ability.name).join(", ")}
        </Text>
        <Text style={{ fontSize: 24, margin: 4 }}>
          Weight: {pokemonDetail.weight}
        </Text>
        <Text style={{ fontSize: 24, margin: 4 }}>
          height: {pokemonDetail.height}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 300,
    width: "100%",
    backgroundColor: "#678B83",
    borderBottomRightRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    margin: 12,
  },
});
