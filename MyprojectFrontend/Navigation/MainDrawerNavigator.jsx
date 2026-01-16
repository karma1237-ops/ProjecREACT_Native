import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../Context/Context';
import styles from "../styles/Styles";

// Importez vos écrans
import HomeScreen from '../Screens/HomeScreen';
import FavorisScreen from '../Screens/FavorisScreen';
import ParametresScreen from '../Screens/ParametresScreen';
import ProfilScreen from '../Screens/ProfilScreen';
import CatalogueScreen from '../Screens/CatalogueScreen';
import ConnexionFormScreen from '../Screens/ConnexionFormScreen';
import InscriptionFormScreen from '../Screens/InscriptionFormScreen';

const Drawer = createDrawerNavigator();

/**
 * Composant personnalisé pour le contenu du Drawer
 * Affiche des éléments différents selon si l'utilisateur est connecté ou non
 */
const CustomDrawerContent = (props) => {
  const { user, logout } = useContext(UserContext);
  const isLogin = !!user;

  return (
    <DrawerContentScrollView {...props}>
     
      {/* Éléments de navigation par défaut */}
      <DrawerItemList {...props} />

      {/* Éléments conditionnels selon l'état de connexion */}
      {isLogin && (
        // Éléments pour utilisateur connecté UNIQUEMENT
        <>
          <DrawerItem
            label="Mes Commandes"
            icon={({ color, size }) => <Ionicons name="receipt-outline" size={size} color={color} />}
            onPress={() => {
              props.navigation.navigate('HomeScreen');
            }}
          />
          <DrawerItem
            label="Mes Adresses"
            icon={({ color, size }) => <Ionicons name="location-outline" size={size} color={color} />}
            onPress={() => {
              props.navigation.navigate('HomeScreen');
            }}
          />
          <View style={styles.separator} />
          <DrawerItem
            label="Déconnexion"
            icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color="#E94B3C" />}
            labelStyle={{ color: '#E94B3C' }}
            onPress={() => {
              logout();
              props.navigation.navigate('HomeScreen');
            }}
          />
        </>
      )}

      {/* 
        SUPPRESSION des boutons "Se connecter" et "S'inscrire" du bas du Drawer
        RAISON: Ces écrans sont maintenant dans la liste principale du Drawer
        (accessibles via DrawerItemList)
      */}

      {/* Séparateur et informations */}
      <View style={styles.separator} />
      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
        <Text style={styles.footerText}>TechStore © 2024</Text>
      </View>
    </DrawerContentScrollView>
  );
};

/**
 * DrawerNavigator - Navigateur principal avec Drawer pour toutes les pages
 * Gère l'affichage conditionnel des écrans selon l'état de connexion
 */
const MainDrawerNavigator = () => {
  const { user } = useContext(UserContext);
  const isLogin = !!user;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1c5be4ff',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#1c5be4ff',
        drawerInactiveTintColor: '#666',
        drawerStyle: {
          backgroundColor: '#f8f9fa',
        },
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
        },
      }}
    >
      {/* Écran principal - Toujours accessible */}
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Accueil',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          headerShown: true,
        }}
      />

      {/* ÉCRAN Catalogue - Toujours accessible */}
      <Drawer.Screen
        name="Catalogue"
        component={CatalogueScreen}
        options={{
          title: 'Catalogue',
          drawerIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
          headerShown: true,
        }}
      />

      {/* Écrans accessibles uniquement si connecté */}
      {isLogin && (
        <>
          <Drawer.Screen
            name="Profil"
            component={ProfilScreen}
            options={{
              title: 'Mon Profil',
              drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
              headerShown: true,
            }}
          />
          <Drawer.Screen
            name="Favoris"
            component={FavorisScreen}
            options={{
              title: 'Mes Favoris',
              drawerIcon: ({ color, size }) => <Ionicons name="star-outline" size={size} color={color} />,
              headerShown: true,
            }}
          />
        </>
      )}

      {/* 
        ÉCRANS Connexion/Inscription dans le Drawer - Uniquement si déconnecté 
        Ces écrans apparaîtront dans la liste principale du Drawer
      */}
      {!isLogin && (
        <>
          <Drawer.Screen
            name="Connexion"
            component={ConnexionFormScreen}
            options={{
              title: 'Connexion',
              drawerIcon: ({ color, size }) => <Ionicons name="log-in-outline" size={size} color={color} />,
              headerShown: true,
            }}
          />
          <Drawer.Screen
            name="Inscription"
            component={InscriptionFormScreen}
            options={{
              title: 'Inscription',
              drawerIcon: ({ color, size }) => <Ionicons name="person-add-outline" size={size} color={color} />,
              headerShown: true,
            }}
          />
        </>
      )}

      {/* Écrans accessibles à tous */}
      <Drawer.Screen
        name="Parametres"
        component={ParametresScreen}
        options={{
          title: 'Paramètres',
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          headerShown: true,
        }}
      />

      {/* Écrans supplémentaires (optionnels) */}
      <Drawer.Screen
        name="A propos"
        children={() => (
          <View style={styles.centeredContainer}>
            <Text style={styles.aboutTitle}>À propos de TechStore</Text>
            <Text style={styles.aboutText}>
              TechStore est votre boutique en ligne spécialisée dans les produits High-Tech.
              Nous proposons les dernières innovations technologiques aux meilleurs prix.
            </Text>
          </View>
        )}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />,
          headerShown: true,
        }}
      />

      <Drawer.Screen
        name="Support"
        children={() => (
          <View style={styles.centeredContainer}>
            <Ionicons name="headset" size={80} color="#1c5be4ff" />
            <Text style={styles.aboutTitle}>Support Client</Text>
            <Text style={styles.aboutText}>
              Service client disponible du lundi au vendredi de 9h à 18h.
              {'\n\n'}Email: support@techstore.com
              {'\n'}Téléphone: 01 23 45 67 89
            </Text>
          </View>
        )}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />,
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;