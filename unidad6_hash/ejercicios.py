# --- Ejercicio 1: Diseño de Función Hash ---
from tablas_hash import LinearProbingHashTable

def simular_matriculas(cantidad=100, matricula_inicial=2218995):
    
    matriculas = []
    for i in range(cantidad):
        matricula = matricula_inicial + i
        matriculas.append(matricula)
    return matriculas

def hash_primeros_dos(matricula, tamano_tabla):
    s = str(matricula)
    val = int(s[:2]) if len(s) >= 2 else matricula
    return val % tamano_tabla

def hash_ultimos_dos(matricula, tamano_tabla):
    s = str(matricula)
    val = int(s[-2:]) if len(s) >= 2 else matricula
    return val % tamano_tabla

def analizar_ejercicio_1(cantidad=100, tamano_tabla=100, matricula_inicial=2218995):

    matriculas = simular_matriculas(cantidad, matricula_inicial)
    
    tabla_primeros = [[] for _ in range(tamano_tabla)]
    tabla_ultimos = [[] for _ in range(tamano_tabla)]
    
    colisiones_primeros = 0
    colisiones_ultimos = 0
    
    for mat in matriculas:
        # Evaluar función 1 (Primeros 2 dígitos)
        idx1 = hash_primeros_dos(mat, tamano_tabla)
        if len(tabla_primeros[idx1]) > 0:
            colisiones_primeros += 1
        tabla_primeros[idx1].append(mat)
        
        # Evaluar función 2 (Últimos 2 dígitos)
        idx2 = hash_ultimos_dos(mat, tamano_tabla)
        if len(tabla_ultimos[idx2]) > 0:
            colisiones_ultimos += 1
        tabla_ultimos[idx2].append(mat)
        
    return {
        "tamano_tabla": tamano_tabla,
        "cantidad_datos": cantidad,
        "resultados_primeros": {
            "colisiones": colisiones_primeros,
            "distribucion": [len(casilla) for casilla in tabla_primeros]
        },
        "resultados_ultimos": {
            "colisiones": colisiones_ultimos,
            "distribucion": [len(casilla) for casilla in tabla_ultimos]
        }
    }

# --- Ejercicio 2: Método de la Mitad del Cuadrado ---

def mitad_cuadrado(numero, tamano_tabla=100):
    digitos_extraer = len(str(tamano_tabla - 1))
    cuadrado = numero ** 2
    s = str(cuadrado)
    n = len(s)
    
    if n <= digitos_extraer:
        centro = s
    else:
        inicio = (n - digitos_extraer) // 2
        centro = s[inicio:inicio+digitos_extraer]
        
    return cuadrado, int(centro), digitos_extraer

def analizar_ejercicio_2(numeros, tamano_tabla=100):

    resultados = []
    for num in numeros:
        cuadrado, indice, digitos = mitad_cuadrado(num, tamano_tabla)
        resultados.append({
            "numero": num,
            "cuadrado": cuadrado,
            "indice_extraido": indice,
            "digitos_extraidos": digitos
        })
    return resultados

# --- Ejercicio 3: Exploración Lineal ---
def analizar_ejercicio_3(numeros, tamano_tabla=12):
    tabla = LinearProbingHashTable(tamano_tabla)
    pasos = []
    
    for num in numeros:
        resultado = tabla.insertar(num)
        pasos.append(resultado)
        
    return {
        "tamano_tabla": tamano_tabla,
        "pasos": pasos,
        "estado_final": tabla.ver_estado()
    }

# --- Ejercicio 4: Gestión de Atletas ---
import random

def hash_atletas(apellido, tamano_tabla):
    if not isinstance(apellido, str):
        apellido = str(apellido)
        
    suma = 0
    for i in range(0, len(apellido), 2):
        suma += ord(apellido[i])
        
    return suma % tamano_tabla

def generar_apellidos(cantidad):
    apellidos_base = ["Garcia", "Martinez", "Rodriguez", "Lopez", "Perez", "Williams", "Gonzalez", "Gomez", 
                      "Fernandez", "Moreno", "Jimenez", "Ruiz", "Diaz", "Romero", "Alvarez", "Torres", "Suarez", "Castro"]
    apellidos = []
    for _ in range(cantidad):
        apellidos.append(random.choice(apellidos_base) + str(random.randint(1, 99)))
    return apellidos

def analizar_ejercicio_4(cantidad=250, tamano_tabla=400, apellidos_manuales=None):

    tabla = LinearProbingHashTable(tamano_tabla)
    
    if apellidos_manuales and len(apellidos_manuales) > 0:
        apellidos = apellidos_manuales
    else:
        apellidos = generar_apellidos(cantidad)
        
    pasos = []
    colisiones_totales = 0
    
    for apellido in apellidos:
        resultado = tabla.insertar(apellido, hash_func=hash_atletas)
        pasos.append(resultado)
        colisiones_totales += resultado.get("colisiones", 0)
        
    return {
        "tamano_tabla": tamano_tabla,
        "cantidad_datos": len(apellidos),
        "colisiones_totales": colisiones_totales,
        "factor_carga": (len(apellidos) / tamano_tabla) * 100,
        "pasos": pasos,
        "estado_final": tabla.ver_estado()
    }

# --- Ejercicio 5: Rehashing Dinámico ---

def es_primo(n):
    """Comprueba si un número es primo."""
    if n <= 1: return False
    if n <= 3: return True
    if n % 2 == 0 or n % 3 == 0: return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

def siguiente_primo(n):
    """Encuentra el primer número primo mayor o igual a n."""
    primo = n
    while not es_primo(primo):
        primo += 1
    return primo

def analizar_ejercicio_5(cantidad_numeros=1000, tamano_inicial=11, umbral=0.5):
    """
    Simula el crecimiento dinámico de una tabla hash insertando números aleatorios,
    con un umbral personalizable.
    """
    import time
    import random
    
    tabla = LinearProbingHashTable(tamano_inicial)
    
    numeros = [random.randint(1, 100000) for _ in range(cantidad_numeros)]
    
    inicio_tiempo = time.perf_counter()
    numero_redimensionamientos = 0
    historial_tamanos = [tamano_inicial]
    
    for num in numeros:
        tabla.insertar(num)
        factor_carga = tabla.cantidad / tabla.tamano
        
        # Si supera el umbral, redimensionar
        if factor_carga > umbral:
            numero_redimensionamientos += 1
            viejo_tamano = tabla.tamano
            # Siguiente número primo mayor al doble del tamaño actual
            nuevo_tamano = siguiente_primo((viejo_tamano * 2) + 1)
            historial_tamanos.append(nuevo_tamano)
            
            # Extraer elementos
            elementos = [x for x in tabla.tabla if x is not None]
            
            # Crear nueva tabla y reubicar
            tabla = LinearProbingHashTable(nuevo_tamano)
            for e in elementos:
                tabla.insertar(e)
                
    fin_tiempo = time.perf_counter()
    tiempo_ejecucion = (fin_tiempo - inicio_tiempo) * 1000 # milisegundos
    
    return {
        "cantidad_insertada": cantidad_numeros,
        "tamano_inicial": tamano_inicial,
        "tamano_final": tabla.tamano,
        "umbral": umbral,
        "redimensionamientos": numero_redimensionamientos,
        "historial_tamanos": historial_tamanos,
        "tiempo_ejecucion_ms": tiempo_ejecucion,
        "factor_carga_final": tabla.cantidad / tabla.tamano,
        "estado_final": tabla.ver_estado()
    }
