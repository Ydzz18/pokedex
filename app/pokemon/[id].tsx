import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface PokemonStats {
    name: string;
    image: string;
    hp: number;
    attack: number;
    defense: number;
    spAtk: number;
    spDef: number;
    speed: number;
    height: number;
    weight: number;
    types: string[];
}

const PokemonDetail = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [pokemon, setPokemon] = useState<PokemonStats | null>(null);
    const [loading, setLoading] = useState(true);
    const pokemonId = parseInt(id as string, 10);

    useEffect(() => {
        fetchPokemonDetails();
    }, [id]);

    const fetchPokemonDetails = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            const data = await response.json();

            setPokemon({
                name: data.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                hp: data.stats[0]?.base_stat || 0,
                attack: data.stats[1]?.base_stat || 0,
                defense: data.stats[2]?.base_stat || 0,
                spAtk: data.stats[3]?.base_stat || 0,
                spDef: data.stats[4]?.base_stat || 0,
                speed: data.stats[5]?.base_stat || 0,
                height: data.height,
                weight: data.weight,
                types: data.types.map((t: any) => t.type.name),
            });
        } catch (error) {
            console.error('Error fetching pokemon details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrevious = () => {
        if (pokemonId > 1) {
            router.push(`/pokemon/${pokemonId - 1}`);
        }
    };

    const handleNext = () => {
        router.push(`/pokemon/${pokemonId + 1}`);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!pokemon) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Pokemon not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Image
                source={{ uri: pokemon.image }}
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.name}>{pokemon.name}</Text>

            <View style={styles.typesContainer}>
                {pokemon.types.map((type, index) => (
                    <View key={index} style={[styles.typeTag, getTypeColor(type)]}>
                        <Text style={styles.typeText}>{type}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.basicInfoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Height:</Text>
                    <Text style={styles.value}>{(pokemon.height / 10).toFixed(1)} m</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Weight:</Text>
                    <Text style={styles.value}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Stats</Text>
            <View style={styles.statsContainer}>
                <StatBar label="HP" value={pokemon.hp} maxValue={255} />
                <StatBar label="Attack" value={pokemon.attack} maxValue={255} />
                <StatBar label="Defense" value={pokemon.defense} maxValue={255} />
                <StatBar label="Sp. Atk" value={pokemon.spAtk} maxValue={255} />
                <StatBar label="Sp. Def" value={pokemon.spDef} maxValue={255} />
                <StatBar label="Speed" value={pokemon.speed} maxValue={255} />
            </View>

            <View style={styles.navigationContainer}>
                <TouchableOpacity
                    style={[styles.navButton, pokemonId === 1 && styles.navButtonDisabled]}
                    onPress={handlePrevious}
                    disabled={pokemonId === 1}
                >
                    <Text style={[styles.navButtonText, pokemonId === 1 && styles.navButtonTextDisabled]}>← Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={handleNext}
                >
                    <Text style={styles.navButtonText}>Next →</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

interface StatBarProps {
    label: string;
    value: number;
    maxValue: number;
}

const StatBar = ({ label, value, maxValue }: StatBarProps) => {
    const percentage = (value / maxValue) * 100;

    return (
        <View style={styles.statItem}>
            <Text style={styles.statLabel}>{label}</Text>
            <View style={styles.barContainer}>
                <View
                    style={[
                        styles.bar,
                        { width: `${percentage}%` },
                    ]}
                />
            </View>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );
};

const getTypeColor = (type: string) => {
    const colors: { [key: string]: any } = {
        normal: { backgroundColor: '#A8A878' },
        fire: { backgroundColor: '#F08030' },
        water: { backgroundColor: '#6890F0' },
        electric: { backgroundColor: '#F8D030' },
        grass: { backgroundColor: '#78C850' },
        ice: { backgroundColor: '#98D8D8' },
        fighting: { backgroundColor: '#C03028' },
        poison: { backgroundColor: '#A040A0' },
        ground: { backgroundColor: '#E0C068' },
        flying: { backgroundColor: '#A890F0' },
        psychic: { backgroundColor: '#F85888' },
        bug: { backgroundColor: '#A8B820' },
        rock: { backgroundColor: '#B8A038' },
        ghost: { backgroundColor: '#705898' },
        dragon: { backgroundColor: '#7038F8' },
        dark: { backgroundColor: '#705848' },
        steel: { backgroundColor: '#B8B8D0' },
        fairy: { backgroundColor: '#EE99AC' },
    };
    return colors[type] || { backgroundColor: '#999' };
};

export default PokemonDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginBottom: 12,
        color: '#333',
    },
    typesContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
    },
    typeTag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    typeText: {
        color: 'white',
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    basicInfoContainer: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 12,
        color: '#333',
        alignSelf: 'flex-start',
        width: '100%',
    },
    statsContainer: {
        width: '100%',
        marginBottom: 30,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    statLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        width: 80,
    },
    barContainer: {
        flex: 1,
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    statValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        minWidth: 40,
        textAlign: 'right',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    navigationContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 30,
        marginBottom: 10,
        width: '100%',
    },
    navButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F08030',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonDisabled: {
        backgroundColor: '#E0E0E0',
    },
    navButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    navButtonTextDisabled: {
        color: '#999',
    },
});
