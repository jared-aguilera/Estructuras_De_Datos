from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

from ejercicios import sistema_hospital, sistema_videojuego, heapsort_paso_a_paso, sistema_cpu, ejecutar_dijkstra
from heaps import HeapOverflowError, HeapUnderflowError

app = FastAPI(title="Heaps y Colas de Prioridad")

# Montar carpeta static
static_path = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_path), name="static")

@app.get("/")
def read_root():
    return FileResponse(os.path.join(static_path, "index.html"))

# --- Ejercicio 1: Triage ---
class PacienteBase(BaseModel):
    id_paciente: str
    nombre: str
    gravedad: int

@app.post("/api/triage/add")
def add_paciente(paciente: PacienteBase):
    res = sistema_hospital.registrar_paciente(paciente.id_paciente, paciente.nombre, paciente.gravedad)
    return {"message": "Paciente registrado", "paciente": res, "heap": sistema_hospital.ver_estado_heap()}

@app.get("/api/triage/next")
def get_next_paciente():
    paciente = sistema_hospital.atender_paciente()
    if paciente:
        return {"message": f"Atendiendo a [{paciente['id']}] {paciente['nombre']}", "paciente": paciente, "heap": sistema_hospital.ver_estado_heap()}
    return {"message": "No hay pacientes en espera", "heap": sistema_hospital.ver_estado_heap()}

# --- Ejercicio 2: Videojuego ---
class UnidadBase(BaseModel):
    tipo: str
    prioridad: int

@app.post("/api/juego/add")
def add_unidad(unidad: UnidadBase):
    res = sistema_videojuego.registrar_unidad(unidad.tipo, unidad.prioridad)
    return {"message": "Unidad registrada", "unidad": res, "heap": sistema_videojuego.ver_estado_heap()}

@app.get("/api/juego/next")
def get_next_unidad():
    unidad = sistema_videojuego.producir_unidad()
    if unidad:
        return {"message": f"Produciendo unidad: {unidad['tipo']}", "unidad": unidad, "heap": sistema_videojuego.ver_estado_heap()}
    return {"message": "No hay unidades en cola", "heap": sistema_videojuego.ver_estado_heap()}

# --- Ejercicio 3: HeapSort ---
class ArrayInput(BaseModel):
    valores: str

@app.post("/api/sort")
def api_heapsort(data: ArrayInput):
    try:
        # Parsear cadena separada por comas a lista de enteros
        numeros = [int(x.strip()) for x in data.valores.split(",") if x.strip()]
        if not numeros:
            return {"error": "El arreglo está vacío"}
        
        pasos = heapsort_paso_a_paso(numeros)
        return {"message": "Ordenamiento completado", "pasos": pasos}
    except ValueError:
        return {"error": "Asegúrate de ingresar solo números separados por comas."}

# --- Ejercicio 4: CPU ---
class TareaInput(BaseModel):
    nombre: str
    prioridad: int

@app.post("/api/cpu/add")
def add_cpu(tarea: TareaInput):
    try:
        res = sistema_cpu.agregar_tarea(tarea.nombre, tarea.prioridad)
        return {"message": "Tarea encolada", "tarea": res, "heap": sistema_cpu.ver_estado_heap()}
    except HeapOverflowError as e:
        return {"error": str(e), "heap": sistema_cpu.ver_estado_heap()}

@app.get("/api/cpu/next")
def get_cpu_next():
    try:
        res = sistema_cpu.ejecutar_tarea()
        return {"message": f"Ejecutando {res['nombre']}", "tarea": res, "heap": sistema_cpu.ver_estado_heap()}
    except HeapUnderflowError as e:
        return {"error": str(e), "heap": sistema_cpu.ver_estado_heap()}

# --- Ejercicio 5: Dijkstra ---
class DijkstraInput(BaseModel):
    nodo_inicio: str

@app.post("/api/dijkstra")
def api_dijkstra(data: DijkstraInput):
    if data.nodo_inicio not in ["A", "B", "C", "D"]:
        return {"error": "Nodo no válido. Usa A, B, C o D."}
    
    pasos = ejecutar_dijkstra(data.nodo_inicio)
    return {"message": "Dijkstra completado", "pasos": pasos}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
