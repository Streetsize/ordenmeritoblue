import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, update, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCG0-P03xXHk0_LwZ-JRkulyDhvio0NpZ8",
  authDomain: "ranking-residencias.firebaseapp.com",
  databaseURL: "https://ranking-residencias-default-rtdb.firebaseio.com",
  projectId: "ranking-residencias",
  storageBucket: "ranking-residencias.firebasestorage.app",
  messagingSenderId: "455818361669",
  appId: "1:455818361669:web:c16e96cddd06b280ab9c2c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ... [MANTENER AQUÍ TUS OBJETOS cuposPorEspecialidad Y datosResidencias INTACTOS] ...
const cuposPorEspecialidad = {
    "ANATOMÍA PATOLÓGICA (Primer nivel)": 4,
    "ANESTESIOLOGÍA (Primer nivel)": 8,
    "AUDIOLOGÍA (Primer nivel)": 2,
    "BIOQUÍMICA CLÍNICA (Primer nivel)": 10,
    "CARDIOLOGÍA PEDIÁTRICA (Segundo nivel)": 1,
    "CARDIOLOGÍA (Primer nivel)": 18,
    "CIRUGÍA CARDIOVASCULAR (Primer nivel)": 2,
    "CIRUGÍA CARDIOVASCULAR (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "CIRUGÍA ESTÉTICA, PLÁSTICA Y REPARADORA (SEGUNDO NIVEL) (Segundo nivel)": 2,
    "CIRUGÍA GENERAL (Primer nivel)": 16,
    "CIRUGÍA PEDIÁTRICA (Primer nivel)": 1,
    "CIRUGÍA VASCULAR PERIFÉRICA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "CLÍNICA MÉDICA (Primer nivel)": 57,
    "CRECIMIENTO Y DESARROLLO (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "DERMATOLOGÍA (Primer nivel)": 4,
    "DIAGNÓSTICO POR IMÁGENES (Primer nivel)": 14,
    "DIAGNÓSTICO POR IMÁGENES Y MEDICINA NUCLEAR (ARTICULADA) (Primer nivel)": 2,
    "EMERGENTOLOGÍA (Primer nivel)": 8,
    "ENDOCRINOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "ENDOCRINOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "ENDODONCIA (Primer nivel)": 1,
    "ENFERMERÍA COMUNITARIA (Primer nivel)": 7,
    "ENFERMERÍA EN CONTROL DE INFECCIONES (Primer nivel)": 2,
    "ENFERMERÍA EN CUIDADOS CRÍTICOS (Primer nivel)": 6,
    "ENFERMERÍA EN SALUD MENTAL (Primer nivel)": 3,
    "ENFERMERÍA GENERALISTA MÉDICO QUIRÚRGICA (Primer nivel)": 6,
    "ENFERMERÍA NEONATAL (Primer nivel)": 4,
    "ENFERMERÍA PEDIÁTRICA (Primer nivel)": 4,
    "FARMACIA HOSPITALARIA (Primer nivel)": 7,
    "FISIATRÍA (Primer nivel)": 5,
    "GASTROENTEROLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": 4,
    "GERIATRÍA Y GERONTOLOGÍA (Primer nivel)": 2,
    "GINECOLOGÍA INFANTO JUVENIL (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "HEMATOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "HEMATOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": 2,
    "HEMOTERAPIA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "INFECTOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "INFECTOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": 2,
    "KINESIOLOGÍA EN FISIATRÍA (Primer nivel)": 2,
    "KINESIOLOGÍA EN NEUROLOGÍA (Primer nivel)": 2,
    "KINESIOLOGÍA EN RESPIRATORIO DE ADULTOS (Primer nivel)": 5,
    "KINESIOLOGÍA GENERAL (Primer nivel)": 6,
    "KINESIOLOGÍA PEDIÁTRICA (Primer nivel)": 2,
    "MEDICINA DE FAMILIA (Primer nivel)": 21,
    "NEFROLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "NEFROLOGÍA (Primer nivel)": 2,
    "NEONATOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": 6,
    "NEUMONOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": 2,
    "NEUMONOLOGÍA (Primer nivel)": 2,
    "NEUMONOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "NEUROCIRUGÍA (Primer nivel)": 1,
    "NEUROLOGÍA (Primer nivel)": 2,
    "NEUROLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": 2,
    "NUTRICIÓN Y ALIMENTACIÓN DEL ADULTO (Primer nivel)": 5,
    "NUTRICIÓN Y ALIMENTACIÓN INFANTOJUVENIL (Primer nivel)": 2,
    "ODONTOLOGÍA DE ALTA COMPLEJIDAD (Primer nivel)": 2,
    "ODONTOLOGÍA PREVENTIVA Y SOCIAL (Primer nivel)": 1,
    "ODONTOPEDIATRÍA (Primer nivel)": 2,
    "OFTALMOLOGÍA (Primer nivel)": 9,
    "ONCOLOGÍA CLÍNICA (SEGUNDO NIVEL) (Segundo nivel)": 2,
    "ONCOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "ORTOPEDIA Y TRAUMATOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": 2,
    "ORTOPEDIA Y TRAUMATOLOGÍA (Primer nivel)": 11,
    "OTORRINOLARINGOLOGÍA (Primer nivel)": 3,
    "PEDIATRÍA (Primer nivel)": 34,
    "PEDIATRÍA Y NEONATOLOGÍA (Ambos niveles)": 12,
    "PEDIATRÍA Y TERAPIA INTENSIVA (Ambos niveles)": 5,
    "PSICOLOGÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (RISAM) (Primer nivel)": 22,
    "PSICOLOGÍA INFANTOJUVENIL (SEGUNDO NIVEL) (Segundo nivel)": 5,
    "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)": 26,
    "PSIQUIATRIA EN SALUD MENTAL COMUNITARIA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "PSIQUIATRÍA INFANTOJUVENIL (SEGUNDO NIVEL) (Segundo nivel)": 7,
    "RADIOTERAPIA (SEGUNDO NIVEL) (Segundo nivel)": 2,
    "REUMATOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "TERAPIA INTENSIVA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "TERAPIA INTENSIVA (Primer nivel)": 19,
    "TOCOGINECOLOGÍA (Primer nivel)": 23,
    "TRABAJO SOCIAL EN SALUD MENTAL COMUNITARIA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "TRABAJO SOCIAL EN SALUD MENTAL INFANTO JUVENIL (SEGUNDO NIVEL) (Segundo nivel)": 5,
    "TRABAJO SOCIAL EN SALUD PÚBLICA (Primer nivel)": 2,
    "TRASPLANTE HEPATICO Y CIRUGIA HEPATO BILIO PANCREATICA (Segundo nivel)": 1,
    "TRASPLANTOLOGÍA CLÍNICA INTRATORÁCICA (SEGUNDO NIVEL) (Segundo nivel)": 1,
    "UROLOGÍA (Primer nivel)": 5
};

