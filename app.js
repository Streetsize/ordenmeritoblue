import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-check.js";

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

// Inicializamos App Check con tu clave pública
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('PEGÁ_ACÁ_TU_CLAVE_DEL_SITIO_O_PUBLICA'),
  isTokenAutoRefreshEnabled: true
});

const db = getDatabase(app);

// --------------------------------------------------------
// ACÁ DEFINÍS LA CANTIDAD DE CUPOS TOTALES POR ESPECIALIDAD
// --------------------------------------------------------
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

// Base de datos de Hospitales
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

// Variables conectadas a los nuevos Datalist
const especialidadInput = document.getElementById('especialidad');
const hospitalSelect = document.getElementById('hospital');
const especialidadLibreInput = document.getElementById('especialidadLibre');
const listaEsp = document.getElementById('listaEsp');
const listaEspLibre = document.getElementById('listaEspLibre');

window.onload = async function() {
    // 1. Cargamos las opciones del buscador de especialidades
    const especialidades = Object.keys(datosResidencias).sort();
    especialidades.forEach(esp => {
        listaEsp.appendChild(new Option(esp, esp));
        listaEspLibre.appendChild(new Option(esp, esp));
    });

    // 2. Calculamos el porcentaje de participación en tiempo real
    try {
        const snapshot = await get(ref(db, '/'));
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Guardamos la BD en memoria para que luego los botones respondan instantáneamente
            registrosBD = Array.isArray(data) ? data : Object.values(data);
            llavesBD = Array.isArray(data) ? data.map((_, i) => i) : Object.keys(data);
            
            const totalPostulantes = registrosBD.length;
            // Contamos solo los que tienen un promedio que no sea vacío ni "EN"
            const conPromedio = registrosBD.filter(r => r.PROMEDIO && String(r.PROMEDIO).trim() !== "EN" && String(r.PROMEDIO).trim() !== "").length;
            
            // Calculamos el porcentaje con 1 decimal (ej: 42.9)
            const porcentaje = ((conPromedio / totalPostulantes) * 100).toFixed(1);
            
            // Animamos la barra y actualizamos el texto
            document.getElementById('textoPorcentaje').innerText = porcentaje;
            // Un pequeño timeout para que la transición CSS se luzca al entrar a la página
            setTimeout(() => {
                document.getElementById('barraProgreso').style.width = porcentaje + '%';
            }, 300);
        }
    } catch (error) {
        console.error("No se pudo cargar la estadística inicial:", error);
        document.getElementById('textoPorcentaje').innerText = "--";
    }
};

// Escucha cada vez que el usuario escribe o elige una opción
especialidadInput.addEventListener('input', function() {
    const espSelec = this.value.trim();
    hospitalSelect.innerHTML = '<option value="">Selecciona un hospital...</option>';
    
    // Solo habilitamos el hospital si lo que escribió/seleccionó es exacto a la base
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
    
    return dbLimpia.includes(selectLimpia) || selectLimpia.includes(dbLimpia);
}

// CÁLCULO INTELIGENTE
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
    
    // FILTRO DE RESPETO
    const NOTA_MINIMA_VISIBLE = 50; 
    competidores = competidores.filter(p => {
        const notaExamen = parseFloat(p.NOTA) || 0;
        return notaExamen >= NOTA_MINIMA_VISIBLE || (dniSeleccionado && p.DNI.toString() === dniSeleccionado);
    });

    // ORDENAMIENTO DESCENDENTE DE MAYOR A MENOR
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

        // Diseño visual de quienes quedan debajo del corte
        if (cuposDisponibles > 0 && puestoActual > cuposDisponibles) {
            tr.classList.add('fila-afuera');
        }
        
        // Línea roja indicadora de corte
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

        tr.innerHTML = `
            <td>${contenidoPosicion}</td>
            <td>${c.DNI}</td>
            <td>${c.NOTA}</td>
            <td>${valPromedio}</td>
            <td><strong>${valorMostrado}</strong> <span style="font-size:0.8rem">${iconoEstado}</span></td>
            <td>${valHospital}</td>
        `;
        tbody.appendChild(tr);
    });

    return { total: competidores.length, miPosicion: miPosicion };
}

// CAMINO 1: VER RANKING
document.getElementById('btnVerLibre').addEventListener('click', async () => {
    const espElegida = especialidadLibreInput.value.trim();
    if (!espElegida || !datosResidencias[espElegida]) return mostrarError("Elegí o escribí una especialidad válida de la lista.");

    mostrarCarga(true);
    
    try {
        const snapshot = await get(ref(db, '/'));
        if (!snapshot.exists()) throw new Error("La base de datos está vacía.");
        
        const data = snapshot.val();
        registrosBD = Array.isArray(data) ? data : Object.values(data);
        
        generarTabla(espElegida, null);
        
        resultadoFinal.style.display = 'none';
        tituloTabla.innerText = `Ranking: ${espElegida}`;
        
        mostrarCarga(false);
        paso1.style.display = 'none';
        paso3.style.display = 'block';
    } catch (error) {
        mostrarError(error.message);
    }
});

// CAMINO 2: CARGAR PROMEDIO
document.getElementById('btnSiguiente').addEventListener('click', async () => {
    const dniInput = document.getElementById('dniBuscador').value.trim();
    if (!dniInput) return mostrarError("Debes ingresar un DNI.");

    mostrarCarga(true);
    document.getElementById('btnSiguiente').disabled = true;

    try {
        const snapshot = await get(ref(db, '/'));
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
            // Asigna el texto al input y dispara el evento para habilitar el selector de hospital
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

// GUARDAR DATOS Y NOTA FINAL
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
        updates[`/${indiceUsuarioActual}/PROMEDIO`] = promedio;
        updates[`/${indiceUsuarioActual}/ESPECIALIDAD`] = especialidad;
        updates[`/${indiceUsuarioActual}/HTAL`] = hospital;
        updates[`/${indiceUsuarioActual}/NOTA_FINAL`] = parseFloat(notaFinal);

        await update(ref(db), updates);

        miRegistro.PROMEDIO = promedio;
        miRegistro.ESPECIALIDAD = especialidad;
        miRegistro.HTAL = hospital;
        miRegistro.NOTA_FINAL = parseFloat(notaFinal);

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

// ==========================================
// FUNCIONES DE INTERFAZ: MODO OSCURO Y COMPARTIR
// ==========================================

// Modo Oscuro (Ahora manejado visualmente por CSS puro)
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

// Botones de Compartir WhatsApp
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
