from heaps import MinHeap, MaxHeap, BoundedMinHeap, HeapOverflowError, HeapUnderflowError
from datetime import datetime

class Paciente:
    def __init__(self, id_paciente, nombre, gravedad):
        self.id_paciente = id_paciente
        self.nombre = nombre
        self.gravedad = gravedad # 1 = mas critico

    def obtener_datos(self):
        return {
            "id": self.id_paciente,
            "nombre": self.nombre,
            "gravedad": self.gravedad
        }

class SistemaHospital:
    def __init__(self):
        self.min_heap = MinHeap()
        self.contador = 0

    def registrar_paciente(self, id_paciente, nombre, gravedad):
        paciente = Paciente(id_paciente, nombre, gravedad)
        self.min_heap.insert((gravedad, self.contador, paciente.obtener_datos()))
        self.contador += 1
        return paciente.obtener_datos()

    def atender_paciente(self):
        item = self.min_heap.extract_min()
        if item is None:
            return None
        gravedad, contador, paciente = item
        return paciente

    def ver_estado_heap(self):
        return [{"gravedad": p[0], "id": p[2]["id"], "paciente": p[2]["nombre"]} for p in self.min_heap.heap]

sistema_hospital = SistemaHospital()

class Unidad:
    def __init__(self, tipo, prioridad):
        self.tipo = tipo
        self.prioridad = prioridad

    def obtener_datos(self):
        return {
            "tipo": self.tipo,
            "prioridad": self.prioridad
        }

class SistemaVideojuego:
    def __init__(self):
        self.max_heap = MaxHeap()
        self.contador = 0

    def registrar_unidad(self, tipo, prioridad):
        unidad = Unidad(tipo, prioridad)
        self.max_heap.insert((prioridad, -self.contador, unidad.obtener_datos()))
        self.contador += 1
        return unidad.obtener_datos()

    def producir_unidad(self):
        item = self.max_heap.extract_max()
        if item is None:
            return None
        prioridad, _, unidad = item
        return unidad

    def ver_estado_heap(self):
        return [{"prioridad": p[0], "tipo": p[2]["tipo"]} for p in self.max_heap.heap]

sistema_videojuego = SistemaVideojuego()

# --- Ejercicio 3: HeapSort ---
def heapsort_paso_a_paso(arr):
    n = len(arr)
    pasos = []

    def left_child(i): return 2 * i + 1
    def right_child(i): return 2 * i + 2

    def sift_down(heap_arr, size, i):
        max_idx = i
        left = left_child(i)
        right = right_child(i)

        if left < size and heap_arr[left] > heap_arr[max_idx]:
            max_idx = left
        if right < size and heap_arr[right] > heap_arr[max_idx]:
            max_idx = right

        if max_idx != i:
            heap_arr[i], heap_arr[max_idx] = heap_arr[max_idx], heap_arr[i]
            sift_down(heap_arr, size, max_idx)

    pasos.append({"fase": "Arreglo inicial", "arreglo": list(arr)})
    
    # 1. Construir heap bottom-up
    for i in range(n // 2 - 1, -1, -1):
        sift_down(arr, n, i)
    pasos.append({"fase": "Max-Heap construido (bottom-up)", "arreglo": list(arr)})

    # 2. Ordenamiento (Intercambio y reducción)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0] # Intercambio raíz con el ultimo
        pasos.append({"fase": f"Extraído el mayor ({arr[i]}) al final", "arreglo": list(arr)})
        
        sift_down(arr, i, 0) # sift-down con heap reducido
        pasos.append({"fase": "Sift-down aplicado para restaurar heap", "arreglo": list(arr)})

    pasos.append({"fase": "Arreglo ordenado final", "arreglo": list(arr)})
    return pasos

# --- Ejercicio 4: Planificador de CPU ---
class SistemaCPU:
    def __init__(self):
        self.heap = BoundedMinHeap(5)
        self.contador = 0

    def agregar_tarea(self, nombre, prioridad):
        tarea = {"nombre": nombre, "prioridad": prioridad}
        self.heap.insert((prioridad, self.contador, tarea))
        self.contador += 1
        return tarea

    def ejecutar_tarea(self):
        item = self.heap.extract_min()
        return item[2]

    def ver_estado_heap(self):
        return [{"prioridad": p[0], "tarea": p[2]["nombre"]} for p in self.heap.heap]

sistema_cpu = SistemaCPU()

# --- Ejercicio 5: Algoritmo de Dijkstra ---
grafo_rutas = {
    "A": {"B": 4, "C": 2},
    "B": {"C": 5, "D": 10},
    "C": {"D": 3},
    "D": {}
}

def ejecutar_dijkstra(nodo_inicio):
    pasos = []
    heap = MinHeap()
    distancias = {nodo: float('inf') for nodo in grafo_rutas}
    distancias[nodo_inicio] = 0
    visitados = set()
    contador = 0

    pasos.append(f"Iniciando Dijkstra desde el Nodo {nodo_inicio}")
    
    for nodo in grafo_rutas:
        dist = 0 if nodo == nodo_inicio else float('inf')
        heap.insert((dist, contador, {"id": nodo}))
        txt_dist = "0" if dist == 0 else "Infinito"
        pasos.append(f"--> Insertando nodo {nodo} con distancia: {txt_dist}")
        contador += 1

    while not heap.is_empty():
        item = heap.extract_min()
        if item is None: break
        
        dist_actual, _, obj = item
        nodo_actual = obj["id"]

        if nodo_actual in visitados:
            continue
            
        visitados.add(nodo_actual)
        if dist_actual == float('inf'):
            break # Nodos inalcanzables

        pasos.append(f"\n[Visitando] Nodo {nodo_actual} (Distancia desde origen: {dist_actual})")

        for vecino, peso in grafo_rutas[nodo_actual].items():
            if vecino in visitados:
                continue
                
            nueva_distancia = dist_actual + peso
            if nueva_distancia < distancias[vecino]:
                vieja_distancia = "Infinito" if distancias[vecino] == float('inf') else distancias[vecino]
                pasos.append(f"  Atajo encontrado hacia {vecino} - Costo: {vieja_distancia} -> {nueva_distancia}")
                distancias[vecino] = nueva_distancia
                heap.decrease_key_by_id(vecino, nueva_distancia)
                pasos.append(f"  --> decrease-key({vecino}, {nueva_distancia}) ejecutado.")
    
    pasos.append("\n--- RESULTADOS FINALES ---")
    for nodo, dist in distancias.items():
        resultado = "Inalcanzable" if dist == float('inf') else f"{dist} km"
        pasos.append(f"Distancia óptima desde {nodo_inicio} hasta {nodo}: {resultado}")
        
    return pasos