const datosResidencias = {
    "ANATOMÍA PATOLÓGICA (Primer nivel)": ["Hospital Central", "Hospital Luis Lagomaggiore"],
    "ANESTESIOLOGÍA (Primer nivel)": ["Hospital Central", "Hospital Luis Lagomaggiore", "Hospital Teodoro Schestakow"],
    "AUDIOLOGÍA (Primer nivel)": ["Xeltahuina - OSEP"],
    "BIOQUÍMICA CLÍNICA (Primer nivel)": ["Hospital Alfredo Perrupato", "Hospital Central", "Hospital Diego Paroissien", "Hospital Infantil Humberto Notti", "Hospital Luis Lagomaggiore", "Hospital Militar"],
    "CARDIOLOGÍA PEDIÁTRICA (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "CARDIOLOGÍA (Primer nivel)": ["Clínica de Cuyo", "Clínica Pelegrina (Usar Clínica Santa Clara)", "Hospital Central", "Hospital Español", "Hospital Italiano", "Hospital Luis Lagomaggiore", "Hospital Nuestra Señora del Carmen OSEP", "Hospital Teodoro Schestakow"],
    "CIRUGÍA CARDIOVASCULAR (Primer nivel)": ["Hospital Central", "Hospital Italiano"],
    "CIRUGÍA CARDIOVASCULAR (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Español"],
    "CIRUGÍA ESTÉTICA, PLÁSTICA Y REPARADORA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Italiano", "Hospital Luis Lagomaggiore"],
    "CIRUGÍA GENERAL (Primer nivel)": ["Hospital Alfredo Perrupato", "Hospital Antonio Scaravelli", "Hospital Central", "Hospital Enfermeros Argentinos", "Hospital Español", "Hospital Italiano", "Hospital Luis Lagomaggiore", "Hospital Militar"],
    "CIRUGÍA PEDIÁTRICA (Primer nivel)": ["Hospital Infantil Humberto Notti"],
    "CIRUGÍA VASCULAR PERIFÉRICA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Central"],
    "CLÍNICA MÉDICA (Primer nivel)": ["Clínica Pelegrina (Usar Clínica Santa Clara)", "Clínica Santa María Delta", "Hospital Alfredo Perrupato", "Hospital Antonio Scaravelli", "Hospital Carlos Saporiti", "Hospital Central", "Hospital Diego Paroissien", "Hospital Español", "Hospital Italiano", "Hospital Luis Lagomaggiore", "Hospital Militar", "Hospital Nuestra Señora del Carmen OSEP", "Hospital Santa Isabel de Hungría", "Hospital Teodoro Schestakow"],
    "CRECIMIENTO Y DESARROLLO (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "DERMATOLOGÍA (Primer nivel)": ["Hospital Central", "Hospital Luis Lagomaggiore", "Hospital Nuestra Señora del Carmen OSEP"],
    "DIAGNÓSTICO POR IMÁGENES (Primer nivel)": ["Fundación Escuela de Medicina Nuclear (FUESMEN)", "Hospital Central", "Hospital Español", "Hospital Italiano", "Hospital Nuestra Señora del Carmen OSEP", "Medicina por Imágenes S.A."],
    "DIAGNÓSTICO POR IMÁGENES Y MEDICINA NUCLEAR (ARTICULADA) (Primer nivel)": ["Fundación Escuela de Medicina Nuclear (FUESMEN)"],
    "EMERGENTOLOGÍA (Primer nivel)": ["Hospital Central", "Hospital Luis Lagomaggiore", "Hospital Teodoro Schestakow"],
    "ENDOCRINOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "ENDOCRINOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Central"],
    "ENDODONCIA (Primer nivel)": ["Hospital Luis Lagomaggiore"],
    "ENFERMERÍA COMUNITARIA (Primer nivel)": ["Hospital Carlos Saporiti", "Hospital Enfermeros Argentinos"],
    "ENFERMERÍA EN CONTROL DE INFECCIONES (Primer nivel)": ["Hospital Central", "Hospital Luis Lagomaggiore"],
    "ENFERMERÍA EN CUIDADOS CRÍTICOS (Primer nivel)": ["Hospital Militar", "Hospital Teodoro Schestakow"],
    "ENFERMERÍA EN SALUD MENTAL (Primer nivel)": ["Hospital Carlos Pereyra"],
    "ENFERMERÍA GENERALISTA MÉDICO QUIRÚRGICA (Primer nivel)": ["Hospital Central", "Hospital Teodoro Schestakow"],
    "ENFERMERÍA NEONATAL (Primer nivel)": ["Hospital Infantil Humberto Notti"],
    "ENFERMERÍA PEDIÁTRICA (Primer nivel)": ["Hospital Infantil Humberto Notti"],
    "FARMACIA HOSPITALARIA (Primer nivel)": ["Hospital Alfredo Perrupato", "Hospital Central", "Hospital Infantil Humberto Notti"],
    "FISIATRÍA (Primer nivel)": ["Fundación San Andres", "Hospital José Nestor Lencinas"],
    "GASTROENTEROLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Central", "Hospital Luis Lagomaggiore", "Hospital Nuestra Señora del Carmen OSEP", "Hospital Teodoro Schestakow"],
    "GERIATRÍA Y GERONTOLOGÍA (Primer nivel)": ["Hospital José Nestor Lencinas"],
    "GINECOLOGÍA INFANTO JUVENIL (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "HEMATOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "HEMATOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Central", "Hospital Nuestra Señora del Carmen OSEP"],
    "HEMOTERAPIA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Central"],
    "INFECTOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "INFECTOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Central", "Hospital Luis Lagomaggiore"],
    "KINESIOLOGÍA EN FISIATRÍA (Primer nivel)": ["Hospital José Nestor Lencinas"],
    "KINESIOLOGÍA EN NEUROLOGÍA (Primer nivel)": ["Hospital Central"],
    "KINESIOLOGÍA EN RESPIRATORIO DE ADULTOS (Primer nivel)": ["Fundación San Andres", "Hospital Central"],
    "KINESIOLOGÍA GENERAL (Primer nivel)": ["Hospital Alfredo Perrupato", "Hospital Luis Lagomaggiore", "Hospital Teodoro Schestakow"],
    "KINESIOLOGÍA PEDIÁTRICA (Primer nivel)": ["Hospital Infantil Humberto Notti"],
    "MEDICINA DE FAMILIA (Primer nivel)": ["Área Departamental de Salud de Godoy Cruz", "Área Departamental de Salud de Maipú", "Hospital Carlos Saporiti", "Hospital Domingo Sícoli", "Hospital Enfermeros Argentinos", "Xeltahuina - OSEP"],
    "NEFROLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "NEFROLOGÍA (Primer nivel)": ["Hospital Central"],
    "NEONATOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Diego Paroissien", "Hospital Infantil Humberto Notti", "Hospital Luis Lagomaggiore", "Hospital Teodoro Schestakow"],
    "NEUMONOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "NEUMONOLOGÍA (Primer nivel)": ["Hospital Luis Lagomaggiore"],
    "NEUMONOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Central"],
    "NEUROCIRUGÍA (Primer nivel)": ["Hospital Central"],
    "NEUROLOGÍA (Primer nivel)": ["Hospital Luis Lagomaggiore"],
    "NEUROLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Nuestra Señora del Carmen OSEP"],
    "NUTRICIÓN Y ALIMENTACIÓN DEL ADULTO (Primer nivel)": ["Hospital Alfredo Perrupato", "Hospital Central", "Hospital Luis Lagomaggiore", "Hospital Teodoro Schestakow"],
    "NUTRICIÓN Y ALIMENTACIÓN INFANTOJUVENIL (Primer nivel)": ["Hospital Infantil Humberto Notti"],
    "ODONTOLOGÍA DE ALTA COMPLEJIDAD (Primer nivel)": ["Hospital Central"],
    "ODONTOLOGÍA PREVENTIVA Y SOCIAL (Primer nivel)": ["Centro Integral Odontológico - OSEP"],
    "ODONTOPEDIATRÍA (Primer nivel)": ["Hospital Alfredo Perrupato", "Hospital Infantil Humberto Notti"],
    "OFTALMOLOGÍA (Primer nivel)": ["Clínica de Ojos Dra. Mulet", "Hospital Central", "Instituto CAIMARI S.A.", "Instituto Zaldivar"],
    "ONCOLOGÍA CLÍNICA (SEGUNDO NIVEL) (Segundo nivel)": ["Fundación Escuela de Medicina Nuclear (FUESMEN)"],
    "ONCOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "ORTOPEDIA Y TRAUMATOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "ORTOPEDIA Y TRAUMATOLOGÍA (Primer nivel)": ["Clínica Francesa (Guaymallen)", "Hospital Alfredo Perrupato", "Hospital Central", "Hospital Español", "Hospital Luis Lagomaggiore", "Hospital Militar"],
    "OTORRINOLARINGOLOGÍA (Primer nivel)": ["Clínica Godoy Cruz", "Hospital Central", "Hospital Luis Lagomaggiore"],
    "PEDIATRÍA (Primer nivel)": ["Clínica Santa María Delta", "Hospital Alfredo Perrupato", "Hospital Carlos Saporiti", "Hospital Diego Paroissien", "Hospital Dr. Ramón Carrillo", "Hospital Infantil Humberto Notti", "Hospital Pediátrico Alexander Fleming OSEP", "Hospital Teodoro Schestakow"],
    "PEDIATRÍA Y NEONATOLOGÍA (Ambos niveles)": ["Hospital Diego Paroissien", "Hospital Infantil Humberto Notti", "Hospital Luis Lagomaggiore"],
    "PEDIATRÍA Y TERAPIA INTENSIVA (Ambos niveles)": ["Hospital Infantil Humberto Notti"],
    "PSICOLOGÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (RISAM) (Primer nivel)": ["Hospital Alfredo Perrupato", "Hospital Carlos Pereyra", "Hospital Carlos Saporiti", "Hospital Central", "Hospital El Sauce", "Hospital Luis Lagomaggiore", "Hospital Nuestra Señora del Carmen OSEP", "Hospital Teodoro Schestakow", "Hospital Victorino Tagarelli"],
    "PSICOLOGÍA INFANTOJUVENIL (SEGUNDO NIVEL) (Segundo nivel)": ["Dirección de Salud Mental y Adicciones", "Hospital Pediátrico Alexander Fleming OSEP"],
    "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)": ["Hospital Alfredo Perrupato", "Hospital Carlos Pereyra", "Hospital Carlos Saporiti", "Hospital Central", "Hospital El Sauce", "Hospital Luis Lagomaggiore", "Hospital Nuestra Señora del Carmen OSEP", "Hospital Teodoro Schestakow", "Hospital Victorino Tagarelli"],
    "PSIQUIATRIA EN SALUD MENTAL COMUNITARIA (SEGUNDO NIVEL) (Segundo nivel)": ["Dirección de Salud Mental y Adicciones"],
    "PSIQUIATRÍA INFANTOJUVENIL (SEGUNDO NIVEL) (Segundo nivel)": ["Dirección de Salud Mental y Adicciones", "Hospital Pediátrico Alexander Fleming OSEP"],
    "RADIOTERAPIA (SEGUNDO NIVEL) (Segundo nivel)": ["Fundación Escuela de Medicina Nuclear (FUESMEN)"],
    "REUMATOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Nuestra Señora del Carmen OSEP"],
    "TERAPIA INTENSIVA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Infantil Humberto Notti"],
    "TERAPIA INTENSIVA (Primer nivel)": ["Hospital Carlos Saporiti", "Hospital Central", "Hospital Español", "Hospital Luis Lagomaggiore", "Hospital Nuestra Señora del Carmen OSEP", "Hospital Teodoro Schestakow"],
    "TOCOGINECOLOGÍA (Primer nivel)": ["Hospital Alfredo Perrupato", "Hospital Diego Paroissien", "Hospital Español", "Hospital Italiano", "Hospital Luis Lagomaggiore", "Hospital Obstetrico Virgen de la Misericordia OSEP", "Hospital Teodoro Schestakow"],
    "TRABAJO SOCIAL EN SALUD MENTAL COMUNITARIA (SEGUNDO NIVEL) (Segundo nivel)": ["Dirección de Salud Mental y Adicciones"],
    "TRABAJO SOCIAL EN SALUD MENTAL INFANTO JUVENIL (SEGUNDO NIVEL) (Segundo nivel)": ["Dirección de Salud Mental y Adicciones", "Hospital Pediátrico Alexander Fleming OSEP"],
    "TRABAJO SOCIAL EN SALUD PÚBLICA (Primer nivel)": ["Hospital Luis Lagomaggiore"],
    "TRASPLANTE HEPATICO Y CIRUGIA HEPATO BILIO PANCREATICA (Segundo nivel)": ["Hospital Central"],
    "TRASPLANTOLOGÍA CLÍNICA INTRATORÁCICA (SEGUNDO NIVEL) (Segundo nivel)": ["Hospital Central"],
    "UROLOGÍA (Primer nivel)": ["Hospital Central", "Hospital Español", "Uroclínica"]
};

let registrosBD = [];
let llavesBD = [];
let indiceUsuarioActual = -1;
let miDNI = "";

const paso1 = document.getElementById('paso1');
const paso2 = document.getElementById('paso2');
const paso3 = document.getElementById('paso3');
const loading = document.getElementById('loading');
const errorBox = document.getElementById('errorBox');
const resultadoFinal = document.getElementById('resultadoFinal');
const tituloTabla = document.getElementById('tituloTabla');

