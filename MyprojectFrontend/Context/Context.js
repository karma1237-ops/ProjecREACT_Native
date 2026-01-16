import { createContext, useState, useEffect } from "react";

//Créer un context - une sorte de "zone mémoire partagée"
export const UserContext = createContext();

//Definir le fournisseur du context
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [articles, setArticles] = useState([]);
	const [panier, setPanier] = useState([]);

	// ✅ AJOUT: Charger les articles au démarrage
	useEffect(() => {
		const chargerArticles = async () => {
			try {
				const res = await fetch("http://10.0.2.2:3000/api/produits");
				if (!res.ok) {
					throw new Error("Produits introuvable");
				}

				const data = await res.json();
				setArticles(data);
				console.log("✅ Articles chargés:", data.length);
			} catch (err) {
				console.error("❌ Erreur chargement articles:", err.message);
			}
		};
		chargerArticles();
	}, []); // ← S'exécute une seule fois au démarrage

	// Fonction de connexion
	const login = (userData) => {
		setUser(userData);
	};

	// Fonction de déconnexion
	const logout = () => {
		setUser(null);
		setPanier([]);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				articles,
				setArticles,
				panier,
				setPanier,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};