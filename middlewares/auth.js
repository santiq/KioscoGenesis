const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: env.firebase.clientEmail,
    privateKey: env.firebase.privateKey,
    projectId: env.firebase.projectId,
  }),
  databaseURL: env.firebase.databaseURL,
});

async function isAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    return res.status(401).end();
  } else {
    // validar que el JWT sea correcto
    // llamar a la api de Firebase
    // https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#verifyIdToken
    const decodedToken = await firebaseAdmin.verifyIdToken(authHeader, true);

    const firebaseUser = {
      userId: decodedToken.user_id,
      firebaseId: decodedToken.uid,
      email: decodedToken.email,
    };

    // Buscar Usuario en Firebase

    req.user = firebaseUser;

    return next();
  }
}

module.exports = { 
  isAuth
};