const especialidadInput = document.getElementById('especialidad');
const hospitalSelect = document.getElementById('hospital');
const especialidadLibreInput = document.getElementById('especialidadLibre');
const listaEsp = document.getElementById('listaEsp');
const listaEspLibre = document.getElementById('listaEspLibre');

window.onload = async function() {
    const especialidades = Object.keys(datosResidencias).sort();
    
    // Lista de palabras clave de carreras que queremos ocultar en TODA la página
    const carrerasNoMedicas = [
        "AUDIOLOGÍA", "BIOQUÍMICA", "ENDODONCIA", "ENFERMERÍA", 
        "FARMACIA", "KINESIOLOGÍA", "NUTRICIÓN", "ODONTOLOGÍA", 
        "ODONTOPEDIATRÍA", "PSICOLOGÍA", "TRABAJO SOCIAL"
    ];

    especialidades.forEach(esp => {
        // Filtramos para asegurarnos de que sea Primer Nivel y NO esté en la lista negra
        const esPrimerNivel = esp.includes("(Primer nivel)");
        const esNoMedica = carrerasNoMedicas.some(carrera => esp.includes(carrera));
        
        if (esPrimerNivel && !esNoMedica) {
            // Se agregan las opciones limpias a AMBOS selectores
            listaEsp.appendChild(new Option(esp, esp));
            listaEspLibre.appendChild(new Option(esp, esp));
        }
    });

    // Lógica de carga de Firebase con sistema de Caché (Ahorro de datos - 30 minutos)
    try {
        const cacheKey = 'padronResidencias_v1';
        const cacheTimeKey = 'tiempoDescarga_v1';
        const tiempoCacheMinutos = 10; // 30 minutos de vida para el caché

        let data = null;
        const now = new Date().getTime();
        const lastFetch = localStorage.getItem(cacheTimeKey);

        // 1. Verificamos si tenemos el padrón guardado y si es reciente
        if (lastFetch && (now - lastFetch) < (tiempoCacheMinutos * 60 * 1000)) {
            data = JSON.parse(localStorage.getItem(cacheKey));
            console.log("Padrón cargado desde la memoria (Ahorrando Firebase)");
        } else {
            // 2. Si no hay caché o está viejo, descargamos de Firebase
            const snapshot = await get(ref(db, 'postulantes'));
            if (snapshot.exists()) {
                data = snapshot.val();
                
                // Limpiamos la rama de estadísticas para que no sume al padrón
                if (data.estadisticas_uso) {
                    delete data.estadisticas_uso;
                }
                
                // Guardamos en la memoria del navegador para la próxima
                localStorage.setItem(cacheKey, JSON.stringify(data));
                localStorage.setItem(cacheTimeKey, now);
            }
        }

        // 3. Procesamos los datos y dibujamos la barra
        if (data) {
            // Filtramos para asegurarnos de que solo entren los postulantes válidos (ignorando nodos de configuración)
            registrosBD = Array.isArray(data) ? data : Object.values(data).filter(r => r && r.DNI);
            llavesBD = Array.isArray(data) ? data.map((_, i) => i) : Object.keys(data).filter(k => data[k] && data[k].DNI);
            
            const totalPostulantes = registrosBD.length;
            const conPromedio = registrosBD.filter(r => r.PROMEDIO && String(r.PROMEDIO).trim() !== "EN" && String(r.PROMEDIO).trim() !== "").length;
            
            const porcentaje = ((conPromedio / totalPostulantes) * 100).toFixed(1);
            
            document.getElementById('textoPorcentaje').innerText = porcentaje;
            setTimeout(() => {
                document.getElementById('barraProgreso').style.width = porcentaje + '%';
            }, 300);
            
            if (typeof actualizarGraficosFlujo === 'function') {
                actualizarGraficosFlujo(registrosBD);
            }
        }
    } catch (error) {
        console.error("No se pudo cargar la estadística inicial:", error);
        document.getElementById('textoPorcentaje').innerText = "--";
    }
};

// ==========================================
// NUEVO: SISTEMA DE CENSURA Y PRIVACIDAD
// ==========================================
function censurarDNI(registro) {
    // Si el usuario pidió ocultarlo de forma completa, mostramos "Privado"
    if (registro.OCULTO === true) return "Privado";
    
    if (!registro.DNI) return "";
    let str = registro.DNI.toString();
    
    // Si por algún error el DNI tiene 3 dígitos o menos, lo ocultamos por completo
    if (str.length <= 3) return "***";
    
    // Reemplazamos los 3 primeros caracteres por "***" y concatenamos el resto
    return "***" + str.substring(3);
}
// ==========================================
// EVENTOS DEL APARTADO DE PRIVACIDAD (FIREBASE)
// ==========================================
document.getElementById('btnOcultarDNI').addEventListener('click', async () => {
    const dniInput = document.getElementById('dniOcultarInput').value.trim();
    const btn = document.getElementById('btnOcultarDNI');
    
    if (!dniInput) {
        alert("Por favor, ingresá un DNI válido.");
        return;
    }
    
    const textoOriginal = btn.innerText;
    btn.innerText = "Procesando...";
    btn.disabled = true; // Desactivamos para evitar doble clic

    try {
        // Buscamos el DNI en la base de datos que ya tenemos en memoria
        let indiceOcultar = -1;
        let registroOcultar = null;

        for (let i = 0; i < registrosBD.length; i++) {
            if (registrosBD[i] && registrosBD[i].DNI && registrosBD[i].DNI.toString() === dniInput) {
                indiceOcultar = llavesBD[i];
                registroOcultar = registrosBD[i];
                break;
            }
        }

        if (indiceOcultar !== -1) {
            // Lo actualizamos en Firebase para que aplique a TODOS los usuarios instantáneamente
            const updates = {};
            updates[`postulantes/${indiceOcultar}/OCULTO`] = true;
            await update(ref(db), updates);
            localStorage.setItem('miDniValidado', miDNI);

            // Lo actualizamos en la memoria local por si sigue navegando sin recargar la página
            registroOcultar.OCULTO = true;
            
            // Si tiene una tabla abierta, la actualizamos para que el cambio se vea en vivo
            if (paso3.style.display === 'block') {
                const esp = tituloTabla.innerText.replace("Ranking: ", "");
                if (datosResidencias[esp]) generarTabla(esp, miDNI);
            }

            // Feedback visual de éxito
            document.getElementById('dniOcultarInput').value = '';
            btn.innerText = "¡Oculto para todos!";
            btn.style.backgroundColor = "#28a745"; // Color verde
        } else {
            alert("No encontramos ese DNI en el padrón.");
            btn.innerText = textoOriginal;
        }
    } catch (error) {
        alert("Hubo un error de conexión: " + error.message);
        btn.innerText = textoOriginal;
    }

    // Devolvemos el botón a la normalidad después de 3 segundos
    setTimeout(() => {
        btn.innerText = "Ocultar mi DNI";
        btn.style.backgroundColor = "#6c757d";
        btn.disabled = false;
    }, 3000);
});

// Permitir usar la tecla Enter estando dentro del input de privacidad
document.getElementById('dniOcultarInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('btnOcultarDNI').click();
    }
});
especialidadInput.addEventListener('input', function() {
    const espSelec = this.value.trim();
    hospitalSelect.innerHTML = '<option value="">Selecciona un hospital...</option>';
    
    if (datosResidencias[espSelec]) {
        hospitalSelect.disabled = false;
        datosResidencias[espSelec].sort().forEach(hosp => {
            hospitalSelect.appendChild(new Option(hosp, hosp));
        });
    } else {
        hospitalSelect.disabled = true;
    }
});

function mostrarCarga(mostrar) {
    loading.style.display = mostrar ? 'block' : 'none';
    errorBox.style.display = 'none';
}

function mostrarError(mensaje) {
    loading.style.display = 'none';
    errorBox.style.display = 'block';
    errorBox.innerHTML = `<strong>Error:</strong> ${mensaje}`;
}

function coincideEspecialidad(espDB, espSeleccionada) {
    if (!espDB || !espSeleccionada) return false;
    if (espDB === espSeleccionada) return true;
    
    const normalizar = (str) => str.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f´]/g, "").trim();
    const dbLimpia = normalizar(espDB);
    const selectLimpia = normalizar(espSeleccionada.split("(")[0]);
    
    // Comparamos si son exactamente iguales o si el nombre limpio empieza con la selección exacta seguida de un espacio
    return dbLimpia === selectLimpia || dbLimpia.startsWith(selectLimpia + " ");
}

function obtenerValorOrden(registro) {
    if (registro.NOTA_FINAL && !isNaN(registro.NOTA_FINAL)) {
        return parseFloat(registro.NOTA_FINAL);
    }
    const notaEx = parseFloat(registro.NOTA) || 0;
    const promedioEstimado = 8.0; 
    const puntosExamen = notaEx * 0.90;
    const puntosPromedio = promedioEstimado * 0.5;
    const puntosMendoza = 5; 
    return puntosExamen + puntosPromedio + puntosMendoza;
}

