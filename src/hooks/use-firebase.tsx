import {
  DocumentData,
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react"; // Import React hooks

import { db } from "../utils/firebase/Firebase";

export function useFetchFirebase(collectionName: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [fetchedDocs, setFetchedDocs] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
          isFlagged: doc.data().isFlagged ?? false,
          comments: doc.data().comments ?? [],
        });
      });
      setFetchedDocs(data);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    isLoading,
    data: fetchedDocs,
    errorMessage: error?.message ?? "",
    refetch: fetchData, // Provide the fetchData function as refetch
  };
}

export function useAddDoc(collectionName: string) {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);

  const addDocument = async (newData: DocumentData) => {
    setIsAdding(true);
    setError(null);
    setDocumentId(null);
    console.log(
      "useAddDoc: Attempting to add document to collection:",
      collectionName,
      "Data:",
      JSON.stringify(newData, null, 2)
    );
    const collectionRef = collection(db, collectionName);
    try {
      const docRef = await addDoc(collectionRef, {
        ...newData,
        createdAt: serverTimestamp(),
      });
      setDocumentId(docRef.id);
      setIsAdding(false);
      return docRef;
    } catch (e) {
      console.error(
        "useAddDoc: Error adding document:",
        e,
        "Error details:",
        JSON.stringify(e, Object.getOwnPropertyNames(e))
      ); // Enhanced error logging
      setError(e as Error);
      setIsAdding(false);
      throw e; // Re-throw the error so it can be caught by the caller
    }
  };

  return {
    addDocument,
    isAdding,
    error,
    errorMessage: error?.message ?? "",
    documentId,
  };
}
