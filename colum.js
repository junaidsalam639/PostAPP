import { app, db, storage, auth } from './firebase.mjs'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, getDoc  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";




const getDat = async () => {
    const docRef = doc(db, "cardAdd", localStorage.getItem("id"));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
       
        getDownloadURL(ref(storage,  localStorage.getItem("id")))
            .then((url) => {
                console.log(url);
                let img1 = document.getElementById('card-img');
                let detail = document.getElementById('detail');
                let add = document.getElementById('add');
                let sub = document.getElementById('sub');
                img1.innerHTML =  `
                <img src="${url}" alt=""></img>
                <button onclick='purchase("${localStorage.getItem("id")}")'
                data-bs-toggle="modal" data-bs-target="#exampleModal">PurchaseNow</button>
                `
                detail.innerHTML = ` 
                <h2>Title :</h2>
                <p>${docSnap.data().text}</p>
                <h2>Desccription :</h2>
                <p>${docSnap.data().text1}</p>
                <h2>Price :</h2>
                <p>${docSnap.data().price}</p>`

                add.innerHTML = `
                <h2>Adress</h2>
                <p><i class="fa-solid fa-location-dot"></i>${docSnap.data().adress}</p>`

     // https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png

                sub.innerHTML =  `
                <img src="${url}" alt="" style="width: 70px; border-radius: 50%; height: 70px;">
                <span>Fancy Pegion Club</span>
                <button onclick="show()" id="number-show"><i class="fa-solid fa-phone"></i>Show Phone Number</button><br>
                <a href="https://wa.me/${docSnap.data().number}" target="_blank">
                    <button><i class="fa-brands fa-rocketchat"></i>Chat</button>
                </a>`



                function show(){
                    document.getElementById('number-show').innerHTML =`
                    <i class="fa-solid fa-phone"></i>
                     ${docSnap.data().number}`
                }
                window.show = show
            })
            .catch((error) => {
                
            });
    } else {
        console.log("No such document!");
    }
}

getDat();


function purchase(e){
    console.log(e);

    setTimeout(() => {
        window.location.href = './purchase.html'
    }, 1000);

    // document.getElementById('btn-change').addEventListener('click' , ()=>{
    //     let city = document.getElementById('city');
    //     let adress = document.getElementById('adress');
    //     let number = document.getElementById('number');
    //     let card = document.getElementById('card');

    //     if(city.value == '' || adress.value == '' || number.value == '' || card.value == ''){
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Please Fill The Input🥳',
    //             text: '',
    //         })
    //     }
    //     else{
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Thanks your Buying Product!😍',
    //             text: 'City: ' + city.value+ '! Adress: ' + adress.value + '! Number: ' + number.value + '! Card:' + card.value,
    //         }).then(()=>{
    //             location.reload()
    //         })
    //         console.log(city.value , adress.value , number.value , card.value);
    //     }
    // })
}

window.purchase = purchase