function generarTabla(especialidadABuscar, dniSeleccionado = null) {
    let competidores = registrosBD.filter(p => coincideEspecialidad(p.ESPECIALIDAD, especialidadABuscar));
    
    const NOTA_MINIMA_VISIBLE = 50; 
    competidores = competidores.filter(p => {
        const notaExamen = parseFloat(p.NOTA) || 0;
        return notaExamen >= NOTA_MINIMA_VISIBLE || (dniSeleccionado && p.DNI.toString() === dniSeleccionado);
    });

    competidores.sort((a, b) => obtenerValorOrden(b) - obtenerValorOrden(a));

    const tbody = document.querySelector('#tablaCompetidores tbody');
    tbody.innerHTML = '';
    
    let miPosicion = 0;
    let cuposDisponibles = cuposPorEspecialidad[especialidadABuscar] || 0;

    competidores.forEach((c, index) => {
        const tr = document.createElement('tr');
        const puestoActual = index + 1;
        
        if (dniSeleccionado && c.DNI.toString() === dniSeleccionado) {
            tr.classList.add('fila-usuario');
            miPosicion = puestoActual;
        }

        if (cuposDisponibles > 0 && puestoActual > cuposDisponibles) {
            tr.classList.add('fila-afuera');
        }
        
        if (cuposDisponibles > 0 && puestoActual === cuposDisponibles + 1) {
            tr.classList.add('fila-corte');
        }

        let valorMostrado = obtenerValorOrden(c).toFixed(2);
        let iconoEstado = c.NOTA_FINAL ? '✅' : '⏳ (Prov.)';
        let valPromedio = c.PROMEDIO ? c.PROMEDIO : 'Est. (8.0)';
        let valHospital = c.HTAL ? c.HTAL : '-';

        let contenidoPosicion = `<strong>${puestoActual}</strong>`;
        if (cuposDisponibles > 0 && puestoActual === cuposDisponibles + 1) {
            contenidoPosicion += `<span class="etiqueta-corte">Límite Cupos</span>`;
        }
        
        // APLICANDO LA CENSURA DEL DNI AQUÍ
        let dniMostrado = censurarDNI(c);

        tr.innerHTML = `
            <td>${contenidoPosicion}</td>
            <td>${dniMostrado}</td>
            <td>${c.NOTA}</td>
            <td>${valPromedio}</td>
            <td><strong>${valorMostrado}</strong> <span style="font-size:0.8rem">${iconoEstado}</span></td>
            <td>${valHospital}</td>
        `;
        tbody.appendChild(tr);
    });
    generarDesglosPorHospitales(especialidadABuscar, dniSeleccionado);
    return { total: competidores.length, miPosicion: miPosicion };
    
}

document.getElementById('btnVerLibre').addEventListener('click', async () => {
    const espElegida = especialidadLibreInput.value.trim();
    if (!espElegida || !datosResidencias[espElegida]) return mostrarError("Elegí o escribí una especialidad válida de la lista.");

    mostrarCarga(true);
    
    try {
        const snapshot = await get(ref(db, 'postulantes'));
        if (!snapshot.exists()) throw new Error("La base de datos está vacía.");
        
        const data = snapshot.val();
        registrosBD = Array.isArray(data) ? data : Object.values(data);
        
        generarTabla(espElegida, null);
        registrarUso("VER_RANKING", "Visitante", espElegida);
        
        resultadoFinal.style.display = 'none';
        tituloTabla.innerText = `Ranking: ${espElegida}`;
        
        mostrarCarga(false);
        paso1.style.display = 'none';
        paso3.style.display = 'block';
    } catch (error) {
        mostrarError(error.message);
    }
});

// Aceptar DNI al hacer clic
document.getElementById('btnSiguiente').addEventListener('click', async () => {
    let dniInput = document.getElementById('dniBuscador').value.trim();
        
    if (!dniInput) return mostrarError("Debes ingresar un DNI.");

    mostrarCarga(true);
    document.getElementById('btnSiguiente').disabled = true;

    try {
        const snapshot = await get(ref(db, 'postulantes'));
        if (!snapshot.exists()) throw new Error("La base de datos está vacía.");

        const data = snapshot.val();
        registrosBD = Array.isArray(data) ? data : Object.values(data);
        llavesBD = Array.isArray(data) ? data.map((_, i) => i) : Object.keys(data);
        
        indiceUsuarioActual = -1;
        
        for (let i = 0; i < registrosBD.length; i++) {
            if (registrosBD[i] && registrosBD[i].DNI && registrosBD[i].DNI.toString() === dniInput) {
                indiceUsuarioActual = llavesBD[i];
                miDNI = dniInput;
                break;
            }
        }

        if (indiceUsuarioActual === -1) {
            mostrarError("DNI no encontrado en el padrón de examen.");
            document.getElementById('btnSiguiente').disabled = false;
            return;
        }

        const miRegistro = registrosBD[llavesBD.indexOf(indiceUsuarioActual)];
        
        document.getElementById('notaExamen').value = miRegistro.NOTA;
        if (miRegistro.PROMEDIO) document.getElementById('promedio').value = miRegistro.PROMEDIO;
        
        if (miRegistro.ESPECIALIDAD) {
            especialidadInput.value = miRegistro.ESPECIALIDAD;
            especialidadInput.dispatchEvent(new Event('input'));
            
            if (miRegistro.HTAL) hospitalSelect.value = miRegistro.HTAL;
        }

        mostrarCarga(false);
        paso1.style.display = 'none';
        paso2.style.display = 'block';

    } catch (error) {
        mostrarError(error.message);
        document.getElementById('btnSiguiente').disabled = false;
    }
});

document.getElementById('btnVolver').addEventListener('click', () => {
    paso2.style.display = 'none';
    paso1.style.display = 'block';
    document.getElementById('btnSiguiente').disabled = false;
    errorBox.style.display = 'none';
});

document.getElementById('btnGuardar').addEventListener('click', async () => {
    const promedioTxt = document.getElementById('promedio').value;
    if (!promedioTxt) return mostrarError("Debes ingresar tu promedio.");
    
    const promedio = parseFloat(promedioTxt.replace(',', '.'));
    const especialidad = especialidadInput.value.trim();
    const hospital = hospitalSelect.value;
    const estudioMendoza = document.getElementById('estudioMendoza').checked;

    if (!especialidad || !datosResidencias[especialidad] || !hospital) {
        return mostrarError("Asegurate de haber elegido una especialidad válida de la lista y un hospital.");
    }

    mostrarCarga(true);
    document.getElementById('btnGuardar').disabled = true;

    try {
        const miRegistro = registrosBD[llavesBD.indexOf(indiceUsuarioActual)];
        const notaExamen = parseFloat(miRegistro.NOTA);

        const puntosExamen = notaExamen * 0.90;
        const puntosPromedio = promedio * 0.5;
        const puntosMendoza = estudioMendoza ? 5 : 0;
        const notaFinal = (puntosExamen + puntosPromedio + puntosMendoza).toFixed(2);

        const updates = {};
        updates[`postulantes/${indiceUsuarioActual}/PROMEDIO`] = promedio;
        updates[`postulantes/${indiceUsuarioActual}/ESPECIALIDAD`] = especialidad;
        updates[`postulantes/${indiceUsuarioActual}/HTAL`] = hospital;
        updates[`postulantes/${indiceUsuarioActual}/NOTA_FINAL`] = parseFloat(notaFinal);

        await update(ref(db), updates);
        registrarUso("CARGA_PROMEDIO", miDNI, especialidad);

        miRegistro.PROMEDIO = promedio;
        miRegistro.ESPECIALIDAD = especialidad;
        miRegistro.HTAL = hospital;
        miRegistro.NOTA_FINAL = parseFloat(notaFinal);
        actualizarGraficosFlujo(registrosBD);

        let resumen = generarTabla(especialidad, miDNI);

        resultadoFinal.style.display = 'block';
        resultadoFinal.innerHTML = `
            <h3>¡Datos actualizados con éxito!</h3>
            <p style="font-size: 1.1rem; margin: 10px 0;">Tu posición actual es <strong>${resumen.miPosicion} de ${resumen.total}</strong> postulantes en ${especialidad}.</p>
            <p>Nota Examen: ${notaExamen} | Promedio: ${promedio} ${estudioMendoza ? '| (+5 pts Mza)' : ''}</p>
            <p style="font-size: 1.2rem; color: #155724;"><strong>Nota Final Definitiva: ${notaFinal}</strong></p>
        `;
        tituloTabla.innerText = "Comparativa en tu Especialidad";

        mostrarCarga(false);
        paso2.style.display = 'none';
        paso3.style.display = 'block';

    } catch (error) {
        mostrarError("Error guardando datos: " + error.message);
        document.getElementById('btnGuardar').disabled = false;
    }
});

const toggleThemeBtn = document.getElementById('toggleTheme');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

document.querySelectorAll('.btnCompartir').forEach(btn => {
    btn.addEventListener('click', () => {
        const urlPagina = window.location.href;
        let texto = `¡Mirá cómo va el ranking de las Residencias Médicas 2026! 🏥\n\nCargá tu promedio para ver tu posición real. Entrá acá:\n${urlPagina}`;
        if (tituloTabla && tituloTabla.innerText.includes("Ranking:")) {
            const esp = tituloTabla.innerText.replace("Ranking: ", "");
            texto = `¡Mirá cómo va el corte en ${esp}! 🏥\n\nFijate tu posición en el ranking de las Residencias entrando acá:\n${urlPagina}`;
        }
        const linkWpp = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
        window.open(linkWpp, '_blank');
    });
});

