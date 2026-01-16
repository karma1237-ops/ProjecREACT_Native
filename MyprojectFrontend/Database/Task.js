import openDB from "./DB";

export const InsertUser = async (Nom, Prenom, Email, Tel, Password) => {

	// Ouvre la base de données
	const db = await openDB();

	// Insertion d'un nouveau user
	await db.runAsync("INSERT INTO Users (Nom, Prenom, Email, Tel, Password) VALUES (?,?,?,?,?);", [Nom, Prenom, Email, Tel, Password]);
	console.log(`✅ Utilisateur "${Nom} ${Prenom}" ajouté`);
};

// vérifier si l'utilisateur existe dans la BD
export const VerifUser = async (email, password) => {
	const db = await openDB();
	const result = await db.getAllAsync("SELECT * FROM Users WHERE Email = ? AND Password = ?;", [email, password]);
	console.log(`🔍 Vérification utilisateur "${email}"`); // ✅ CORRECTION: déplacé avant le return
	return result.length > 0 ? result[0] : null;
};