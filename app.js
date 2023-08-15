import { app, db, storage, auth } from './firebase.mjs'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, getDoc  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";



const querySnapshot = await getDocs(collection(db, "cardAdd"));
querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());

    var url1;
    getDownloadURL(ref(storage, doc.id))
        .then((url) => {

            url1 = url

            let add = document.getElementById('card-add-img').innerHTML += `
                <div class="col mt-3">
                    <div class="card" style="width: 18rem;">
                        <img src="${url1}" class="card-img-top" alt="" id="img">
                        <div class="card-body">
                          <h5 class="card-title" id="title">Title: ${doc.data().text}<i class="fa-solid fa-heart" onclick='colum("${doc.id}")'></i></h5><hr>
                          <h6 class="card-text" id="desc">Desc: ${doc.data().text1}</h6><hr>
                          <h6 class="card-text" id="desc">Price: ${doc.data().price}</h6><hr>
                          <div class="btn">
                          <button onclick="edit('${doc.id}')" class='edit' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                          <button onclick="dele('${doc.id}')" class='dele'>Delete</button>
                          </div>
                          </div>
                          </div>
                          </div>`
        })
        .catch((error) => {
            // Handle any errors
        });
});

// user card in page
function colum(e){
    console.log(e);
    localStorage.setItem('id', e);
    setTimeout(() => {
        window.location.href = './colum.html'
    }, 2000);
}
window.colum = colum



// Delete code
async function dele(e) {
    console.log(e);
    // Create a reference to the file to delete
    const desertRef = ref(storage, e);

    // Delete the file
    deleteObject(desertRef).then(() => {

    }).catch((error) => {
        console.log(error);
    });

    await deleteDoc(doc(db, "cardAdd", e));
    Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your file has been deleted.',
    }).then(() => {
        location.reload();
    })
}
window.dele = dele




// Edit code
async function edit(e) {
    console.log(e);

    const q = query(collection(db, "cardAdd"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        if(doc.id == e){
            let title1 = document.getElementById('title1').value = doc.data().text;
            let desc1 = document.getElementById('desc1').value = doc.data().text1;
            let price1 = document.getElementById('price1').value = doc.data().price;
        }
    });

    document.getElementById('btn-change').addEventListener('click', async () => {
        let title1 = document.getElementById('title1');
        let desc1 = document.getElementById('desc1');
        let price1 = document.getElementById('price1');


        if (title1.value == '' || desc1.value == '' || price1.value == '' || image1.value == '') {
            Swal.fire({
                icon: 'error',
                title: 'Input Fill',
                text: 'Please Fill The Input!',
            })
        } else {
            let image1 = document.getElementById('image1').files[0];
            console.log(image1);
            console.log(title1.value);
            console.log(desc1.value);
            console.log(price1.value);



            const washingtonRef = doc(db, "cardAdd", e);
            // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, {
                text: title1.value,
                text1: desc1.value,
                price: price1.value,
            });

            const storageRef = ref(storage, e);

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, image1).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
            Swal.fire({
                icon: 'success',
                title: 'Edit',
                text: 'Edit Successfully!',
            })
                .then(() => {
                    location.reload();
                })
        }
    })
}
window.edit = edit




