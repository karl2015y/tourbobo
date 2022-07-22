import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import { last } from 'lodash';
import { nanoid } from 'nanoid'

const firebaseConfig = {
    apiKey: "AIzaSyDfs9v_Keky63lalShdo4gSn2Oidmk6XDQ",
    authDomain: "outsource-1c28f.firebaseapp.com",
    projectId: "outsource-1c28f",
    storageBucket: "outsource-1c28f.appspot.com",
    messagingSenderId: "315223216903",
    appId: "1:315223216903:web:1b37e755767fdd5d4c6ba2"
};
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore
export const storage = firebase.storage;
export const uploadStorage = (path: string, file: File,): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadTask = storage().ref().child(path + '/' + nanoid() + '.' + last(file.name.split('.'))).put(file, {
            contentType: file.type
        })

        uploadTask.on(storage.TaskEvent.STATE_CHANGED, {
            'complete': function () {
                console.log('upload complete!');
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string | PromiseLike<string>) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        });


    })
}
export const removeStorage = (fileUrl: string) => {
    return new Promise<void>((resolve, reject) => {
        if (fileUrl === '') {
            resolve()
        }

        storage().ref().child(decodeURIComponent(last(fileUrl.split('/'))?.split('?')[0] ?? '')).delete()
            .then(() => resolve())
            .catch(error => reject(error));
    })
}

export const auth = firebase.auth
export const signOut = () => {
    return new Promise<void>((resolve, reject) => {
        auth().signOut().then(() => {
            resolve()
        })
    })
}
