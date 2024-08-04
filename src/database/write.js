import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

/**
 * Saves new favourite to Firebase.
 * 
 * @param {object} data 
 * The photo id and uri.
 * @returns 
 * Promise 
 */
export async function save(data) {
    try {
        const dbCollection = collection(db, 'favourites');
        const docRef = await addDoc(dbCollection, data);
        return docRef.id;
    } catch (e) {
        return null;
    }
}

/**
 * Removes favourites from Firebase database. 
 * 
 * @param {id} id 
 * The document id from the Firebase collection.
 * @returns 
 * Promise
 */
export async function remove(id) {
    try {
        const docRef = doc(db, "favourites", id);
        await deleteDoc(docRef);
        return true;
    }
    catch (e) {
        return false;
    }
}