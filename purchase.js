import { app, db, storage, auth } from './firebase.mjs'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, addDoc, doc, deleteDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


console.log(localStorage.getItem('id'));
async function abc(){

    const docRef = doc(db, "cardAdd", localStorage.getItem('id'));
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        document.getElementById('price1').innerHTML = "Product One Price : "+docSnap.data().price
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}
abc()


let date = new Date();
console.log(date.toLocaleString());
let expire = document.getElementById('expire').value = date.toLocaleString();


document.getElementById('pay-now').addEventListener('click', async () => {
    let credit = document.getElementById('credit');
    let expire = document.getElementById('expire');
    let cvv = document.getElementById('cvv');
    let email = document.getElementById('email');

    if (credit.value == '' || expire == '' || cvv.value == '' || email.value == '') {
        Swal.fire({
            icon: 'error',
            title: 'Input Fill☹',
            text: 'Please fill the Input!',
        })
    } 
    else {
        try {
            const docRef = await addDoc(collection(db, "user-Payment-Data"), {
                credit: credit.value,
                expire: expire.value,
                cvv: cvv.value,
                email: email.value,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        Swal.fire({
            icon: 'success',
            title: 'Thank You For Buying The Product🤗',
            text: 'Your Data Has Been Saved🤩!',
        }).then(() => {
            location.reload()
            location.href = './home.html'
        })
        
    }
   
})












