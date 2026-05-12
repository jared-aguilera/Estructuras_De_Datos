const codigoHaskell = `
module Ejercicios where

import Data.List (intersperse, nub, (\\\\))
import System.IO (hFlush, stdout)

-- ===============================================================
-- CAPÍTULO 1: INTRODUCCIÓN A LA PROGRAMACIÓN FUNCIONAL
-- ===============================================================

-- 1.1 FACTORIAL
desc1_1 :: String
desc1_1 = "Ejercicio 1.1: Calcula el factorial de un numero entero usando condicionales (if-then-else)."

ejercicio1_1_fact :: Integer -> Integer
ejercicio1_1_fact n =
  if n == 0
    then 1
    else
      if n < 0
        then 1
        else n * ejercicio1_1_fact (n - 1)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 1.2 NÚMERO DE COMBINACIONES
desc1_2 :: String
desc1_2 = "Ejercicio 1.2: Calcula el numero de combinaciones de n elementos tomados de k en k."

ejercicio1_2_comb :: Integer -> Integer -> Integer
ejercicio1_2_comb n k =
  if n < k || n < 0 || k < 0
    then 0
    else (ejercicio1_1_fact n) \`div\` ((ejercicio1_1_fact k) * (ejercicio1_1_fact (n - k)))

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 1.3 NÚMERO IMPAR
desc1_3 :: String
desc1_3 = "Ejercicio 1.3: Verifica si un numero es impar usando la funcion predefinida odd."

ejercicio1_3_impar :: Integer -> Bool
ejercicio1_3_impar = odd

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 1.4 CUADRADO
desc1_4 :: String
desc1_4 = "Ejercicio 1.4: Calcula el cuadrado de un numero x."

ejercicio1_4_cuadrado :: Integer -> Integer
ejercicio1_4_cuadrado x = x * x

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 1.5 SUMA DE CUADRADOS
desc1_5 :: String
desc1_5 = "Ejercicio 1.5: Calcula la suma de los cuadrados de los elementos de una lista l."

ejercicio1_5_sumaCuadrados :: [Integer] -> Integer
ejercicio1_5_sumaCuadrados l = sum (map ejercicio1_4_cuadrado l)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 1.6 RAÍCES DE ECUACIÓN DE SEGUNDO GRADO
desc1_6 :: String
desc1_6 = "Ejercicio 1.6: Calcula la lista de raices de la ecuacion ax^2 + bx + c = 0."

ejercicio1_6_raices :: Double -> Double -> Double -> [Double]
ejercicio1_6_raices a b c = [(-b + sqrt (b * b - 4 * a * c)) / (2 * a), (-b - sqrt (b * b - 4 * a * c)) / (2 * a)]

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 1.7 VALOR ABSOLUTO
desc1_7 :: String
desc1_7 = "Ejercicio 1.7: Calcula el valor absoluto de un numero x."

ejercicio1_7_abs :: Integer -> Integer
ejercicio1_7_abs x = if x > 0 then x else (-x)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 1.8 SIGNO
desc1_8 :: String
desc1_8 = "Ejercicio 1.8: Devuelve el signo de un numero (-1, 0 o 1)."

ejercicio1_8_signo :: Integer -> Integer
ejercicio1_8_signo x
  | x > 0 = 1
  | x == 0 = 0
  | otherwise = -1

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 1.9 ANTERIOR DE UN NÚMERO NATURAL
desc1_9 :: String
desc1_9 = "Ejercicio 1.9: Devuelve el anterior de un numero natural x (x > 0)."

ejercicio1_9_anterior :: Integer -> Integer
ejercicio1_9_anterior n = if n > 0 then n - 1 else error "No tiene anterior natural"

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 1.10 POTENCIA (VERSIÓN CONDICIONAL)
desc1_10 :: String
desc1_10 = "Ejercicio 1.10: Calcula la potencia de x elevado a n usando condicionales."

ejercicio1_10_potencia :: Integer -> Integer -> Integer
ejercicio1_10_potencia x n =
  if n == 0
    then 1
    else x * ejercicio1_10_potencia x (n - 1)

-- ===============================================================
-- CAPÍTULO 2: NÚMEROS Y FUNCIONES
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2.1 SIGUIENTE DE UN NÚMERO
desc2_1 :: String
desc2_1 = "Ejercicio 2.1: Calcula el siguiente del numero entero x."

ejercicio2_1_siguiente :: Integer -> Integer
ejercicio2_1_siguiente = (+ 1)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2.2 DOBLE
desc2_2 :: String
desc2_2 = "Ejercicio 2.2: Calcula el doble de x."

ejercicio2_2_doble :: Integer -> Integer
ejercicio2_2_doble x = 2 * x

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2.3 MITAD
desc2_3 :: String
desc2_3 = "Ejercicio 2.3: Calcula la mitad de x."

ejercicio2_3_mitad :: Double -> Double
ejercicio2_3_mitad x = x / 2

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2.4 INVERSO
desc2_4 :: String
desc2_4 = "Ejercicio 2.4: Calcula el inverso de x."

ejercicio2_4_inverso :: Double -> Double
ejercicio2_4_inverso x = 1 / x

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2.5 POTENCIA DE DOS
desc2_5 :: String
desc2_5 = "Ejercicio 2.5: Calcula 2 elevado a x."

ejercicio2_5_potenciaDos :: Integer -> Integer
ejercicio2_5_potenciaDos x = 2 ^ x

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2.6 RECONOCIMIENTO DE POSITIVOS
desc2_6 :: String
desc2_6 = "Ejercicio 2.6: Verifica si un numero es positivo."

ejercicio2_6_esPositivo :: Integer -> Bool
ejercicio2_6_esPositivo x = x > 0

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2.7 SUMA DE ELEMENTOS
desc2_7 :: String
desc2_7 = "Ejercicio 2.7: Calcula la suma de los elementos de una lista."

ejercicio2_7_sumaLista :: [Integer] -> Integer
ejercicio2_7_sumaLista = sum

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2.8 PRODUCTO DE ELEMENTOS
desc2_8 :: String
desc2_8 = "Ejercicio 2.8: Calcula el producto de los elementos de una lista."

ejercicio2_8_productoLista :: [Integer] -> Integer
ejercicio2_8_productoLista = product

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2.9 CONJUNCIÓN SOBRE UNA LISTA
desc2_9 :: String
desc2_9 = "Ejercicio 2.9: Verifica si todos los elementos de la lista son verdaderos (AND)."

ejercicio2_9_andLista :: [Bool] -> Bool
ejercicio2_9_andLista = and

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2.10 DISYUNCIÓN SOBRE UNA LISTA
desc2_10 :: String
desc2_10 = "Ejercicio 2.10: Verifica si algun elemento de la lista es verdadero (OR)."

ejercicio2_10_orLista :: [Bool] -> Bool
ejercicio2_10_orLista = or

-- ===============================================================
-- CAPÍTULO 3: ESTRUCTURAS DE DATOS
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3.1 CONCATENACIÓN DE LISTAS
desc3_1 :: String
desc3_1 = "Ejercicio 3.1: Concatena dos listas l1 y l2."

ejercicio3_1_conc :: [a] -> [a] -> [a]
ejercicio3_1_conc [] ys = ys
ejercicio3_1_conc (x : xs) ys = x : (ejercicio3_1_conc xs ys)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3.2 CABEZA DE UNA LISTA
desc3_2 :: String
desc3_2 = "Ejercicio 3.2: Obtiene el primer elemento (cabeza) de una lista."

ejercicio3_2_head :: [a] -> a
ejercicio3_2_head (x : _) = x

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3.3 RESTO DE UNA LISTA
desc3_3 :: String
desc3_3 = "Ejercicio 3.3: Obtiene el resto de una lista (sin el primer elemento)."

ejercicio3_3_tail :: [a] -> [a]
ejercicio3_3_tail (_ : xs) = xs

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3.4 ÚLTIMO ELEMENTO
desc3_4 :: String
desc3_4 = "Ejercicio 3.4: Obtiene el ultimo elemento de una lista."

ejercicio3_4_last :: [a] -> a
ejercicio3_4_last [x] = x
ejercicio3_4_last (_ : xs) = ejercicio3_4_last xs

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3.5 INVERSA DE UNA LISTA
desc3_5 :: String
desc3_5 = "Ejercicio 3.5: Devuelve la lista en orden inverso."

ejercicio3_5_reverse :: [a] -> [a]
ejercicio3_5_reverse [] = []
ejercicio3_5_reverse (x : xs) = ejercicio3_5_reverse xs ++ [x]

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3.6 LONGITUD DE UNA LISTA
desc3_6 :: String
desc3_6 = "Ejercicio 3.6: Calcula el numero de elementos de una lista."

ejercicio3_6_length :: [a] -> Int
ejercicio3_6_length [] = 0
ejercicio3_6_length (_ : xs) = 1 + ejercicio3_6_length xs

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3.7 PERTENENCIA
desc3_7 :: String
desc3_7 = "Ejercicio 3.7: Verifica si un elemento pertenece a una lista."

ejercicio3_7_elem :: (Eq a) => a -> [a] -> Bool
ejercicio3_7_elem _ [] = False
ejercicio3_7_elem x (y : ys) = (x == y) || ejercicio3_7_elem x ys

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3.8 TODOS PARES
desc3_8 :: String
desc3_8 = "Ejercicio 3.8: Verifica si todos los elementos de la lista son pares."

ejercicio3_8_todosPares :: [Int] -> Bool
ejercicio3_8_todosPares = all even

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3.9 PRIMERA COMPONENTE DE UN PAR
desc3_9 :: String
desc3_9 = "Ejercicio 3.9: Obtiene la primera componente de un par (x, y)."

ejercicio3_9_fst :: (a, b) -> a
ejercicio3_9_fst (x, _) = x

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3.10 SEGUNDA COMPONENTE DE UN PAR
desc3_10 :: String
desc3_10 = "Ejercicio 3.10: Obtiene la segunda componente de un par (x, y)."

ejercicio3_10_snd :: (a, b) -> b
ejercicio3_10_snd (_, y) = y

-- ===============================================================
-- CAPÍTULO 4: APLICACIONES DE PROGRAMACIÓN FUNCIONAL
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4.1 SEGMENTOS INICIALES
desc4_1 :: String
desc4_1 = "Ejercicio 4.1: Devuelve la lista de los segmentos iniciales de una lista l."

ejercicio4_1_iniciales :: [a] -> [[a]]
ejercicio4_1_iniciales [] = [[]]
ejercicio4_1_iniciales (x : xs) = [] : [x : ys | ys <- ejercicio4_1_iniciales xs]

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4.2 SEGMENTOS FINALES
desc4_2 :: String
desc4_2 = "Ejercicio 4.2: Devuelve la lista de los segmentos finales de una lista l."

ejercicio4_2_finales :: [a] -> [[a]]
ejercicio4_2_finales [] = [[]]
ejercicio4_2_finales (x : xs) = (x : xs) : ejercicio4_2_finales xs

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4.3 SEGMENTOS
desc4_3 :: String
desc4_3 = "Ejercicio 4.3: Devuelve la lista de todos los segmentos de una lista l."

ejercicio4_3_segmentos :: [a] -> [[a]]
ejercicio4_3_segmentos [] = [[]]
ejercicio4_3_segmentos (x : xs) = ejercicio4_3_segmentos xs ++ [x : ys | ys <- ejercicio4_1_iniciales xs]

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4.4 SUBLISTAS
desc4_4 :: String
desc4_4 = "Ejercicio 4.4: Devuelve la lista de todas las sublistas de una lista l."

ejercicio4_4_sublistas :: [a] -> [[a]]
ejercicio4_4_sublistas [] = [[]]
ejercicio4_4_sublistas (x : xs) = [x : ys | ys <- sub] ++ sub
  where
    sub = ejercicio4_4_sublistas xs

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4.5 COMPROBACIÓN DE SUBCONJUNTO
desc4_5 :: String
desc4_5 = "Ejercicio 4.5: Verifica si xs es un subconjunto de ys."

ejercicio4_5_subconjunto :: (Eq a) => [a] -> [a] -> Bool
ejercicio4_5_subconjunto [] _ = True
ejercicio4_5_subconjunto (x : xs) ys = elem x ys && ejercicio4_5_subconjunto xs ys

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4.6 IGUALDAD DE CONJUNTOS
desc4_6 :: String
desc4_6 = "Ejercicio 4.6: Verifica si dos listas son iguales como conjuntos."

ejercicio4_6_igualConjunto :: (Eq a) => [a] -> [a] -> Bool
ejercicio4_6_igualConjunto xs ys = ejercicio4_5_subconjunto xs ys && ejercicio4_5_subconjunto ys xs

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4.7 PERMUTACIONES
desc4_7 :: String
desc4_7 = "Ejercicio 4.7: Devuelve todas las permutaciones de una lista l."

ejercicio4_7_permutaciones :: (Eq a) => [a] -> [[a]]
ejercicio4_7_permutaciones [] = [[]]
ejercicio4_7_permutaciones xs = [a : p | a <- xs, p <- ejercicio4_7_permutaciones (xs \\\\ [a])]

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4.8 COMBINACIONES
desc4_8 :: String
desc4_8 = "Ejercicio 4.8: Devuelve todas las combinaciones de n elementos tomados de una lista l."

ejercicio4_8_combinaciones :: Int -> [a] -> [[a]]
ejercicio4_8_combinaciones n xs = [ys | ys <- ejercicio4_4_sublistas xs, length ys == n]

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4.9 PROBLEMA DE LAS REINAS
desc4_9 :: String
desc4_9 = "Ejercicio 4.9: Devuelve todas las soluciones del problema de las n reinas."

type Tablero = [Int]

ejercicio4_9_reinas :: Int -> [Tablero]
ejercicio4_9_reinas n = reinasAux n
  where
    reinasAux 0 = [[]]
    reinasAux m = [r : rs | rs <- reinasAux (m - 1), r <- [1 .. n] \\\\ rs, noAtaca r rs 1]
    noAtaca _ [] _ = True
    noAtaca r (a : rs) distH = abs (r - a) /= distH && noAtaca r rs (distH + 1)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4.10 NÚMEROS DE HAMMING
desc4_10 :: String
desc4_10 = "Ejercicio 4.10: Genera la sucesion de los numeros de Hamming."

ejercicio4_10_hamming :: [Int]
ejercicio4_10_hamming =
  1
    : mezcla3
      [2 * i | i <- ejercicio4_10_hamming]
      [3 * i | i <- ejercicio4_10_hamming]
      [5 * i | i <- ejercicio4_10_hamming]
  where
    mezcla3 xs ys zs = mezcla2 xs (mezcla2 ys zs)
    mezcla2 p@(x : xs) q@(y : ys)
      | x < y = x : mezcla2 xs q
      | x > y = y : mezcla2 p ys
      | otherwise = x : mezcla2 xs ys
    mezcla2 [] ys = ys
    mezcla2 xs [] = xs

-- ===============================================================
-- CAPÍTULO 5: INTRODUCCIÓN A LA PROGRAMACIÓN FUNCIONAL (II)
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 5.1 CUADRADO
desc5_1 :: String
desc5_1 = "Ejercicio 5.1: Calcula el cuadrado de un numero x."

ejercicio5_1_cuadrado :: Integer -> Integer
ejercicio5_1_cuadrado x = x * x

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 5.2 VALOR ABSOLUTO
desc5_2 :: String
desc5_2 = "Ejercicio 5.2: Calcula el valor absoluto de x usando guardas."

ejercicio5_2_abs :: Integer -> Integer
ejercicio5_2_abs x
  | x > 0 = x
  | otherwise = -x

-- ===============================================================
-- CAPÍTULO 6: MODELIZACIÓN Y TIPOS DE DATOS
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 6.1 CONCATENACIÓN DE DOS LISTAS
desc6_1 :: String
desc6_1 = "Ejercicio 6.1: Concatena dos listas usando recursion."

ejercicio6_1_conc :: [a] -> [a] -> [a]
ejercicio6_1_conc [] ys = ys
ejercicio6_1_conc (x : xs) ys = x : (ejercicio6_1_conc xs ys)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 6.2 INVERSA DE UNA LISTA
desc6_2 :: String
desc6_2 = "Ejercicio 6.2: Devuelve la inversa de la lista."

ejercicio6_2_inversa :: [a] -> [a]
ejercicio6_2_inversa [] = []
ejercicio6_2_inversa (x : xs) = ejercicio6_2_inversa xs ++ [x]

-- ===============================================================
-- CAPÍTULO 7: RECURSIÓN Y TIPOS DE DATOS
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 7.1 SUMA DE CUADRADOS
desc7_1 :: String
desc7_1 = "Ejercicio 7.1: Calcula la suma 1^2 + 2^2 + ... + n^2 usando recursion."

ejercicio7_1_sumaCuadrados :: Integer -> Integer
ejercicio7_1_sumaCuadrados 0 = 0
ejercicio7_1_sumaCuadrados n
  | n > 0 = ejercicio7_1_sumaCuadrados (n - 1) + n * n

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 7.2 POTENCIA
desc7_2 :: String
desc7_2 = "Ejercicio 7.2: Calcula la potencia de x elevado a n usando recursion."

ejercicio7_2_potencia :: Integer -> Integer -> Integer
ejercicio7_2_potencia x 0 = 1
ejercicio7_2_potencia x n
  | n > 0 = x * ejercicio7_2_potencia x (n - 1)

-- ===============================================================
-- CAPÍTULO 8: LISTAS Y COMPRENSIÓN
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 8.1 LISTA ORDENADA
desc8_1 :: String
desc8_1 = "Ejercicio 8.1: Verifica si una lista esta ordenada de menor a mayor."

ejercicio8_1_ordenada :: (Ord a) => [a] -> Bool
ejercicio8_1_ordenada [] = True
ejercicio8_1_ordenada [_] = True
ejercicio8_1_ordenada (x : y : xs) = (x <= y) && ejercicio8_1_ordenada (y : xs)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 8.2 POSICIONES
desc8_2 :: String
desc8_2 = "Ejercicio 8.2: Devuelve una lista de pares con cada elemento y su posicion."

ejercicio8_2_posiciones :: [a] -> [(a, Int)]
ejercicio8_2_posiciones xs = zip xs [0 ..]

-- ===============================================================
-- CAPÍTULO 9: FUNCIONES DE ENTRADA Y SALIDA
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 9.1 ACCIÓN Y ESCRITURA
desc9_1 :: String
desc9_1 = "Ejercicio 9.1: Ejecuta una accion IO y escribe su resultado."

ejercicio9_1_escribe :: (Show a) => IO a -> IO ()
ejercicio9_1_escribe io = do
  resultado <- io
  print resultado

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 9.2 ESCRITURA DE TABLAS
desc9_2 :: String
desc9_2 = "Ejercicio 9.2: Escribe los elementos de una lista en forma de tabla con su posicion."

ejercicio9_2_escribeTabla :: [String] -> IO ()
ejercicio9_2_escribeTabla xs = sequence_ [putStrLn (show i ++ ": " ++ x) | (x, i) <- xs \`zip\` [1 ..]]

-- ===============================================================
-- CAPÍTULO 10: TIPOS DE DATOS RECURSIVOS
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 10.1 EXPRESIONES ARITMÉTICAS SIMPLES
desc10_1 :: String
desc10_1 = "Ejercicio 10.1: Define el tipo Expr para sumas y productos (Ejemplo: Sum3 (Num3 3) (Pro3 (Num3 4) (Num3 6)))."

data ExprSimple = NumS Integer | SumS ExprSimple ExprSimple | ProS ExprSimple ExprSimple
  deriving (Eq, Show)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 10.2 EXPRESIONES ARITMÉTICAS GENERALES
desc10_2 :: String
desc10_2 = "Ejercicio 10.2: Define el tipo Expr para sumas, restas, productos y divisiones."

data ExprGeneral = NumG Integer | SumG ExprGeneral ExprGeneral | ResG ExprGeneral ExprGeneral | ProG ExprGeneral ExprGeneral | DivG ExprGeneral ExprGeneral
  deriving (Eq, Show)

-- ===============================================================
-- CAPÍTULO 11: ANALIZADORES
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 11.1 USO DE LA FUNCIÓN READ
desc11_1 :: String
desc11_1 = "Ejercicio 11.1: Convierte texto en valores usando 'read'."

ejercicio11_1_analizador :: String -> Int
ejercicio11_1_analizador s = read s :: Int

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 11.2 ANALIZADOR EXITO
desc11_2 :: String
desc11_2 = "Ejercicio 11.2: Analizador que no consume nada y devuelve el valor x."

type ReadS_Simple a = String -> [(a, String)]

ejercicio11_2_exito :: a -> ReadS_Simple a
ejercicio11_2_exito x = \\c -> [(x, c)]

-- ===============================================================
-- CAPÍTULO 12: BÚSQUEDA EN GRAFOS
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 12.1 DEFINICIÓN DE GRAFO
desc12_1 :: String
desc12_1 = "Ejercicio 12.1: Define un Grafo mediante una lista de vertices y una funcion de sucesores."

data Grafo v = G [v] (v -> [v])

-- Grafo de ejemplo de la Figura 12.1
ej_grafo :: Grafo Int
ej_grafo = G [1 .. 5] suc
  where
    suc 1 = [2, 3]
    suc 2 = [4]
    suc 3 = [4]
    suc _ = []

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 12.2 BÚSQUEDA DE CAMINOS
desc12_2 :: String
desc12_2 = "Ejercicio 12.2: Encuentra un camino entre dos nodos en el grafo de ejemplo."

caminosDesde :: (Eq a) => Grafo a -> a -> (a -> Bool) -> [a] -> [[a]]
caminosDesde g o te vis
  | te o = [o : vis]
  | otherwise = concat [caminosDesde g o' te (o : vis) | o' <- suc o, notElem o' vis]
  where
    G _ suc = g

ejercicio12_2_camino :: Int -> Int -> [Int]
ejercicio12_2_camino u v =
  let caminos = caminosDesde ej_grafo u (== v) []
   in if null caminos then [] else reverse (head caminos)

-- ===============================================================
-- CAPÍTULO 13: JUEGOS (EL GATO / TRES EN RAYA)
-- ===============================================================

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 13.1 JUEGO DEL GATO (TRES EN RAYA)
desc13_1 :: String
desc13_1 = "Ejercicio 13.1: Implementacion del juego del Gato (Tres en Raya)"

-- Profundidad de búsqueda para el algoritmo Minimax
profundidadDeBusqueda :: Int
profundidadDeBusqueda = 6

type PosicionGato = Int

type Posiciones = [PosicionGato]

-- Tablero con posiciones de X y posiciones de O
data TableroGato = Tab Posiciones Posiciones deriving (Show)

tableroInicial :: TableroGato
tableroInicial = Tab [] []

turnoDeX :: TableroGato -> Bool
turnoDeX (Tab xs os) = length xs == length os

pone :: TableroGato -> PosicionGato -> TableroGato
pone (Tab xs os) p =
  if turnoDeX (Tab xs os)
    then Tab (p : xs) os
    else Tab xs (p : os)

completo :: TableroGato -> Bool
completo (Tab xs os) = length xs + length os == 9

subconjunto :: Posiciones -> Posiciones -> Bool
subconjunto s1 s2 = all (\`elem\` s2) s1

tieneLinea :: Posiciones -> Bool
tieneLinea ps =
  subconjunto [1, 2, 3] ps
    || subconjunto [4, 5, 6] ps
    || subconjunto [7, 8, 9] ps
    || subconjunto [1, 4, 7] ps
    || subconjunto [2, 5, 8] ps
    || subconjunto [3, 6, 9] ps
    || subconjunto [1, 5, 9] ps
    || subconjunto [3, 5, 7] ps

tieneGanador :: TableroGato -> Bool
tieneGanador (Tab xs os) = tieneLinea xs || tieneLinea os

data ArbolJuego a = NodoJ a [ArbolJuego a]

posicionesLibres :: TableroGato -> Posiciones
posicionesLibres (Tab xs os) = [1 .. 9] \\\\ (xs ++ os)

siguientesTableros :: TableroGato -> [TableroGato]
siguientesTableros t = [pone t p | p <- posicionesLibres t]

construyeArbol :: TableroGato -> ArbolJuego TableroGato
construyeArbol t = NodoJ t (map construyeArbol (siguientesTableros t))

type Valor = Int

valores :: [ArbolJuego (Valor, TableroGato)] -> [Valor]
valores vts = [v | NodoJ (v, _) _ <- vts]

maximiza :: ArbolJuego TableroGato -> ArbolJuego (Valor, TableroGato)
maximiza (NodoJ t []) = NodoJ (if tieneGanador t then -1 else 0, t) []
maximiza (NodoJ t ts) = NodoJ (maximum (valores vts), t) vts
  where
    vts = map minimiza ts

minimiza :: ArbolJuego TableroGato -> ArbolJuego (Valor, TableroGato)
minimiza (NodoJ t []) = NodoJ (if tieneGanador t then 1 else 0, t) []
minimiza (NodoJ t ts) = NodoJ (minimum (valores vts), t) vts
  where
    vts = map maximiza ts

poda :: Int -> ArbolJuego a -> ArbolJuego a
poda n (NodoJ x xs)
  | n == 0 = NodoJ x []
  | otherwise = NodoJ x (map (poda (n - 1)) xs)

selecciona :: ArbolJuego (Valor, TableroGato) -> TableroGato
selecciona (NodoJ (v, _) ts) = head [t | NodoJ (v', t) _ <- ts, v' == v]

mejorMovimiento :: TableroGato -> TableroGato
mejorMovimiento t = selecciona . maximiza . poda profundidadDeBusqueda . construyeArbol $ t

muestraPosicion :: TableroGato -> PosicionGato -> String
muestraPosicion (Tab xs os) p
  | p \`elem\` xs = "X"
  | p \`elem\` os = "O"
  | otherwise = show p

muestraLinea :: TableroGato -> [PosicionGato] -> String
muestraLinea t ps = concat . intersperse "|" . map (muestraPosicion t) $ ps

muestraTablero :: TableroGato -> String
muestraTablero t =
  unlines
    [ muestraLinea t [1, 2, 3],
      "-----",
      muestraLinea t [4, 5, 6],
      "-----",
      muestraLinea t [7, 8, 9]
    ]

ejercicio13_1_jugarGato :: IO ()
ejercicio13_1_jugarGato = do
  putStrLn "================================"
  putStrLn "      TRES EN RAYA (GATO)"
  putStrLn "================================"
  putStrLn (muestraTablero tableroInicial)
  putStr "Quieres ser la X? (s/n): "
  hFlush stdout
  l <- getLine
  if not (null l) && head l \`elem\` "sS"
    then humano tableroInicial
    else computadora tableroInicial

humano :: TableroGato -> IO ()
humano t = do
  putStr "\\n> Introduce posicion libre (1-9): "
  hFlush stdout
  l <- getLine
  -- Manejo básico de parseo para evitar caídas
  let pos = reads l :: [(Int, String)]
  if null pos
    then putStrLn "Entrada invalida." >> humano t
    else do
      let p = fst (head pos)
      if p \`notElem\` posicionesLibres t
        then putStrLn "Posicion ocupada o invalida." >> humano t
        else do
          let t' = pone t p
          putStrLn "\\nTu jugada:"
          putStrLn (muestraTablero t')
          if tieneGanador t'
            then putStrLn "Felicidades, ganaste!"
            else
              if completo t'
                then putStrLn "Empate!"
                else computadora t'

computadora :: TableroGato -> IO ()
computadora t = do
  putStrLn "\\nTurno de la computadora: "
  let t' = mejorMovimiento t
  putStrLn (muestraTablero t')
  if tieneGanador t'
    then putStrLn "La computadora gano!"
    else
      if completo t'
        then putStrLn "Empate!"
        else humano t'

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`;
