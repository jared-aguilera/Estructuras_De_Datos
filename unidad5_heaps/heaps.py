class MinHeap:
    def __init__(self):
        self.heap = []
        self.size = 0

    def is_empty(self):
        return self.size == 0

    def parent(self, i):
        return (i - 1) // 2

    def left_child(self, i):
        return 2 * i + 1

    def right_child(self, i):
        return 2 * i + 2

    def get_min(self):
        if self.size > 0:
            return self.heap[0]
        return None

    def insert(self, item):
        self.heap.append(item)
        self.size += 1
        self._sift_up(self.size - 1)

    def extract_min(self):
        if self.size == 0:
            return None
        min_item = self.heap[0]
        self.heap[0] = self.heap[self.size - 1]
        self.size -= 1
        self.heap.pop()
        if self.size > 0:
            self._sift_down(0)
        return min_item

    def _sift_up(self, i):
        parent_idx = self.parent(i)
        if i > 0 and self.heap[i] < self.heap[parent_idx]:
            self.heap[i], self.heap[parent_idx] = self.heap[parent_idx], self.heap[i]
            self._sift_up(parent_idx)

    def _sift_down(self, i):
        min_idx = i
        left = self.left_child(i)
        right = self.right_child(i)

        if left < self.size and self.heap[left] < self.heap[min_idx]:
            min_idx = left
        if right < self.size and self.heap[right] < self.heap[min_idx]:
            min_idx = right

        if min_idx != i:
            self.heap[i], self.heap[min_idx] = self.heap[min_idx], self.heap[i]
            self._sift_down(min_idx)

    def decrease_key_by_id(self, item_id, new_priority):
        """
        Requerimiento del Ejercicio 5:
        Busca un elemento por su 'id' en el diccionario (posición 2 de la tupla)
        y si la nueva prioridad es menor, la actualiza y aplica sift_up.
        """
        for i in range(self.size):
            if isinstance(self.heap[i][2], dict) and self.heap[i][2].get("id") == item_id:
                if new_priority < self.heap[i][0]:
                    self.heap[i] = (new_priority, self.heap[i][1], self.heap[i][2])
                    self._sift_up(i)
                return True
        return False

class MaxHeap:
    def __init__(self):
        self.heap = []
        self.size = 0

    def is_empty(self):
        return self.size == 0

    def parent(self, i):
        return (i - 1) // 2

    def left_child(self, i):
        return 2 * i + 1

    def right_child(self, i):
        return 2 * i + 2

    def get_max(self):
        if self.size > 0:
            return self.heap[0]
        return None

    def insert(self, item):
        self.heap.append(item)
        self.size += 1
        self._sift_up(self.size - 1)

    def extract_max(self):
        if self.size == 0:
            return None
        max_item = self.heap[0]
        self.heap[0] = self.heap[self.size - 1]
        self.size -= 1
        self.heap.pop()
        if self.size > 0:
            self._sift_down(0)
        return max_item

    def _sift_up(self, i):
        parent_idx = self.parent(i)
        if i > 0 and self.heap[i] > self.heap[parent_idx]:
            self.heap[i], self.heap[parent_idx] = self.heap[parent_idx], self.heap[i]
            self._sift_up(parent_idx)

    def _sift_down(self, i):
        max_idx = i
        left = self.left_child(i)
        right = self.right_child(i)

        if left < self.size and self.heap[left] > self.heap[max_idx]:
            max_idx = left
        if right < self.size and self.heap[right] > self.heap[max_idx]:
            max_idx = right

        if max_idx != i:
            self.heap[i], self.heap[max_idx] = self.heap[max_idx], self.heap[i]
            self._sift_down(max_idx)

class HeapOverflowError(Exception):
    pass

class HeapUnderflowError(Exception):
    pass

class BoundedMinHeap(MinHeap):
    def __init__(self, capacity):
        super().__init__()
        self.capacity = capacity

    def insert(self, item):
        if self.size >= self.capacity:
            raise HeapOverflowError("Heap Overflow: Capacidad máxima alcanzada (Límite 5)")
        super().insert(item)

    def extract_min(self):
        if self.size == 0:
            raise HeapUnderflowError("Heap Underflow: El montículo está vacío, no hay tareas")
        return super().extract_min()
