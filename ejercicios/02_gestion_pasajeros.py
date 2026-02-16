import os

# Clases
class Pasajero:
    def __init__(self, nombre = None, asiento = None, clave_boleto = None):
        self.nombre = nombre
        self.asiento = asiento
        self.clave_boleto = clave_boleto
        self.siguiente = None

# Esta es mi lista enlazada
class Vuelo:
    def __init__(self, destino = None, codigo = None, fecha_salida = None, fecha_llegada = None):
        self.destino = destino
        self.codigo = codigo
        self.fecha_salida = fecha_salida
        self.fecha_llegada = fecha_llegada
        self.head = None # aqui head apunta al primer pasajero de la lista enlazada
    
    # Este es mi insertar
    def agregar_pasajero(self, nombre, asiento, clave_boleto):
        
        # Esto verifica si hay duplicados
        actual = self.head
        while actual:
            if actual.clave_boleto == clave_boleto:
                print("\nERROR - Ya existe un pasajero con esa clave de boleto.")
                return False
            if actual.asiento == asiento:
                print("\nERROR - Ese asiento ya esta ocupado.")
                return False
            
            actual = actual.siguiente
            
        nuevo_pasajero = Pasajero(nombre, asiento, clave_boleto)
        
        if self.head is None:
            self.head = nuevo_pasajero
            return True # Este return hace que me salga del metodo agregar_pasajero
        
        pasajero_actual = self.head
        while pasajero_actual.siguiente:
            pasajero_actual = pasajero_actual.siguiente
        
        pasajero_actual.siguiente = nuevo_pasajero
        return True
    
    def eliminar_pasajero(self, clave_boleto):
        
        # Si no hay nada en la lista, no borra nada
        if self.head is None:
            print("No hay pasajeros.")
            return 
        
        # If para ver si es el primero
        if self.head.clave_boleto == clave_boleto:
            self.head = self.head.siguiente
            print("\nPasajero eliminado.")
            return
        
        pasajero_actual = self.head
        while pasajero_actual.siguiente and pasajero_actual.siguiente.clave_boleto != clave_boleto:
            pasajero_actual = pasajero_actual.siguiente
        
        if pasajero_actual.siguiente:
            pasajero_actual.siguiente = pasajero_actual.siguiente.siguiente
            print("\nPasajero eliminado.")
        else:
            print("\nPasajero no encontrado.")
            
    
    def mostrar_pasajeros(self):
        
        if self.head is None:
            print("\nNo hay pasajeros en este vuelo.")
        else:
            pasajero_actual = self.head
            print("\nLos pasajeros de este vuelo son: \n")
            
            while pasajero_actual:
                print(f"Nombre: {pasajero_actual.nombre} - Asiento: {pasajero_actual.asiento} - Clave del Boleto: {pasajero_actual.clave_boleto}")
                pasajero_actual = pasajero_actual.siguiente
            
        input("\nPresione Enter para continuar...")
        os.system("cls")

def verificar_duplicado(codigo):
    for i in vuelos:
        if i.codigo == codigo:
            return 1
    return 0

# Este ya es mi main
vuelos = []
opc = ""

while opc != "4":
    os.system("cls")
    
    print("Bienvenido, elija una opcion:\n")
    print("1) Crear un nuevo vuelo.")
    print("2) Seleccionar vuelo.")
    print("3) Cancelar vuelo.")
    print("4) Salir.\n")
    opc = input("Opcion: ")
    
    if opc == "1":
        destino = input("\nEscribe el lugar de destino del vuelo: ")
        if destino.strip() == "":
            print("ERROR - Destino invalido.")
            input("Presione Enter para continuar...")
            continue

        codigo = input("Escribe el codigo del vuelo: ")
        if codigo.strip() == "":
            print("ERROR - Codigo invalido.")
            input("Presione Enter para continuar...")
            continue    
        
        if verificar_duplicado(codigo) == 1:
            print("\nERROR - Este codigo de vuelo ya existe")
            input("\nPresione Enter para continuar...")
            continue
        
        fecha_salida = input("Escribe la fecha de salida: ")
        if fecha_salida.strip() == "":
            print("ERROR - Fecha de salida invalida.")
            input("Presione Enter para continuar...")
            continue

        fecha_llegada = input("Escribe la fecha de llegada: ")
        if fecha_llegada.strip() == "":
            print("ERROR - Fecha de llegada invalida.")
            input("Presione Enter para continuar...")
            continue
        vuelos.append(Vuelo(destino, codigo, fecha_salida, fecha_llegada))
        
        print("\n> Vuelo creado correctamente.")
        input("\nPresione Enter para continuar...")
        
    elif opc == "2":
        
        if not vuelos:
            print("\nNo hay vuelos registrados.")
            input("\nPresione Enter para continuar...")
            continue
        else:
            print("\nLa lista de vuelos es: ")
            for i, v in enumerate(vuelos):
                print(f"{i + 1}) {v.destino} - {v.codigo}")
            
            opc_vuelo = input("\nElija un vuelo para ver mas detalles: ")
            
            if not opc_vuelo.isdigit() or int(opc_vuelo) < 1 or int(opc_vuelo) > len(vuelos):
                print("No existe este vuelo.")
                input("Presione Enter para continuar...")
                continue
            
            # Submenu
            vuelo_actual = vuelos[int(opc_vuelo) - 1]
            sub_opc = ""
            while sub_opc != "4":
                os.system("cls")
                print(f"Vuelo a {vuelo_actual.destino}: {vuelo_actual.codigo}\n")
                print("1) Agregar pasajero")
                print("2) Eliminar pasajero")
                print("3) Mostrar pasajeros")
                print("4) Volver\n")
                sub_opc = input("Opcion: ")
                
                if sub_opc == "1":
                    nombre = input("\nNombre: ").strip()
                    asiento = input("Asiento: ").strip()
                    clave_boleto = input("Clave boleto: ").strip()
                    
                    if vuelo_actual.agregar_pasajero(nombre, asiento, clave_boleto):
                        print("\nPasajero agregado correctamente.")
                    input("\nPresione Enter para continuar...")
                
                elif sub_opc == "2":
                    
                    boleto = input("\nIngrese la clave del boleto a eliminar: ").strip()
                    vuelo_actual.eliminar_pasajero(boleto)
                    input("\nPresione Enter para continuar...")
                
                elif sub_opc == "3":
                    
                    vuelo_actual.mostrar_pasajeros()

                elif sub_opc == "4":
                    break

                else:
                    print("Opcion invalida.")
                    input("Presione Enter para continuar...")
    
    elif opc == "3":
        if not vuelos:
            print("\nNo hay vuelos para cancelar.")
            input("\nPresione Enter para continuar...")
            continue

        print("\nVuelos disponibles:\n")
        for i, v in enumerate(vuelos):
            print(f"{i + 1}) {v.destino} - {v.codigo}")

        borrar = input("\nSeleccione el vuelo a cancelar: ")

        if not borrar.isdigit() or int(borrar) < 1 or int(borrar) > len(vuelos):
            print("\nERROR - Opcion invalida.")
        else:
            eliminado = vuelos.pop(int(borrar) - 1)
            print(f"\nVuelo {eliminado.codigo} cancelado.")

        input("\nPresione Enter para continuar...")
    
    elif opc == "4":
        print("\nAdios")
    else:
        print("\nERROR - Elija una opcion valida\n")
        input("Escribe Enter para continuar...")