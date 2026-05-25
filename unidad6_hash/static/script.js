function logToTerminal(id, message) {
    const terminal = document.getElementById(id);
    terminal.innerHTML += `<br><span class="prompt">></span> ${message}`;
    terminal.scrollTop = terminal.scrollHeight;
}

function clearTerminal(id) {
    const terminal = document.getElementById(id);
    terminal.innerHTML = `<span class="prompt">></span> Procesando...`;
}

async function analizarEx1() {
    let inicialText = document.getElementById('e1-inicial').value;
    const inicial = inicialText ? parseInt(inicialText) : 2218995;
    const cantidad = parseInt(document.getElementById('e1-cantidad').value);
    const tamano = parseInt(document.getElementById('e1-tamano').value);

    if (isNaN(cantidad) || isNaN(tamano) || cantidad < 1 || tamano < 1) {
        alert("Ingresa valores numéricos válidos mayores a 0.");
        return;
    }

    clearTerminal('terminal-1');

    try {
        const response = await fetch('/api/ex1/analizar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad: cantidad, tamano_tabla: tamano, matricula_inicial: inicial })
        });

        const data = await response.json();
        const res = data.resultados;
        
        logToTerminal('terminal-1', `<b>Resultados de Simulación (${res.cantidad_datos} matrículas, tabla de ${res.tamano_tabla}):</b>`);
        
        logToTerminal('terminal-1', `[Hash: Primeros 2 dígitos]`);
        logToTerminal('terminal-1', `Colisiones totales: <span style="color: #fca5a5;">${res.resultados_primeros.colisiones}</span>`);
        logToTerminal('terminal-1', `Distribución (Gráfica):`);
        res.resultados_primeros.distribucion.forEach((val, idx) => {
            const bar = '*'.repeat(Math.min(val, 50)); // Tope visual de 50 asteriscos
            logToTerminal('terminal-1', `&nbsp;&nbsp;[${idx}]: ${val.toString().padStart(3, ' ')} <span style="color: #94A3B8;">${bar}</span>`);
        });
        
        logToTerminal('terminal-1', `<br>----------------------------------<br>`);
        
        logToTerminal('terminal-1', `[Hash: Últimos 2 dígitos]`);
        logToTerminal('terminal-1', `Colisiones totales: <span style="color: #86efac;">${res.resultados_ultimos.colisiones}</span>`);
        logToTerminal('terminal-1', `Distribución (Gráfica):`);
        res.resultados_ultimos.distribucion.forEach((val, idx) => {
            const bar = '*'.repeat(Math.min(val, 50));
            logToTerminal('terminal-1', `&nbsp;&nbsp;[${idx}]: ${val.toString().padStart(3, ' ')} <span style="color: #94A3B8;">${bar}</span>`);
        });

    } catch (error) {
        console.error("Error:", error);
        logToTerminal('terminal-1', `<span style="color: #fca5a5;">Error de conexión.</span>`);
    }
}

async function analizarEx2() {
    const numerosText = document.getElementById('e2-numeros').value;
    const tamanoText = document.getElementById('e2-tamano').value;
    const tamano = tamanoText ? parseInt(tamanoText) : 100;
    const numeros = numerosText.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));

    if (numeros.length === 0 || tamano < 2) {
        alert("Ingresa claves válidas y un tamaño de tabla mayor a 1.");
        return;
    }

    clearTerminal('terminal-2');

    try {
        const response = await fetch('/api/ex2/midsquare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numeros: numeros, tamano_tabla: tamano })
        });

        const data = await response.json();
        
        logToTerminal('terminal-2', `<b>Cálculo del Método de Mitad del Cuadrado:</b>`);
        
        data.resultados.forEach(res => {
            logToTerminal('terminal-2', `Clave original: <span style="color: #86efac;">${res.numero}</span>`);
            logToTerminal('terminal-2', `&nbsp;&nbsp;Cuadrado: ${res.cuadrado}`);
            logToTerminal('terminal-2', `&nbsp;&nbsp;Dígitos centrales extraídos (${res.digitos_extraidos} dígitos): <span style="color: #60a5fa; font-weight: bold; font-size: 1.1em;">${res.indice_extraido}</span>`);
            logToTerminal('terminal-2', `-----------------------`);
        });

    } catch (error) {
        console.error("Error:", error);
        logToTerminal('terminal-2', `<span style="color: #fca5a5;">Error de conexión.</span>`);
    }
}

async function analizarEx3() {
    const numerosText = document.getElementById('e3-numeros').value;
    const tamano = parseInt(document.getElementById('e3-tamano').value) || 12;
    const numeros = numerosText.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));

    if (numeros.length === 0 || tamano < 2) {
        alert("Ingresa claves válidas y un tamaño de tabla mayor a 1.");
        return;
    }

    clearTerminal('terminal-3');

    try {
        const response = await fetch('/api/ex3/linear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numeros: numeros, tamano_tabla: tamano })
        });

        const data = await response.json();
        const res = data.resultados;
        
        logToTerminal('terminal-3', `<b>Exploración lineal</b><br>`);
        
        res.pasos.forEach((paso, i) => {
            logToTerminal('terminal-3', `${i+1}: Clave: <span style="color: #86efac;">${paso.clave}</span>`);
            logToTerminal('terminal-3', `&nbsp;&nbsp;Índice original h(x): ${paso.indice_original}`);
            
            if (paso.log && paso.log.length > 0) {
                paso.log.forEach(mensaje => {
                    if (mensaje.includes('ocupado')) {
                        logToTerminal('terminal-3', `&nbsp;&nbsp;<span style="color: #fca5a5;">COLISIÓN:</span> ${mensaje}`);
                    } else if (mensaje.includes('Éxito')) {
                        const mensajeLimpio = mensaje.replace('Éxito: ', '');
                        logToTerminal('terminal-3', `&nbsp;&nbsp;<span style="color: #60a5fa;">ASIGNADO:</span> ${mensajeLimpio}`);
                    } else {
                        logToTerminal('terminal-3', `&nbsp;&nbsp;<span style="color: #fca5a5;">${mensaje}</span>`);
                    }
                });
            }
            logToTerminal('terminal-3', `-----------------------`);
        });

        logToTerminal('terminal-3', `<b>Tabla:</b>`);
        res.estado_final.forEach(c => {
            logToTerminal('terminal-3', `<span style="color: #94A3B8;">[${c.indice}]: ${c.contenido}</span>`);
        });

    } catch (error) {
        console.error("Error:", error);
        logToTerminal('terminal-3', `<span style="color: #fca5a5;">Error de conexión.</span>`);
    }
}

