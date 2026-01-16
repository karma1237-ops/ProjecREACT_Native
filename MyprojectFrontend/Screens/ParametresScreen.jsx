import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { UserContext } from "../Context/Context"; // Assurez-vous que le chemin est correct

const ParametresScreen = () => {
  const { user, setUser } = useContext(UserContext); // Utilisez setUser pour gérer la déconnexion si disponible
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true); // Exemple de paramètre

  const handleLogout = () => {
    // Logique de déconnexion : réinitialisez l'utilisateur ou appelez une API
    setUser(null); // Exemple : déconnecter l'utilisateur
    // Vous pouvez ajouter une navigation vers l'accueil ou une page de connexion ici si nécessaire
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      {user ? (
        <>
          <Text style={styles.sectionTitle}>Compte</Text>
          <Text>Connecté en tant que : {user.email || "Utilisateur"}</Text>
          
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Déconnexion</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Vous n'êtes pas connecté. Veuillez vous connecter pour accéder à plus d'options.</Text>
      )}

      <Text style={styles.sectionTitle}>Préférences</Text>
      
      <View style={styles.switchContainer}>
        <Text>Activer les notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      {/* Ajoutez d'autres paramètres ici, comme thème sombre/clair, langue, etc. */}
      
      <Text style={styles.sectionTitle}>À propos</Text>
      <Text>Application de vente d'éléments high-tech.</Text>
      <Text>Version : 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1c5be4ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default ParametresScreen;