let chartGanancias = null;
let chartPerdidas = null;
function actualizarGraficosFlujo(registros) {
    const flujo = {};
    const limpiarEspecialidad = (texto) => {
        if (!texto) return "";
        let limpio = texto.split('(')[0].trim().toUpperCase();
        if (limpio.includes("PSIQUIATR")) return "PSIQUIATRÍA";
        if (limpio.includes("PEDIATRÍA Y NEO")) return "PEDIATRÍA Y NEO";
        if (limpio.includes("ORTOPEDIA Y TRAUMA")) return "ORTOPEDIA Y TRAUMATOLOGÍA";
        if (limpio.includes("DIAGNÓSTICO")) return "DIAGNÓSTICO POR IMÁGENES";
        if (limpio.includes("CIRUGÍA CARDIOVASCULAR")) return "CIRUGÍA CARDIOVASCULAR";
        return limpio;
    };
    const formatearNombre = (texto) => {
        if (texto === "PSIQUIATRÍA") return "Psiquiatría";
        if (texto === "PEDIATRÍA Y NEO") return "Pediatría y Neo";
        if (texto === "ORTOPEDIA Y TRAUMATOLOGÍA") return "Ortopedia y Traum";
        if (texto === "DIAGNÓSTICO POR IMÁGENES") return "Diagnóstico";
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    };

    registros.forEach(r => {
        const dniStr = String(r.DNI).trim();
        const espOriginal = window.inscripcionesOriginales ? window.inscripcionesOriginales[dniStr] : null;
        const espActual = r.ESPECIALIDAD;

        if (espOriginal && espActual) {
            const normOrig = limpiarEspecialidad(espOriginal);
            const normAct = limpiarEspecialidad(espActual);
            if (normOrig !== normAct) {
                flujo[normOrig] = (flujo[normOrig] || 0) - 1; 
                flujo[normAct] = (flujo[normAct] || 0) + 1;   
            }
        }
    });

    let ganancias = [];
    let perdidas = [];
    for (const [esp, valor] of Object.entries(flujo)) {
        if (valor > 0) ganancias.push({ label: formatearNombre(esp), data: valor });
        else if (valor < 0) perdidas.push({ label: formatearNombre(esp), data: Math.abs(valor) });
    }

    ganancias.sort((a, b) => b.data - a.data);
    perdidas.sort((a, b) => b.data - a.data);

    const ctxG = document.getElementById('chartGanancias');
    if (chartGanancias) chartGanancias.destroy();
    if (ctxG && ganancias.length > 0) {
        chartGanancias = new Chart(ctxG, {
            type: 'bar',
            data: { labels: ganancias.map(g => g.label), datasets: [{ label: 'Personas sumadas', data: ganancias.map(g => g.data), backgroundColor: '#2a78d6', borderRadius: 4 }] },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: '#e1e0d9' }, ticks: { color: '#898781', stepSize: 1 } }, y: { grid: { display: false }, ticks: { color: '#52514e', font: { size: 12 } } } } }
        });
    }

    const ctxP = document.getElementById('chartPerdidas');
    if (chartPerdidas) chartPerdidas.destroy();
    if (ctxP && perdidas.length > 0) {
        chartPerdidas = new Chart(ctxP, {
            type: 'bar',
            data: { labels: perdidas.map(p => p.label), datasets: [{ label: 'Personas perdidas', data: perdidas.map(p => p.data), backgroundColor: '#e34948', borderRadius: 4 }] },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: '#e1e0d9' }, ticks: { color: '#898781', stepSize: 1 } }, y: { grid: { display: false }, ticks: { color: '#52514e', font: { size: 12 } } } } }
        });
    }
}
// ==========================================
// SIMULADOR: ¿A QUÉ ESPECIALIDAD PUEDO INGRESAR?
// ==========================================
document.getElementById('btnSimular').addEventListener('click', () => {
    const dniSim = document.getElementById('dniSimulador').value.trim();
    const divRes = document.getElementById('resultadosSimulacion');

    if (!dniSim) {
        alert("Por favor, ingresá tu DNI para iniciar la simulación.");
        return;
    }
    registrarUso("USO_SIMULADOR", dniSim, "");

    // Buscamos al usuario en la base local
    const usuarioOriginal = registrosBD.find(r => r.DNI && r.DNI.toString() === dniSim);
    
    if (!usuarioOriginal) {
        divRes.style.display = 'block';
        divRes.innerHTML = `<div class="error sim-fail" style="display:block; background-color: #f8d7da; padding: 15px; border-radius: 4px; color: #721c24; border: 1px solid #f5c6cb;">DNI no encontrado en el padrón de examen.</div>`;
        return;
    }

    // 1. VALIDACIÓN: ¿Tiene el promedio cargado?
    const tienePromedio = usuarioOriginal.PROMEDIO && String(usuarioOriginal.PROMEDIO).trim() !== "EN" && String(usuarioOriginal.PROMEDIO).trim() !== "";

    if (!tienePromedio) {
        divRes.style.display = 'block';
        divRes.innerHTML = `
            <div class="sim-fail" style="background-color: #fff3f3; padding: 15px; border-radius: 4px; border: 1px solid #dc3545; color: #721c24; text-align: center;">
                <strong style="display:block; margin-bottom: 10px;">⚠️ Falta tu promedio</strong>
                Para simular con exactitud y de paso actualizar tu puntaje oficial en los rankings, completá estos datos rápidos:
                
                <div style="margin-top: 15px; text-align: left;">
                    <label style="font-size: 0.9rem; font-weight: bold;">Promedio de la Facultad:</label>
                    <input type="text" id="simPromedioInput" placeholder="Ej: 8.5" style="width: 100%; padding: 0.75rem; margin-top: 5px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box;">
                </div>
                
                <div style="margin-top: 10px; display: flex; align-items: center; gap: 8px; text-align: left;">
                    <input type="checkbox" id="simMendozaCheck" checked style="transform: scale(1.2); margin:0;">
                    <label for="simMendozaCheck" style="font-size: 0.9rem;">Soy egresado de Mendoza (+5 pts)</label>
                </div>

                <button id="btnGuardarYSimular" style="background-color: #28a745; color: white; border: none; padding: 10px 15px; border-radius: 4px; margin-top: 15px; cursor: pointer; font-weight: bold; width: 100%;">Guardar Datos y Simular</button>
            </div>
        `;
        
        // Lógica para guardar el promedio directamente a Firebase desde el Simulador
        document.getElementById('btnGuardarYSimular').addEventListener('click', async () => {
            const promVal = document.getElementById('simPromedioInput').value.replace(',', '.');
            const promedio = parseFloat(promVal);
            
            if (!promVal || isNaN(promedio)) {
                alert("Por favor, ingresá un promedio válido.");
                return;
            }
            
            const esDeMendoza = document.getElementById('simMendozaCheck').checked;
            const btnGS = document.getElementById('btnGuardarYSimular');
            
            btnGS.innerText = "Guardando en la base de datos...";
            btnGS.disabled = true;
            
            try {
                // Cálculo matemático de la nota final
                const notaExamen = parseFloat(usuarioOriginal.NOTA) || 0;
                const ptsMza = esDeMendoza ? 5 : 0;
                const notaFinal = (notaExamen * 0.90) + (promedio * 0.5) + ptsMza;
                
                // Buscamos la llave (ID) de este usuario en Firebase
                let indiceActualizar = llavesBD[registrosBD.indexOf(usuarioOriginal)];
                
                // Actualizamos Firebase
                const updates = {};
                updates[`postulantes/${indiceActualizar}/PROMEDIO`] = promedio;
                updates[`postulantes/${indiceActualizar}/NOTA_FINAL`] = parseFloat(notaFinal.toFixed(2));
                
                await update(ref(db), updates);
                
                // Actualizamos la memoria local para no tener que recargar la página
                usuarioOriginal.PROMEDIO = promedio;
                usuarioOriginal.NOTA_FINAL = parseFloat(notaFinal.toFixed(2));
                
                // Una vez guardado, disparamos el simulador automáticamente
                document.getElementById('btnSimular').click();
                
            } catch(error) {
                alert("Hubo un error al guardar: " + error.message);
                btnGS.innerText = "Guardar Datos y Simular";
                btnGS.disabled = false;
            }
        });
        
        return; // Frenamos acá hasta que cargue los datos
    }

    // 2. CÁLCULO DE SIMULACIÓN (Si ya tiene promedio en la BD)
    localStorage.setItem('miDniValidado', dniSim);
    const miPuntaje = obtenerValorOrden(usuarioOriginal).toFixed(2);
    const miPromedio = usuarioOriginal.PROMEDIO;
    let resultados = [];

    // Filtro: Lista de palabras clave de carreras que NO son Medicina
    const carrerasNoMedicas = [
        "AUDIOLOGÍA", "BIOQUÍMICA", "ENDODONCIA", "ENFERMERÍA", 
        "FARMACIA", "KINESIOLOGÍA", "NUTRICIÓN", "ODONTOLOGÍA", 
        "ODONTOPEDIATRÍA", "PSICOLOGÍA", "TRABAJO SOCIAL"
    ];

    // Iteramos solo por las especialidades de Primer Nivel
    for (const [esp, cupos] of Object.entries(cuposPorEspecialidad)) {
        if (!esp.includes("(Primer nivel)")) continue;

        const esNoMedica = carrerasNoMedicas.some(carrera => esp.includes(carrera));
        if (esNoMedica) continue; 

        let competidores = registrosBD.filter(r =>
            coincideEspecialidad(r.ESPECIALIDAD, esp) && r.DNI.toString() !== dniSim
        );

        competidores = competidores.filter(p => parseFloat(p.NOTA) >= 50);
        competidores.push(usuarioOriginal);
        competidores.sort((a, b) => obtenerValorOrden(b) - obtenerValorOrden(a));

        const miPuesto = competidores.findIndex(c => c.DNI && c.DNI.toString() === dniSim) + 1;

        if (cupos > 0 && miPuesto <= cupos) {
            resultados.push({
                especialidad: esp.replace(" (Primer nivel)", ""), 
                posicion: miPuesto,
                cupos: cupos
            });
        }
    }

    resultados.sort((a, b) => (b.cupos - b.posicion) - (a.cupos - a.posicion));

    divRes.style.display = 'block';

    if (resultados.length === 0) {
        divRes.innerHTML = `
            <div class="sim-fail" style="background-color: #fff3f3; padding: 15px; border-radius: 4px; border: 1px solid #dc3545; color: #721c24;">
                <strong>Puntaje de simulación: ${miPuntaje} (Promedio: ${miPromedio})</strong><br>
                Actualmente, con los promedios cargados por otros competidores, no entrarías directo en el cupo de ninguna especialidad médica de Primer Nivel. ¡Pero no te desanimes! Muchos postulantes no se presentan o cambian de opinión al adjudicar.
            </div>
        `;
        return;
    }

let htmlLista = `
        <!-- ESTA ES LA CAJA QUE VA A SALIR EN LA FOTO -->
        <div id="cajaResumenFoto" style="background-color: #f8f9fa; padding: 20px; border-radius: 12px; border: 2px solid #28a745; text-align: center; margin-bottom: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 1.3rem;">🏥 Ranking Residencias 2026</h3>
            <div style="font-size: 1.1rem; color: #555; margin-bottom: 12px;">
                Mi puntaje definitivo es <strong>${miPuntaje}</strong>
            </div>
        </div>
        
        <ul style="list-style-type: none; padding: 0; margin: 0; display: grid; gap: 8px; max-height: 300px; overflow-y: auto;">
    `;

    resultados.forEach(r => {
        htmlLista += `
            <li class="sim-item" style="background: #f8f9fa; padding: 10px; border: 1px solid #dee2e6; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: bold; color: #0056b3; font-size: 0.9rem;">${r.especialidad}</span>
                <span style="background: #28a745; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: bold; white-space: nowrap;">
                    Puesto ${r.posicion} / ${r.cupos}
                </span>
            </li>
        `;
    });
    htmlLista += `</ul>
    <p style="font-size: 0.8rem; color: #666; margin-top: 10px; text-align: right;">*Basado en los puntajes cargados hasta hoy.</p>
    
    <!-- NUEVO BOTÓN DE COMPARTIR IMAGEN -->
    <button id="btnCompartirIG" style="width: 100%; background: #E1306C; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; margin-top: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
        📸 Compartir mi resultado
    </button>
    `;

    divRes.innerHTML = htmlLista;
  // LÓGICA PARA GENERAR LA IMAGEN Y COMPARTIRLA
    const btnIG = document.getElementById('btnCompartirIG');
    if (btnIG) {
        btnIG.addEventListener('click', async () => {
            const textoOriginal = btnIG.innerHTML;
            btnIG.innerHTML = "⏳ Generando imagen...";
            btnIG.disabled = true;

            try {
                // 1. Escondemos el botón un segundo para que no salga en la foto
                btnIG.style.display = 'none';
                
                // 2. Sacamos la "foto" al contenedor de los resultados
            const cajaFoto = document.getElementById('cajaResumenFoto');
                const canvas = await html2canvas(cajaFoto, {
                    backgroundColor: '#ffffff', 
                    scale: 3 // Subimos la escala a 3 para que el texto se vea súper nítido en IG
                });
                
                // Volvemos a mostrar el botón
                btnIG.style.display = 'flex';

                // 3. Convertimos el canvas a un archivo de imagen real
                canvas.toBlob(async (blob) => {
                    const file = new File([blob], 'mi-simulacion.png', { type: 'image/png' });
                    
                    // 4. Chequeamos si es un celular que soporta compartir imágenes a apps (Web Share API)
                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        await navigator.share({
                            title: 'Ranking Residencias 2026',
                            text: '¡Mirá mi posición en el simulador de residencias médicas! 🏥 Entrá y fijate la tuya: https://streetsize.github.io/ordenmeritoblue',
                            files: [file]
                        });
                    } else {
                        // 5. Si está en una PC o celular viejo, simplemente le descargamos la imagen
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'simulacion-residencias.png';
                        a.click();
                        URL.revokeObjectURL(url);
                        alert("✅ ¡Imagen descargada con éxito! Podés subirla a tus historias o mandarla por WhatsApp.");
                    }
                    
                    // Restauramos el botón
                    btnIG.innerHTML = textoOriginal;
                    btnIG.disabled = false;
                    
                    // TRACKING PRIVADO: Anotamos que alguien compartió su resultado
                    if (typeof registrarUso === 'function') registrarUso("COMPARTIO_IMAGEN_SIMULADOR", dniSim, "");
                    
                }, 'image/png');

            } catch (error) {
                console.error("Error al generar imagen:", error);
                alert("Hubo un error al crear la imagen. Podés sacar una captura de pantalla tradicional.");
                btnIG.style.display = 'flex';
                btnIG.innerHTML = textoOriginal;
                btnIG.disabled = false;
            }
        });
    }
});

