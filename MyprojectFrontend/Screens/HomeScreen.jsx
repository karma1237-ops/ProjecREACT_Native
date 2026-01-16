import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../Context/Context';

/**
 * HomeScreen - Page d'accueil de l'application de vente High-Tech
 * Affiche les catégories, produits populaires, offres spéciales et avantages
 * @param {Object} navigation - Objet de navigation React Navigation
 * @param {Array} panier - Liste des produits dans le panier
 * @param {Function} setPanier - Fonction pour mettre à jour le panier
 */
const HomeScreen = ({ navigation, panier, setPanier }) => {
  // Récupération du contexte utilisateur pour vérifier si l'utilisateur est connecté
  const { user } = useContext(UserContext);

  // Données des produits High-Tech populaires
  const produitsPopulaires = [
    { 
      id: 1, 
      nom: 'iPhone 15 Pro Max', 
      prix: 1299.99, 
      image: '📱',
      description: 'Dernier smartphone Apple avec puce A17 Pro',
      categorie: 'Smartphones'
    },
    { 
      id: 2, 
      nom: 'AirPods Pro 2', 
      prix: 279.99, 
      image: '🎧',
      description: 'Écouteurs sans fil avec réduction de bruit active',
      categorie: 'Audio'
    },
    { 
      id: 3, 
      nom: 'Apple Watch Series 9', 
      prix: 449.99, 
      image: '⌚',
      description: 'Montre connectée avec suivi santé avancé',
      categorie: 'Montres'
    },
    { 
      id: 4, 
      nom: 'iPad Pro 12.9"', 
      prix: 1099.99, 
      image: '📱',
      description: 'Tablette professionnelle avec puce M2',
      categorie: 'Tablettes'
    },
  ];

  // Catégories principales de produits High-Tech
  const categories = [
    { id: 1, nom: 'Smartphones', icon: 'phone-portrait-outline', couleur: '#4A90E2' },
    { id: 2, nom: 'Audio', icon: 'headset-outline', couleur: '#E94B3C' },
    { id: 3, nom: 'Ordinateurs', icon: 'laptop-outline', couleur: '#50C878' },
    { id: 4, nom: 'Accessoires', icon: 'watch-outline', couleur: '#F39C12' },
  ];

  /**
   * Fonction pour ajouter un produit au panier
   * Vérifie si l'utilisateur est connecté avant d'ajouter
   * @param {Object} produit - Le produit à ajouter au panier
   */
  const ajouterAuPanier = (produit) => {
    // Vérification : l'utilisateur doit être connecté pour ajouter au panier
    if (!user) {
      Alert.alert(
        'Connexion requise',
        'Vous devez être connecté pour ajouter des produits au panier.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Se connecter', onPress: () => navigation.navigate('Connexion') }
        ]
      );
      return;
    }

    // Vérifier si le produit existe déjà dans le panier
    const produitExistant = panier.find(item => item.id === produit.id);

    if (produitExistant) {
      // Si le produit existe déjà, on augmente la quantité
      setPanier(panier.map(item => 
        item.id === produit.id 
          ? { ...item, quantite: item.quantite + 1 }
          : item
      ));
      Alert.alert('✓ Produit ajouté', `Quantité de ${produit.nom} augmentée dans le panier`);
    } else {
      // Sinon, on ajoute le nouveau produit avec quantité = 1
      setPanier([...panier, { ...produit, quantite: 1 }]);
      Alert.alert('✓ Produit ajouté', `${produit.nom} a été ajouté au panier`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Bannière d'accueil avec slogan et appel à l'action */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Bienvenue chez TechStore !</Text>
          <Text style={styles.bannerSubtitle}>
            Découvrez les dernières innovations High-Tech
          </Text>
          <TouchableOpacity 
            style={styles.bannerButton}
            onPress={() => navigation.navigate('Catalogue')}
          >
            <Text style={styles.bannerButtonText}>Voir le catalogue</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.bannerEmoji}>🛍️</Text>
      </View>

      {/* Section Catégories - Permet de filtrer par type de produit */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((categorie) => (
            <TouchableOpacity 
              key={categorie.id} 
              style={[styles.categoryCard, { backgroundColor: categorie.couleur + '20' }]}
              onPress={() => navigation.navigate('Catalogue')}
            >
              <View style={[styles.categoryIconContainer, { backgroundColor: categorie.couleur }]}>
                <Ionicons name={categorie.icon} size={32} color="white" />
              </View>
              <Text style={styles.categoryName}>{categorie.nom}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Section Produits Populaires - Carrousel horizontal des meilleurs ventes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Produits Populaires</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Catalogue')}>
            <Text style={styles.voirPlusText}>Voir plus →</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.produitsScroll}
        >
          {produitsPopulaires.map((produit) => (
            <View key={produit.id} style={styles.produitCard}>
              {/* Image/Emoji du produit */}
              <View style={styles.produitImageContainer}>
                <Text style={styles.produitEmoji}>{produit.image}</Text>
              </View>
              
              {/* Informations du produit */}
              <Text style={styles.produitNom} numberOfLines={2}>{produit.nom}</Text>
              <Text style={styles.produitPrix}>{produit.prix.toFixed(2)} €</Text>
              
              
             
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Section Offres Spéciales - Promotions du moment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Offres Spéciales</Text>
        <View style={styles.offreCard}>
          <View style={styles.offreContent}>
            {/* Badge de réduction */}
            <View style={styles.badgePromo}>
              <Text style={styles.badgePromoText}>-30%</Text>
            </View>
            <Text style={styles.offreTitle}>Soldes High-Tech !</Text>
            <Text style={styles.offreDescription}>
              Profitez de réductions jusqu'à 30% sur une sélection de smartphones, tablettes et accessoires
            </Text>
            <TouchableOpacity 
              style={styles.offreButton}
              onPress={() => navigation.navigate('Catalogue')}
            >
              <Text style={styles.offreButtonText}>Découvrir</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.offreEmoji}>🎁</Text>
        </View>
      </View>

      {/* Section Avantages - Points forts de la boutique */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pourquoi nous choisir ?</Text>
        <View style={styles.avantagesContainer}>
          {/* Paiement sécurisé */}
          <View style={styles.avantageItem}>
            <Ionicons name="shield-checkmark" size={40} color="#1c5be4ff" />
            <Text style={styles.avantageTitle}>Paiement sécurisé</Text>
            <Text style={styles.avantageDesc}>Transactions 100% sécurisées avec SSL</Text>
          </View>
          
          {/* Livraison rapide */}
          <View style={styles.avantageItem}>
            <Ionicons name="rocket" size={40} color="#1c5be4ff" />
            <Text style={styles.avantageTitle}>Livraison rapide</Text>
            <Text style={styles.avantageDesc}>Livraison gratuite sous 48h</Text>
          </View>
          
          {/* Support client */}
          <View style={styles.avantageItem}>
            <Ionicons name="headset" size={40} color="#1c5be4ff" />
            <Text style={styles.avantageTitle}>Support 24/7</Text>
            <Text style={styles.avantageDesc}>Équipe technique à votre écoute</Text>
          </View>
        </View>
      </View>

      {/* Espacement en bas pour éviter que le contenu ne soit coupé */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    backgroundColor: '#1c5be4ff',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
  },
  bannerButtonText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
    fontSize: 16,
  },
  bannerEmoji: {
    fontSize: 60,
    marginLeft: 16,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  voirPlusText: {
    color: '#1c5be4ff',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  produitsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  produitCard: {
    width: 160,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  produitImageContainer: {
    height: 120,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  produitEmoji: {
    fontSize: 48,
  },
  produitNom: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    height: 36,
    textAlign: 'center',
  },
  produitPrix: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c5be4ff',
    marginBottom: 12,
    textAlign: 'center',
  },
 
  offreCard: {
    backgroundColor: '#FFF9E6',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  offreContent: {
    flex: 1,
  },
  badgePromo: {
    backgroundColor: '#E94B3C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgePromoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  offreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  offreDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  offreButton: {
    backgroundColor: '#1c5be4ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  offreButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  offreEmoji: {
    fontSize: 50,
    marginLeft: 16,
  },
  avantagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  avantageItem: {
    width: '31%',
    alignItems: 'center',
    padding: 12,
  },
  avantageTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  avantageDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomSpacer: {
    height: 20,
  },
});

export default HomeScreen;