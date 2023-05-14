import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase'; 

export async function getProductosBlanca() {
  const querySnapshot = await getDocs(collection(db, 'productosBlanca'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