document.getElementById('dniSimulador').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('btnSimular').click();
    }
});
// ==========================================
// DICCIONARIO DE CUPOS POR HOSPITAL Y ESPECIALIDAD
// ==========================================
const cuposPorHospital = {
    "ANATOMÍA PATOLÓGICA (Primer nivel)": {
        "Hospital Central": 1,
        "Hospital Luis Lagomaggiore": 3
    },
    "ANESTESIOLOGÍA (Primer nivel)": {
        "Hospital Central": 4,
        "Hospital Luis Lagomaggiore": 2,
    },
    "AUDIOLOGÍA (Primer nivel)": {
        "Xeltahuina - OSEP": 2
    },
    "BIOQUÍMICA CLÍNICA (Primer nivel)": {
        "Hospital Alfredo Perrupato": 1,
        "Hospital Central": 2,
        "Hospital Diego Paroissien": 2,
        "Hospital Infantil Humberto Notti": 2,
        "Hospital Luis Lagomaggiore": 2,
        "Hospital Militar": 1
    },
    "CARDIOLOGÍA PEDIÁTRICA (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 1
    },
    "CARDIOLOGÍA (Primer nivel)": {
        "Clínica de Cuyo": 1,
        "Clínica Pelegrina (Usar Clínica Santa Clara)": 2,
        "Hospital Central": 3,
        "Hospital Español": 2,
        "Hospital Italiano": 3,
        "Hospital Luis Lagomaggiore": 2,
        "Hospital Nuestra Señora del Carmen OSEP": 2,
        "Hospital Teodoro Schestakow": 3
    },
    "CIRUGÍA CARDIOVASCULAR (Primer nivel)": {
        "Hospital Central": 1,
        "Hospital Italiano": 1
    },
    "CIRUGÍA CARDIOVASCULAR (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Español": 1
    },
    "CIRUGÍA ESTÉTICA, PLÁSTICA Y REPARADORA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Italiano": 1,
        "Hospital Luis Lagomaggiore": 1
    },
    "CIRUGÍA GENERAL (Primer nivel)": {
        "Hospital Alfredo Perrupato": 2,
        "Hospital Antonio Scaravelli": 1,
        "Hospital Central": 3,
        "Hospital Enfermeros Argentinos": 2,
        "Hospital Español": 2,
        "Hospital Italiano": 2,
        "Hospital Luis Lagomaggiore": 2,
        "Hospital Militar": 2
    },
    "CIRUGÍA PEDIÁTRICA (Primer nivel)": {
        "Hospital Infantil Humberto Notti": 1
    },
    "CIRUGÍA VASCULAR PERIFÉRICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Central": 1
    },
    "CLÍNICA MÉDICA (Primer nivel)": {
        "Clínica Pelegrina (Usar Clínica Santa Clara)": 2,
        "Clínica Santa Maria Delta": 3,
        "Hospital Alfredo Perrupato": 3,
        "Hospital Antonio Scaravelli": 2,
        "Hospital Carlos Saporiti": 2,
        "Hospital Central": 9,
        "Hospital Diego Paroissien": 3,
        "Hospital Español": 3,
        "Hospital Italiano": 3,
        "Hospital Luis Lagomaggiore": 8,
        "Hospital Militar": 2,
        "Hospital Nuestra Señora del Carmen OSEP": 10,
        "Hospital Santa Isabel de Hungria": 2,
        "Hospital Teodoro Schestakow": 5
    },
    "CRECIMIENTO Y DESARROLLO (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 1
    },
    "DERMATOLOGÍA (Primer nivel)": {
        "Hospital Central": 1,
        "Hospital Luis Lagomaggiore": 2,
        "Hospital Nuestra Señora del Carmen OSEP": 1
    },
    "DIAGNÓSTICO POR IMÁGENES (Primer nivel)": {
        "Fundación Escuela de Medicina Nuclear (FUESMEN)": 2,
        "Hospital Central": 3,
        "Hospital Español": 3,
        "Hospital Italiano": 2,
        "Hospital Nuestra Señora del Carmen OSEP": 2,
        "Medicina por Imágenes S.A.": 2
    },
    "DIAGNÓSTICO POR IMÁGENES Y MEDICINA NUCLEAR (ARTICULADA) (Primer nivel)": {
        "Fundación Escuela de Medicina Nuclear (FUESMEN)": 2
    },
    "EMERGENTOLOGÍA (Primer nivel)": {
        "Hospital Central": 4,
        "Hospital Luis Lagomaggiore": 2,
        "Hospital Teodoro Schestakow": 2
    },
    "ENDOCRINOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 1
    },
    "ENDOCRINOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Central": 1
    },
    "ENDODONCIA (Primer nivel)": {
        "Hospital Luis Lagomaggiore": 1
    },
    "ENFERMERÍA COMUNITARIA (Primer nivel)": {
        "Hospital Carlos Saporiti": 2,
        "Hospital Enfermeros Argentinos": 5
    },
    "ENFERMERÍA EN CONTROL DE INFECCIONES (Primer nivel)": {
        "Hospital Central": 1,
        "Hospital Luis Lagomaggiore": 1
    },
    "ENFERMERÍA EN CUIDADOS CRÍTICOS (Primer nivel)": {
        "Hospital Militar": 2,
        "Hospital Teodoro Schestakow": 4
    },
    "ENFERMERÍA EN SALUD MENTAL (Primer nivel)": {
        "Hospital Carlos Pereyra": 3
    },
    "ENFERMERÍA GENERALISTA MÉDICO QUIRÚRGICA (Primer nivel)": {
        "Hospital Central": 4,
        "Hospital Teodoro Schestakow": 2
    },
    "ENFERMERÍA NEONATAL (Primer nivel)": {
        "Hospital Infantil Humberto Notti": 4
    },
    "ENFERMERÍA PEDIÁTRICA (Primer nivel)": {
        "Hospital Infantil Humberto Notti": 4
    },
    "FARMACIA HOSPITALARIA (Primer nivel)": {
        "Hospital Alfredo Perrupato": 1,
        "Hospital Central": 2,
        "Hospital Infantil Humberto Notti": 4
    },
    "FISIATRÍA (Primer nivel)": {
        "Fundación San Andres": 3,
        "Hospital José Nestor Lencinas": 2
    },
    "GASTROENTEROLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Central": 1,
        "Hospital Luis Lagomaggiore": 1,
        "Hospital Nuestra Señora del Carmen OSEP": 1,
        "Hospital Teodoro Schestakow": 1
    },
    "GERIATRÍA Y GERONTOLOGÍA (Primer nivel)": {
        "Hospital José Nestor Lencinas": 2
    },
    "GINECOLOGÍA INFANTO JUVENIL (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 1
    },
    "HEMATOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 1
    },
    "HEMATOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Central": 1,
        "Hospital Nuestra Señora del Carmen OSEP": 1
    },
    "HEMOTERAPIA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Central": 1
    },
    "INFECTOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 1
    },
    "INFECTOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Central": 1,
        "Hospital Luis Lagomaggiore": 1
    },
    "KINESIOLOGÍA EN FISIATRÍA (Primer nivel)": {
        "Hospital José Nestor Lencinas": 2
    },
    "KINESIOLOGÍA EN NEUROLOGÍA (Primer nivel)": {
        "Hospital Central": 2
    },
    "KINESIOLOGÍA EN RESPIRATORIO DE ADULTOS (Primer nivel)": {
        "Fundación San Andres": 3,
        "Hospital Central": 2
    },
    "KINESIOLOGÍA GENERAL (Primer nivel)": {
        "Hospital Alfredo Perrupato": 2,
        "Hospital Luis Lagomaggiore": 2,
        "Hospital Teodoro Schestakow": 2
    },
    "KINESIOLOGÍA PEDIÁTRICA (Primer nivel)": {
        "Hospital Infantil Humberto Notti": 2
    },
    "MEDICINA DE FAMILIA (Primer nivel)": {
        "Área Departamental de Salud de Godoy Cruz": 2,
        "Área Departamental de Salud de Maipú": 4,
        "Hospital Carlos Saporiti": 4,
        "Hospital Domingo Sícoli": 4,
        "Hospital Enfermeros Argentinos": 3,
        "Xeltahuina - OSEP": 4
    },
    "NEFROLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 1
    },
    "NEFROLOGÍA (Primer nivel)": {
        "Hospital Central": 2
    },
    "NEONATOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Diego Paroissien": 2,
        "Hospital Infantil Humberto Notti": 2,
        "Hospital Luis Lagomaggiore": 1,
        "Hospital Teodoro Schestakow": 1
    },
    "NEUMONOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 2
    },
    "NEUMONOLOGÍA (Primer nivel)": {
        "Hospital Luis Lagomaggiore": 2
    },
    "NEUMONOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Central": 1
    },
    "NEUROCIRUGÍA (Primer nivel)": {
        "Hospital Central": 1
    },
    "NEUROLOGÍA (Primer nivel)": {
        "Hospital Luis Lagomaggiore": 2
    },
    "NEUROLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Nuestra Señora del Carmen OSEP": 2
    },
    "NUTRICIÓN Y ALIMENTACIÓN DEL ADULTO (Primer nivel)": {
        "Hospital Alfredo Perrupato": 1,
        "Hospital Central": 2,
        "Hospital Luis Lagomaggiore": 1,
        "Hospital Teodoro Schestakow": 1
    },
    "NUTRICIÓN Y ALIMENTACIÓN INFANTOJUVENIL (Primer nivel)": {
        "Hospital Infantil Humberto Notti": 2
    },
    "ODONTOLOGÍA DE ALTA COMPLEJIDAD (Primer nivel)": {
        "Hospital Central": 2
    },
    "ODONTOLOGÍA PREVENTIVA Y SOCIAL (Primer nivel)": {
        "Centro Integral Odontológico - OSEP": 1
    },
    "ODONTOPEDIATRÍA (Primer nivel)": {
        "Hospital Alfredo Perrupato": 1,
        "Hospital Infantil Humberto Notti": 1
    },
    "OFTALMOLOGÍA (Primer nivel)": {
        "Clínica de Ojos Dra. Mulet": 2,
        "Hospital Central": 3,
        "Instituto CAIMARI S.A.": 3,
        "Instituto Zaldivar": 1
    },
    "ONCOLOGÍA CLÍNICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Fundación Escuela de Medicina Nuclear (FUESMEN)": 2
    },
    "ONCOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 1
    },
    "ORTOPEDIA Y TRAUMATOLOGÍA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 2
    },
    "ORTOPEDIA Y TRAUMATOLOGÍA (Primer nivel)": {
        "Clínica Francesa (Guaymallen)": 2,
        "Hospital Alfredo Perrupato": 2,
        "Hospital Central": 3,
        "Hospital Español": 1,
        "Hospital Luis Lagomaggiore": 2,
        "Hospital Militar": 1
    },
    "OTORRINOLARINGOLOGÍA (Primer nivel)": {
        "Clínica Godoy Cruz": 1,
        "Hospital Central": 1,
        "Hospital Luis Lagomaggiore": 1
    },
    "PEDIATRÍA (Primer nivel)": {
        "Clínica Santa María Delta": 3,
        "Hospital Alfredo Perrupato": 4,
        "Hospital Carlos Saporiti": 1,
        "Hospital Diego Paroissien": 4,
        "Hospital Dr. Ramón Carrillo": 3,
        "Hospital Infantil Humberto Notti": 10,
        "Hospital Pediátrico Alexander Fleming OSEP": 4,
        "Hospital Teodoro Schestakow": 5
    },
    "PEDIATRÍA Y NEONATOLOGÍA (Ambos niveles)": {
        "Hospital Diego Paroissien": 2,
        "Hospital Infantil Humberto Notti": 5,
        "Hospital Luis Lagomaggiore": 5
    },
    "PEDIATRÍA Y TERAPIA INTENSIVA (Ambos niveles)": {
        "Hospital Infantil Humberto Notti": 5
    },
    "PSICOLOGÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (RISAM) (Primer nivel)": {
        "Hospital Alfredo Perrupato": 1,
        "Hospital Carlos Pereyra": 3,
        "Hospital Carlos Saporiti": 3,
        "Hospital Central": 3,
        "Hospital El Sauce": 3,
        "Hospital Luis Lagomaggiore": 3,
        "Hospital Nuestra Señora del Carmen OSEP": 2,
        "Hospital Teodoro Schestakow": 3,
        "Hospital Victorino Tagarelli": 1
    },
    "PSICOLOGÍA INFANTOJUVENIL (SEGUNDO NIVEL) (Segundo nivel)": {
        "Dirección de Salud Mental y Adicciones": 4,
        "Hospital Pediátrico Alexander Fleming OSEP": 1
    },
    "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)": {
        "Hospital Alfredo Perrupato": 1,
        "Hospital Carlos Pereyra": 5,
        "Hospital Carlos Saporiti": 3,
        "Hospital Central": 3,
        "Hospital El Sauce": 5,
        "Hospital Luis Lagomaggiore": 3,
        "Hospital Nuestra Señora del Carmen OSEP": 2,
        "Hospital Teodoro Schestakow": 3,
        "Hospital Victorino Tagarelli": 1
    },
    "PSIQUIATRIA EN SALUD MENTAL COMUNITARIA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Dirección de Salud Mental y Adicciones": 1
    },
    "PSIQUIATRÍA INFANTOJUVENIL (SEGUNDO NIVEL) (Segundo nivel)": {
        "Dirección de Salud Mental y Adicciones": 6,
        "Hospital Pediátrico Alexander Fleming OSEP": 1
    },
    "RADIOTERAPIA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Fundación Escuela de Medicina Nuclear (FUESMEN)": 2
    },
    "REUMATOLOGÍA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Nuestra Señora del Carmen OSEP": 1
    },
    "TERAPIA INTENSIVA PEDIÁTRICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Infantil Humberto Notti": 1
    },
    "TERAPIA INTENSIVA (Primer nivel)": {
        "Hospital Carlos Saporiti": 1,
        "Hospital Central": 8,
        "Hospital Español": 2,
        "Hospital Luis Lagomaggiore": 4,
        "Hospital Nuestra Señora del Carmen OSEP": 2,
        "Hospital Teodoro Schestakow": 2
    },
    "TOCOGINECOLOGÍA (Primer nivel)": {
        "Hospital Alfredo Perrupato": 4,
        "Hospital Diego Paroissien": 4,
        "Hospital Español": 3,
        "Hospital Italiano": 2,
        "Hospital Luis Lagomaggiore": 4,
        "Hospital Obstetrico Virgen de la Misericordia OSEP": 2,
        "Hospital Teodoro Schestakow": 4
    },
    "TRABAJO SOCIAL EN SALUD MENTAL COMUNITARIA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Dirección de Salud Mental y Adicciones": 1
    },
    "TRABAJO SOCIAL EN SALUD MENTAL INFANTO JUVENIL (SEGUNDO NIVEL) (Segundo nivel)": {
        "Dirección de Salud Mental y Adicciones": 4,
        "Hospital Pediátrico Alexander Fleming OSEP": 1
    },
    "TRABAJO SOCIAL EN SALUD PÚBLICA (Primer nivel)": {
        "Hospital Luis Lagomaggiore": 2
    },
    "TRASPLANTE HEPATICO Y CIRUGIA HEPATO BILIO PANCREATICA (Segundo nivel)": {
        "Hospital Central": 1
    },
    "TRASPLANTOLOGÍA CLÍNICA INTRATORÁCICA (SEGUNDO NIVEL) (Segundo nivel)": {
        "Hospital Central": 1
    },
    "UROLOGÍA (Primer nivel)": {
        "Hospital Central": 2,
        "Hospital Español": 1,
        "Uroclínica": 2
    }
};

