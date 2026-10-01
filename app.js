/* ============================================================
   DEUTSCH LERNEN – Application Logic
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyABGxhahQyAUhWo0mfE76-VJFjSghaLlGo",
  authDomain: "mispalabrasaleman.firebaseapp.com",
  projectId: "mispalabrasaleman",
  storageBucket: "mispalabrasaleman.firebasestorage.app",
  messagingSenderId: "535938061752",
  appId: "1:535938061752:web:9aff903707dc53c2ebeb4d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Built-in Dictionary ───────────────────────────────────
const DICTIONARY = {
    "Haus": { artikel: "das", plural: "Häuser", traduccion: "casa" },
    "Hund": { artikel: "der", plural: "Hunde", traduccion: "perro" },
    "Katze": { artikel: "die", plural: "Katzen", traduccion: "gato" },
    "Auto": { artikel: "das", plural: "Autos", traduccion: "coche" },
    "Buch": { artikel: "das", plural: "Bücher", traduccion: "libro" },
    "Schule": { artikel: "die", plural: "Schulen", traduccion: "escuela" },
    "Tisch": { artikel: "der", plural: "Tische", traduccion: "mesa" },
    "Stuhl": { artikel: "der", plural: "Stühle", traduccion: "silla" },
    "Tür": { artikel: "die", plural: "Türen", traduccion: "puerta" },
    "Fenster": { artikel: "das", plural: "Fenster", traduccion: "ventana" },
    "Wasser": { artikel: "das", plural: "Wasser", traduccion: "agua" },
    "Brot": { artikel: "das", plural: "Brote", traduccion: "pan" },
    "Milch": { artikel: "die", plural: "-", traduccion: "leche" },
    "Apfel": { artikel: "der", plural: "Äpfel", traduccion: "manzana" },
    "Kind": { artikel: "das", plural: "Kinder", traduccion: "niño/a" },
    "Mann": { artikel: "der", plural: "Männer", traduccion: "hombre" },
    "Frau": { artikel: "die", plural: "Frauen", traduccion: "mujer" },
    "Mädchen": { artikel: "das", plural: "Mädchen", traduccion: "chica" },
    "Junge": { artikel: "der", plural: "Jungen", traduccion: "chico" },
    "Freund": { artikel: "der", plural: "Freunde", traduccion: "amigo" },
    "Freundin": { artikel: "die", plural: "Freundinnen", traduccion: "amiga" },
    "Familie": { artikel: "die", plural: "Familien", traduccion: "familia" },
    "Vater": { artikel: "der", plural: "Väter", traduccion: "padre" },
    "Mutter": { artikel: "die", plural: "Mütter", traduccion: "madre" },
    "Bruder": { artikel: "der", plural: "Brüder", traduccion: "hermano" },
    "Schwester": { artikel: "die", plural: "Schwestern", traduccion: "hermana" },
    "Stadt": { artikel: "die", plural: "Städte", traduccion: "ciudad" },
    "Land": { artikel: "das", plural: "Länder", traduccion: "país" },
    "Straße": { artikel: "die", plural: "Straßen", traduccion: "calle" },
    "Platz": { artikel: "der", plural: "Plätze", traduccion: "plaza" },
    "Baum": { artikel: "der", plural: "Bäume", traduccion: "árbol" },
    "Blume": { artikel: "die", plural: "Blumen", traduccion: "flor" },
    "Garten": { artikel: "der", plural: "Gärten", traduccion: "jardín" },
    "Zimmer": { artikel: "das", plural: "Zimmer", traduccion: "habitación" },
    "Küche": { artikel: "die", plural: "Küchen", traduccion: "cocina" },
    "Bad": { artikel: "das", plural: "Bäder", traduccion: "baño" },
    "Schlafzimmer": { artikel: "das", plural: "Schlafzimmer", traduccion: "dormitorio" },
    "Wohnzimmer": { artikel: "das", plural: "Wohnzimmer", traduccion: "salón" },
    "Arbeit": { artikel: "die", plural: "Arbeiten", traduccion: "trabajo" },
    "Büro": { artikel: "das", plural: "Büros", traduccion: "oficina" },
    "Computer": { artikel: "der", plural: "Computer", traduccion: "ordenador" },
    "Telefon": { artikel: "das", plural: "Telefone", traduccion: "teléfono" },
    "Handy": { artikel: "das", plural: "Handys", traduccion: "móvil" },
    "Zeitung": { artikel: "die", plural: "Zeitungen", traduccion: "periódico" },
    "Film": { artikel: "der", plural: "Filme", traduccion: "película" },
    "Musik": { artikel: "die", plural: "-", traduccion: "música" },
    "Lied": { artikel: "das", plural: "Lieder", traduccion: "canción" },
    "Spiel": { artikel: "das", plural: "Spiele", traduccion: "juego" },
    "Sport": { artikel: "der", plural: "-", traduccion: "deporte" },
    "Fußball": { artikel: "der", plural: "Fußbälle", traduccion: "fútbol" },
    "Zeit": { artikel: "die", plural: "Zeiten", traduccion: "tiempo" },
    "Tag": { artikel: "der", plural: "Tage", traduccion: "día" },
    "Nacht": { artikel: "die", plural: "Nächte", traduccion: "noche" },
    "Morgen": { artikel: "der", plural: "Morgen", traduccion: "mañana" },
    "Abend": { artikel: "der", plural: "Abende", traduccion: "tarde/noche" },
    "Woche": { artikel: "die", plural: "Wochen", traduccion: "semana" },
    "Monat": { artikel: "der", plural: "Monate", traduccion: "mes" },
    "Jahr": { artikel: "das", plural: "Jahre", traduccion: "año" },
    "Sommer": { artikel: "der", plural: "Sommer", traduccion: "verano" },
    "Winter": { artikel: "der", plural: "Winter", traduccion: "invierno" },
    "Frühling": { artikel: "der", plural: "Frühlinge", traduccion: "primavera" },
    "Herbst": { artikel: "der", plural: "Herbste", traduccion: "otoño" },
    "Sonne": { artikel: "die", plural: "Sonnen", traduccion: "sol" },
    "Mond": { artikel: "der", plural: "Monde", traduccion: "luna" },
    "Stern": { artikel: "der", plural: "Sterne", traduccion: "estrella" },
    "Regen": { artikel: "der", plural: "Regen", traduccion: "lluvia" },
    "Schnee": { artikel: "der", plural: "-", traduccion: "nieve" },
    "Wind": { artikel: "der", plural: "Winde", traduccion: "viento" },
    "Wolke": { artikel: "die", plural: "Wolken", traduccion: "nube" },
    "Himmel": { artikel: "der", plural: "Himmel", traduccion: "cielo" },
    "Meer": { artikel: "das", plural: "Meere", traduccion: "mar" },
    "Fluss": { artikel: "der", plural: "Flüsse", traduccion: "río" },
    "Berg": { artikel: "der", plural: "Berge", traduccion: "montaña" },
    "Wald": { artikel: "der", plural: "Wälder", traduccion: "bosque" },
    "Tier": { artikel: "das", plural: "Tiere", traduccion: "animal" },
    "Vogel": { artikel: "der", plural: "Vögel", traduccion: "pájaro" },
    "Fisch": { artikel: "der", plural: "Fische", traduccion: "pez" },
    "Pferd": { artikel: "das", plural: "Pferde", traduccion: "caballo" },
    "Kuh": { artikel: "die", plural: "Kühe", traduccion: "vaca" },
    "Schwein": { artikel: "das", plural: "Schweine", traduccion: "cerdo" },
    "Huhn": { artikel: "das", plural: "Hühner", traduccion: "pollo" },
    "Ei": { artikel: "das", plural: "Eier", traduccion: "huevo" },
    "Käse": { artikel: "der", plural: "Käse", traduccion: "queso" },
    "Fleisch": { artikel: "das", plural: "-", traduccion: "carne" },
    "Gemüse": { artikel: "das", plural: "Gemüse", traduccion: "verdura" },
    "Obst": { artikel: "das", plural: "-", traduccion: "fruta" },
    "Kartoffel": { artikel: "die", plural: "Kartoffeln", traduccion: "patata" },
    "Tomate": { artikel: "die", plural: "Tomaten", traduccion: "tomate" },
    "Salat": { artikel: "der", plural: "Salate", traduccion: "ensalada/lechuga" },
    "Reis": { artikel: "der", plural: "-", traduccion: "arroz" },
    "Nudel": { artikel: "die", plural: "Nudeln", traduccion: "pasta/fideo" },
    "Suppe": { artikel: "die", plural: "Suppen", traduccion: "sopa" },
    "Kuchen": { artikel: "der", plural: "Kuchen", traduccion: "pastel" },
    "Kaffee": { artikel: "der", plural: "-", traduccion: "café" },
    "Tee": { artikel: "der", plural: "Tees", traduccion: "té" },
    "Bier": { artikel: "das", plural: "Biere", traduccion: "cerveza" },
    "Wein": { artikel: "der", plural: "Weine", traduccion: "vino" },
    "Saft": { artikel: "der", plural: "Säfte", traduccion: "zumo" },
    "Zucker": { artikel: "der", plural: "-", traduccion: "azúcar" },
    "Salz": { artikel: "das", plural: "Salze", traduccion: "sal" },
    "Butter": { artikel: "die", plural: "-", traduccion: "mantequilla" },
    "Arzt": { artikel: "der", plural: "Ärzte", traduccion: "médico" },
    "Ärztin": { artikel: "die", plural: "Ärztinnen", traduccion: "médica" },
    "Lehrer": { artikel: "der", plural: "Lehrer", traduccion: "profesor" },
    "Lehrerin": { artikel: "die", plural: "Lehrerinnen", traduccion: "profesora" },
    "Student": { artikel: "der", plural: "Studenten", traduccion: "estudiante (m)" },
    "Studentin": { artikel: "die", plural: "Studentinnen", traduccion: "estudiante (f)" },
    "Polizist": { artikel: "der", plural: "Polizisten", traduccion: "policía" },
    "Krankenschwester": { artikel: "die", plural: "Krankenschwestern", traduccion: "enfermera" },
    "Farbe": { artikel: "die", plural: "Farben", traduccion: "color" },
    "Größe": { artikel: "die", plural: "Größen", traduccion: "tamaño" },
    "Kleid": { artikel: "das", plural: "Kleider", traduccion: "vestido" },
    "Hose": { artikel: "die", plural: "Hosen", traduccion: "pantalón" },
    "Hemd": { artikel: "das", plural: "Hemden", traduccion: "camisa" },
    "Schuh": { artikel: "der", plural: "Schuhe", traduccion: "zapato" },
    "Tasche": { artikel: "die", plural: "Taschen", traduccion: "bolso/bolsa" },
    "Uhr": { artikel: "die", plural: "Uhren", traduccion: "reloj" },
    "Brille": { artikel: "die", plural: "Brillen", traduccion: "gafas" },
    "Schlüssel": { artikel: "der", plural: "Schlüssel", traduccion: "llave" },
    "Geld": { artikel: "das", plural: "Gelder", traduccion: "dinero" },
    "Bank": { artikel: "die", plural: "Banken", traduccion: "banco" },
    "Laden": { artikel: "der", plural: "Läden", traduccion: "tienda" },
    "Markt": { artikel: "der", plural: "Märkte", traduccion: "mercado" },
    "Restaurant": { artikel: "das", plural: "Restaurants", traduccion: "restaurante" },
    "Hotel": { artikel: "das", plural: "Hotels", traduccion: "hotel" },
    "Flughafen": { artikel: "der", plural: "Flughäfen", traduccion: "aeropuerto" },
    "Bahnhof": { artikel: "der", plural: "Bahnhöfe", traduccion: "estación de tren" },
    "Zug": { artikel: "der", plural: "Züge", traduccion: "tren" },
    "Bus": { artikel: "der", plural: "Busse", traduccion: "autobús" },
    "Fahrrad": { artikel: "das", plural: "Fahrräder", traduccion: "bicicleta" },
    "Schiff": { artikel: "das", plural: "Schiffe", traduccion: "barco" },
    "Flugzeug": { artikel: "das", plural: "Flugzeuge", traduccion: "avión" },
    "Sprache": { artikel: "die", plural: "Sprachen", traduccion: "idioma" },
    "Wort": { artikel: "das", plural: "Wörter", traduccion: "palabra" },
    "Satz": { artikel: "der", plural: "Sätze", traduccion: "frase" },
    "Frage": { artikel: "die", plural: "Fragen", traduccion: "pregunta" },
    "Antwort": { artikel: "die", plural: "Antworten", traduccion: "respuesta" },
    "Beispiel": { artikel: "das", plural: "Beispiele", traduccion: "ejemplo" },
    "Problem": { artikel: "das", plural: "Probleme", traduccion: "problema" },
    "Lösung": { artikel: "die", plural: "Lösungen", traduccion: "solución" },
    "Idee": { artikel: "die", plural: "Ideen", traduccion: "idea" },
    "Geschichte": { artikel: "die", plural: "Geschichten", traduccion: "historia" },
    "Bild": { artikel: "das", plural: "Bilder", traduccion: "imagen/cuadro" },
    "Foto": { artikel: "das", plural: "Fotos", traduccion: "foto" },
    "Brief": { artikel: "der", plural: "Briefe", traduccion: "carta" },
    "Name": { artikel: "der", plural: "Namen", traduccion: "nombre" },
    "Nummer": { artikel: "die", plural: "Nummern", traduccion: "número" },
    "Adresse": { artikel: "die", plural: "Adressen", traduccion: "dirección" },
    "Kirche": { artikel: "die", plural: "Kirchen", traduccion: "iglesia" },
    "Museum": { artikel: "das", plural: "Museen", traduccion: "museo" },
    "Park": { artikel: "der", plural: "Parks", traduccion: "parque" },
    "Brücke": { artikel: "die", plural: "Brücken", traduccion: "puente" },
    "Krankenhaus": { artikel: "das", plural: "Krankenhäuser", traduccion: "hospital" },
    "Apotheke": { artikel: "die", plural: "Apotheken", traduccion: "farmacia" },
    "Bibliothek": { artikel: "die", plural: "Bibliotheken", traduccion: "biblioteca" },
    "Universität": { artikel: "die", plural: "Universitäten", traduccion: "universidad" },
    "Klasse": { artikel: "die", plural: "Klassen", traduccion: "clase" },
    "Prüfung": { artikel: "die", plural: "Prüfungen", traduccion: "examen" },
    "Aufgabe": { artikel: "die", plural: "Aufgaben", traduccion: "tarea/ejercicio" },
    "Stunde": { artikel: "die", plural: "Stunden", traduccion: "hora" },
    "Minute": { artikel: "die", plural: "Minuten", traduccion: "minuto" },
    "Geburtstag": { artikel: "der", plural: "Geburtstage", traduccion: "cumpleaños" },
    "Fest": { artikel: "das", plural: "Feste", traduccion: "fiesta/celebración" },
    "Geschenk": { artikel: "das", plural: "Geschenke", traduccion: "regalo" },
    "Urlaub": { artikel: "der", plural: "Urlaube", traduccion: "vacaciones" },
    "Reise": { artikel: "die", plural: "Reisen", traduccion: "viaje" },
    "Koffer": { artikel: "der", plural: "Koffer", traduccion: "maleta" },
    "Karte": { artikel: "die", plural: "Karten", traduccion: "tarjeta/mapa" },
    "Ticket": { artikel: "das", plural: "Tickets", traduccion: "billete/entrada" },
    "Essen": { artikel: "das", plural: "Essen", traduccion: "comida" },
    "Frühstück": { artikel: "das", plural: "Frühstücke", traduccion: "desayuno" },
    "Mittagessen": { artikel: "das", plural: "Mittagessen", traduccion: "almuerzo" },
    "Abendessen": { artikel: "das", plural: "Abendessen", traduccion: "cena" },
    "Gabel": { artikel: "die", plural: "Gabeln", traduccion: "tenedor" },
    "Messer": { artikel: "das", plural: "Messer", traduccion: "cuchillo" },
    "Löffel": { artikel: "der", plural: "Löffel", traduccion: "cuchara" },
    "Teller": { artikel: "der", plural: "Teller", traduccion: "plato" },
    "Tasse": { artikel: "die", plural: "Tassen", traduccion: "taza" },
    "Glas": { artikel: "das", plural: "Gläser", traduccion: "vaso" },
    "Flasche": { artikel: "die", plural: "Flaschen", traduccion: "botella" },
    "Lampe": { artikel: "die", plural: "Lampen", traduccion: "lámpara" },
    "Bett": { artikel: "das", plural: "Betten", traduccion: "cama" },
    "Sofa": { artikel: "das", plural: "Sofas", traduccion: "sofá" },
    "Schrank": { artikel: "der", plural: "Schränke", traduccion: "armario" },
    "Spiegel": { artikel: "der", plural: "Spiegel", traduccion: "espejo" },
    "Treppe": { artikel: "die", plural: "Treppen", traduccion: "escalera" },
    "Dach": { artikel: "das", plural: "Dächer", traduccion: "tejado" },
    "Wand": { artikel: "die", plural: "Wände", traduccion: "pared" },
    "Boden": { artikel: "der", plural: "Böden", traduccion: "suelo" },
    "Herz": { artikel: "das", plural: "Herzen", traduccion: "corazón" },
    "Kopf": { artikel: "der", plural: "Köpfe", traduccion: "cabeza" },
    "Hand": { artikel: "die", plural: "Hände", traduccion: "mano" },
    "Auge": { artikel: "das", plural: "Augen", traduccion: "ojo" },
    "Ohr": { artikel: "das", plural: "Ohren", traduccion: "oreja" },
    "Nase": { artikel: "die", plural: "Nasen", traduccion: "nariz" },
    "Mund": { artikel: "der", plural: "Münder", traduccion: "boca" },
    "Zahn": { artikel: "der", plural: "Zähne", traduccion: "diente" },
    "Haar": { artikel: "das", plural: "Haare", traduccion: "pelo" },
    "Fuß": { artikel: "der", plural: "Füße", traduccion: "pie" },
    "Finger": { artikel: "der", plural: "Finger", traduccion: "dedo" },
    "Rücken": { artikel: "der", plural: "Rücken", traduccion: "espalda" },
    "Körper": { artikel: "der", plural: "Körper", traduccion: "cuerpo" },
};

// ─── State ─────────────────────────────────────────────────────
let words = [];  // kept in sync by onSnapshot
let currentQuiz = null; // { mode, words, index, correct, incorrect, currentWord, direction }

// ─── Firebase: real-time listener ──────────────────────────
function initFirestore() {
    const palabrasRef = collection(db, 'palabras');
    onSnapshot(palabrasRef, (snapshot) => {
        words = snapshot.docs.map(docSnap => ({
            ...docSnap.data(),
            firestoreId: docSnap.id   // keep Firestore doc ID for deletion
        }));
        // Refresh all UI that depends on the words array
        updateRecentWords();
        refreshReviewTable();
        refreshStudyView();
    }, (error) => {
        console.error('Firestore onSnapshot error:', error);
        showToast('Error de conexión con la base de datos', 'error');
    });
}

// ─── Initialize ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAddForm();
    initStudyMode();
    initReviewMode();
    initModal();
    initFirestore();   // start listening – populates words[] via onSnapshot
});


// ─── Navigation ────────────────────────────────────────────────
function initNavigation() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(`section-${tabName}`);
    section.classList.remove('active');
    // Force reflow for animation
    void section.offsetWidth;
    section.classList.add('active');

    // Refresh content
    if (tabName === 'study') refreshStudyView();
    if (tabName === 'review') refreshReviewTable();
}

// ─── Toast Notifications ───────────────────────────────────────
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ─── Add Word Section ──────────────────────────────────────────
function initAddForm() {
    const form = document.getElementById('add-word-form');
    const inputWort = document.getElementById('input-wort');
    const btnSearch = document.getElementById('btn-search');

    // Search / auto-fill via PONS
    btnSearch.addEventListener('click', () => autoFillWord());
    inputWort.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            autoFillWord();
        }
    });

    // Save
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveNewWord();
    });

    // Reset
    form.addEventListener('reset', () => {
        setTimeout(() => {
            inputWort.focus();
            setSearchStatus('');
        }, 50);
    });
}

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function setSearchStatus(msg, type = '') {
    const el = document.getElementById('search-status');
    el.textContent = msg;
    el.className = 'search-status' + (type ? ' ' + type : '');
}

function setSearchLoading(loading) {
    document.getElementById('btn-search-icon').style.display = loading ? 'none' : '';
    document.getElementById('btn-search-spinner').style.display = loading ? '' : 'none';
    document.getElementById('btn-search').disabled = loading;
}

// ─── PONS Official API ─────────────────────────────────────────
const PONS_API_KEY = '3d3f77b752a920cc5bdf0e73f43662c133512f0d831159b643bf5a7bf296a803';

async function fetchFromPONS(word) {
    try {
        const url = `https://api.pons.com/v1/dictionary?l=dees&q=${encodeURIComponent(word)}&language=es`;
        const resp = await fetch(url, {
            headers: { 'X-Secret': PONS_API_KEY },
            signal: AbortSignal.timeout(10000),
        });
        if (!resp.ok) return null;
        const data = await resp.json();
        return parsePONSApi(data, word);
    } catch {
        return null;
    }
}

function parsePONSApi(data, searchWord) {
    const block = Array.isArray(data) ? data.find(b => b.lang === 'de') || data[0] : null;
    if (!block?.hits?.length) return null;

    const parser = new DOMParser();
    let artikel = '';
    let plural = '-';
    const translationSet = new Set();

    for (const hit of block.hits) {
        for (const rom of (hit.roms || [])) {

            // ── GENDER + PLURAL from headword_full ──────────────
            if (rom.headword_full) {
                const doc = parser.parseFromString(rom.headword_full, 'text/html');

                if (!artikel) {
                    const genusEl = doc.querySelector('.genus');
                    if (genusEl) {
                        const g = genusEl.textContent.trim().toLowerCase();
                        if      (g === 'f'  || g === 'fem.')   artikel = 'die';
                        else if (g === 'm'  || g === 'mask.')  artikel = 'der';
                        else if (g === 'nt' || g === 'neutr.') artikel = 'das';
                    }
                }

                if (plural === '-') {
                    const flexEl = doc.querySelector('.flexion');
                    if (flexEl) {
                        const m = flexEl.textContent.trim().match(/<([^>]+)>/);
                        if (m) {
                            const parts = m[1].split(',').map(p => p.trim());
                            const p = parts[parts.length - 1];
                            if (p.startsWith('-') && p.length > 1) {
                                plural = capitalize(searchWord) + p.slice(1);
                            } else if (p === '-') {
                                plural = capitalize(searchWord);
                            } else if (p.length > 0 && p !== '—') {
                                plural = capitalize(p);
                            }
                        }
                    }
                }
            }

            // ── TRANSLATIONS from arabs ─────────────────────────
            for (const arab of (rom.arabs || [])) {
                for (const tr of (arab.translations || [])) {
                    if (!tr.target || translationSet.size >= 4) continue;
                    const doc = parser.parseFromString(tr.target, 'text/html');
                    // Remove the Spanish genus span (f/m) before reading text
                    doc.querySelectorAll('.genus').forEach(el => el.remove());
                    const text = (doc.body?.textContent || '')
                        .replace(/\[.*?\]/g, '')
                        .replace(/\(.*?\)/g, '')
                        .trim().toLowerCase();
                    if (text && text.length > 0 && text.length < 60) {
                        translationSet.add(text);
                    }
                }
            }
        }
        if (artikel && translationSet.size > 0) break;
    }

    const traduccion = [...translationSet].join(', ');
    if (artikel || traduccion) return { artikel, plural, traduccion };
    return null;
}

// ─── Wiktionary Fetch (fallback) ───────────────────────────────
async function fetchFromWiktionary(word) {
    const sources = [
        `https://es.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(word)}&prop=wikitext&format=json&origin=*`,
        `https://de.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(word)}&prop=wikitext&format=json&origin=*`,
    ];

    for (const url of sources) {
        try {
            const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
            if (!resp.ok) continue;
            const json = await resp.json();
            const wikitext = json?.parse?.wikitext?.['*'];
            if (!wikitext) continue;
            const isEs = url.includes('es.wiktionary');
            const result = parseWikitext(wikitext, word, isEs);
            if (result && (result.artikel || result.traduccion)) return result;
        } catch {
            continue;
        }
    }
    return null;
}

function parseWikitext(wikitext, word, isEsWiki) {
    let artikel = '';
    let plural = '-';
    let traduccion = '';

    if (isEsWiki) {
        // Gender
        if (/\{\{sustantivo neutro\|de\}\}/i.test(wikitext))         artikel = 'das';
        else if (/\{\{sustantivo masculino\|de\}\}/i.test(wikitext)) artikel = 'der';
        else if (/\{\{sustantivo femenino\|de\}\}/i.test(wikitext))  artikel = 'die';

        // Plural from {{de.sust|...}} template
        const sustMatch = wikitext.match(/\{\{de\.sust\|([^}]+)\}\}/);
        if (sustMatch) {
            const parts = sustMatch[1].split('/');
            const rawPlural = parts[parts.length - 1].trim();
            if (rawPlural && rawPlural !== '-' && !rawPlural.includes('|')) {
                const base = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                if (rawPlural.startsWith('^') || rawPlural.startsWith('-')) {
                    plural = base + rawPlural.slice(1);
                } else {
                    plural = rawPlural.charAt(0).toUpperCase() + rawPlural.slice(1);
                }
            }
        }

        // Translations: ;1 ...: {{plm|casa}}.
        const plmMatches = [...wikitext.matchAll(/;\d[^:]*:\s*\{\{plm\|([^}]+)\}\}/g)];
        if (plmMatches.length > 0) {
            const meanings = [...new Set(plmMatches.map(m => m[1].trim().toLowerCase()))];
            traduccion = meanings.slice(0, 4).join(', ');
        }

    } else {
        // Gender from de.wiktionary Genus field
        const genusMatch = wikitext.match(/\|Genus\s*[12]?\s*=\s*([mfn])\b/);
        if (genusMatch) {
            artikel = genusMatch[1] === 'm' ? 'der' : genusMatch[1] === 'f' ? 'die' : 'das';
        }

        // Plural from Nominativ Plural field
        const pluralMatch = wikitext.match(/\|Nominativ Plural\s*[12]?\s*=\s*([^\n|{}]+)/);
        if (pluralMatch) {
            const p = pluralMatch[1].trim();
            if (p && p !== '—' && p !== '-') plural = p;
        }
    }

    return { artikel, plural, traduccion };
}


function parsePONSHtml(html, searchWord) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    let artikel = '';
    let plural = '-';
    let traduccion = '';

    // ── 1. GENDER ──
    // PONS uses <span class="genus">m</span> or <span class="genus"><acronym>nt</acronym></span>
    const genusElements = doc.querySelectorAll('.genus');
    for (const g of genusElements) {
        const text = g.textContent.trim().toLowerCase();
        if (text === 'f' || text === 'fem' || text === 'fem.') { artikel = 'die'; break; }
        if (text === 'm' || text === 'mask' || text === 'mask.') { artikel = 'der'; break; }
        if (text === 'nt' || text === 'neutr' || text === 'neutr.') { artikel = 'das'; break; }
    }

    // Fallback: look for "SUST. f/m/nt" in raw text
    if (!artikel) {
        const fullText = doc.body ? doc.body.textContent : html;
        const sustMatch = fullText.match(/SUST\.\s*(f|m|nt)\b/);
        if (sustMatch) {
            if (sustMatch[1] === 'f') artikel = 'die';
            else if (sustMatch[1] === 'm') artikel = 'der';
            else if (sustMatch[1] === 'nt') artikel = 'das';
        }
    }

    // ── 2. PLURAL ──
    // PONS uses <span class="flexion">&lt;-(e)s, -e&gt;</span> for inflection info
    const flexionElements = doc.querySelectorAll('.flexion');
    for (const el of flexionElements) {
        const text = el.textContent.trim();
        // Match patterns like <-es, Häuser> or <-, -n> or <-(e)s, -e>
        const inflMatch = text.match(/<([^>]+)>/);
        if (inflMatch) {
            const parts = inflMatch[1].split(',').map(p => p.trim());
            if (parts.length >= 2) {
                const pluralPart = parts[parts.length - 1].trim();
                if (pluralPart.startsWith('-') && pluralPart.length > 1) {
                    // Suffix like "-n", "-en", "-e" → append to the word
                    plural = capitalize(searchWord) + pluralPart.substring(1);
                } else if (pluralPart === '-') {
                    plural = capitalize(searchWord); // same form
                } else if (pluralPart.length > 0) {
                    plural = capitalize(pluralPart);
                }
            }
            break;
        }
    }

    // Fallback: scan raw text for the inflection pattern
    if (plural === '-') {
        const rawText = doc.body ? doc.body.textContent : html;
        // Look for patterns like "Tisch <-(e)s, -e>" or "Haus <-es, Häuser>"
        const escWord = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const headerMatch = rawText.match(new RegExp(escWord + '\\s*<([^>]+)>', 'i'));
        if (headerMatch) {
            const parts = headerMatch[1].split(',').map(p => p.trim());
            if (parts.length >= 2) {
                const pluralPart = parts[parts.length - 1].trim();
                if (pluralPart.startsWith('-') && pluralPart.length > 1) {
                    plural = capitalize(searchWord) + pluralPart.substring(1);
                } else if (pluralPart !== '-' && pluralPart.length > 0) {
                    plural = capitalize(pluralPart);
                }
            }
        }
    }

    // ── 3. SPANISH TRANSLATION ──
    // PONS now uses data-e2e="translation-target" for primary translations
    const translationTargets = doc.querySelectorAll('[data-e2e="translation-target"]');
    for (const t of translationTargets) {
        const text = t.textContent.trim()
            .replace(/\[.*?\]/g, '')  // remove bracketed alternatives like [o solucionado]
            .replace(/\(.*?\)/g, '')  // remove parenthetical info
            .trim();
        if (text.length > 0 && text.length < 80) {
            traduccion = text.toLowerCase();
            break;
        }
    }

    // Fallback: look for .dt-inner or .dd-inner containing translations
    if (!traduccion) {
        const ddElements = doc.querySelectorAll('.dd-inner .target, .translations .translation');
        for (const t of ddElements) {
            const text = t.textContent.trim().replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').trim();
            if (text.length > 0 && text.length < 80 && !text.match(/^[A-Z]{2,}$/) && !text.includes('SUST')) {
                traduccion = text.toLowerCase();
                break;
            }
        }
    }

    // Fallback: search for translation in raw text after "1. Word:"
    if (!traduccion) {
        const rawText = doc.body ? doc.body.textContent : html;
        const transMatch = rawText.match(/1\.\s*\w+:\s*\n?\s*(.+)/);
        if (transMatch) {
            const candidate = transMatch[1].trim().replace(/\[.*?\]/g, '').trim();
            if (candidate.length > 0 && candidate.length < 60) {
                traduccion = candidate.toLowerCase();
            }
        }
    }

    // Only return if we found at least something useful
    if (artikel || plural !== '-' || traduccion) {
        // Clean trailing Spanish gender markers like "mesa f" → "mesa"
        traduccion = traduccion
            .replace(/\s+[fm]\/[fm]\s*$/i, '')   // "f/m"
            .replace(/\s+[fm]\s*$/i, '')          // trailing "f" or "m"
            .replace(/\s*,\s*$/, '')              // trailing comma
            .trim();
        return { artikel, plural, traduccion };
    }
    return null;
}

async function autoFillWord() {
    const inputWort = document.getElementById('input-wort');
    const raw = inputWort.value.trim();
    if (!raw) return;

    const word = capitalize(raw);
    inputWort.value = word;

    setSearchLoading(true);
    setSearchStatus('Buscando…', 'loading');

    document.getElementById('input-artikel').value = '';
    document.getElementById('input-plural').value = '';
    document.getElementById('input-traduccion').value = '';

    let result = null;
    let source = '';

    // 1. PONS API (si hay clave configurada)
    try { result = await fetchFromPONS(word); if (result) source = 'PONS'; } catch {}

    // 2. Wiktionary (fallback)
    if (!result || (!result.artikel && !result.traduccion)) {
        try { result = await fetchFromWiktionary(word); if (result) source = 'Wiktionary'; } catch {}
    }

    if (result && (result.artikel || result.traduccion)) {
        document.getElementById('input-artikel').value = result.artikel || '';
        document.getElementById('input-plural').value = result.plural || '-';
        document.getElementById('input-traduccion').value = result.traduccion || '';
        setSearchLoading(false);
        setSearchStatus(`Datos obtenidos de ${source} ✓  Puedes editarlos si lo necesitas.`, 'success');
        showToast(`"${word}" encontrada en ${source} ✓`);
    } else {
        // 3. Diccionario local
        const entry = DICTIONARY[word];
        if (entry) {
            document.getElementById('input-artikel').value = entry.artikel;
            document.getElementById('input-plural').value = entry.plural;
            document.getElementById('input-traduccion').value = entry.traduccion;
            setSearchLoading(false);
            setSearchStatus('Datos del diccionario integrado ✓', 'success');
            showToast(`"${word}" encontrada en diccionario local ✓`);
        } else {
            setSearchLoading(false);
            setSearchStatus('No encontrada. Rellena los campos manualmente.', 'error');
            showToast(`"${word}" no encontrada. Rellena manualmente.`, 'info');
        }
    }
    document.getElementById('input-artikel').focus();
}

async function saveNewWord() {
    const wort = document.getElementById('input-wort').value.trim();
    const artikel = document.getElementById('input-artikel').value;
    const plural = document.getElementById('input-plural').value.trim();
    const rawTraduccion = document.getElementById('input-traduccion').value.trim();

    if (!wort) {
        showToast('Escribe una palabra en alemán', 'error');
        return;
    }

    if (!artikel) {
        showToast('Selecciona el artículo o "— sin artículo"', 'error');
        return;
    }

    if (!rawTraduccion) {
        showToast('Escribe al menos un significado', 'error');
        return;
    }

    // Parse multiple meanings: split by comma or semicolon, clean each
    const meanings = rawTraduccion
        .split(/[,;]+/)
        .map(s => s.trim().toLowerCase())
        .filter(s => s.length > 0);

    // Check duplicate
    const exists = words.some(w => w.wort.toLowerCase() === wort.toLowerCase());
    if (exists) {
        showToast(`"${wort}" ya existe en tu lista`, 'error');
        return;
    }

    const newWord = {
        wort: capitalize(wort),
        artikel,                        // '-' = sin artículo
        plural: plural || '-',
        traduccion: meanings[0],        // primary (backwards compat)
        meanings,                       // array of all meanings
        addedAt: new Date().toISOString()
    };

    try {
        await addDoc(collection(db, 'palabras'), newWord);
        const artLabel = artikel !== '-' ? artikel + ' ' : '';
        showToast(`“${artLabel}${newWord.wort}” guardada correctamente ✓`);
        // Reset form (UI refresh happens via onSnapshot)
        document.getElementById('add-word-form').reset();
        document.getElementById('input-wort').focus();
    } catch (e) {
        console.error('Error guardando en Firestore:', e);
        showToast('Error al guardar la palabra', 'error');
    }
}

function updateRecentWords() {
    const container = document.getElementById('recent-words');
    const list = document.getElementById('recent-words-list');
    const recent = words.slice(-8).reverse();

    if (recent.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = '';
    list.innerHTML = recent.map(w => {
        const artLabel = w.artikel && w.artikel !== '-' ? `<span class="artikel">${w.artikel}</span> ` : '';
        const meaning = (w.meanings || [w.traduccion]).join(', ');
        return `<span class="chip">${artLabel}${w.wort} – ${meaning}</span>`;
    }).join('');
}

// ─── Study Mode ────────────────────────────────────────────────
function initStudyMode() {
    // Mode selection buttons
    document.querySelectorAll('.option-card').forEach(btn => {
        btn.addEventListener('click', () => startQuiz(btn.dataset.mode));
    });

    document.getElementById('btn-quiz-check').addEventListener('click', checkAnswer);
    document.getElementById('btn-quiz-next').addEventListener('click', nextQuestion);
    document.getElementById('btn-quiz-end').addEventListener('click', endQuiz);
    document.getElementById('btn-study-again').addEventListener('click', () => {
        hideAllStudyViews();
        document.getElementById('study-start').style.display = '';
    });

    // Enter key submits answer
    ['quiz-traduccion', 'quiz-wort'].forEach(id => {
        document.getElementById(id).addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const checkBtn = document.getElementById('btn-quiz-check');
                const nextBtn = document.getElementById('btn-quiz-next');
                if (nextBtn.style.display !== 'none') {
                    nextQuestion();
                } else {
                    checkAnswer();
                }
            }
        });
    });
}

function refreshStudyView() {
    hideAllStudyViews();
    if (words.length < 3) {
        document.getElementById('study-empty').style.display = '';
    } else {
        document.getElementById('study-start').style.display = '';
        document.getElementById('stat-total').textContent = words.length;
    }
}

function hideAllStudyViews() {
    ['study-empty', 'study-start', 'study-quiz', 'study-results'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function startQuiz(mode) {
    const shuffled = shuffleArray(words).slice(0, Math.min(words.length, 15));

    currentQuiz = {
        mode, // 'de-es', 'es-de', 'mixed'
        words: shuffled,
        index: 0,
        correct: 0,
        incorrect: 0,
    };

    hideAllStudyViews();
    document.getElementById('study-quiz').style.display = '';

    document.getElementById('quiz-correct').textContent = '0';
    document.getElementById('quiz-total-answered').textContent = '0';

    showQuestion();
}

function showQuestion() {
    if (!currentQuiz || currentQuiz.index >= currentQuiz.words.length) {
        showResults();
        return;
    }

    const word = currentQuiz.words[currentQuiz.index];
    let direction = currentQuiz.mode;
    if (direction === 'mixed') {
        direction = Math.random() < 0.5 ? 'de-es' : 'es-de';
    }
    currentQuiz.currentDirection = direction;

    // Progress
    const progress = ((currentQuiz.index) / currentQuiz.words.length) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${progress}%`;

    // Reset feedback
    const feedback = document.getElementById('quiz-feedback');
    feedback.style.display = 'none';
    feedback.className = 'quiz-feedback';

    const card = document.getElementById('quiz-card');
    card.className = 'quiz-card';

    // Show/hide inputs
    const deEsInputs = document.getElementById('quiz-inputs-de-es');
    const esDeInputs = document.getElementById('quiz-inputs-es-de');
    const btnCheck = document.getElementById('btn-quiz-check');
    const btnNext = document.getElementById('btn-quiz-next');

    btnCheck.style.display = '';
    btnNext.style.display = 'none';

    if (direction === 'de-es') {
        document.getElementById('quiz-direction').textContent = 'Alemán → Español';
        document.getElementById('quiz-prompt').textContent = word.wort;
        deEsInputs.style.display = '';
        esDeInputs.style.display = 'none';
        document.getElementById('quiz-artikel').value = '';
        document.getElementById('quiz-traduccion').value = '';
        // Hide artikel select if word has no article
        const artikelGroup = document.getElementById('quiz-artikel').closest('.form-group');
        if (word.artikel === '-') {
            document.getElementById('quiz-artikel').value = '-';
            artikelGroup.style.display = 'none';
        } else {
            artikelGroup.style.display = '';
        }
        setTimeout(() => document.getElementById('quiz-traduccion').focus(), 100);
    } else {
        // Show first meaning as prompt for ES→DE
        const prompt = (word.meanings || [word.traduccion])[0];
        document.getElementById('quiz-direction').textContent = 'Español → Alemán';
        document.getElementById('quiz-prompt').textContent = prompt;
        deEsInputs.style.display = 'none';
        esDeInputs.style.display = '';
        document.getElementById('quiz-artikel2').value = '';
        document.getElementById('quiz-wort').value = '';
        // Hide artikel select if word has no article
        const artikelGroup2 = document.getElementById('quiz-artikel2').closest('.form-group');
        if (word.artikel === '-') {
            document.getElementById('quiz-artikel2').value = '-';
            artikelGroup2.style.display = 'none';
        } else {
            artikelGroup2.style.display = '';
        }
        setTimeout(() => document.getElementById('quiz-wort').focus(), 100);
    }
}

function normalize(str) {
    return str.trim().toLowerCase().normalize('NFC');
}

function checkAnswer() {
    if (!currentQuiz) return;

    const word = currentQuiz.words[currentQuiz.index];
    const direction = currentQuiz.currentDirection;
    const wordHasNoArtikel = word.artikel === '-';

    // All valid meanings for this word (array support + legacy string)
    const allMeanings = (word.meanings && word.meanings.length > 0)
        ? word.meanings
        : word.traduccion.split(/[,;/]+/).map(s => s.trim());

    let artikelCorrect = false;
    let wordCorrect = false;
    let userArtikel, userWord;

    if (direction === 'de-es') {
        userArtikel = wordHasNoArtikel ? '-' : document.getElementById('quiz-artikel').value;
        userWord = normalize(document.getElementById('quiz-traduccion').value);
        artikelCorrect = wordHasNoArtikel ? true : (userArtikel === word.artikel);
        // Accept any one of the stored meanings
        wordCorrect = allMeanings.some(m => normalize(m) === userWord);
    } else {
        userArtikel = wordHasNoArtikel ? '-' : document.getElementById('quiz-artikel2').value;
        userWord = normalize(document.getElementById('quiz-wort').value);
        artikelCorrect = wordHasNoArtikel ? true : (userArtikel === word.artikel);
        wordCorrect = normalize(word.wort) === userWord;
    }

    const isCorrect = artikelCorrect && wordCorrect;
    const feedback = document.getElementById('quiz-feedback');
    const feedbackContent = document.getElementById('quiz-feedback-content');
    const card = document.getElementById('quiz-card');

    feedback.style.display = '';

    if (isCorrect) {
        currentQuiz.correct++;
        feedback.className = 'quiz-feedback correct';
        feedbackContent.textContent = '¡Correcto! ✓';
        card.className = 'quiz-card glow-correct';
    } else {
        currentQuiz.incorrect++;
        feedback.className = 'quiz-feedback incorrect';
        const artLabel = (word.artikel && word.artikel !== '-') ? word.artikel + ' ' : '';
        const meaningsList = allMeanings.join(', ');
        let correctAnswer;
        if (direction === 'de-es') {
            correctAnswer = `${artLabel}${word.wort} → ${meaningsList}`;
        } else {
            correctAnswer = `${meaningsList} → ${artLabel}${word.wort}`;
        }
        feedbackContent.innerHTML = `Incorrecto ✗<br><small>Respuesta correcta: <strong>${correctAnswer}</strong></small>`;
        card.className = 'quiz-card shake';
    }

    // Update score
    const totalAnswered = currentQuiz.correct + currentQuiz.incorrect;
    document.getElementById('quiz-correct').textContent = currentQuiz.correct;
    document.getElementById('quiz-total-answered').textContent = totalAnswered;

    // Toggle buttons
    document.getElementById('btn-quiz-check').style.display = 'none';
    document.getElementById('btn-quiz-next').style.display = '';
    document.getElementById('btn-quiz-next').focus();
}

function nextQuestion() {
    if (!currentQuiz) return;
    currentQuiz.index++;
    showQuestion();
}

function endQuiz() {
    showResults();
}

function showResults() {
    hideAllStudyViews();
    document.getElementById('study-results').style.display = '';

    const correct = currentQuiz ? currentQuiz.correct : 0;
    const incorrect = currentQuiz ? currentQuiz.incorrect : 0;
    const total = correct + incorrect;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    document.getElementById('result-correct').textContent = correct;
    document.getElementById('result-incorrect').textContent = incorrect;
    document.getElementById('result-percentage').textContent = `${pct}%`;

    // Update progress bar to 100%
    document.getElementById('quiz-progress-fill').style.width = '100%';

    currentQuiz = null;
}

// ─── Review Mode ───────────────────────────────────────────────
let reviewSort = { key: 'wort', dir: 'asc' };

function initReviewMode() {
    // Sort headers
    document.querySelectorAll('#review-table th.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const key = th.dataset.sort;
            if (reviewSort.key === key) {
                reviewSort.dir = reviewSort.dir === 'asc' ? 'desc' : 'asc';
            } else {
                reviewSort.key = key;
                reviewSort.dir = 'asc';
            }
            refreshReviewTable();
        });
    });

    // Filter
    document.getElementById('review-filter').addEventListener('input', refreshReviewTable);

    // Export
    document.getElementById('btn-export').addEventListener('click', exportCSV);
}

function refreshReviewTable() {
    const empty = document.getElementById('review-empty');
    const content = document.getElementById('review-content');

    if (words.length === 0) {
        empty.style.display = '';
        content.style.display = 'none';
        return;
    }

    empty.style.display = 'none';
    content.style.display = '';

    // Filter – search across all meanings
    const filterText = normalize(document.getElementById('review-filter').value);
    let filtered = words;
    if (filterText) {
        filtered = words.filter(w => {
            const allM = (w.meanings || [w.traduccion]).join(' ');
            return normalize(w.wort).includes(filterText) ||
                normalize(allM).includes(filterText) ||
                normalize(w.artikel).includes(filterText) ||
                normalize(w.plural).includes(filterText);
        });
    }

    // Sort
    filtered.sort((a, b) => {
        let valA = (a[reviewSort.key] || '').toLowerCase();
        let valB = (b[reviewSort.key] || '').toLowerCase();
        if (valA < valB) return reviewSort.dir === 'asc' ? -1 : 1;
        if (valA > valB) return reviewSort.dir === 'asc' ? 1 : -1;
        return 0;
    });

    // Update sort indicators
    document.querySelectorAll('#review-table th.sortable').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
        if (th.dataset.sort === reviewSort.key) {
            th.classList.add(reviewSort.dir === 'asc' ? 'sort-asc' : 'sort-desc');
        }
    });

    // Render
    const tbody = document.getElementById('review-table-body');
    tbody.innerHTML = filtered.map(w => {
        const artCell = (w.artikel && w.artikel !== '-')
            ? `<span class="artikel-${w.artikel}">${w.artikel}</span>`
            : `<span style="color:var(--text-muted)">—</span>`;
        const meaningsList = (w.meanings || [w.traduccion]).join(', ');
        return `
        <tr>
            <td>${artCell}</td>
            <td><strong>${w.wort}</strong></td>
            <td>${w.plural}</td>
            <td>${meaningsList}</td>
            <td class="col-actions">
                <button class="btn btn-icon btn-ghost" onclick="confirmDelete('${w.firestoreId}')" title="Eliminar">🗑️</button>
            </td>
        </tr>
    `;
    }).join('');

    // Count
    document.getElementById('review-count').textContent =
        `${filtered.length} palabra${filtered.length !== 1 ? 's' : ''}`;
}

function exportCSV() {
    if (words.length === 0) {
        showToast('No hay palabras para exportar', 'info');
        return;
    }
    const header = 'Artikel,Wort,Plural,Traduccion\n';
    const rows = words.map(w =>
        `${w.artikel},"${w.wort}","${w.plural}","${w.traduccion}"`
    ).join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocabulario_aleman.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV exportado correctamente ✓');
}

// ─── Delete Modal ──────────────────────────────────────────────
let deleteTargetFirestoreId = null;

function initModal() {
    document.getElementById('btn-modal-cancel').addEventListener('click', closeModal);
    document.getElementById('btn-modal-confirm').addEventListener('click', async () => {
        if (deleteTargetFirestoreId) {
            try {
                await deleteDoc(doc(db, 'palabras', deleteTargetFirestoreId));
                showToast('Palabra eliminada');
            } catch (e) {
                console.error('Error eliminando:', e);
                showToast('Error al eliminar la palabra', 'error');
            }
        }
        closeModal();
    });

    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
}

function confirmDelete(firestoreId) {
    const word = words.find(w => w.firestoreId === firestoreId);
    if (!word) return;
    deleteTargetFirestoreId = firestoreId;
    const artLabel = (word.artikel && word.artikel !== '-') ? word.artikel + ' ' : '';
    document.getElementById('modal-word-name').textContent =
        `${artLabel}${word.wort} – ${(word.meanings || [word.traduccion]).join(', ')}`;
    document.getElementById('modal-overlay').style.display = '';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    deleteTargetFirestoreId = null;
}

// ─── Expose globals for inline onclick attributes ───────────────
// ES modules don't auto-pollute window scope
window.confirmDelete = confirmDelete;
window.closeModal    = closeModal;
window.switchTab     = switchTab;
