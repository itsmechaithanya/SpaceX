// screens/LaunchListScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountdownTimer from '../components/CountdownTimer';

const windowWidth = Dimensions.get('window').width;

export default function LaunchListScreen({ navigation }) {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false); // Toggles filter buttons

  useEffect(() => {
    fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/launches');
      setLaunches(response.data);
      await AsyncStorage.setItem('launches', JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      const cachedData = await AsyncStorage.getItem('launches');
      if (cachedData) {
        setLaunches(JSON.parse(cachedData));
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  const filterLaunches = () => {
    const now = new Date();
    let filtered = launches;
    if (filter === 'upcoming') {
      filtered = filtered.filter(launch => new Date(launch.date_utc) > now);
    } else if (filter === 'past') {
      filtered = filtered.filter(launch => new Date(launch.date_utc) <= now);
    }
    if (searchText) {
      filtered = filtered.filter(launch =>
        launch.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return filtered;
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render each launch item as a card with image on top, text below
  const renderLaunchItem = ({ item }) => {
    const isUpcoming = new Date(item.date_utc) > new Date();

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('LaunchDetails', { launch: item })}
      >
        {/* Mission Patch Image (if available) */}
        {item.links?.patch?.small ? (
          <Image
            source={{ uri: item.links.patch.small }}
            style={styles.cardImage}
          />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}

        {/* Launch Info */}
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>
          Date: {new Date(item.date_utc).toLocaleDateString()}
        </Text>
        <Text style={styles.cardSubtitle}>
          Status:{' '}
          {item.success === null
            ? 'Upcoming'
            : item.success
            ? 'Success'
            : 'Failed'}
        </Text>

        {/* Countdown if upcoming */}
        {isUpcoming && <CountdownTimer targetDate={new Date(item.date_utc)} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        placeholder="Search by mission name"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />

      {/* Filter/Clear Button */}
      <View style={styles.filterToggleContainer}>
        <TouchableOpacity
          style={styles.filterToggleButton}
          onPress={() => {
            if (filter !== 'all') {
              // Clear filter if active
              setFilter('all');
            } else {
              // Toggle filter buttons
              setShowFilters(!showFilters);
            }
          }}
        >
          <Text style={styles.filterToggleButtonText}>
            {filter !== 'all' ? 'Clear' : 'Filter'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      {showFilters && (
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              setFilter('all');
              setShowFilters(false);
            }}
          >
            <Text style={styles.filterButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              setFilter('upcoming');
              setShowFilters(false);
            }}
          >
            <Text style={styles.filterButtonText}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              setFilter('past');
              setShowFilters(false);
            }}
          >
            <Text style={styles.filterButtonText}>Past</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Two-Column Grid */}
      <FlatList
        data={filterLaunches()}
        keyExtractor={(item) => item.id}
        numColumns={2}                         // 2 columns
        columnWrapperStyle={styles.columnWrapper} // space between columns
        renderItem={renderLaunchItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Loading screen
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Main container
  container: {
    flex: 1,
    padding: 12,
  },

  // Search bar
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginBottom: 12,
    borderRadius: 10,
  },

  // Filter toggle container
  filterToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  filterToggleButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  filterToggleButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  // Filter row
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  // 2-column layout
  columnWrapper: {
    justifyContent: 'space-between',  // space between columns
    marginBottom: 16,                 // space between rows
  },

  // Card styling
  card: {
    width: '48%',           // about half the screen (2 columns)
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    // optional shadow
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    objectFit: 'cover',
    height: 200,
    borderRadius: 5,
    marginBottom: 8,
  },
  noImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: '#666',
  },

  // Text in the card
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});
