function logToTerminal(id, message) {
    const terminal = document.getElementById(id);
    terminal.innerHTML += `<br><span class="prompt">></span> ${message}`;
    terminal.scrollTop = terminal.scrollHeight;
}

function clearTerminal(id) {
    const terminal = document.getElementById(id);
    terminal.innerHTML = `<span class="prompt">></span> Esperando...`;
}

let pacienteIdCounter = 1;

async function addPaciente() {
    const id = "P" + pacienteIdCounter.toString().padStart(2, '0');
    const nombre = document.getElementById('t-nombre').value;
    const gravedad = parseInt(document.getElementById('t-gravedad').value);

    if (!id || !nombre || !gravedad || gravedad < 1 || gravedad > 5) {
        alert("Por favor llena todos los campos correctamente. Gravedad entre 1 y 5.");
        return;
    }

    try {
        const response = await fetch('/api/triage/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_paciente: id, nombre: nombre, gravedad: gravedad })
        });

        const data = await response.json();

        logToTerminal('terminal-1', `Registrado: [${data.paciente.id}] ${data.paciente.nombre} (Gravedad: ${data.paciente.gravedad})`);
        logToTerminal('terminal-1', `Estado actual del Heap: ${JSON.stringify(data.heap)}`);

        // Limpiar inputs e incrementar contador
        document.getElementById('t-nombre').value = '';
        document.getElementById('t-gravedad').value = '';
        pacienteIdCounter++;

    } catch (error) {
        console.error("Error:", error);
    }
}

async function attendPaciente() {
    try {
        const response = await fetch('/api/triage/next');
        const data = await response.json();

        logToTerminal('terminal-1', data.message);
        if (data.paciente) {
            logToTerminal('terminal-1', `Estado restante del Heap: ${JSON.stringify(data.heap)}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function addUnidad() {
    const tipo = document.getElementById('j-tipo').value;
    const prioridad = parseInt(document.getElementById('j-prioridad').value);

    if (!tipo || isNaN(prioridad)) {
        alert("Por favor llena todos los campos correctamente.");
        return;
    }

    try {
        const response = await fetch('/api/juego/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tipo: tipo, prioridad: prioridad })
        });

        const data = await response.json();

        logToTerminal('terminal-2', `Orden recibida: ${data.unidad.tipo} (Prioridad: ${data.unidad.prioridad})`);
        logToTerminal('terminal-2', `Estado actual del Max-Heap: ${JSON.stringify(data.heap)}`);

        document.getElementById('j-tipo').value = '';
        document.getElementById('j-prioridad').value = '';

    } catch (error) {
        console.error("Error:", error);
    }
}

async function produceUnidad() {
    try {
        const response = await fetch('/api/juego/next');
        const data = await response.json();

        logToTerminal('terminal-2', data.message);
        if (data.unidad) {
            logToTerminal('terminal-2', `Estado restante del Max-Heap: ${JSON.stringify(data.heap)}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function sortArray() {
    const inputStr = document.getElementById('s-arreglo').value;

    if (!inputStr) {
        alert("Ingresa números separados por comas.");
        return;
    }

    try {
        const response = await fetch('/api/sort', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ valores: inputStr })
        });

        const data = await response.json();

        if (data.error) {
            logToTerminal('terminal-3', `Error: ${data.error}`);
            return;
        }

        logToTerminal('terminal-3', `Iniciando proceso HeapSort...`);
        data.pasos.forEach(paso => {
            logToTerminal('terminal-3', `[${paso.fase}]: [${paso.arreglo.join(", ")}]`);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

async function addTareaCPU() {
    const nombre = document.getElementById('c-nombre').value;
    const prioridad = parseInt(document.getElementById('c-prioridad').value);

    if (!nombre || isNaN(prioridad)) {
        alert("Llena los campos correctamente.");
        return;
    }

    try {
        const response = await fetch('/api/cpu/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombre, prioridad: prioridad })
        });

        const data = await response.json();

        if (data.error) {
            logToTerminal('terminal-4', `<span style="color: #fca5a5;">Excepción Capturada: ${data.error}</span>`);
        } else {
            logToTerminal('terminal-4', `Tarea agregada: ${data.tarea.nombre} (Prio: ${data.tarea.prioridad})`);
        }
        logToTerminal('terminal-4', `Estado Cola: ${JSON.stringify(data.heap)}`);

        document.getElementById('c-nombre').value = '';
        document.getElementById('c-prioridad').value = '';

    } catch (error) {
        console.error("Error:", error);
    }
}

async function attendTareaCPU() {
    try {
        const response = await fetch('/api/cpu/next');
        const data = await response.json();

        if (data.error) {
            logToTerminal('terminal-4', `<span style="color: #fca5a5;">Excepción Capturada: ${data.error}</span>`);
        } else {
            logToTerminal('terminal-4', data.message);
        }
        logToTerminal('terminal-4', `Estado Cola: ${JSON.stringify(data.heap)}`);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function runDijkstra() {
    const nodo = document.getElementById('d-nodo').value;

    try {
        const response = await fetch('/api/dijkstra', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nodo_inicio: nodo })
        });

        const data = await response.json();

        if (data.error) {
            logToTerminal('terminal-5', `<span style="color: #fca5a5;">Error: ${data.error}</span>`);
            return;
        }

        clearTerminal('terminal-5');
        logToTerminal('terminal-5', `Iniciando rastreo...`);
        
        // Imprimir paso a paso
        data.pasos.forEach(paso => {
            logToTerminal('terminal-5', paso.replace(/\n/g, "<br>"));
        });

    } catch (error) {
        console.error("Error:", error);
    }
}
