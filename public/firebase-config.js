// Firebase Configuration
// Import Firebase modules (via CDN in index.html)

const firebaseConfig = {
  apiKey: "AIzaSyDc0FNYmKztYLpvCdt-lMaIGOJyaq1P-Sk",
  authDomain: "flow7-40e0a.firebaseapp.com",
  projectId: "flow7-40e0a",
  storageBucket: "flow7-40e0a.firebasestorage.app",
  messagingSenderId: "834098968666",
  appId: "1:834098968666:web:8c0cc5da802cbf5f680063",
  measurementId: "G-JL413JZF5K"
};

// Initialize Firebase
let app, auth, db, analytics;

// Wait for Firebase to load from CDN
function initializeFirebase() {
  try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    analytics = firebase.analytics();
    console.log('✅ Firebase inicializado com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
    return false;
  }
}

// Esperar o DOM estar pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFirebase);
} else {
  initializeFirebase();
}

// Helper functions para autenticação
function signUpUser(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function signInUser(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function signOutUser() {
  return firebase.auth().signOut();
}

function getCurrentUser() {
  return firebase.auth().currentUser;
}

// Listener para mudanças de autenticação
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('✅ Usuário autenticado:', user.email);
    // Atualizar UI se necessário
  } else {
    console.log('❌ Usuário não autenticado');
  }
});
