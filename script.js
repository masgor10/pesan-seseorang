// ===== IMPORT FIREBASE =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, serverTimestamp,
    query, orderBy, onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== CONFIG FIREBASE =====
const firebaseConfig = {
  apiKey: "AIzaSyBL5ZPaGdX0GxItbuICKEDV3SoyIUvKxvo",
  authDomain: "pesan-yang-tak-tersampaikan.firebaseapp.com",
  projectId: "pesan-yang-tak-tersampaikan",
  storageBucket: "pesan-yang-tak-tersampaikan.firebasestorage.app",
  messagingSenderId: "272593176982",
  appId: "1:272593176982:web:56367dc306cf42c7ac75b7"
};

// ===== INISIALISASI =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ===== KIRIM PESAN =====
export async function kirimPesan() {
    const nama = document.getElementById("nama").value;
    const pesan = document.getElementById("pesan").value;

    if (!nama || !pesan) {
        alert("Nama dan pesan tidak boleh kosong!");
        return;
    }

    try {
        await addDoc(collection(db, "pesan"), {
            nama: nama,
            pesan: pesan,
            waktu: serverTimestamp()
        });

        document.getElementById("nama").value = "";
        document.getElementById("pesan").value = "";
    } catch (err) {
        console.error(err);
        alert("Gagal mengirim pesan!");
    }
}


// ===== REALTIME UPDATE =====
const daftar = document.getElementById("daftar-pesan");

const q = query(collection(db, "pesan"), orderBy("waktu", "desc"));

onSnapshot(q, (snapshot) => {
    daftar.innerHTML = "";

    snapshot.forEach((doc) => {
        const data = doc.data();

        let b = document.createElement("div");
        b.className = "pesan-box";

        b.innerHTML = `
            <p><strong>${data.nama}</strong></p>
            <p>${data.pesan}</p>
            <small>${data.waktu ? data.waktu.toDate().toLocaleString() : ""}</small>
        `;

        daftar.appendChild(b);
    });
});
