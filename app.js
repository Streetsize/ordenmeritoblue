import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, child, update, onValue, push, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
        
		const listaEspAdj = document.getElementById('listaEspAdj');
        const listaEspVerAdj = document.getElementById('listaEspVerAdj');

        if (esPrimerNivel && !esNoMedica) {
            // Se agregan las opciones a todos los selectores de la aplicacion
            listaEsp.appendChild(new Option(esp, esp));
            listaEspLibre.appendChild(new Option(esp, esp));
            if (listaEspAdj) listaEspAdj.appendChild(new Option(esp, esp));
            if (listaEspVerAdj) listaEspVerAdj.appendChild(new Option(esp, esp));
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
// FUNCIÓN PARA LIMPIAR LOS ERRORES DE TIPEO DEL MINISTERIO
// ==========================================
function unificarEspecialidad(texto) {
    if (!texto) return "";
    // 1. Quitamos tildes, lo pasamos a mayúsculas y cortamos el paréntesis
    let limpio = texto.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split('(')[0].trim();
    // 2. Limpiamos basura del Excel del Ministerio (ej. el tilde en CIRUGÍA CARDIOVASCULAR ´)
    limpio = limpio.replace(/´/g, "").replace(/'/g, "").trim();
    
    // 3. Emparejamos los nombres que escribieron por la mitad
    if (limpio.includes("PSIQUIATRIA CLINICA INTERDISCIPLINARIA")) return "PSIQUIATRIA ADULTOS";
    if (limpio.startsWith("CIRUGIA CARDIOVASCULAR")) return "CIRUGIA CARDIOVASCULAR";
    if (limpio.startsWith("PEDIATRIA Y NEONATOLOGIA")) return "PEDIATRIA Y NEO";
    if (limpio.startsWith("PEDIATRIA Y TERAPIA")) return "PEDIATRIA Y UTI";
    if (limpio.startsWith("ORTOPEDIA Y TRAUMATOLOGIA PEDIATRICA")) return "TRAUMATO PEDIATRICA";
    if (limpio.startsWith("ORTOPEDIA Y TRAUMATOLOGIA")) return "TRAUMATOLOGIA GENERAL";
    
    return limpio;
}

// ==========================================
// NUEVA TABLA OFICIAL (Lee 100% de Firebase - A PRUEBA DE ERRORES)
// ==========================================
async function generarTablaOficial(especialidadElegida, dniResaltado) {
    const tbody = document.querySelector('#tablaCompetidores tbody');
    tbody.innerHTML = '';
    tituloTabla.innerText = `Ranking Oficial: ${especialidadElegida}`;

    // Normalizamos la especialidad que eligió el usuario en el select
    const baseElegida = unificarEspecialidad(especialidadElegida);

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
                // Normalizamos la especialidad sucia que viene de Firebase
                const baseFB = unificarEspecialidad(datosFb.ESPECIALIDAD);
                
                // Ahora la comparación es perfecta y a prueba de tildes o recortes
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
		"Hospital Teodoro Schestakow": 2
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
		"Facultad (UNC)": 2,
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
        "Clínica del Prado": 1,
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
        "Hospital Español": 2,
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
// LOGICA DE ADJUDICACIONES EN VIVO
// ==========================================

// ---> VARIABLE DE CONTROL DIARIO <---
// Cambiá este número para habilitar a más personas cada día.
// Representa el tope del Ranking Global autorizado a cargar hoy.
const LIMITE_ADJUDICACION_DIARIA = 20; 

const dniAdjudicacionInput = document.getElementById('dniAdjudicacion');
const btnValidarAdjudicacion = document.getElementById('btnValidarAdjudicacion');
const formAdjudicacion = document.getElementById('formAdjudicacion');
const espAdjudicadaInput = document.getElementById('espAdjudicada');
const hospAdjudicadoSelect = document.getElementById('hospAdjudicado');
const hospAdjudicado2Select = document.getElementById('hospAdjudicado2');
const grupoHospAdj2 = document.getElementById('grupoHospAdj2');
const lblHospAdj1 = document.getElementById('lblHospAdj1');
const btnGuardarAdjudicacion = document.getElementById('btnGuardarAdjudicacion');
const msgAdjudicacion = document.getElementById('msgAdjudicacion');

if (btnValidarAdjudicacion) {
    btnValidarAdjudicacion.addEventListener('click', () => {
        const dni = dniAdjudicacionInput.value.trim();
        if (!dni) return alert("Por favor ingresa un DNI valido.");
        
        if (!ordenOficialData || Object.keys(ordenOficialData).length === 0) {
            return alert("Aun no se ha cargado el padron oficial. Intenta en unos segundos.");
        }

        // Verificamos si existe en el padron oficial
        if (ordenOficialData[dni]) {
            const puestoGlobal = ordenOficialData[dni].orden;

            // Verificamos si su puesto está dentro de los habilitados para hoy
            if (puestoGlobal <= LIMITE_ADJUDICACION_DIARIA) {
                btnValidarAdjudicacion.innerText = "DNI Validado Exitosamente";
                btnValidarAdjudicacion.style.backgroundColor = "#6c757d";
                btnValidarAdjudicacion.style.borderColor = "#6c757d";
                btnValidarAdjudicacion.disabled = true;
                dniAdjudicacionInput.disabled = true;
                formAdjudicacion.style.display = 'block';
            } else {
                alert(`Tu puesto en el ranking global es el #${puestoGlobal}.\n\nHoy solo están habilitados para cargar su elección los postulantes hasta el puesto #${LIMITE_ADJUDICACION_DIARIA}. ¡Pronto será tu turno!`);
            }
        } else {
            alert("El DNI ingresado no figura en el Orden de Merito oficial del Ministerio.");
        }
    });
}

// Desplegar hospitales y validar logica de Psiquiatria al escribir la especialidad
if (espAdjudicadaInput) {
    espAdjudicadaInput.addEventListener('input', function() {
        const espSelec = this.value.trim();
        hospAdjudicadoSelect.innerHTML = '<option value="">Selecciona un hospital...</option>';
        if (hospAdjudicado2Select) hospAdjudicado2Select.innerHTML = '<option value="">Selecciona un hospital para 2do año...</option>';
        
        const esPsiq = (espSelec === "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)");

        if (datosResidencias[espSelec]) {
            hospAdjudicadoSelect.disabled = false;
            
            datosResidencias[espSelec].sort().forEach(hosp => {
                hospAdjudicadoSelect.appendChild(new Option(hosp, hosp));
                if (esPsiq && hospAdjudicado2Select) hospAdjudicado2Select.appendChild(new Option(hosp, hosp));
            });

            // Mostramos u ocultamos el segundo select dependiendo de la especialidad
            if (esPsiq) {
                grupoHospAdj2.style.display = 'block';
                lblHospAdj1.innerText = "Hospital adjudicado (1er Año):";
            } else {
                grupoHospAdj2.style.display = 'none';
                lblHospAdj1.innerText = "Hospital adjudicado:";
            }
        } else {
            hospAdjudicadoSelect.disabled = true;
            grupoHospAdj2.style.display = 'none';
        }
    });
}

// Guardar la adjudicacion 
if (btnGuardarAdjudicacion) {
    btnGuardarAdjudicacion.addEventListener('click', async () => {
        const dni = dniAdjudicacionInput.value.trim();
        const especialidad = espAdjudicadaInput.value.trim();
        let hospital = hospAdjudicadoSelect.value;
        const esPsiq = (especialidad === "PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)");

        if (!especialidad || !hospital) {
            return alert("Debes seleccionar obligatoriamente una especialidad y un hospital.");
        }

        if (esPsiq) {
            const hospitalAnio2 = hospAdjudicado2Select.value;
            if (!hospitalAnio2) return alert("Para Psiquiatria debes elegir un hospital para el 1er año y otro para el 2do año.");
            hospital = `${hospital} (1er) / ${hospitalAnio2} (2do)`;
        }

        btnGuardarAdjudicacion.disabled = true;
        btnGuardarAdjudicacion.innerText = "Registrando...";

        try {
            await set(ref(db, 'adjudicaciones/' + dni), {
                especialidad: especialidad,
                hospital: hospital,
                fecha: new Date().toISOString()
            });

            formAdjudicacion.style.display = 'none';
            msgAdjudicacion.style.display = 'block';
            msgAdjudicacion.style.color = '#155724';
            msgAdjudicacion.innerText = "Adjudicacion registrada exitosamente. Esta informacion permanece privada y solo contribuye al contador de cupos.";
            
            if (typeof registrarUso === 'function') registrarUso("CARGA_ADJUDICACION", dni, especialidad);
            
        } catch (error) {
            alert("Hubo un error al guardar: " + error.message);
            btnGuardarAdjudicacion.disabled = false;
            btnGuardarAdjudicacion.innerText = "Guardar Adjudicacion";
        }
    });
}

// ==========================================
// VISOR PUBLICO DE ADJUDICACIONES (MODO TABLERO PLEGABLE)
// ==========================================
const btnAbrirTableroCupos = document.getElementById('btnAbrirTableroCupos');
const btnCerrarTablero = document.getElementById('btnCerrarTablero');
const paso4 = document.getElementById('paso4');

if (btnCerrarTablero) {
    btnCerrarTablero.addEventListener('click', () => {
        paso4.style.display = 'none';
        paso1.style.display = 'block';
    });
}

if (btnAbrirTableroCupos) {
    btnAbrirTableroCupos.addEventListener('click', async () => {
        mostrarCarga(true);
        
        try {
            // Descargamos la lista que subio el scraper de Python
            const snapshot = await get(ref(db, 'adjudicaciones'));
            const adjudicacionesBrutas = snapshot.exists() ? snapshot.val() : {};

            // 1. Reagrupamos la lista plana y calculamos el TOTAL GENERAL
            const adjudicacionesOficiales = {};
            let totalAdjudicadosGeneral = 0; // Contador general

            for (const key in adjudicacionesBrutas) {
                // IMPORTANTÍSIMO: Saltamos las llaves de metadata para no romper el código
                if (key === "ultima_actualizacion" || key === "estado") continue;
                
                const item = adjudicacionesBrutas[key];
                if (item && item.especialidad && item.hospital) {
                    if (!adjudicacionesOficiales[item.especialidad]) {
                        adjudicacionesOficiales[item.especialidad] = {};
                    }
                    adjudicacionesOficiales[item.especialidad][item.hospital] = 
                        (adjudicacionesOficiales[item.especialidad][item.hospital] || 0) + item.adjudicados;
                    
                    // Sumamos al contador general por ahora
                    totalAdjudicadosGeneral += item.adjudicados;
                }
            }

            // ========================================================
            // 🛠️ PARCHES MANUALES PARA ERRORES DE INFOSALUD
            // ========================================================
            // Acá podés forzar la cantidad real de adjudicados.
            // Escribí la Especialidad y el Hospital EXACTAMENTE como salen en el tablero.
            const correccionesManuales = {
                "ANESTESIOLOGÍA (Primer nivel)": {
                    "Hospital Central": 4 // Poné acá el número REAL de ocupados
                }
            };

            // Aplicamos los parches silenciosamente
            for (const espParche in correccionesManuales) {
                if (!adjudicacionesOficiales[espParche]) adjudicacionesOficiales[espParche] = {};
                
                for (const hospParche in correccionesManuales[espParche]) {
                    const cantidadCorrecta = correccionesManuales[espParche][hospParche];
                    const cantidadAnteriorInfoSalud = adjudicacionesOficiales[espParche][hospParche] || 0;
                    
                    // Ajustamos el total general para que la suma no de mal
                    totalAdjudicadosGeneral += (cantidadCorrecta - cantidadAnteriorInfoSalud);
                    
                    // Pisamos el dato malo del gobierno con el tuyo
                    adjudicacionesOficiales[espParche][hospParche] = cantidadCorrecta;
                }
            }
            // ========================================================

// 2. Extraemos y mostramos la hora junto con el nuevo contador
            const elementoTexto = document.getElementById('textoActualizacion');
            let textoHora = "Sincronizado con InfoSalud (Hora no disponible)";
            
            // --- LÓGICA DEL CRONOGRAMA POR TRAMOS HORARIOS ---
            const fechaActual = new Date();
            const mesActual = fechaActual.getMonth(); // Agosto es 7
            const diaActual = fechaActual.getDate();
            const tiempoDecimal = fechaActual.getHours() + (fechaActual.getMinutes() / 60);
            
            let maximoLlamadosHoy = 0;
            let textoCronograma = "";

            // Array con cada bloque horario del cronograma oficial
            const tramos = [
                { dia: 11, inicio: 12.0, fin: 13.0, desde: 1, hasta: 9 },
                { dia: 11, inicio: 13.0, fin: 14.0, desde: 10, hasta: 19 },
                
                { dia: 12, inicio: 8.5, fin: 9.5, desde: 20, hasta: 29 },
                { dia: 12, inicio: 9.5, fin: 10.5, desde: 30, hasta: 39 },
                { dia: 12, inicio: 10.5, fin: 11.5, desde: 40, hasta: 49 },
                { dia: 12, inicio: 11.5, fin: 12.5, desde: 50, hasta: 59 },
                { dia: 12, inicio: 12.5, fin: 13.5, desde: 60, hasta: 69 },
                { dia: 12, inicio: 13.5, fin: 14.5, desde: 70, hasta: 79 },
                
                { dia: 13, inicio: 8.5, fin: 9.5, desde: 80, hasta: 89 },
                { dia: 13, inicio: 9.5, fin: 10.5, desde: 90, hasta: 99 },
                { dia: 13, inicio: 10.5, fin: 11.5, desde: 100, hasta: 109 },
                { dia: 13, inicio: 11.5, fin: 12.5, desde: 110, hasta: 119 },
                { dia: 13, inicio: 12.5, fin: 13.5, desde: 120, hasta: 129 },
                { dia: 13, inicio: 13.5, fin: 14.5, desde: 130, hasta: 139 },
                
                { dia: 14, inicio: 8.5, fin: 9.5, desde: 140, hasta: 149 },
                { dia: 14, inicio: 9.5, fin: 10.5, desde: 150, hasta: 159 },
                { dia: 14, inicio: 10.5, fin: 11.5, desde: 160, hasta: 169 },
                { dia: 14, inicio: 11.5, fin: 12.5, desde: 170, hasta: 179 },
                { dia: 14, inicio: 12.5, fin: 13.5, desde: 180, hasta: 189 },
                { dia: 14, inicio: 13.5, fin: 14.5, desde: 190, hasta: 199 },
                
                { dia: 18, inicio: 8.5, fin: 9.5, desde: 200, hasta: 209 },
                { dia: 18, inicio: 9.5, fin: 10.5, desde: 210, hasta: 219 },
                { dia: 18, inicio: 10.5, fin: 11.5, desde: 220, hasta: 229 },
                { dia: 18, inicio: 11.5, fin: 12.5, desde: 230, hasta: 239 },
                { dia: 18, inicio: 12.5, fin: 13.5, desde: 240, hasta: 250 },
                
                { dia: 19, inicio: 8.5, fin: 9.5, desde: 251, hasta: 270 },
                { dia: 19, inicio: 9.5, fin: 10.5, desde: 271, hasta: 290 },
                { dia: 19, inicio: 10.5, fin: 11.5, desde: 291, hasta: 310 },
                { dia: 19, inicio: 11.5, fin: 12.5, desde: 311, hasta: 330 },
                { dia: 19, inicio: 12.5, fin: 13.5, desde: 331, hasta: 350 },
                { dia: 19, inicio: 13.5, fin: 14.5, desde: 351, hasta: 370 },
                
                { dia: 20, inicio: 8.5, fin: 9.5, desde: 371, hasta: 400 },
                { dia: 20, inicio: 9.5, fin: 10.5, desde: 401, hasta: 430 },
                { dia: 20, inicio: 10.5, fin: 11.5, desde: 431, hasta: 450 },
                { dia: 20, inicio: 11.5, fin: 12.5, desde: 451, hasta: 470 },
                { dia: 20, inicio: 12.5, fin: 13.5, desde: 471, hasta: 490 },
                { dia: 20, inicio: 13.5, fin: 14.5, desde: 491, hasta: 511 }
            ];

            if (mesActual === 7) {
                const tramosHoy = tramos.filter(t => t.dia === diaActual);

                if (diaActual < 11) {
                    textoCronograma = "Las adjudicaciones comienzan el 11 de agosto.";
                } else if (diaActual > 14 && diaActual < 18) {
                    maximoLlamadosHoy = 199;
                    textoCronograma = "Sin adjudicaciones programadas por el fin de semana largo.";
                } else if (diaActual > 20) {
                    maximoLlamadosHoy = 511;
                    textoCronograma = "El proceso de adjudicación ha finalizado.";
                } else if (tramosHoy.length > 0) {
                    // Buscar en qué tramo horario estamos hoy
                    let tramoActivo = null;
                    let tramoPasado = null;

                    for (const tramo of tramosHoy) {
                        if (tiempoDecimal >= tramo.inicio && tiempoDecimal < tramo.fin) {
                            tramoActivo = tramo;
                        } else if (tiempoDecimal >= tramo.fin) {
                            tramoPasado = tramo;
                        }
                    }

                    if (tiempoDecimal < tramosHoy[0].inicio) {
                        // Es temprano a la mañana (antes de que empiece la jornada de hoy)
                        // Calculamos el tope del día anterior
                        const diaAnterior = tramos.filter(t => t.dia < diaActual);
                        maximoLlamadosHoy = diaAnterior.length > 0 ? diaAnterior[diaAnterior.length - 1].hasta : 0;
                        const horaInicioFormateada = tramosHoy[0].inicio === 8.5 ? "08:30" : "12:00";
                        textoCronograma = `La jornada comienza a las ${horaInicioFormateada}hs. (Llamados hasta ayer: #${maximoLlamadosHoy})`;
                    } else if (tramoActivo) {
                        // Estamos en pleno turno
                        maximoLlamadosHoy = tramoActivo.hasta;
                        textoCronograma = `Actualmente adjudicando el bloque de las ${Math.floor(tramoActivo.inicio)}:${tramoActivo.inicio % 1 !== 0 ? '30' : '00'} (Puestos ${tramoActivo.desde} al ${tramoActivo.hasta}).`;
                    } else if (tramoPasado) {
                        // Ya pasó el último turno del día
                        maximoLlamadosHoy = tramosHoy[tramosHoy.length - 1].hasta;
                        textoCronograma = `Turno finalizado por hoy. Llamaron hasta el puesto #${maximoLlamadosHoy}.`;
                    }
                }
            } else if (mesActual > 7) {
                maximoLlamadosHoy = 511;
                textoCronograma = "El proceso de adjudicación ha finalizado.";
            }

            // Calculamos cuántos renunciaron/pasaron (Llamados habilitados menos los que efectivamente eligieron)
            let ausentesORenuncias = 0;
            if (maximoLlamadosHoy > 0) {
                 ausentesORenuncias = maximoLlamadosHoy - totalAdjudicadosGeneral;
                 if(ausentesORenuncias < 0) ausentesORenuncias = 0; // Por si hay algún desfase o error de InfoSalud
            }

            // Inyectamos la hora y verificamos si es horario nocturno
            if (adjudicacionesBrutas.ultima_actualizacion) {
                const fechaObj = new Date(adjudicacionesBrutas.ultima_actualizacion);
                const horaLocal = fechaObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const horaActualNumerica = fechaActual.getHours();
                
                if (horaActualNumerica >= 18 || horaActualNumerica < 8) {
                    textoHora = `<span style="display: inline-block; width: 8px; height: 8px; background-color: #6c757d; border-radius: 50%;"></span> <span style="color: #555;"><b>Fuera de servicio:</b> Ya no hay cambios oficiales por hoy. (Última vez: ${horaLocal})</span>`;
                } else {
                    textoHora = `<span style="display: inline-block; width: 8px; height: 8px; background-color: #28a745; border-radius: 50%; animation: pulse 2s infinite;"></span> Sincronizado con InfoSalud a las <b>${horaLocal}</b>`;
                }
            }

            // Inyectamos todo en el HTML
            if (elementoTexto) {
                elementoTexto.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 5px;">
                        <div>${textoHora}</div>
                        
                        <div style="background: rgba(0,0,0,0.03); border: 1px solid #ccc; padding: 10px 15px; border-radius: 4px;">
                            <div style="font-weight: 500; font-size: 0.95rem; color: #333; margin-bottom: 5px;">
                                📅 ${textoCronograma}
                            </div>
                            
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                <span style="color: #6f42c1; font-weight: bold; font-size: 0.95rem; background-color: rgba(111, 66, 193, 0.1); padding: 4px 8px; border-radius: 4px; display: inline-block;">
                                    Total adjudicados: ${totalAdjudicadosGeneral}
                                </span>
                                
                                <span style="color: #dc3545; font-weight: bold; font-size: 0.95rem; background-color: rgba(220, 53, 69, 0.1); padding: 4px 8px; border-radius: 4px; display: inline-block;" title="Ausencias, renuncias o puestos que quedaron vacantes hasta el momento">
                                    Ausentes: ${ausentesORenuncias}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            }

            const contenedor = document.getElementById('contenedorAcordeonesCupos');
            contenedor.innerHTML = '';

            const carrerasNoMedicas = [
                "AUDIOLOGÍA", "BIOQUÍMICA", "ENDODONCIA", "ENFERMERÍA", 
                "FARMACIA", "KINESIOLOGÍA", "NUTRICIÓN", "ODONTOLOGÍA", 
                "ODONTOPEDIATRÍA", "PSICOLOGÍA", "TRABAJO SOCIAL"
            ];

            let especialidades = Object.keys(cuposPorHospital).sort();
            
            especialidades = especialidades.filter(esp => {
                const esPrimerNivel = esp.includes("(Primer nivel)") || esp.includes("(Ambos niveles)");
                const esNoMedica = carrerasNoMedicas.some(carrera => esp.includes(carrera));
                return esPrimerNivel && !esNoMedica;
            });

            especialidades.forEach(esp => {
                const cuposDeEsp = cuposPorHospital[esp] || {};
                const datosGobierno = adjudicacionesOficiales[esp] || {};
                
                let tarjetasAGenerar = [];
                
                // Armamos las tarjetas cruzando tu diccionario con los datos del gobierno
                for (const hospBase in cuposDeEsp) {
                    tarjetasAGenerar.push({ 
                        nombre: hospBase, 
                        cupos: cuposDeEsp[hospBase],
                        adjudicados: datosGobierno[hospBase] || 0
                    });
                }

                tarjetasAGenerar.sort((a, b) => a.nombre.localeCompare(b.nombre));

                // Calculamos los totales para la cabecera del acordeon
                let totalCuposEsp = 0;
                let totalAdjudicadosEsp = 0;
                tarjetasAGenerar.forEach(t => {
                    totalCuposEsp += t.cupos;
                    totalAdjudicadosEsp += t.adjudicados;
                });

                const btnToggle = document.createElement('button');
                btnToggle.className = 'btn-toggle-stats';
                btnToggle.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px;">
                        <span style="text-align: left; flex: 1; font-size: 0.95rem;">${esp}</span>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 0.85rem; background: rgba(0,0,0,0.08); padding: 3px 8px; border-radius: 12px; color: inherit; white-space: nowrap;">
                                ${totalAdjudicadosEsp} / ${totalCuposEsp}
                            </span>
                            <span class="flecha" style="font-size: 0.8rem;">▼</span>
                        </div>
                    </div>
                `;
                
                const contentDiv = document.createElement('div');
                contentDiv.className = 'seccion-colapsable';
                
                let htmlHosp = `<div style="margin-top: 5px; margin-bottom: 15px; display:flex; flex-direction:column; gap:6px;">`;
                
                tarjetasAGenerar.forEach(tarjeta => {
                    let colorEstado = '#28a745'; // Libre
                    if (tarjeta.adjudicados >= tarjeta.cupos) {
                        colorEstado = '#dc3545'; // Lleno
                    } else if (tarjeta.adjudicados > 0) {
                        colorEstado = '#fd7e14'; // Llenandose
                    }

                    htmlHosp += `
                        <div class="card-opcion" style="margin-bottom:0; padding:10px 15px; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid ${colorEstado}; border-radius: 4px;">
                            <span style="font-weight: 500; font-size: 0.9rem;">${tarjeta.nombre}</span>
                            <span style="font-weight: bold; font-size: 0.85rem; color: ${colorEstado}; background: rgba(0,0,0,0.05); padding: 3px 8px; border-radius: 4px; white-space: nowrap;">
                                Elegidos: ${tarjeta.adjudicados} / ${tarjeta.cupos}
                            </span>
                        </div>
                    `;
                });
                
                htmlHosp += `</div>`;
                contentDiv.innerHTML = htmlHosp;

                btnToggle.addEventListener('click', () => {
                    const estaAbierto = btnToggle.classList.contains('abierta');
                    if (!estaAbierto) {
                        btnToggle.classList.add('abierta');
                        contentDiv.classList.add('abierta');
                    } else {
                        btnToggle.classList.remove('abierta');
                        contentDiv.classList.remove('abierta');
                    }
                });

                contenedor.appendChild(btnToggle);
                contenedor.appendChild(contentDiv);
            });

            document.getElementById('paso1').style.display = 'none';
            paso4.style.display = 'block';

            if (typeof registrarUso === 'function') registrarUso("VER_TABLERO_CUPOS", "Visitante");

        } catch (error) {
            mostrarError("Error al descargar los datos en tiempo real: " + error.message);
        }
        
        mostrarCarga(false);
    });
}

// ==========================================
// MODULO MANUAL DE PSIQUIATRÍA
// ==========================================
const btnAbrirPsiquiatria = document.getElementById('btnAbrirPsiquiatria');
const btnCerrarPsiquiatria = document.getElementById('btnCerrarPsiquiatria');
const pasoPsiquiatria = document.getElementById('pasoPsiquiatria');

if(btnAbrirPsiquiatria) {
    btnAbrirPsiquiatria.addEventListener('click', () => {
        document.getElementById('paso1').style.display = 'none';
        pasoPsiquiatria.style.display = 'block';
        cargarTableroPsiquiatria(); 
    });
}

if(btnCerrarPsiquiatria) {
    btnCerrarPsiquiatria.addEventListener('click', () => {
        pasoPsiquiatria.style.display = 'none';
        document.getElementById('paso1').style.display = 'block';
        
        // Al salir, reseteamos el formulario por seguridad
        document.getElementById('grupoSedesPsiq').style.display = 'none';
        document.getElementById('dniPsiq').disabled = false;
        document.getElementById('dniPsiq').value = '';
        document.getElementById('btnValidarPsiq').style.display = 'block';
        document.getElementById('msgPsiq').textContent = '';
        postulanteConfirmadoPsiq = null;
    });
}

// Variable para recordar quién pasó la validación
let postulanteConfirmadoPsiq = null; 

// --- PASO 1: VALIDAR DNI Y FECHA ---
const btnValidarPsiq = document.getElementById('btnValidarPsiq');
if (btnValidarPsiq) {
    btnValidarPsiq.addEventListener('click', () => {
        const dni = document.getElementById('dniPsiq').value.trim();
        const msg = document.getElementById('msgPsiq');
        msg.textContent = ''; 
        
        if (!dni) {
            msg.style.color = '#dc3545';
            msg.textContent = 'Por favor, ingresá tu DNI.';
            return;
        }

        // Validamos contra la base oficial
        if (!ordenOficialData || Object.keys(ordenOficialData).length === 0) {
            msg.style.color = '#dc3545';
            msg.textContent = 'Aún no se conectó con el padrón oficial. Intentá en unos segundos.';
            return;
        }

        const postulanteOficial = ordenOficialData[dni];
        if (!postulanteOficial) {
            msg.style.color = '#dc3545';
            msg.textContent = 'Tu DNI no figura en el Orden de Mérito oficial.';
            return;
        }

        const puestoGlobal = parseInt(postulanteOficial.orden);
        
        // --- LÓGICA DEL CRONOGRAMA ---
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth(); // En JS, Agosto es 7, Septiembre es 8.
        const diaActual = fechaActual.getDate();
        
        let limiteOrden = 0;
        
        if (mesActual === 7) { // Estamos en Agosto
            if (diaActual < 12) limiteOrden = 0; 
            else if (diaActual === 12) limiteOrden = 79;
            else if (diaActual === 13) limiteOrden = 139;
            else if (diaActual === 14) limiteOrden = 199;
            else limiteOrden = 9999; // A partir del 15, todos
        } else if (mesActual > 7) {
            limiteOrden = 9999; // Resto del año, todos
        }

        if (puestoGlobal > limiteOrden) {
            msg.style.color = '#dc3545';
            if (limiteOrden === 0) {
                msg.textContent = `Tu puesto es #${puestoGlobal}. Las adjudicaciones comienzan recién el 12 de agosto.`;
            } else {
                msg.textContent = `Tu puesto es #${puestoGlobal}. Hoy solo están habilitados para elegir hasta el puesto #${limiteOrden}.`;
            }
            return;
        }

        // Si pasó los controles, lo autorizamos
        postulanteConfirmadoPsiq = {
            dni: dni,
            orden: puestoGlobal
        };
        
        msg.style.color = '#28a745';
        msg.textContent = `¡DNI Autorizado! Estás en el Puesto #${puestoGlobal}. Ya podés elegir tus sedes abajo.`;
        
        // Bloqueamos el DNI y abrimos las compuertas
        document.getElementById('dniPsiq').disabled = true;
        btnValidarPsiq.style.display = 'none';
        document.getElementById('grupoSedesPsiq').style.display = 'block';
    });
}

// --- PASO 2: GUARDAR LAS SEDES ---
const btnGuardarPsiq = document.getElementById('btnGuardarPsiq');
if (btnGuardarPsiq) {
    btnGuardarPsiq.addEventListener('click', async () => {
        const sede1 = document.getElementById('sede1Psiq').value;
        const sede2 = document.getElementById('sede2Psiq').value;
        const msg = document.getElementById('msgPsiq');

        if(!sede1 || !sede2) {
            msg.style.color = '#dc3545';
            msg.textContent = 'Por favor, elegí ambas sedes antes de confirmar.';
            return;
        }

        if(!postulanteConfirmadoPsiq) {
            msg.style.color = '#dc3545';
            msg.textContent = 'Tu DNI no fue validado correctamente.';
            return;
        }

        mostrarCarga(true);
        try {
            // Buscamos si existe en registrosBD para anonimizar manteniendo el formato "***123"
            let nombreVisible = "Médico DNI ***" + postulanteConfirmadoPsiq.dni.slice(-3);
            
            await set(ref(db, `psiquiatria_manual/${postulanteConfirmadoPsiq.dni}`), {
                nombre: nombreVisible,
                orden: postulanteConfirmadoPsiq.orden,
                sede1: sede1,
                sede2: sede2,
                timestamp: Date.now()
            });
            
            msg.style.color = '#28a745';
            msg.textContent = '¡Tus sedes fueron guardadas con éxito y publicadas en el tablero!';
            
            // Reiniciamos el formulario por si quiere cargar a un amigo
            document.getElementById('dniPsiq').value = '';
            document.getElementById('dniPsiq').disabled = false;
            document.getElementById('sede1Psiq').value = '';
            document.getElementById('sede2Psiq').value = '';
            document.getElementById('grupoSedesPsiq').style.display = 'none';
            document.getElementById('btnValidarPsiq').style.display = 'block';
            postulanteConfirmadoPsiq = null;
            
        } catch(error) {
            msg.style.color = '#dc3545';
            msg.textContent = 'Error de conexión: ' + error.message;
        }
        mostrarCarga(false);
    });
}

// Función para escuchar y dibujar el mapa de vacantes en tiempo real
function cargarTableroPsiquiatria() {
    const refPsiq = ref(db, 'psiquiatria_manual');
    onValue(refPsiq, (snapshot) => {
        const contenedor = document.getElementById('listaPsiquiatria');
        contenedor.innerHTML = '';
        
        // Obtenemos los cupos máximos oficiales de tu diccionario
        const cuposOficiales = cuposPorHospital["PSIQUIATRÍA CLÍNICA INTERDISCIPLINARIA EN SALUD MENTAL (Primer nivel)"] || {};
        
        // Preparamos un contador en cero para cada hospital
        const contadores = {};
        for (const hosp in cuposOficiales) {
            contadores[hosp] = { anio1: 0, anio2: 0, total: cuposOficiales[hosp] };
        }

        // Si hay datos cargados en Firebase, sumamos las elecciones
        if (snapshot.exists()) {
            const datos = snapshot.val();
            Object.values(datos).forEach(item => {
                // Si la sede existe en nuestro diccionario, le sumamos 1 ocupante
                if (item.sede1 && contadores[item.sede1]) contadores[item.sede1].anio1++;
                if (item.sede2 && contadores[item.sede2]) contadores[item.sede2].anio2++;
            });
        }

        // Armamos las tarjetas visuales (¡Ahora se dibujan SIEMPRE!)
        let htmlTablero = `<div style="display: flex; flex-direction: column; gap: 12px;">`;
        
        // Ordenamos alfabéticamente para que sea fácil de buscar
        const hospitalesOrdenados = Object.keys(contadores).sort();

        if (hospitalesOrdenados.length === 0) {
            htmlTablero += `<p style="color: #777; font-style: italic;">No se encontraron hospitales configurados para Psiquiatría.</p>`;
        } else {
            hospitalesOrdenados.forEach(hosp => {
                const data = contadores[hosp];
                
                // Lógica de colores (Verde = Libre, Naranja = Llenándose, Rojo = Agotado)
                const color1 = data.anio1 >= data.total ? '#dc3545' : (data.anio1 > 0 ? '#fd7e14' : '#28a745');
                const color2 = data.anio2 >= data.total ? '#dc3545' : (data.anio2 > 0 ? '#fd7e14' : '#28a745');

                htmlTablero += `
                    <div class="card-opcion" style="margin-bottom: 0; padding: 15px;">
                        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 1.05rem;"> ${hosp}</h4>
                        
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.03); padding: 8px 12px; border-radius: 4px; border-left: 3px solid ${color1};">
                                <span style="font-size: 0.9rem; font-weight: 500;">Cupos 1er Año</span>
                                <span style="font-weight: bold; color: ${color1}; background: rgba(0,0,0,0.05); padding: 3px 8px; border-radius: 4px; font-size: 0.9rem;">
                                    ${data.anio1} / ${data.total}
                                </span>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.03); padding: 8px 12px; border-radius: 4px; border-left: 3px solid ${color2};">
                                <span style="font-size: 0.9rem; font-weight: 500;">Cupos 2do Año</span>
                                <span style="font-weight: bold; color: ${color2}; background: rgba(0,0,0,0.05); padding: 3px 8px; border-radius: 4px; font-size: 0.9rem;">
                                    ${data.anio2} / ${data.total}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        htmlTablero += `</div>`;
        contenedor.innerHTML = htmlTablero;
    });
}
