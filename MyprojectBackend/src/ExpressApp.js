const express = require('express');
const cors = require('cors');
const ArticleRoutes = require('./Routes/Produits');

const app = express();

app.use(cors());
app.use(express.json());

// Dit à Express : "Toutes les routes définies dans ProduitRoutes doivent être accessibles"
app.use('/api/produits', ArticleRoutes);

module.exports = app;