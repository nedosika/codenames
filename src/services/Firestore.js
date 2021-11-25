import {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";
import {
    doc,
    query,
    where,
    setDoc,
    getDoc,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    arrayUnion,
    writeBatch,
    onSnapshot,
    collection,
    getFirestore
} from "firebase/firestore";

import {
    getAuth,
    deleteUser,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export const streamAuth = (observer) =>
    onAuthStateChanged(auth, observer);

export const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

export const SignIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const signOut = () =>
    auth.signOut();

export const getDocById = (path, id) =>
    getDoc(doc(db, path, id));

export const addDocument = (path, data) =>
    addDoc(collection(db, path), {...data});

export const updateDocById = (path, id, data) =>
    setDoc(doc(db, path, id), {...data});

export const deleteDocument = (path, id) =>
    deleteDoc(doc(db, path, id));

export const updateCollection = (path, data) =>
    updateDoc(doc(collection(db, path)), data);

export const useCollection = (path) => {
    const [documents, setDocuments] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        getDocs(collection(db, path))
            .then((docs) => {
                const documents = [];
                docs.forEach((doc) => {
                    documents.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                setDocuments(documents);
            })
            .catch((error) => setError(error.message))
            .finally(() => setIsFetching(false))
    }, []);

    return [documents, isFetching, error]
}

export const useStreamCollection = (path) => {
    const [documents, setDocuments] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, path), (docs) => {
            setIsFetching(true);
            const documents = [];

            docs.forEach((doc) => {
                documents.push({
                    ...doc.data(),
                    id: doc.id
                })
            });

            if (documents.length > 0)
                setDocuments(documents);
            else
                console.log('Documents in collection not found!');

            if (isFetching)
                setIsFetching(false);
        });
        return () => {
            unsubscribe()
        }
    }, []);

    return {documents, isFetching}
}

export default {
    signUp,
    SignIn,
    signOut,
    streamAuth,
    getDocById,
    addDocument,
    useCollection,
    updateDocById,
    deleteDocument,
    updateCollection,
    useStreamCollection,
};