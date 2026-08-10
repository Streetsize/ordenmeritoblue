import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, child, update, push, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
    "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)": 27,
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
    "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)": ["Hospital Alfredo Perrupato", "Hospital Carlos Pereyra","Clínica del Prado", "Hospital Carlos Saporiti", "Hospital Central", "Hospital El Sauce", "Hospital Luis Lagomaggiore", "Hospital Nuestra Señora del Carmen OSEP", "Hospital Teodoro Schestakow", "Hospital Victorino Tagarelli"],
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
let ordenOficialData = {};

const paso1 = document.getElementById('paso1');
const paso2 = document.getElementById('paso2');
const paso3 = document.getElementById('paso3');
const anuncioClases = document.getElementById('anuncioClases');
const loading = document.getElementById('loading');
const errorBox = document.getElementById('errorBox');
const resultadoFinal = document.getElementById('resultadoFinal');
const tituloTabla = document.getElementById('tituloTabla');

const especialidadInput = document.getElementById('especialidad');
const hospitalSelect = document.getElementById('hospital');
const grupoHospital2 = document.getElementById('grupoHospital2');
const hospitalAnio2Select = document.getElementById('hospitalAnio2');
const lblHospital1 = document.getElementById('lblHospital1');
const especialidadLibreInput = document.getElementById('especialidadLibre');
const listaEsp = document.getElementById('listaEsp');
const listaEspLibre = document.getElementById('listaEspLibre');

// ==========================================
// HELPERS: LOADING / ERROR (usados en todo el archivo)
// ==========================================
function mostrarCarga(mostrar) {
    if (loading) loading.style.display = mostrar ? 'block' : 'none';
}

function mostrarError(mensaje) {
    mostrarCarga(false);
    if (errorBox) {
        errorBox.innerText = mensaje;
        errorBox.style.display = 'block';
    }
}

