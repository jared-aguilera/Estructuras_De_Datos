from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

from ejercicios import analizar_ejercicio_1, analizar_ejercicio_2, analizar_ejercicio_3, analizar_ejercicio_4, analizar_ejercicio_5

app = FastAPI(title="Tablas Hash - Proyecto Unidad 6")

# Montar carpeta static
static_path = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_path):
    os.makedirs(static_path)
app.mount("/static", StaticFiles(directory=static_path), name="static")

@app.get("/")
def read_root():
    return FileResponse(os.path.join(static_path, "index.html"))

# --- Ejercicio 1: Comparación de Funciones Hash ---
class Ejercicio1Input(BaseModel):
    cantidad: int
    tamano_tabla: int
    matricula_inicial: int

@app.post("/api/ex1/analizar")
def api_ejercicio_1(data: Ejercicio1Input):
    resultados = analizar_ejercicio_1(data.cantidad, data.tamano_tabla, data.matricula_inicial)
    return {"message": "Análisis completado", "resultados": resultados}

# --- Ejercicio 2: Mitad del Cuadrado ---
class Ejercicio2Input(BaseModel):
    numeros: list[int]
    tamano_tabla: int

@app.post("/api/ex2/midsquare")
def api_ejercicio_2(data: Ejercicio2Input):
    resultados = analizar_ejercicio_2(data.numeros, data.tamano_tabla)
    return {"message": "Cálculo completado", "resultados": resultados}

# --- Ejercicio 3: Exploración Lineal ---
class Ejercicio3Input(BaseModel):
    numeros: list[int]
    tamano_tabla: int

@app.post("/api/ex3/linear")
def api_ejercicio_3(data: Ejercicio3Input):
    resultados = analizar_ejercicio_3(data.numeros, data.tamano_tabla)
    return {"message": "Simulación completada", "resultados": resultados}

# --- Ejercicio 4: Gestión de Atletas ---
class Ejercicio4Input(BaseModel):
    cantidad: int
    tamano_tabla: int
    apellidos_manuales: str = ""

@app.post("/api/ex4/atletas")
def api_ejercicio_4(data: Ejercicio4Input):
    apellidos = []
    if data.apellidos_manuales:
        apellidos = [a.strip() for a in data.apellidos_manuales.split(",") if a.strip()]
    resultados = analizar_ejercicio_4(data.cantidad, data.tamano_tabla, apellidos)
    return {"message": "Simulación completada", "resultados": resultados}

# --- Ejercicio 5: Rehashing Dinámico ---
class Ejercicio5Input(BaseModel):
    cantidad: int
    tamano_inicial: int
    umbral: float

@app.post("/api/ex5/rehashing")
def api_ejercicio_5(data: Ejercicio5Input):
    resultados = analizar_ejercicio_5(data.cantidad, data.tamano_inicial, data.umbral)
    return {"message": "Simulación completada", "resultados": resultados}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
