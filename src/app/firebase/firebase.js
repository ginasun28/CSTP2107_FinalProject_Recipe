const admin = require('firebase-admin');
const serviceAccount = require('../../../serviceAccountKey.json');
const {HttpsProxyAgent} = require('https-proxy-agent');


// Create proxy proxy for proxy server
const proxyAgent = new HttpsProxyAgent(`http://127.0.0.1:49995`);

// Configure HTTP Proxy for Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    httpAgent: proxyAgent,
    // Additional Firebase configuration options
});

// Export Firebase database instance
const db = admin.firestore();
module.exports = db;
