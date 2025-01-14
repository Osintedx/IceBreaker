import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function MyProfileScreen({ navigation }) {
  const [mainImage, setMainImage] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, 'users', userId));

      if (userDoc.exists()) {
        const data = userDoc.data();
        setMainImage(data.mainImage); // Load the main profile image from Firebase
        setName(data.nickName);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <LinearGradient colors={['#1E90FF', '#87CEFA']} style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Display Main Profile Picture */}
        <Text style={styles.nameText}>{name || 'Your Name'} </Text>
        <View style={styles.imageContainer}>
          {mainImage ? (
            <Image source={{ uri: mainImage }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>No Image Available</Text>
          )}
        </View>

        {/* Profile Actions */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('EditProfile')}>
            <Ionicons name="pencil-outline" size={24} color="#4682B4" />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color="#4682B4" />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
          <Ionicons name="person-circle-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Swipe')}>
          <Ionicons name="heart-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
          <Ionicons name="chatbubbles-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  imagePlaceholder: {
    color: '#aaa',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#4682B4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#005bb5',
    paddingVertical: 25,
    height: 90,
  },
  nameText : {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
});
