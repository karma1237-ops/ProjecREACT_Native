import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import styles from "../styles/Styles";
import { useContext, useCallback, useMemo } from "react";
import { UserContext } from "../Context/Context";

const PanierScreen = () => {
	// Accès au context
	const { panier, setPanier } = useContext(UserContext);

	// Ajouter un article (ou augmenter sa quantité)
	const ajouterAuPanier = useCallback(
		(article) => {
			setPanier((prev) => {
				// 1. Vérifier si l'article existe déjà
				const existe = prev.find((item) => item._id === article._id);
				if (existe) {
					// 2. Si OUI : augmenter la quantité de 1
					return prev.map((item) => (item._id === article._id ? { ...item, quantite: (item.quantite || 1) + 1 } : item));
				} else {
					// 3. Si NON : ajouter nouvel article avec quantité 1
					return [...prev, { ...article, quantite: 1 }];
				}
			});
		},
		[setPanier]
	);

	// Supprimer un article (ou diminuer sa quantité)
	const supprimerDuPanier = (id) => {
		setPanier((prev) => {
			// 1. Diminuer la quantité de 1 pour l'article ciblé
			return (
				prev
					.map((item) => (item._id === id ? { ...item, quantite: (item.quantite || 1) - 1 } : item))
					// 2. Filtrer pour garder seulement les articles avec quantite > 0
					.filter((item) => (item.quantite || 0) > 0)
			);
		});
	};

	// Vider entièrement le panier avec confirmation avant
	const viderLePanier = () => {
		Alert.alert("Confirmation", "Voulez-vous vraiment vider le panier ?", [
			{ text: "Annuler", style: "cancel" },
			{
				text: "Oui, je confirme",
				style: "destructive",
				onPress: () => setPanier([]),
			},
		]);
	};

	// Calculer le total du panier
	const totalPanier = useMemo(() => {
		return panier.reduce(
			(acc, item) => acc + item.Price * (item.quantite || 1),
			0
		);
	}, [panier]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>🛒 Mon Panier</Text>

			<FlatList
				data={panier}
				keyExtractor={(item, index) => item._id + "-" + index}
				renderItem={({ item }) => (
					<View style={[styles.itemContainer, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
						<Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.image} />
						<View style={styles.info}>
							<Text style={styles.nom}>{item.Name}</Text>
							<Text>{item.Price}€</Text>
						</View>

						<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
							<TouchableOpacity
								onPress={() => supprimerDuPanier(item._id)}
								style={{
									backgroundColor: "#e74c3c",
									width: 33,
									height: 33,
									borderRadius: 18,
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 5,
								}}
							>
								<Text style={{ color: "white", fontSize: 25 }}>−</Text>
							</TouchableOpacity>

							<Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.quantite || 1}</Text>

							<TouchableOpacity
								onPress={() => ajouterAuPanier(item)}
								style={{
									backgroundColor: "#1ed354ff",
									width: 33,
									height: 33,
									borderRadius: 18,
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 5,
								}}
							>
								<Text style={{ color: "white", fontSize: 25 }}>+</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
				contentContainerStyle={styles.list}
			/>

			{/* Total */}
			{panier.length > 0 && (
				<View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 20 }}>
					<TouchableOpacity onPress={viderLePanier}>
						<Text style={{ color: "red", fontWeight: "bold", fontSize: 18, marginTop: 10 }}>Vider le panier</Text>
					</TouchableOpacity>
					<Text style={{ fontWeight: "bold", fontSize: 18 }}>Total : {totalPanier.toFixed(2)} €</Text>
				</View>
			)}
		</View>
	);
};

export default PanierScreen;