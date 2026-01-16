import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../Context/Context";
import MainDrawerNavigator from "./MainDrawerNavigator"; // Import du Drawer principal
import CatalogueScreen from "../Screens/CatalogueScreen"; // Import de l'écran Catalogue
import FavorisScreen from "../Screens/FavorisScreen"; // Import de l'écran Favoris
import ProfilScreen from "../Screens/ProfilScreen"; // Import de l'écran Profil
import PanierScreen from "../Screens/PanierScreen"; // Import de l'écran Panier

const Tab = createBottomTabNavigator();

/**
 * TabNavigator - Navigateur par onglets en bas de l'écran
 * 
 * USE CASE: Fournit une navigation rapide entre les écrans principaux
 * Gère l'affichage conditionnel des onglets selon l'état de connexion
 * 
 * HOOKS UTILISÉS: useContext pour accéder au contexte utilisateur
 * 
 * @returns {JSX.Element} Le navigateur par onglets configuré
 */
const TabNavigator = () => {
  // Récupération des données utilisateur depuis le contexte
  const { user, panier } = useContext(UserContext);
  // Conversion de l'état utilisateur en booléen (true = connecté, false = déconnecté)
  const isLogin = !!user;
  
  // Calcul du nombre total d'articles dans le panier
  const totalArticlesPanier = panier.reduce((total, item) => total + (item.quantite || 1), 0);

  return (
    <Tab.Navigator
      // Configuration des options d'écran pour chaque route/onglet
      screenOptions={({ route }) => ({
        // Fonction pour définir l'icône de chaque onglet
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Attribution des icônes Ionicons selon le nom de l'écran
          if (route.name === "Accueil") {
            iconName = "home"; // Icône maison pour l'accueil
          } else if (route.name === "Catalogue") {
            iconName = "grid"; // Icône grille pour le catalogue
          } else if (route.name === "Panier") {
            iconName = "cart"; // Icône panier
          } else if (route.name === "Favoris") {
            iconName = "star"; // Icône étoile pour les favoris
          } else if (route.name === "Profil") {
            iconName = "person"; // Icône personne pour le profil
          }

          // Retourne l'icône Ionicons avec les propriétés spécifiées
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Style de la barre d'onglets
        tabBarStyle: {
          marginTop: 20, // Marge supérieure pour éviter les superpositions
          height: 60, // Hauteur fixe pour une meilleure ergonomie
          paddingBottom: 8, // Padding en bas pour l'espacement
          paddingTop: 8, // Padding en haut pour l'espacement
        },
        // Style du texte des onglets
        tabBarLabelStyle: {
          fontSize: 12, // Taille de police réduite pour s'adapter
          fontWeight: "500", // Poids de police moyen pour la lisibilité
        },
        // Style des onglets actifs
        tabBarActiveTintColor: "#1c5be4ff", // Couleur bleue pour l'onglet actif
        tabBarInactiveTintColor: "#666", // Couleur grise pour les onglets inactifs
        headerShown: false, // Cache les en-têtes car le Drawer les gère
      })}
    >
      {/* 
        ONGLET 1: Accueil avec Drawer (toujours visible)
        USE CASE: Point d'entrée principal de l'application avec menu latéral complet
        CONTIENT: Paramètres dans le Drawer
      */}
      <Tab.Screen 
        name="Accueil" 
        component={MainDrawerNavigator} // Utilise le Drawer comme composant
        options={{
          tabBarLabel: "Accueil", // Libellé affiché sous l'icône
        }}
      />

      {/* 
        ONGLET 2: Catalogue (toujours visible)
        USE CASE: Navigation directe vers la liste des produits disponibles
      */}
      <Tab.Screen 
        name="Catalogue" 
        component={CatalogueScreen} // Écran Catalogue direct (sans Drawer)
        options={{
          tabBarLabel: "Catalogue", // Libellé affiché sous l'icône
        }}
      />

      {/* 
        ONGLET 3: Panier (toujours visible avec badge)
        USE CASE: Accès rapide au panier d'achat avec indication du nombre d'articles
      */}
      <Tab.Screen 
        name="Panier" 
        component={PanierScreen} // Écran Panier
        options={{
          tabBarLabel: "Panier", // Libellé affiché sous l'icône
          tabBarBadge: totalArticlesPanier > 0 ? totalArticlesPanier : undefined, // Badge avec nombre d'articles
          tabBarBadgeStyle: {
            backgroundColor: "#e74c3c", // Rouge pour le badge
            fontSize: 10,
            minWidth: 18,
            height: 18,
          },
        }}
      />

      {/* 
        BLOCK CONDITIONNEL: Onglets réservés aux utilisateurs CONNECTÉS
        USE CASE: Restriction d'accès aux fonctionnalités authentifiées
        NOTE: Les paramètres sont maintenant dans le Drawer (accessible via l'onglet Accueil)
      */}
      {isLogin && (
        <>
          {/* 
            ONGLET 4: Favoris (uniquement si connecté)
            USE CASE: Accès rapide à la liste des produits favoris
          */}
          <Tab.Screen 
            name="Favoris" 
            component={FavorisScreen} // Écran des favoris
            options={{
              tabBarLabel: "Favoris", // Libellé affiché sous l'icône
            }}
          />

          {/* 
            ONGLET 5: Profil (uniquement si connecté)
            USE CASE: Accès rapide au profil utilisateur
          */}
          <Tab.Screen 
            name="Profil" 
            component={ProfilScreen} // Écran du profil
            options={{
              tabBarLabel: "Profil", // Libellé affiché sous l'icône
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;