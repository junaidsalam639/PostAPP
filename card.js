import { app, db  , storage , auth} from './firebase.mjs'
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref , uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


document.getElementById('card-add').addEventListener('click', async () => {
    let text = document.getElementById('text');
    let text1 = document.getElementById('text1');
    let price = document.getElementById('price');
    let number = document.getElementById('number');
    let adress = document.getElementById('adress');
    if(text.value == '' || text1.value == '' || price.value == '' || number.value == '' || adress.value == '' || file.value == ''){
        Swal.fire({
            icon: 'warning',
            title: 'Error!',
            text: 'Please Fill The Input!',
        })
    }else{
        let myId;
        try {
            const docRef = await addDoc(collection(db, "cardAdd"), {
            text: text.value,
            text1: text1.value,
            price : price.value,
            number : number.value,
            adress : adress.value,
        });
        console.log("Document written with ID: ", docRef.id);
        myId = docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    console.log(myId);
    let file = document.getElementById('file').files[0];
    const storageRef = ref(storage, myId);
    
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        Swal.fire({
            icon: 'success',
            title: 'Card Saved!',
            text: 'Your file has been Saved!',
        }).then(() => {
            location.href = './home.html'
        })
    });
}

})