async function analizarEx4() {
    const cantidad = parseInt(document.getElementById('e4-cantidad').value) || 250;
    const tamano = parseInt(document.getElementById('e4-tamano').value) || 400;
    const manualesText = document.getElementById('e4-manuales').value;

    if (cantidad < 1 || tamano < 2) {
        alert("Ingresa parámetros válidos.");
        return;
    }

    clearTerminal('terminal-4');
    logToTerminal('terminal-4', `<span style="color: #94A3B8;">> Simulando ${manualesText ? 'apellidos manuales' : cantidad + ' atletas aleatorios'}...</span>`);

    try {
        const response = await fetch('/api/ex4/atletas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad: cantidad, tamano_tabla: tamano, apellidos_manuales: manualesText })
        });

        const data = await response.json();
        const res = data.resultados;
        
        logToTerminal('terminal-4', `<b>Resultados de Gestión de Atletas</b><br>`);
        logToTerminal('terminal-4', `Datos procesados: <span style="color: #86efac;">${res.cantidad_datos}</span>`);
        logToTerminal('terminal-4', `Tamaño de tabla: ${res.tamano_tabla}`);
        logToTerminal('terminal-4', `Factor de Carga: <span style="color: #60a5fa;">${res.factor_carga.toFixed(2)}%</span>`);
        logToTerminal('terminal-4', `Colisiones Totales: <span style="color: #fca5a5;">${res.colisiones_totales}</span>`);
        
        logToTerminal('terminal-4', `<br>-----------------------<br>`);
        logToTerminal('terminal-4', `<b>Log de las últimas 10 inserciones:</b>`);
        
        // Show max 10 to not saturate terminal
        const pasosAMostrar = res.pasos.slice(-10);

        pasosAMostrar.forEach((paso) => {
            logToTerminal('terminal-4', `Clave: <span style="color: #86efac;">${paso.clave}</span> -> Índice h(x): ${paso.indice_original} -> Índice Final: ${paso.indice_final} (Colisiones: ${paso.colisiones})`);
        });

        logToTerminal('terminal-4', `<br>-----------------------<br>`);
        logToTerminal('terminal-4', `<b>Tabla:</b>`);
        res.estado_final.forEach(c => {
            logToTerminal('terminal-4', `<span style="color: #94A3B8;">[${c.indice}]: ${c.contenido}</span>`);
        });

    } catch (error) {
        console.error("Error:", error);
        logToTerminal('terminal-4', `<span style="color: #fca5a5;">Error de conexión.</span>`);
    }
}

async function analizarEx5() {
    const cantidad = parseInt(document.getElementById('e5-cantidad').value) || 1000;
    const tamano = parseInt(document.getElementById('e5-tamano').value) || 11;
    const umbral = parseFloat(document.getElementById('e5-umbral').value) || 0.5;

    if (cantidad < 1 || tamano < 2 || umbral <= 0 || umbral > 1) {
        alert("Ingresa parámetros válidos.");
        return;
    }

    clearTerminal('terminal-5');
    logToTerminal('terminal-5', `<span style="color: #94A3B8;">> Iniciando para ${cantidad} numeros</span>`);

    try {
        const response = await fetch('/api/ex5/rehashing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad: cantidad, tamano_inicial: tamano, umbral: umbral })
        });

        const data = await response.json();
        const res = data.resultados;
        
        logToTerminal('terminal-5', `<b>Terminado</b>`);
        logToTerminal('terminal-5', `-----------------------`);
        logToTerminal('terminal-5', `Cantidad Insertada: <span style="color: #86efac;">${res.cantidad_insertada}</span>`);
        logToTerminal('terminal-5', `Tamaño Inicial: ${res.tamano_inicial}`);
        logToTerminal('terminal-5', `Tamaño Final: <span style="color: #fbbf24;">${res.tamano_final}</span>`);
        logToTerminal('terminal-5', `Factor de Carga Final: <span style="color: #60a5fa;">${(res.factor_carga_final * 100).toFixed(2)}%</span> (Umbral: ${res.umbral * 100}%)`);
        logToTerminal('terminal-5', `Tiempo de Ejecución: <span style="color: #86efac;">${res.tiempo_ejecucion_ms.toFixed(2)} ms</span>`);
        logToTerminal('terminal-5', `Total de Redimensionamientos: <span style="color: #fca5a5;">${res.redimensionamientos}</span>`);
        
        logToTerminal('terminal-5', `<br><b>Historial de Crecimiento (Tamaños Primos):</b>`);
        logToTerminal('terminal-5', `<span style="color: #94A3B8;">${res.historial_tamanos.join(' -> ')}</span>`);

    } catch (error) {
        console.error("Error:", error);
        logToTerminal('terminal-5', `<span style="color: #fca5a5;">Error de conexión.</span>`);
    }
}