// ==========================================
// FUNCIÓN PARA GENERAR DESGLOSE POR HOSPITALES
// ==========================================
function generarDesglosPorHospitales(especialidadABuscar, dniSeleccionado = null) {
    const contenedor = document.getElementById('contenedorHospitales');
    contenedor.innerHTML = '';

    const cuposHospEsp = cuposPorHospital[especialidadABuscar];
    if (!cuposHospEsp) {
        contenedor.innerHTML = '<p style="color: #666; font-style: italic;">No hay desglose de cupos por hospital disponible para esta especialidad.</p>';
        return;
    }

    // Filtramos competidores de la especialidad
    let competidores = registrosBD.filter(p => coincideEspecialidad(p.ESPECIALIDAD, especialidadABuscar));
    const NOTA_MINIMA_VISIBLE = 50; 
    competidores = competidores.filter(p => {
        const notaExamen = parseFloat(p.NOTA) || 0;
        return notaExamen >= NOTA_MINIMA_VISIBLE || (dniSeleccionado && p.DNI.toString() === dniSeleccionado);
    });

    // Iteramos por cada hospital que ofrece la especialidad
    for (const [hospitalNombre, cuposHospital] of Object.entries(cuposHospEsp)) {
        // Filtramos postulantes que eligieron este hospital específico
        let inscriptosHosp = competidores.filter(c => c.HTAL && coincideHospital(c.HTAL, hospitalNombre));

        // Ordenamos de mayor a menor según puntaje
        inscriptosHosp.sort((a, b) => obtenerValorOrden(b) - obtenerValorOrden(a));

        // Creamos la card / sección para este hospital
        const cardHosp = document.createElement('div');
        cardHosp.className = 'card-opcion';
        cardHosp.style.marginBottom = '1.5rem';
        cardHosp.style.padding = '1.5rem';

        let htmlHosp = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 10px;">
                <h4 style="margin: 0; color: #0056b3; font-size: 1.1rem;">🏥 ${hospitalNombre}</h4>
                <span style="background: #17a2b8; color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: bold;">
                    Cupos: ${cuposHospital} | Inscriptos: ${inscriptosHosp.length}
                </span>
            </div>
        `;

        if (inscriptosHosp.length === 0) {
            htmlHosp += `<p style="font-size: 0.9rem; color: #777; font-style: italic; margin: 0;">Todavía no hay postulantes inscriptos con este hospital seleccionado.</p>`;
        } else {
            htmlHosp += `
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Pos.</th>
                                <th>DNI</th>
                                <th>Examen</th>
                                <th>Promedio</th>
                                <th>Nota Final</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            inscriptosHosp.forEach((c, index) => {
                const puesto = index + 1;
                let claseFila = '';
                
                if (dniSeleccionado && c.DNI.toString() === dniSeleccionado) {
                    claseFila = 'fila-usuario';
                }
                if (cuposHospital > 0 && puesto > cuposHospital) {
                    claseFila = 'fila-afuera';
                }
                if (cuposHospital > 0 && puesto === cuposHospital + 1) {
                    claseFila += ' fila-corte';
                }

                let valorMostrado = obtenerValorOrden(c).toFixed(2);
                let iconoEstado = c.NOTA_FINAL ? '✅' : '⏳ (Prov.)';
                let valPromedio = c.PROMEDIO ? c.PROMEDIO : 'Est. (8.0)';
                let dniMostrado = censurarDNI(c);

                let contenidoPos = `<strong>${puesto}</strong>`;
                if (cuposHospital > 0 && puesto === cuposHospital + 1) {
                    contenidoPos += `<span class="etiqueta-corte">Límite Cupos</span>`;
                }

                htmlHosp += `
                    <tr class="${claseFila}">
                        <td>${contenidoPos}</td>
                        <td>${dniMostrado}</td>
                        <td>${c.NOTA}</td>
                        <td>${valPromedio}</td>
                        <td><strong>${valorMostrado}</strong> <span style="font-size:0.8rem">${iconoEstado}</span></td>
                    </tr>
                `;
            });

            htmlHosp += `
                        </tbody>
                    </table>
                </div>
            `;
        }

        cardHosp.innerHTML = htmlHosp;
        contenedor.appendChild(cardHosp);
    }
}

