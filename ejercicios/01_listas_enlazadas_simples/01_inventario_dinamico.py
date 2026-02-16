import os
os.system("cls")

# Implementación completa de una lista enlazada simple
class Nodo:
    def __init__(self, dato=None):
        self.dato = dato
        self.siguiente = None

class ListaEnlazada:
    def __init__(self):
        self.head = None

    def insertar_al_inicio(self, dato):
        nuevo_nodo = Nodo(dato)
        nuevo_nodo.siguiente = self.head
        self.head = nuevo_nodo

    def insertar_al_final(self, dato):
        nuevo_nodo = Nodo(dato)

        if self.head is None:
            self.head = nuevo_nodo
            return

        actual = self.head
        while actual.siguiente:
            actual = actual.siguiente

        actual.siguiente = nuevo_nodo

    def eliminar_nodo(self, clave):
        if self.head is None:
            return

        if self.head.dato == clave:
            self.head = self.head.siguiente
            return

        actual = self.head
        while actual.siguiente and actual.siguiente.dato != clave:
            actual = actual.siguiente

        if actual.siguiente:
            actual.siguiente = actual.siguiente.siguiente

    def buscar(self, clave):
        actual = self.head

        while actual:
            if actual.dato == clave:
                return True
            actual = actual.siguiente

        return False

    def imprimir_lista(self):
        actual = self.head
        elementos = []

        while actual:
            elementos.append(str(actual.dato))
            actual = actual.siguiente

        if elementos:
            print(" -> ".join(elementos))
        else:
            print("Inventario vacio.")
            
    def tamano(self):
        contador = 0
        actual = self.head
        while actual:
            contador += 1
            actual = actual.siguiente

        return contador


if __name__ == "__main__":
    lista = ListaEnlazada()
    nivel_jugador = 5
    capacidad_inventario = nivel_jugador
    
    opc = 0
    while opc != 4:
        print(f"""Bienvenido Jugador

Nivel actual: {nivel_jugador}
Capacidad del inventario: {capacidad_inventario}

Elija una opcion:
1. Agregar item al inventario
2. Mostrar inventario
3. Subir de nivel
4. Salir
        """)
        valor = input("> Opcion: ").strip()
        if valor.isdigit():
            opc = int(valor)
        else:
            opc = 0
        
        
        if opc == 1:
            if lista.tamano() < capacidad_inventario:
                item = input("\nIngrese el nombre del item a agregar: ").strip()
                if item == "":
                    print("\nEl nombre del item no puede estar vacío.")
                else:   
                    lista.insertar_al_final(item)
                    print(f"\n{item} ha sido agregado al inventario.")
            else:
                print("\nInventario lleno. No puedes agregar mas items.")
            input("\nPresione Enter para continuar...")
            os.system("cls")
            
        elif opc == 2:
            print("\nInventario actual:\n")
            lista.imprimir_lista()
            input("\nPresione Enter para continuar...")
            os.system("cls")
            
        elif opc == 3:
            nivel_jugador += 1
            capacidad_inventario = nivel_jugador
            print(f"\nSubiste de nivel! Nivel actual: {nivel_jugador}")
            input("\nPresione Enter para continuar...")
            os.system("cls")
            
        elif opc == 4:
            print("\nHasta luego!")
        else:            
            print("\nOpcion no valida, intente de nuevo.")
            input("\nPresione Enter para continuar...")
            os.system("cls")