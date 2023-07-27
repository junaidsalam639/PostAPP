import { app, db  , storage , auth} from './firebase.mjs'
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref , uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


document.getElementById('card-add').addEventListener('click', async () => {
    let file = document.getElementById('file').files[0];
    let text = document.getElementById('text');
    let text1 = document.getElementById('text1');
    // let email = document.getElementById('email').value;
    console.log(file);
    let myId;
    try {
        const docRef = await addDoc(collection(db, "cardAdd"), {
            text: text.value,
            text1: text1.value,
            // email : email,
        });
        console.log("Document written with ID: ", docRef.id);
        myId = docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    console.log(myId);
    const storageRef = ref(storage, myId);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
    // setTimeout(() => {
    //     location.href = './index.html'
    // }, 2000);
})






