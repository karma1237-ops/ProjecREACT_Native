import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/Styles";
import { UserContext } from "../Context/Context";
import { useContext } from "react";
import { Ionicons } from '@expo/vector-icons';

const ProfilScreen = ({ navigation, favoris }) => {
    const { user, panier, logout } = useContext(UserContext);
    
    // Statistiques simples
    const totalPanier = panier.reduce((acc, item) => acc + (item.prix || 0) * (item.quantite || 1), 0);
    const nombreArticles = panier.reduce((s, i) => s + (i.quantite || 1), 0);

    const handleDeconnexion = () => {
        Alert.alert(
            "Déconnexion",
            "Êtes-vous sûr de vouloir vous déconnecter ?",
            [
                { text: "Annuler", style: "cancel" },
                { 
                    text: "Se déconnecter", 
                    style: "destructive",
                    onPress: () => {
                        logout();
                        navigation.navigate("HomeScreen");
                    }
                }
            ]
        );
    };

    // Menu principal simplifié
    const menuItems = [
        {
            title: "Mes commandes",
            icon: "receipt-outline",
            color: "#3498db",
            onPress: () => navigation.navigate("HomeScreen")
        },
        {
            title: "Mes favoris",
            icon: "heart-outline",
            color: "#e74c3c",
            badge: favoris?.length || 0,
            onPress: () => navigation.navigate("Favoris")
        },
        {
            title: "Adresses",
            icon: "location-outline",
            color: "#2ecc71",
            onPress: () => navigation.navigate("HomeScreen")
        },
        {
            title: "Paiements",
            icon: "card-outline",
            color: "#f39c12",
            onPress: () => navigation.navigate("HomeScreen")
        },
        {
            title: "Paramètres",
            icon: "settings-outline",
            color: "#7f8c8d",
            onPress: () => navigation.navigate("Parametres")
        }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            {/* En-tête profil */}
            <View style={styles.profileHeader}>
                <View style={styles.profileInfo}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.prenom?.charAt(0) || 'U'}
                        </Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>
                            {user?.prenom} {user?.nom}
                        </Text>
                        <Text style={styles.userEmail}>{user?.email}</Text>
                    </View>
                </View>
                
                {/* Stats simples */}
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{nombreArticles}</Text>
                        <Text style={styles.statLabel}>Panier</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{favoris?.length || 0}</Text>
                        <Text style={styles.statLabel}>Favoris</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{panier.length}</Text>
                        <Text style={styles.statLabel}>Articles</Text>
                    </View>
                </View>
            </View>

            {/* Panier résumé (si articles) */}
            {panier.length > 0 && (
                <TouchableOpacity 
                    style={styles.cartPreview}
                    onPress={() => navigation.navigate("Panier")}
                >
                    <View style={styles.cartInfo}>
                        <Ionicons name="cart-outline" size={20} color="#1c5be4ff" />
                        <Text style={styles.cartText}>
                            {nombreArticles} article{nombreArticles > 1 ? 's' : ''} • {totalPanier.toFixed(2)} €
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
            )}

            {/* Menu principal */}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>Mon compte</Text>
                    
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={item.onPress}
                        >
                            <View style={styles.menuLeft}>
                                <Ionicons name={item.icon} size={22} color={item.color} />
                                <Text style={styles.menuText}>{item.title}</Text>
                            </View>
                            <View style={styles.menuRight}>
                                {item.badge > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{item.badge}</Text>
                                    </View>
                                )}
                                <Ionicons name="chevron-forward" size={18} color="#ccc" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bouton déconnexion */}
                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={handleDeconnexion}
                >
                    <Ionicons name="log-out-outline" size={22} color="#e74c3c" />
                    <Text style={styles.logoutText}>Se déconnecter</Text>
                </TouchableOpacity>

                {/* Version */}
                <View style={styles.version}>
                    <Text style={styles.versionText}>TechStore v1.0.0</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default ProfilScreen;

