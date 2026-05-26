import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

interface PokemonDetail {
    name: string;
    url: string;
    id: number;
    hp?: number;
    attack?: number;
    defense?: number;
    speed?: number;
}

const Home = () => {
    const [pokemon, setPokemon] = useState<PokemonDetail[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchPokemonList();
    }, []);

    const fetchPokemonList = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=50");
            const data = await response.json();
            
            // Fetch details for each pokemon to get stats
            const detailedPokemon = await Promise.all(
                data.results.map(async (item: any) => {
                    const match = item.url.match(/\/pokemon\/(\d+)\/?$/);
                    const id = match ? parseInt(match[1]) : null;
                    
                    try {
                        const detailResponse = await fetch(item.url);
                        const detailData = await detailResponse.json();
                        
                        return {
                            name: item.name,
                            url: item.url,
                            id,
                            hp: detailData.stats[0]?.base_stat || 0,
                            attack: detailData.stats[1]?.base_stat || 0,
                            defense: detailData.stats[2]?.base_stat || 0,
                            speed: detailData.stats[5]?.base_stat || 0,
                        };
                    } catch (error) {
                        console.error(`Error fetching details for ${item.name}:`, error);
                        return { name: item.name, url: item.url, id };
                    }
                })
            );
            
            setPokemon(detailedPokemon);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getPokemonImage = (id: number | null) => {
        return id
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            : undefined;
    };
    
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Pokédex</Text>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.list}>
        {pokemon.map((item, index) => (
            <TouchableOpacity 
                key={index} 
                style={styles.pokemonCard}
                onPress={() => router.push(`/pokemon/${item.id}`)}
            >
                <View style={styles.cardContent}>
                    <Image
                        source={{ uri: getPokemonImage(item.id) }}
                        style={styles.pokemonImage}
                        resizeMode="contain"
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.pokemonName}>{item.name}</Text>
                        <View style={styles.statsContainer}>
                            <View style={styles.statRow}>
                                <Text style={styles.statLabel}>HP:</Text>
                                <Text style={styles.statValue}>{item.hp || '-'}</Text>
                            </View>
                            <View style={styles.statRow}>
                                <Text style={styles.statLabel}>ATK:</Text>
                                <Text style={styles.statValue}>{item.attack || '-'}</Text>
                            </View>
                            <View style={styles.statRow}>
                                <Text style={styles.statLabel}>DEF:</Text>
                                <Text style={styles.statValue}>{item.defense || '-'}</Text>
                            </View>
                            <View style={styles.statRow}>
                                <Text style={styles.statLabel}>SPD:</Text>
                                <Text style={styles.statValue}>{item.speed || '-'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    list: {
        paddingBottom: 20,
    },
    pokemonCard: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        borderRadius: 8,
        marginBottom: 8,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    pokemonImage: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    pokemonName: {
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'capitalize',
        marginBottom: 8,
        color: "#333",
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        minWidth: '45%',
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        width: 35,
    },
    statValue: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
})