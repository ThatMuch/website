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
  const addDocument = async (newData: DocumentData) => {
    const collectionRef = collection(db, collectionName);
    return addDoc(collectionRef, {
      ...newData,
      createdAt: serverTimestamp(),
    });
  };

  return {
    addDocument, // Expose the function to add a document
  };
}
