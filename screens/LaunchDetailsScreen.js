// screens/LaunchDetailsScreen.js
import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';

export default function LaunchDetailsScreen({ route }) {
  const { launch } = route.params;
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some(fav => fav.id === launch.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(launch.id);
    } else {
      addFavorite(launch);
    }
  };

  // Convert dates to readable strings
  const dateUTC = new Date(launch.date_utc).toLocaleString();
  const dateLocal = launch.date_local || 'N/A';
  const isUpcoming = launch.upcoming ? 'Yes' : 'No';

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{launch.name}</Text>
      {/* Patch image if available */}
      {launch.links?.patch?.small && (
        <Image
          source={{ uri: launch.links.patch.small }}
          style={styles.patchImage}
        />
      )}
      {/* Basic info */}
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Flight Number:</Text> {launch.flight_number}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Date (UTC):</Text> {dateUTC}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Date (Local):</Text> {dateLocal}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Upcoming:</Text> {isUpcoming}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Success:</Text>{' '}
        {launch.success === null ? 'Not Applicable' : launch.success ? 'Yes' : 'No'}
      </Text>

      {/* Rocket & Launchpad IDs */}
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Rocket ID:</Text> {launch.rocket}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Launchpad ID:</Text> {launch.launchpad}
      </Text>

      {/* Crew */}
      {launch.crew && launch.crew.length > 0 ? (
        <Text style={styles.field}>
          <Text style={styles.fieldLabel}>Crew:</Text>{' '}
          {launch.crew.join(', ')}
        </Text>
      ) : null}

      {/* Ships */}
      {launch.ships && launch.ships.length > 0 ? (
        <Text style={styles.field}>
          <Text style={styles.fieldLabel}>Ships:</Text>{' '}
          {launch.ships.join(', ')}
        </Text>
      ) : null}

      {/* Payloads */}
      {launch.payloads && launch.payloads.length > 0 ? (
        <Text style={styles.field}>
          <Text style={styles.fieldLabel}>Payloads:</Text>{' '}
          {launch.payloads.join(', ')}
        </Text>
      ) : null}

      {/* Failures */}
      {launch.failures && launch.failures.length > 0 && (
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Failures:</Text>
          {launch.failures.map((failure, index) => (
            <Text key={index} style={styles.failureText}>
              - Time: {failure.time}s, Reason: {failure.reason}
            </Text>
          ))}
        </View>
      )}

      {/* Details */}
      <Text style={[styles.field, styles.details]}>
        <Text style={styles.fieldLabel}>Details:</Text>{' '}
        {launch.details || 'No additional details available.'}
      </Text>

      {/* Favorites Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
          onPress={toggleFavorite}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 12,
  },
  field: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: '#000',
  },
  patchImage: {
    width: 120,
    height: 120,
    marginVertical: 10,
  },
  failureText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 10,
  },
  details: {
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
