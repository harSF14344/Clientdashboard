import { useState, useEffect } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Client } from '../types/client';

export function useClients(searchTerm: string = '') {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true);
        const clientsRef = collection(db, 'clients');
        let querySnapshot;

        if (searchTerm) {
          // Get all clients and filter in memory for partial matches
          querySnapshot = await getDocs(clientsRef);
          const allClients = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Client[];

          // Case-insensitive search that matches anywhere in the name
          const filteredClients = allClients.filter(client =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          setClients(filteredClients);
        } else {
          // If no search term, get all clients
          querySnapshot = await getDocs(clientsRef);
          const clientsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Client[];
          
          setClients(clientsData);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch clients');
        console.error('Error fetching clients:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, [searchTerm]);

  return { clients, loading, error };
}