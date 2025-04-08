const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Récupération des variables d'environnement (configurables via Heroku ou localement)
const CLIENT_ID = "ataf650dw2v0b5oh4s2sgh7h"; //process.env.CLIENT_ID;
const CLIENT_SECRET = "q1Ig1QQPX4giDUXHyTmnyG5Y"; //process.env.CLIENT_SECRET;
const AUTH_URI = "https://mcjnmn9mfnxq4m36wvmtt59plqg1.auth.marketingcloudapis.com/";   // process.env.AUTH_URI
const REST_URI = "https://mcjnmn9mfnxq4m36wvmtt59plqg1.rest.marketingcloudapis.com/";   // process.env.REST_URI
const DE_KEY = "5FC49EC4-BB94-449D-94FF-170C753F309F";       // Nom ou clé de la Data Extension, ici "SMS_journey" / process.env.DE_KEY

app.use(bodyParser.json());
app.use(express.static("public")); // Pour servir les fichiers statiques (index.html, js, etc.)

// Endpoint exécuté depuis la Custom Activity de Journey Builder
app.post("/execute", async (req, res) => {
  console.log("Requête reçue:", req.body);

  try {
    // Extraction des inArguments transmis par l'activité
    const inArgs = (req.body.inArguments && req.body.inArguments[0]) || {};
    const { email, phone, date } = inArgs;
    
    // Récupération d'un token d'accès via OAuth2
    const tokenResponse = await axios.post(`${AUTH_URI}v2/token`, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials"
    });
    const accessToken = tokenResponse.data.access_token;
    
    // Insertion des données dans la Data Extension (le "rowset" accepte un tableau d'objets)
    await axios.post(
      `${REST_URI}data/v1/customobjectdata/key/${DE_KEY}/rowset`,
      [
        {
          // 'keys' doit contenir la clé primaire de la DE, ici j'utilise 'email'
          keys: {
            email: email
          },
          // 'values' contient les autres champs à remplir
          values: {
            phone: phone,
            date: date
          }
        }
      ],
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    
    console.log("Insertion réussie dans la Data Extension");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      "Erreur lors de l'insertion dans la DE:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Échec de l'insertion dans la Data Extension." });
  }
});

// Vérification de base du fonctionnement du serveur
app.get("/", (req, res) => {
  res.send("Serveur backend pour Custom Activity est opérationnel !");
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});