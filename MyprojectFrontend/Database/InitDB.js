// Database/InitDB.js
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'myapp.db';
let database = null;

export const InitDB = async () => {
  try {
    console.log('📦 Initialisation de la base de données...');
    
    // Fermer la base existante si elle est ouverte
    if (database) {
      try {
        await database.closeAsync();
      } catch (e) {
        console.log('Base déjà fermée ou erreur de fermeture:', e);
      }
    }
    
    // Ouvrir la base de données
    database = await SQLite.openDatabaseAsync(DB_NAME);
    console.log('✅ Base de données ouverte');
    
    // Activer WAL pour de meilleures performances
    await database.execAsync('PRAGMA journal_mode = WAL;');
    
    // Vérifier si la table existe déjà
    const tableExists = await database.getAllAsync(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='Utilisateur';"
    );
    
    if (tableExists.length === 0) {
      console.log('🔄 Création de la table Utilisateur...');
      
      // Créer la table Utilisateur
      await database.execAsync(`
        CREATE TABLE Utilisateur (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          Nom TEXT NOT NULL,
          Prenom TEXT NOT NULL,
          Email TEXT UNIQUE NOT NULL,
          Tel TEXT,
          Password TEXT NOT NULL,
          CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Créer un index pour l'email
      await database.execAsync(`
        CREATE INDEX idx_utilisateur_email 
        ON Utilisateur(Email);
      `);
      
      console.log('✅ Table et index créés');
    } else {
      console.log('✅ Table Utilisateur existe déjà');
    }

    console.log('✅ Base de données initialisée avec succès');
    return database;
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base:', error);
    console.error('Détails:', error.message);
    throw error;
  }
};

// Fonction pour obtenir l'instance de la base de données
export const getDB = async () => {
  if (!database) {
    database = await InitDB();
  }
  return database;
};

// Fonction pour réinitialiser la base
export const ResetDB = async () => {
  try {
    console.log('🔄 Réinitialisation de la base de données...');
    
    // Fermer la base si elle est ouverte
    if (database) {
      try {
        await database.closeAsync();
      } catch (e) {
        console.log('Erreur lors de la fermeture:', e);
      }
      database = null;
    }
    
    // Supprimer le fichier de base de données
    await SQLite.deleteDatabaseAsync(DB_NAME);
    console.log('🗑️ Base de données supprimée');
    
    // Recréer la base
    return await InitDB();
  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error);
    throw error;
  }
};

