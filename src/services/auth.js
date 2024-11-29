import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setDoc, doc, getFirestore } from "firebase/firestore";

//Login
const loginUser = async (email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;

    } catch (error) {
        console.log('Error at login:', error.message);
        throw error;
    }


};

//Register
const registerUser = async (email, password) => {
    const db = getFirestore();
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
            email: user.email
        });

        return user;
    }catch(error){
        console.log('Error at register:', error.message);
        throw error;
    }
};

//Logout
const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log('Error at logout:', error.message);
        throw error;
    }
};

export {registerUser, loginUser, logoutUser};