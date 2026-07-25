import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 1. TU CONFIGURACIÓN DE FIREBASE AQUÍ
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

// Estado Global
let registrosBD = [];
let llavesBD = [];
let indiceUsuarioActual = -1;
let miDNI = "";

// Elementos DOM
const paso1 = document.getElementById('paso1');
const paso2 = document.getElementById('paso2');
const paso3 = document.getElementById('paso3');
const loading = document.getElementById('loading');
const errorBox = document.getElementById('errorBox');
const resultadoFinal = document.getElementById('resultadoFinal');
const tituloTabla = document.getElementById('tituloTabla');

const especialidadSelect = document.getElementById('especialidad');
const hospitalSelect = document.getElementById('hospital');
const especialidadLibreSelect = document.getElementById('especialidadLibre');

window.onload = function() {
    const especialidades = Object.keys(datosResidencias).sort();
    especialidades.forEach(esp => {
        especialidadSelect.appendChild(new Option(esp, esp));
        especialidadLibreSelect.appendChild(new Option(esp, esp));
    });
};

especialidadSelect.addEventListener('change', function() {
    const espSelec = this.value;
    hospitalSelect.innerHTML = '<option value="">Selecciona un hospital...</option>';
    
    if (espSelec) {
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

// FUNCIONES DE CÁLCULO Y DIBUJO DE TABLA
function calcularPuntajeBase(registro) {
    // Si ya actualizó datos, usamos su nota guardada. Si no, calculamos el 90% del examen.
    if (registro.NOTA_FINAL && !isNaN(registro.NOTA_FINAL)) {
        return parseFloat(registro.NOTA_FINAL);
    }
    return parseFloat(registro.NOTA) * 0.90;
}

function generarTabla(especialidadABuscar, dniSeleccionado = null) {
    let competidores = registrosBD.filter(p => p && p.ESPECIALIDAD === especialidadABuscar);
    
    // Ordenar descendente usando la nota final real o provisoria
    competidores.sort((a, b) => calcularPuntajeBase(b) - calcularPuntajeBase(a));

    const tbody = document.querySelector('#tablaCompetidores tbody');
    tbody.innerHTML = '';
    let miPosicion = 0;

    competidores.forEach((c, index) => {
        const tr = document.createElement('tr');
        
        if (dniSeleccionado && c.DNI.toString() === dniSeleccionado) {
            tr.className = 'fila-usuario';
            miPosicion = index + 1;
        }

        let notaMapeada = calcularPuntajeBase(c).toFixed(2);
        let iconoCarga = c.NOTA_FINAL ? '✅' : '⏳';
        let valPromedio = c.PROMEDIO ? c.PROMEDIO : '-';
        let valHospital = c.HTAL ? c.HTAL : '-';

        tr.innerHTML = `
            <td><strong>${index + 1}</strong></td>
            <td>${c.DNI}</td>
            <td>${c.NOTA}</td>
            <td>${valPromedio}</td>
            <td><strong>${notaMapeada}</strong> ${iconoCarga}</td>
            <td>${valHospital}</td>
        `;
        tbody.appendChild(tr);
    });

    return { total: competidores.length, miPosicion: miPosicion };
}

// -----------------------------------------------------
// CAMINO 1: SNOOPEAR EL RANKING (CHUSMEAR)
// -----------------------------------------------------
document.getElementById('btnVerLibre').addEventListener('click', async () => {
    const espElegida = especialidadLibreSelect.value;
    if (!espElegida) return mostrarError("Elegí una especialidad para ver.");

    mostrarCarga(true);
    
    try {
        const snapshot = await get(ref(db, '/'));
        if (!snapshot.exists()) throw new Error("La base de datos está vacía.");
        
        const data = snapshot.val();
        registrosBD = Array.isArray(data) ? data : Object.values(data);
        
        generarTabla(espElegida, null);
        
        resultadoFinal.style.display = 'none'; // Ocultamos el mensaje de éxito personal
        tituloTabla.innerText = `Ranking General: ${espElegida}`;
        
        mostrarCarga(false);
        paso1.style.display = 'none';
        paso3.style.display = 'block';
    } catch (error) {
        mostrarError(error.message);
    }
});

// -----------------------------------------------------
// CAMINO 2: ACTUALIZAR DATOS DE USUARIO
// -----------------------------------------------------
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
            especialidadSelect.value = miRegistro.ESPECIALIDAD;
            especialidadSelect.dispatchEvent(new Event('change'));
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

// PASO 2.5: GUARDAR
document.getElementById('btnGuardar').addEventListener('click', async () => {
    const promedioTxt = document.getElementById('promedio').value;
    if (!promedioTxt) return mostrarError("Debes ingresar tu promedio.");
    
    const promedio = parseFloat(promedioTxt.replace(',', '.'));
    const especialidad = especialidadSelect.value;
    const hospital = hospitalSelect.value;
    const estudioMendoza = document.getElementById('estudioMendoza').checked;

    if (!especialidad || !hospital) return mostrarError("Falta especialidad u hospital.");

    mostrarCarga(true);
    document.getElementById('btnGuardar').disabled = true;

    try {
        const miRegistro = registrosBD[llavesBD.indexOf(indiceUsuarioActual)];
        const notaExamen = parseFloat(miRegistro.NOTA);

        // Matemáticas
        const puntosExamen = notaExamen * 0.90;
        const puntosPromedio = promedio * 0.5;
        const puntosMendoza = estudioMendoza ? 5 : 0;
        const notaFinal = (puntosExamen + puntosPromedio + puntosMendoza).toFixed(2);

        // Actualizar Firebase
        const updates = {};
        updates[`/${indiceUsuarioActual}/PROMEDIO`] = promedio;
        updates[`/${indiceUsuarioActual}/ESPECIALIDAD`] = especialidad;
        updates[`/${indiceUsuarioActual}/HTAL`] = hospital;
        updates[`/${indiceUsuarioActual}/NOTA_FINAL`] = parseFloat(notaFinal);

        await update(ref(db), updates);

        // Actualizar array en memoria para dibujar tabla
        miRegistro.PROMEDIO = promedio;
        miRegistro.ESPECIALIDAD = especialidad;
        miRegistro.HTAL = hospital;
        miRegistro.NOTA_FINAL = parseFloat(notaFinal);

        // Dibujar Tabla y sacar cálculos
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
