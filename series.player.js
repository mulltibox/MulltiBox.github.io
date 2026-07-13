import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIza16TuLrKEYh_SjImYvd99pujHR00zDZ8",
    authDomain: "mulltibox.firebaseapp.com",
    projectId: "mulltibox",
    storageBucket: "mulltibox.firebasestorage.app",
    messagingSenderId: "197181870596",
    appId: "1:197181870596:web:c65ecfa9853ee4849f5b51"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



const params = new URLSearchParams(window.location.search);

const seriesId = params.get("id");



const title = document.getElementById("seriesTitle");

const video = document.getElementById("seriesVideo");

const description = document.getElementById("seriesDescription");

const episodesBox = document.getElementById("episodes");




async function loadSeries(){


    try{


        const ref = doc(db,"series",seriesId);

        const snap = await getDoc(ref);



        if(snap.exists()){


            const series = snap.data();



            title.textContent = series.title;


            description.textContent =
            series.description || "No description available.";



            series.episodes.forEach((episode,index)=>{


                let button = document.createElement("button");


                button.textContent =
                "Episode " + (index + 1);



                button.onclick = ()=>{


                    video.src = episode;


                    video.play();


                };



                episodesBox.appendChild(button);



            });



            video.src = series.episodes[0];



        }
        else{


            title.textContent="Series not found.";


        }



    }
    catch(error){

        console.error(error);

        title.textContent="Error loading series.";

    }



}


loadSeries();