// Función auxiliar para matchear nombres de hospitales con flexibilidad
function coincideHospital(hospDB, hospSeleccionado) {
    if (!hospDB || !hospSeleccionado) return false;
    const norm = (s) => s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    return norm(hospDB).includes(norm(hospSeleccionado)) || norm(hospSeleccionado).includes(norm(hospDB));
}
// ==========================================
// LÓGICA DEL BOTÓN PARA CAMBIAR DE VISTA CON PEAJE (GATED CONTENT)
// ==========================================
const vistaGeneral = document.getElementById('vistaGeneral');
const vistaHospitales = document.getElementById('vistaHospitales');
const btnToggleVista = document.getElementById('btnToggleVista');

if (btnToggleVista) {
    btnToggleVista.addEventListener('click', () => {
        if (vistaGeneral.style.display !== 'none') {
            // 1. Ocultar General -> Mostrar Hospitales
            vistaGeneral.style.display = 'none';
            vistaHospitales.style.display = 'block';
            
            // Cambiar aspecto del botón
            btnToggleVista.innerHTML = "📋 Volver al Ranking General";
            btnToggleVista.classList.remove('btn-secondary');
            btnToggleVista.classList.add('btn-primary');
            
            // 2. LÓGICA DEL PEAJE
            const contenedorHosp = document.getElementById('contenedorHospitales');
            const dniGuardado = localStorage.getItem('miDniValidado'); // Busca el "pase VIP" en el navegador
            let tieneAcceso = false;

            // Validamos si el pase VIP existe y si efectivamente tiene el promedio cargado
            if (dniGuardado) {
                const userObj = registrosBD.find(r => r.DNI && r.DNI.toString() === dniGuardado);
                if (userObj && userObj.PROMEDIO && String(userObj.PROMEDIO).trim() !== "EN" && String(userObj.PROMEDIO).trim() !== "") {
                    tieneAcceso = true;
                }
            }

            if (!tieneAcceso) {
                // No tiene acceso: Ocultamos las tarjetas de hospitales y creamos el Peaje
                Array.from(contenedorHosp.children).forEach(child => {
                    if (child.id !== 'peajeDesbloqueo') child.style.display = 'none';
                });

                if (!document.getElementById('peajeDesbloqueo')) {
                    const divPeaje = document.createElement('div');
                    divPeaje.id = 'peajeDesbloqueo';
                    divPeaje.style.textAlign = 'center';
                    divPeaje.style.padding = '2rem';
                    divPeaje.style.background = '#f8f9fa';
                    divPeaje.style.border = '2px dashed #ccc';
                    divPeaje.style.borderRadius = '8px';
                    
                    divPeaje.innerHTML = `
                        <h4 style="color: #0056b3; margin-top:0;">🔒 Desbloqueá el Ranking por Hospitales</h4>
                        <p style="margin-bottom: 20px;">Esta función exclusiva analiza tus probabilidades reales según los cupos de cada sede.<br><strong>Validá tu identidad una sola vez y tu navegador te recordará.</strong></p>
                        <input type="text" id="dniPeajeInput" placeholder="Ingresá tu DNI" style="padding: 10px; width: 80%; max-width: 250px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 10px;">
                        <br>
                        <button id="btnValidarPeaje" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer;">Validar y Desbloquear</button>
                        <div id="msgPeajeError" style="color: #dc3545; font-size: 0.9rem; margin-top: 10px; font-weight: bold;"></div>
                    `;
                    contenedorHosp.appendChild(divPeaje);

                    // Evento al hacer clic en "Validar" en el peaje
                    document.getElementById('btnValidarPeaje').addEventListener('click', () => {
                        const dniIngresado = document.getElementById('dniPeajeInput').value.trim();
                        const userCheck = registrosBD.find(r => r.DNI && r.DNI.toString() === dniIngresado);
                        const errorBox = document.getElementById('msgPeajeError');

                        if (!userCheck) {
                            errorBox.innerText = "DNI no encontrado en el padrón de examen.";
                            return;
                        }
                        if (!userCheck.PROMEDIO || String(userCheck.PROMEDIO).trim() === "EN" || String(userCheck.PROMEDIO).trim() === "") {
                            errorBox.innerHTML = "Tu DNI está en el padrón, pero <strong>todavía no cargaste tu promedio</strong>.<br>Usá el Simulador o el botón del Inicio para cargarlo y desbloquear esta sección.";
                            return;
                        }

                        // ÉXITO: Guardamos el "Pase VIP" en localStorage para siempre
                        localStorage.setItem('miDniValidado', dniIngresado);
                        
                        // TRACKING: Anotamos en Firebase que este usuario cayó en la trampa y desbloqueó
                        if (typeof registrarUso === 'function') registrarUso("PEAJE_SUPERADO", dniIngresado, "");

                        // Borramos el peaje visualmente y revelamos todos los hospitales
                        divPeaje.remove();
                        Array.from(contenedorHosp.children).forEach(child => child.style.display = 'block');
                    });
                } else {
                    document.getElementById('peajeDesbloqueo').style.display = 'block';
                }
            } else {
                // YA TENÍA ACCESO GUARDADO: Nos aseguramos que vea los hospitales directamente
                if (document.getElementById('peajeDesbloqueo')) document.getElementById('peajeDesbloqueo').style.display = 'none';
                Array.from(contenedorHosp.children).forEach(child => {
                    if (child.id !== 'peajeDesbloqueo') child.style.display = 'block';
                });
            }
            
        } else {
            // Ocultar Hospitales -> Mostrar General
            vistaGeneral.style.display = 'block';
            vistaHospitales.style.display = 'none';
            
            // Cambiar aspecto del botón
            btnToggleVista.innerHTML = "🏥 Ver por Hospitales";
            btnToggleVista.classList.remove('btn-primary');
            btnToggleVista.classList.add('btn-secondary');
        }
    });
}
// ==========================================
// SISTEMA DE ESTADÍSTICAS Y TRACKING PRIVADO
// ==========================================
function registrarUso(accion, dniUsuario, detalles = "") {
    try {
        const logsRef = ref(db, 'estadisticas_uso');
        push(logsRef, {
            accion: accion,
            dni: dniUsuario || "Visitante",
            detalles: detalles,
            fecha: new Date().toLocaleString('es-AR') // Guarda la fecha y hora de Argentina
        });
    } catch (error) {
        console.error("Error registrando métrica en segundo plano");
    }
}
// ==========================================
// SISTEMA DE COMENTARIOS (SIN DNI)
// ==========================================
import { set, ref as dbRef } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

document.getElementById('btnEnviarComentario').addEventListener('click', async () => {
    const textoInput = document.getElementById('textoComentario').value.trim();
    const cajaEstado = document.getElementById('mensajeComentarioEstado');

    cajaEstado.style.display = 'block';

    if (!textoInput) {
        cajaEstado.style.color = '#721c24';
        cajaEstado.innerText = "⚠️ El mensaje no puede estar vacío.";
        return;
    }

    const btn = document.getElementById('btnEnviarComentario');
    btn.disabled = true;
    btn.innerText = "Enviando...";

    try {
        const comentariosRef = dbRef(db, 'comentarios');
        const nuevoComentarioRef = push(comentariosRef);

        await set(nuevoComentarioRef, {
            mensaje: textoInput,
            fecha: new Date().toISOString()
        });

        document.getElementById('textoComentario').value = "";
        
        cajaEstado.style.color = '#155724';
        cajaEstado.innerText = "✅ ¡Gracias! Tu mensaje fue enviado con éxito.";
        
        setTimeout(() => {
            cajaEstado.style.display = 'none';
        }, 4000);

    } catch (error) {
        console.error("Error al guardar comentario:", error);
        cajaEstado.style.color = '#721c24';
        cajaEstado.innerText = "❌ Hubo un error de conexión al enviar el comentario.";
    } finally {
        btn.disabled = false;
        btn.innerText = "Enviar Comentario";
    }
});
