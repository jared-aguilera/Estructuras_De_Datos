class NodoHash:
    def __init__(self, clave, valor):
        self.clave = clave
        self.valor = valor
        self.siguiente = None

class TablaHashBase:
    def __init__(self, tamano=10):
        self.tamano = tamano
        self.tabla = [None] * tamano
        self.cantidad = 0

    def funcion_hash(self, clave):
        if isinstance(clave, int):
            return clave % self.tamano
        elif isinstance(clave, str):
            hash_val = 0
            for char in clave:
                hash_val = (hash_val * 31 + ord(char)) % self.tamano
            return hash_val
        else:
            return hash(clave) % self.tamano

    def insertar(self, clave, valor):
        raise NotImplementedError("Debe implementarse en las clases hijas")

    def buscar(self, clave):
        raise NotImplementedError("Debe implementarse en las clases hijas")

    def eliminar(self, clave):
        raise NotImplementedError("Debe implementarse en las clases hijas")

    def ver_estado(self):
        """Devuelve el estado de la tabla de forma amigable para la UI."""
        estado = []
        for i in range(self.tamano):
            estado.append({"indice": i, "contenido": str(self.tabla[i]) if self.tabla[i] is not None else "-"})
        return estado

class LinearProbingHashTable(TablaHashBase):
    def __init__(self, tamano=12):
        super().__init__(tamano)
        
    def insertar(self, clave, hash_func=None):
        log = []
        if self.cantidad == self.tamano:
            return {"exito": False, "log": ["Error: La tabla está llena"]}
        
        if hash_func:
            indice_original = hash_func(clave, self.tamano)
        else:
            indice_original = clave % self.tamano
            
        indice = indice_original
        
        paso = 1
        colisiones_locales = 0
        while self.tabla[indice] is not None:
            log.append(f"Intento {paso}: Índice {indice} ocupado por {self.tabla[indice]}.")
            indice = (indice + 1) % self.tamano
            paso += 1
            colisiones_locales += 1
            
        self.tabla[indice] = clave
        self.cantidad += 1
        log.append(f"Éxito: Clave {clave} insertada en índice {indice}.")
        
        return {
            "exito": True,
            "clave": clave,
            "indice_original": indice_original,
            "indice_final": indice,
            "colisiones": colisiones_locales,
            "log": log
        }