window.onload = async function() {
	// 1. CARGAMOS EL ORDEN OFICIAL
    try {
        const response = await fetch('orden_oficial.json');
        ordenOficialData = await response.json();
    } catch (error) {
        console.error("No se pudo cargar el orden_oficial.json", error);
    }

    const especialidades = Object.keys(datosResidencias).sort();
    
    // Lista de palabras clave de carreras que queremos ocultar en TODA la página
    const carrerasNoMedicas = [
        "AUDIOLOGÍA", "BIOQUÍMICA", "ENDODONCIA", "ENFERMERÍA", 
        "FARMACIA", "KINESIOLOGÍA", "NUTRICIÓN", "ODONTOLOGÍA", 
        "ODONTOPEDIATRÍA", "PSICOLOGÍA", "TRABAJO SOCIAL"
    ];
	


    especialidades.forEach(esp => {
        // Filtramos para asegurarnos de que sea Primer Nivel y NO esté en la lista negra
        const esPrimerNivel = esp.includes("(Primer nivel)") || esp.includes("(Ambos niveles)");
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
// 3. Procesamos los datos
        if (data) {
            registrosBD = Array.isArray(data) ? data : Object.values(data).filter(r => r && r.DNI);
            llavesBD = Array.isArray(data) ? data.map((_, i) => i) : Object.keys(data).filter(k => data[k] && data[k].DNI);
            
            // (Eliminamos la lógica de la barra de progreso que daba error)
            
            if (typeof actualizarGraficosFlujo === 'function') {
                actualizarGraficosFlujo(registrosBD);
            }
        }
    } catch (error) {
        console.error("No se pudo cargar la estadística inicial:", error);
        const elTextoPorcentaje = document.getElementById('textoPorcentaje');
        if (elTextoPorcentaje) elTextoPorcentaje.innerText = "--";
    }
	// ==========================================
    // RUTEO POR URL (Links directos por especialidad)
    // ==========================================
    const parametros = new URLSearchParams(window.location.search);
    let especialidadURL = parametros.get('esp');

    if (especialidadURL) {
        // Formateamos lo que viene en la URL para que coincida con tu base de datos
        // Ej: "anestesiologia" -> Buscamos cuál incluye esa palabra
        let espBuscada = especialidadURL.toUpperCase();
        let espEncontrada = especialidades.find(e => e.toUpperCase().includes(espBuscada));
        
        if (espEncontrada) {
            // Si la encontramos, saltamos directo al Paso 3
            document.getElementById('paso1').style.display = 'none';
            document.getElementById('paso3').style.display = 'block';
            mostrarCarga(true);
            
            // Generamos la tabla
            generarTablaOficial(espEncontrada, null);
            
            if (typeof registrarUso === 'function') registrarUso("VER_LINK_DIRECTO", "Visitante", espEncontrada);
            mostrarCarga(false);
        }
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
    const esp = tituloTabla.innerText.replace("Ranking Oficial: ", "");
    if (datosResidencias[esp]) generarTablaOficial(esp, miDNI);
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
// ==========================================
// LÓGICA DEL SELECTOR DINÁMICO DE HOSPITALES
// ==========================================
especialidadInput.addEventListener('input', function() {
    const espSelec = this.value.trim();
    const hospGuardado1 = hospitalSelect.value;
    const hospGuardado2 = hospitalAnio2Select.value;

    hospitalSelect.innerHTML = '<option value="">Selecciona un hospital...</option>';
    hospitalAnio2Select.innerHTML = '<option value="">Selecciona un hospital para 2do año...</option>';
    
    const esPsiq = (espSelec === "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)");

    if (datosResidencias[espSelec]) {
        hospitalSelect.disabled = false;
        
        datosResidencias[espSelec].sort().forEach(hosp => {
            hospitalSelect.appendChild(new Option(hosp, hosp));
            if (esPsiq) hospitalAnio2Select.appendChild(new Option(hosp, hosp));
        });

        if (esPsiq) {
            grupoHospital2.style.display = 'block';
            lblHospital1.innerText = "Hospital preferido (1er Año):";
        } else {
            grupoHospital2.style.display = 'none';
            lblHospital1.innerText = "Hospital preferido:";
        }

        if (hospGuardado1 && Array.from(hospitalSelect.options).some(o => o.value === hospGuardado1)) {
            hospitalSelect.value = hospGuardado1;
        }
        if (hospGuardado2 && Array.from(hospitalAnio2Select.options).some(o => o.value === hospGuardado2)) {
            hospitalAnio2Select.value = hospGuardado2;
        }
    } else {
        hospitalSelect.disabled = true;
        grupoHospital2.style.display = 'none';
    }
});

// ==========================================
// NUEVA TABLA OFICIAL (Lee 100% de Firebase - IGNORANDO SUFIJOS)
// ==========================================
async function generarTablaOficial(especialidadElegida, dniResaltado) {
    const tbody = document.querySelector('#tablaCompetidores tbody');
    tbody.innerHTML = '';
    tituloTabla.innerText = `Ranking Oficial: ${especialidadElegida}`;

    // Limpiamos la especialidad elegida (ej. "ANESTESIOLOGÍA (Primer nivel)" -> "ANESTESIOLOGÍA")
    const baseElegida = especialidadElegida.split('(')[0].trim().toUpperCase();

    try {
        const snapshot = await get(ref(db, 'postulantes'));
        if (!snapshot.exists()) {
            return mostrarError("No se encontraron postulantes en la base de datos.");
        }
        
        const postulantesFirebase = snapshot.val();
        let competidores = [];

        for (const key of Object.keys(postulantesFirebase)) {
            const datosFb = postulantesFirebase[key];
            
            if (datosFb && datosFb.DNI && datosFb.ESPECIALIDAD) {
                // Limpiamos también la especialidad de Firebase para compararlas en igualdad de condiciones
                const baseFB = datosFb.ESPECIALIDAD.split('(')[0].trim().toUpperCase();
                
                // Ahora sí, coinciden los 53 sin importar el paréntesis
                if (baseFB === baseElegida) {
                    const dniReal = datosFb.DNI.toString();
                    
                    let puestoReal = 999;
                    if (ordenOficialData && ordenOficialData[dniReal] && ordenOficialData[dniReal].orden) {
                        puestoReal = ordenOficialData[dniReal].orden;
                    }

                    competidores.push({
                        puesto: puestoReal,
                        dni: dniReal,
                        hospital: datosFb.HTAL ? datosFb.HTAL : "-",
                        oculto: datosFb.OCULTO ? true : false
                    });
                }
            }
        }

        competidores.sort((a, b) => a.puesto - b.puesto);

        const totalCupos = cuposPorEspecialidad[especialidadElegida] || 0;

        competidores.forEach((c, index) => {
            const tr = document.createElement('tr');
            const puestoEspecialidad = index + 1;
            
            if (c.dni === dniResaltado) tr.classList.add('fila-usuario');
            if (totalCupos > 0 && puestoEspecialidad > totalCupos) tr.classList.add('fila-afuera');
            if (totalCupos > 0 && puestoEspecialidad === totalCupos + 1) tr.classList.add('fila-corte');
            
            let dniCensurado;
            if (c.oculto === true && c.dni !== dniResaltado) {
                dniCensurado = "Privado 🔒";
            } else if (c.puesto > 411 && c.dni !== dniResaltado) { 
                dniCensurado = "********"; 
            } else {
                dniCensurado = c.dni === dniResaltado ? c.dni : "***" + c.dni.slice(-5);
            }

            let contenidoPos = `<strong style="font-size: 1.15rem; color: #0056b3;">#${puestoEspecialidad}</strong><br><span style="font-size: 0.75rem; color: #666;" title="Orden de Mérito Global">(Global: #${c.puesto})</span>`;
            
            if (totalCupos > 0 && puestoEspecialidad === totalCupos + 1) {
                contenidoPos += `<br><span class="etiqueta-corte" style="margin-top:4px; display:inline-block;">Límite Cupos</span>`;
            }

            tr.innerHTML = `
                <td>${contenidoPos}</td>
                <td>${dniCensurado}</td>
                <td style="font-size: 0.9rem;">${c.hospital}</td>
            `;
            tbody.appendChild(tr);
        });

        await generarDesglosPorHospitales(especialidadElegida, dniResaltado);
    
    } catch (error) {
        console.error("Error al generar tabla", error);
        mostrarError("Hubo un error al armar el ranking oficial.");
    }
}

document.getElementById('btnVerLibre').addEventListener('click', async () => {
    const espElegida = especialidadLibreInput.value.trim();
    
    if (!espElegida || !datosResidencias[espElegida]) {
        return mostrarError("Elegí o escribí una especialidad válida de la lista.");
    }

    mostrarCarga(true);
    
    try {
        resultadoFinal.style.display = 'none';
        
        await generarTablaOficial(espElegida, null);
        
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
        
        if (miRegistro.ESPECIALIDAD) {
            especialidadInput.value = miRegistro.ESPECIALIDAD;
            especialidadInput.dispatchEvent(new Event('input'));
            
            if (miRegistro.HTAL) {
                if (miRegistro.ESPECIALIDAD === "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)" && miRegistro.HTAL.includes(" (1er) / ")) {
                    const partesHosp = miRegistro.HTAL.split(" (1er) / ");
                    hospitalSelect.value = partesHosp[0];
                    if (partesHosp[1]) hospitalAnio2Select.value = partesHosp[1].replace(" (2do)", "");
                } else {
                    hospitalSelect.value = miRegistro.HTAL;
                }
            }
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
    if (anuncioClases) anuncioClases.style.display = 'block';
    document.getElementById('btnSiguiente').disabled = false;
    errorBox.style.display = 'none';
});

document.getElementById('btnGuardar').addEventListener('click', async () => {
    const especialidad = especialidadInput.value.trim();
    let hospital = hospitalSelect.value;
    const hospitalAnio2 = hospitalAnio2Select.value;

    if (!especialidad || !datosResidencias[especialidad] || !hospital) {
        return mostrarError("Asegurate de haber elegido una especialidad válida de la lista y un hospital.");
    }

    if (especialidad === "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)") {
        if (!hospitalAnio2) return mostrarError("Para Psiquiatría debés elegir un hospital para el 1er año y otro para el 2do año.");
        hospital = `${hospital} (1er) / ${hospitalAnio2} (2do)`;
    }

    mostrarCarga(true);
    document.getElementById('btnGuardar').disabled = true;

    try {
        // 1. Guardamos SOLO Especialidad y Hospital en Firebase
        const updates = {};
        updates[`postulantes/${indiceUsuarioActual}/ESPECIALIDAD`] = especialidad;
        updates[`postulantes/${indiceUsuarioActual}/HTAL`] = hospital;
        await update(ref(db), updates);
        
        if (typeof registrarUso === 'function') registrarUso("CARGA_HOSPITAL", miDNI, especialidad);

        // 2. Actualizamos la memoria local
        const miRegistro = registrosBD[llavesBD.indexOf(indiceUsuarioActual)];
        miRegistro.ESPECIALIDAD = especialidad;
        miRegistro.HTAL = hospital;

        // 3. Generamos la NUEVA tabla cruzando con el JSON
        await generarTablaOficial(especialidad, miDNI);

        resultadoFinal.style.display = 'block';
        resultadoFinal.innerHTML = `
            <h3>¡Elección registrada con éxito!</h3>
            <p style="font-size: 1.1rem; margin: 10px 0;">Tu elección de hospital ya es visible en el ranking oficial de ${especialidad}.</p>
        `;

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
    const rutas = {}; // NUEVO: Diccionario para rastrear el camino exacto (Origen -> Destino)

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

                // NUEVO: Guardamos la ruta de migración exacta
                const nombreOrig = formatearNombre(normOrig);
                const nombreAct = formatearNombre(normAct);
                const rutaStr = `${nombreOrig} ➔ ${nombreAct}`;
                rutas[rutaStr] = (rutas[rutaStr] || 0) + 1;
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

    // DIBUJAR GRÁFICOS (Se mantiene igual)
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

    // NUEVO: DIBUJAR DETALLE DE RUTAS
    const divMigraciones = document.getElementById('detalleMigraciones');
    if (divMigraciones) {
        let htmlRutas = `<h4 class="titulo-rutas" style="margin-bottom: 15px; display:flex; align-items:center; gap:8px;">🔄 Resumen exacto de pases</h4>`;
        htmlRutas += `<div style="display: flex; flex-direction: column; gap: 8px;">`;

        // Ordenamos las rutas para mostrar primero las que tienen más gente
        const rutasArray = Object.entries(rutas).sort((a, b) => a[0].localeCompare(b[0]));

        if (rutasArray.length === 0) {
            htmlRutas += `<p style="color: #666; font-style: italic;">Todavía no se registraron cambios de especialidad respecto a la inscripción original.</p>`;
        } else {
            rutasArray.forEach(([ruta, cantidad]) => {
                const [origen, destino] = ruta.split(' ➔ ');
                const textoPlural = cantidad === 1 ? 'médico' : 'médicos';
                htmlRutas += `
                    <div class="item-ruta" style="background: #f8f9fa; border: 1px solid #dee2e6; padding: 12px 15px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <span>De <strong style="color: #dc3545;">${origen}</strong> a <strong style="color: #2a78d6;">${destino}</strong></span>
                        <span style="background: #6c757d; color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: bold;">
                            ${cantidad} ${textoPlural}
                        </span>
                    </div>
                `;
            });
        }
        htmlRutas += `</div>`;
        divMigraciones.innerHTML = htmlRutas;
    }
}
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
        "Clínica del Prado": 2,
        "Hospital Alfredo Perrupato": 1,
        "Hospital Carlos Pereyra": 5,
        "Hospital Carlos Saporiti": 2,
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
// FUNCIÓN PARA GENERAR DESGLOSE POR HOSPITALES (OFICIAL)
// ==========================================
async function generarDesglosPorHospitales(especialidadABuscar, dniSeleccionado = null) {
    const contenedor = document.getElementById('contenedorHospitales');
    contenedor.innerHTML = '';

    const cuposHospEsp = cuposPorHospital[especialidadABuscar];
    if (!cuposHospEsp) {
        contenedor.innerHTML = '<p style="color: #666; font-style: italic;">No hay desglose de cupos por hospital disponible para esta especialidad.</p>';
        return;
    }

    // 1. Traemos los datos cruzados (igual que en la tabla general)
    const snapshot = await get(ref(db, 'postulantes'));
    let postulantesFirebase = snapshot.exists() ? snapshot.val() : {};
    
    let competidores = [];
    for (const [key, datosFb] of Object.entries(postulantesFirebase)) {
        if (datosFb.ESPECIALIDAD === especialidadABuscar && datosFb.DNI) {
            const dniReal = datosFb.DNI.toString();
            let datosOficiales = ordenOficialData[dniReal];
            competidores.push({
                puesto: datosOficiales ? datosOficiales.orden : 999,
                dni: dniReal,
                hospital: datosFb.HTAL || "⏳ Sin hospital",
				oculto: datosFb.OCULTO
            });
        }
    }

    const esPsiquiatria = especialidadABuscar === "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)";
    let tablasAGenerar = [];

    for (const [hospitalNombre, cuposHospital] of Object.entries(cuposHospEsp)) {
        if (esPsiquiatria) {
            tablasAGenerar.push({ titulo: `${hospitalNombre} (1er Año)`, cupos: cuposHospital, filtro: `${hospitalNombre} (1er)` });
            tablasAGenerar.push({ titulo: `${hospitalNombre} (2do Año)`, cupos: cuposHospital, filtro: `${hospitalNombre} (2do)` });
        } else {
            tablasAGenerar.push({ titulo: hospitalNombre, cupos: cuposHospital, filtro: hospitalNombre });
        }
    }

    tablasAGenerar.forEach(tablaInfo => {
        let inscriptosHosp = competidores.filter(c => {
            if (!c.hospital) return false;
            return esPsiquiatria ? c.hospital.includes(tablaInfo.filtro) : coincideHospital(c.hospital, tablaInfo.filtro);
        });

        // Ordenamos estrictamente por el Puesto Oficial (del 1 al 511)
        inscriptosHosp.sort((a, b) => a.puesto - b.puesto);

        const cardHosp = document.createElement('div');
        cardHosp.className = 'card-opcion';
        cardHosp.style.marginBottom = '1.5rem';
        cardHosp.style.padding = '1.5rem';

        let htmlHosp = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 10px;">
                <h4 style="margin: 0; color: #0056b3; font-size: 1.1rem;">🏥 ${tablaInfo.titulo}</h4>
                <span style="background: #17a2b8; color: white; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: bold;">
                    Cupos: ${tablaInfo.cupos} | Inscriptos: ${inscriptosHosp.length}
                </span>
            </div>
        `;

        if (inscriptosHosp.length === 0) {
            htmlHosp += `<p style="font-size: 0.9rem; color: #777; font-style: italic; margin: 0;">Todavía no hay postulantes inscriptos para esta opción.</p>`;
        } else {
            htmlHosp += `
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Puesto</th>
                                <th>DNI</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            inscriptosHosp.forEach((c, index) => {
                const puestoInterno = index + 1;
                let claseFila = '';
                
                if (dniSeleccionado && c.dni === dniSeleccionado) claseFila = 'fila-usuario';
                if (tablaInfo.cupos > 0 && puestoInterno > tablaInfo.cupos) claseFila = 'fila-afuera';
                if (tablaInfo.cupos > 0 && puestoInterno === tablaInfo.cupos + 1) claseFila += ' fila-corte';

let dniMostrado;
                if (c.oculto === true && c.dni !== dniSeleccionado) {
                    dniMostrado = "Privado 🔒";
                } else if (c.puesto > 411 && c.dni !== dniSeleccionado) { 
                    dniMostrado = "********"; 
                } else {
                    dniMostrado = c.dni === dniSeleccionado ? c.dni : "***" + c.dni.slice(-5);
                }

                let contenidoPos = `<strong style="font-size: 1.15rem; color: #0056b3;">#${puestoInterno}</strong><br><span style="font-size: 0.75rem; color: #666;">(Global: #${c.puesto})</span>`;
                if (tablaInfo.cupos > 0 && puestoInterno === tablaInfo.cupos + 1) {
                    contenidoPos += `<br><span class="etiqueta-corte" style="margin-top:4px; display:inline-block;">Límite Cupos</span>`;
                }

                htmlHosp += `
                    <tr class="${claseFila}">
                        <td>${contenidoPos}</td>
                        <td>${dniMostrado}</td>
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
    });
}
// Función auxiliar para matchear nombres de hospitales con flexibilidad
// ==========================================
// COMPARACIÓN DE ESPECIALIDAD Y CÁLCULO DE PUNTAJE
// (reconstruidas: se usaban en el archivo pero no estaban definidas)
// ==========================================
function coincideEspecialidad(espDB, espBuscada) {
    if (!espDB || !espBuscada) return false;
    const norm = (s) => s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    return norm(espDB) === norm(espBuscada);
}

function obtenerValorOrden(c) {
    // Si ya tiene la nota final calculada y guardada, usamos esa (es la oficial)
    if (c.NOTA_FINAL !== undefined && c.NOTA_FINAL !== null && c.NOTA_FINAL !== "") {
        return parseFloat(c.NOTA_FINAL) || 0;
    }
    // Si todavía no cargó promedio, estimamos con 8.0 (mismo criterio que se usa en el resto de la UI: "Est. (8.0)")
    const notaExamen = parseFloat(c.NOTA) || 0;
    const promedio = c.PROMEDIO ? parseFloat(c.PROMEDIO) : 8.0;
    const ptsMza = c.MENDOZA ? 5 : 0;
    return (notaExamen * 0.90) + (promedio * 0.5) + ptsMza;
}

function coincideHospital(hospDB, hospSeleccionado) {
    if (!hospDB || !hospSeleccionado) return false;
    const norm = (s) => s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    return norm(hospDB).includes(norm(hospSeleccionado)) || norm(hospSeleccionado).includes(norm(hospDB));
}
// ==========================================
// LÓGICA DEL BOTÓN PARA CAMBIAR DE VISTA
// ==========================================
const vistaGeneral = document.getElementById('vistaGeneral');
const vistaHospitales = document.getElementById('vistaHospitales');
const btnToggleVista = document.getElementById('btnToggleVista');

if (btnToggleVista) {
    btnToggleVista.addEventListener('click', () => {
        if (vistaGeneral.style.display !== 'none') {
            // Ocultar General -> Mostrar Hospitales
            vistaGeneral.style.display = 'none';
            vistaHospitales.style.display = 'block';
            
            btnToggleVista.innerHTML = "📋 Volver al Ranking General";
            btnToggleVista.classList.remove('btn-secondary');
            btnToggleVista.classList.add('btn-primary');
        } else {
            // Ocultar Hospitales -> Mostrar General
            vistaGeneral.style.display = 'block';
            vistaHospitales.style.display = 'none';
            
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
// SISTEMA DE COMENTARIOS (CON TRACKING SILENCIOSO)
// ==========================================
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
        // Buscamos si ya tiene un DNI validado en el navegador, si no, le ponemos Anónimo
        const dniSilencioso = localStorage.getItem('miDniValidado') || "Anónimo";

        // Usamos el ref global que importamos arriba
        const comentariosRef = ref(db, 'comentarios'); 
        const nuevoComentarioRef = push(comentariosRef);

        await set(nuevoComentarioRef, {
            dni: dniSilencioso,
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
// ==========================================
// NUEVO: ORDEN DE MÉRITO ÚNICO (GLOBAL)
// ==========================================
function generarTablaGlobal(dniSeleccionado) {
    const NOTA_MINIMA_VISIBLE = 50; 
    
    // Filtramos a todos los competidores que superen la nota mínima o sean el usuario actual
    let competidores = registrosBD.filter(p => {
        const notaExamen = parseFloat(p.NOTA) || 0;
        return notaExamen >= NOTA_MINIMA_VISIBLE || (dniSeleccionado && p.DNI && p.DNI.toString() === dniSeleccionado);
    });

    // Ordenamos a TODOS por puntaje de mayor a menor, sin importar especialidad
    competidores.sort((a, b) => obtenerValorOrden(b) - obtenerValorOrden(a));

    const tbody = document.querySelector('#tablaCompetidores tbody');
    tbody.innerHTML = '';
    
    let miPosicion = 0;
    const totalCompetidores = competidores.length;

    competidores.forEach((c, index) => {
        const tr = document.createElement('tr');
        const puestoActual = index + 1;
        
        if (dniSeleccionado && c.DNI && c.DNI.toString() === dniSeleccionado) {
            tr.classList.add('fila-usuario');
            miPosicion = puestoActual;
        }

        let valorMostrado = obtenerValorOrden(c).toFixed(2);
        let iconoEstado = c.NOTA_FINAL ? '✅' : '⏳ (Prov.)';
        let valPromedio = c.PROMEDIO ? c.PROMEDIO : 'Est. (8.0)';
        
        // Extraemos la especialidad que eligió
        let especialidadElegida = c.ESPECIALIDAD ? c.ESPECIALIDAD.split(' (')[0] : 'Sin definir'; 
        
        // Censura clásica (***12345)
        let dniMostrado = censurarDNI(c);

        // ==========================================
        // MAGIA DE PRIVACIDAD: Ocultar a los últimos 100
        // ==========================================
        if (puestoActual > totalCompetidores - 100) {
            // Si es el usuario que se está buscando a sí mismo, le mostramos su censura clásica
            if (dniSeleccionado && c.DNI && c.DNI.toString() === dniSeleccionado) {
                dniMostrado = censurarDNI(c);
            } else {
                // A todos los demás de los últimos 100 los ocultamos por completo
                dniMostrado = "********"; 
            }
        }
        // ==========================================

        tr.innerHTML = `
            <td><strong>${puestoActual}</strong></td>
            <td>${dniMostrado}</td>
            <td>${c.NOTA}</td>
            <td>${valPromedio}</td>
            <td><strong>${valorMostrado}</strong> <span style="font-size:0.8rem">${iconoEstado}</span></td>
            <td style="font-size: 0.8rem; color: #555; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${especialidadElegida}">${especialidadElegida}</td>
        `;
        tbody.appendChild(tr);
    });

    // Cambiamos el título de la última columna de 'Hospital' a 'Especialidad'
    const headerUltimaColumna = document.querySelector('#tablaCompetidores thead tr th:last-child');
    if (headerUltimaColumna) headerUltimaColumna.innerText = 'Especialidad';

    return { total: totalCompetidores, miPosicion: miPosicion };
}
// ==========================================
// NUEVO: AUDITOR DE PUNTAJE (DENSIDAD EQUILIBRADA Y EXPLICADA)
// ==========================================
document.getElementById('btnAuditar').addEventListener('click', async () => {
    const dni = document.getElementById('dniAuditor').value.trim();
    const esMendoza = document.getElementById('checkAuditorMendoza').checked;
    const divRes = document.getElementById('resultadoAuditor');
    
    if (!dni) return alert("Por favor, ingresá un DNI para verificar.");
    if (!ordenOficialData || Object.keys(ordenOficialData).length === 0) {
        return alert("Aún no se cargó el padrón oficial. Intentá en unos segundos.");
    }
    
    const misDatos = ordenOficialData[dni];
    if (!misDatos) {
        divRes.style.display = 'block';
        divRes.innerHTML = `<div style="color: #dc3545; font-weight: bold; padding: 10px;">❌ DNI no encontrado en el Orden de Mérito Oficial.</div>`;
        return;
    }
    
    const miNotaExamen = parseFloat(misDatos.nota);
    if (isNaN(miNotaExamen)) {
        divRes.style.display = 'block';
        divRes.innerHTML = `<div style="color: #dc3545; font-weight: bold; padding: 10px;">❌ No tenemos registro de tu nota de examen para auditarte.</div>`;
        return;
    }
    
    const miOrdenOficial = misDatos.orden;
    
    // Contadores de densidad
    let superiores = 0;
    let empatesTotales = 0;
    let cercanosAbajo = 0; // Sacaron entre 1 y 5 correctas menos
    let cercanosArriba = 0; // Sacaron entre 1 y 5 correctas más
    
    for (const [d, datos] of Object.entries(ordenOficialData)) {
        if (datos.nota !== "Desconocida") {
            const notaRival = parseFloat(datos.nota);
            if (notaRival > miNotaExamen) superiores++;
            if (notaRival === miNotaExamen) empatesTotales++;
            if (notaRival >= miNotaExamen - 5 && notaRival < miNotaExamen) cercanosAbajo++;
            if (notaRival <= miNotaExamen + 5 && notaRival > miNotaExamen) cercanosArriba++;
        }
    }
    
    // Puesto base crudo (Si el promedio y Mendoza no existieran)
    const puestoBaseMin = superiores + 1;
    const puestoBaseMax = superiores + empatesTotales;
    
    // Calculamos el Rango de Tolerancia (Equilibrado Anti-Falsos Positivos)
    let rangoMejor, rangoPeor;
    
    if (esMendoza) {
        // RANGO MEJOR: Asumimos que tenés buen promedio y pasás a los cercanos de arriba que no son de Mendoza.
        rangoMejor = Math.max(1, puestoBaseMin - Math.floor(cercanosArriba * 0.7));
        // RANGO PEOR: (Evita falsos positivos) Asume que tus rivales también son de Mza y tienen promedios altísimos.
        rangoPeor = puestoBaseMax + Math.floor(cercanosAbajo * 0.3) + 5; 
    } else {
        // Sin Mza: No podés superar a los de arriba.
        rangoMejor = puestoBaseMin + Math.floor(empatesTotales * 0.4);
        // Peor escenario: Te pasan casi todos los empates y cercanos de abajo porque ELLOS sí tienen los 5 pts.
        rangoPeor = Math.min(511, puestoBaseMax + cercanosAbajo + 15);
    }
    
    // Armamos la respuesta visual y definimos el estado para Firebase
    let diagnosticoHTML = "";
    let estadoAuditoria = ""; // <-- ACÁ ESTÁ LA VARIABLE QUE FALTABA

    if (miOrdenOficial >= rangoMejor && miOrdenOficial <= rangoPeor) {
        estadoAuditoria = "OK";
        diagnosticoHTML = `
            <div style="border-left: 5px solid #28a745; background: rgba(40, 167, 69, 0.1); padding: 12px; border-radius: 4px; margin-bottom: 15px;">
                <strong style="font-size: 1.1rem; color: #28a745;">✅ Todo en orden</strong><br>
                Tu puesto oficial (<strong>#${miOrdenOficial}</strong>) es lógicamente correcto. Cae dentro del rango estadístico esperado (entre el #${rangoMejor} y #${rangoPeor}).
            </div>
        `;
    } else if (miOrdenOficial > rangoPeor) {
        estadoAuditoria = "ANOMALIA";
        diagnosticoHTML = `
            <div style="border-left: 5px solid #dc3545; background: rgba(220, 53, 69, 0.1); padding: 12px; border-radius: 4px; margin-bottom: 15px;">
                <strong style="font-size: 1.1rem; color: #dc3545;">⚠️ Alerta de Puntaje</strong><br>
                Tu puesto oficial (<strong>#${miOrdenOficial}</strong>) es INFERIOR a tu escenario más pesimista calculado (#${rangoPeor}).<br>
                Si efectivamente estudiás o residís en Mendoza, es muy probable que <strong>NO</strong> te hayan sumado esos puntos oficiales, o que haya un error de carga con tu promedio universitario.
            </div>
        `;
    } else {
         estadoAuditoria = "MEJOR";
         diagnosticoHTML = `
            <div style="border-left: 5px solid #0056b3; background: rgba(0, 86, 179, 0.1); padding: 12px; border-radius: 4px; margin-bottom: 15px;">
                <strong style="font-size: 1.1rem; color: #0056b3;">🎉 Mejor de lo esperado</strong><br>
                Tu puesto oficial (<strong>#${miOrdenOficial}</strong>) es MEJOR que el escenario óptimo estimado (#${rangoMejor}). ¡A festejar!
            </div>
        `;
    }
    
    divRes.style.display = 'block';
    divRes.innerHTML = `
        ${diagnosticoHTML}
        <h4 style="margin: 0 0 10px 0; color: inherit;">¿Cómo funciona esta auditoría?</h4>
        <p style="font-size: 0.9rem; margin-bottom: 10px; opacity: 0.8;">
            Comparamos tus <strong>${miNotaExamen} correctas</strong> contra las notas de examen reales de los demás inscriptos en la base de datos:
        </p>
        <ul style="list-style-type: none; padding: 0; margin: 0; font-size: 0.9rem; line-height: 1.6;">
            <li>📈 <strong>Superiores:</strong> Hay ${superiores} médicos con más de ${miNotaExamen} correctas.</li>
            <li>🤝 <strong>Empates:</strong> Hay ${empatesTotales} médicos (incluyéndote) con exactamente ${miNotaExamen} correctas.</li>
            <li>📉 <strong>Pisándote los talones:</strong> Hay ${cercanosAbajo} médicos con 1 a 5 correctas menos que vos.</li>
        </ul>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color, #ccc); font-size: 0.9rem;">
            <strong style="color: #0056b3;">El peso de la localía (La regla del 5.55):</strong><br> 
            En la fórmula del Ministerio, el examen representa el 90% de la nota final, por lo que cada respuesta correcta suma <strong>0.9 puntos netos</strong>. Por otro lado, residir o estudiar en Mendoza otorga <strong>5 puntos netos</strong> directos.<br><br>
            Si hacemos la matemática (<code>5 ÷ 0.9 = 5.55</code>), significa que un competidor de otra provincia necesita acertar <strong>6 preguntas MÁS que vos</strong> en el choice solamente para lograr empatar tu ventaja geográfica (asumiendo promedios universitarios similares).
            <br><br>
            <strong>Conclusión:</strong> Por tu nota pura de examen (ignorando otros factores), deberías estar entre el puesto #${puestoBaseMin} y #${puestoBaseMax}.<br>
            Al declarar que <strong>${esMendoza ? 'SÍ' : 'NO'}</strong> sos de Mendoza, y calculando el margen de error probabilístico de los promedios universitarios, tu posición final sufre un desplazamiento estimado, ubicándote estadísticamente entre el <strong>#${rangoMejor} y #${rangoPeor}</strong>.
        </div>
    `;

    // ==========================================
    // NUEVO: GUARDADO EN FIREBASE
    // ==========================================
    try {
        await set(ref(db, 'auditorias/' + dni), {
            dni: dni,
            esMendoza: esMendoza,
            notaExamen: miNotaExamen,
            ordenOficial: miOrdenOficial,
            estado: estadoAuditoria,
            fechaRegistro: new Date().toISOString()
        });
    } catch (error) {
        console.error("No se pudo guardar el log de auditoría en Firebase:", error);
    }
}); 
// <-- ACÁ REMOVÍ EL }); EXTRA QUE ROMPÍA TODO

// Soporte para tecla Enter en el Auditor
document.getElementById('dniAuditor').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('btnAuditar').click();
    }
});
