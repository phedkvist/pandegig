import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'black',
    marginTop: 50,
  },
  menuItem: {
    alignItems: 'center',
    marginTop: 20,
  },
  menuText: {
    color: 'white',
    padding: 10,
    marginBottom: 5,
  },
  menuToggle: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
  },
});

const SettingsMenu = ({ isMenuOpen, onToggleMenu, signOut }) => (isMenuOpen ? (
  <View style={styles.menu}>
    <TouchableOpacity style={styles.menuItem} onPress={onToggleMenu}>
      <Text style={[styles.menuText, styles.menuToggle]}>Close Menu</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuText}>Edit Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.menuItem} onPress={signOut}>
      <Text style={styles.menuText}>Sign Out</Text>
    </TouchableOpacity>
  </View>
) : (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.menuItem} onPress={onToggleMenu}>
        <Text style={[styles.menuText, styles.menuToggle]}>Open Menu</Text>
      </TouchableOpacity>
    </View>
  ));

export default SettingsMenu;
