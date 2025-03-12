// screens/RocketDetailsScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function RocketDetailsScreen({ route }) {
  const { rocket } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Name */}
      <Text style={styles.title}>{rocket.name}</Text>

      {/* Display all rocket images */}
      {rocket.flickr_images && rocket.flickr_images.length > 0 ? (
        rocket.flickr_images.map((imgUrl, index) => (
          <Image
            key={index}
            source={{ uri: imgUrl }}
            style={styles.rocketImage}
            resizeMode="cover"
          />
        ))
      ) : (
        <Text style={styles.noImage}>No Images Available</Text>
      )}

      {/* Show more rocket details */}
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Active:</Text> {rocket.active ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>First Flight:</Text> {rocket.first_flight}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Country:</Text> {rocket.country}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Company:</Text> {rocket.company}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Cost per Launch:</Text> ${rocket.cost_per_launch}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Success Rate:</Text> {rocket.success_rate_pct}%
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Stages:</Text> {rocket.stages}
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Boosters:</Text> {rocket.boosters}
      </Text>

      {/* Height, Diameter, Mass */}
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Height:</Text> 
        {rocket.height?.meters} m / {rocket.height?.feet} ft
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Diameter:</Text> 
        {rocket.diameter?.meters} m / {rocket.diameter?.feet} ft
      </Text>
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Mass:</Text> 
        {rocket.mass?.kg} kg / {rocket.mass?.lb} lb
      </Text>

      {/* Wikipedia Link (plain text) */}
      <Text style={styles.field}>
        <Text style={styles.fieldLabel}>Wikipedia:</Text> {rocket.wikipedia}
      </Text>

      {/* Description */}
      <Text style={[styles.field, { marginTop: 12 }]}>
        {rocket.description}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff', // or a dark background if you prefer
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 12,
  },
  rocketImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  noImage: {
    fontStyle: 'italic',
    marginBottom: 12,
  },
  field: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: '#000',
  },
});
