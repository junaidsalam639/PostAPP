import { app, db, storage, auth } from './firebase.mjs'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL , ref  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";



const querySnapshot = await getDocs(collection(db, "cardAdd"));
querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());

    var url1;
    getDownloadURL(ref(storage, doc.id))
    .then((url) => {
        
        url1 = url
          
        let add = document.getElementById('card-add-img').innerHTML += `
        <div class="row">
                <div class="col-lg-4">
                    <div class="card" style="width: 18rem;">
                        <img src="${url1}" class="card-img-top" alt="" id="img">
                        <div class="card-body">
                          <h5 class="card-title" id="title">${doc.data().text}</h5>
                          <p class="card-text" id="desc">${doc.data().text1}</p>
                          <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                      </div>
                </div>
            </div>`   
    })
    .catch((error) => {
        // Handle any errors
    });

    console.log(url1)

   

    

});


