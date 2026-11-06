import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const login = {

    firebaseConfig,
    app,
    auth,
    user: null,
    fehler: null,




    async registrieren(email, passwort) {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, passwort);
            this.user = user;
            this.fehler = null;
            return user;
        } catch (fehler) {
            this.user = null;
            this.fehler = fehler;
            return null;
        }
    },

    async anmelden(email, passwort) {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, passwort);
            this.user = user;
            this.fehler = null;
            return user;
        } catch (fehler) {
            this.user = null;
            this.fehler = fehler;
            return null;
        }
    },

    // Gibt die Funktion zum Beenden der Beobachtung zurück.
    benutzerStatusBeobachten(callback) {
        return onAuthStateChanged(auth, (user) => {
            this.user = user;
            callback?.(user);
        });
    },

    async abmelden() {
        try {
            await signOut(auth);
            this.user = null;
            this.fehler = null;
        } catch (fehler) {
            this.fehler = fehler;
        }
    }

};
