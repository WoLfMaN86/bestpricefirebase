import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import productsBlancas from '@/assets/productsBlancas.json';

export async function getProductosBlanca() {
    const snapshot = await getDocs(collection(db, 'productosBlanca'));
  
    if (snapshot.empty) {
      // La colección está vacía, carga los productos desde el archivo JSON
      for (const producto of productsBlancas) {
        await addDoc(collection(db, 'productosBlanca'), producto);
      }
      // Obtiene la lista de productos actualizada
      const updatedSnapshot = await getDocs(collection(db, 'productosBlanca'));
      return updatedSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } else {
      // La colección no está vacía, devuelve los productos almacenados en Firestore
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  }

export async function getProductoBlanca(id) {
  const docRef = doc(db, 'productosBlanca', id);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return { id: docSnapshot.id, ...docSnapshot.data() };
  } else {
    throw new Error('El producto no existe');
  }
}

export async function agregarProductoBlanca(producto) {
  await addDoc(collection(db, 'productosBlanca'), producto);
}

export async function actualizarProductoBlanca(id, producto) {
  const docRef = doc(db, 'productosBlanca', id);
  await updateDoc(docRef, producto);
}

export async function eliminarProductoBlanca(id) {
  const docRef = doc(db, 'productosBlanca', id);
  await deleteDoc(docRef);
}
