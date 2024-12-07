import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Client } from '../types/client';

export function useClientDetails(clientId: string) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClientDetails() {
      try {
        setLoading(true);
        const clientDoc = await getDoc(doc(db, 'clients', clientId));
        
        if (clientDoc.exists()) {
          setClient({ id: clientDoc.id, ...clientDoc.data() } as Client);
        } else {
          setError('Client not found');
        }
      } catch (err) {
        setError('Failed to fetch client details');
        console.error('Error fetching client details:', err);
      } finally {
        setLoading(false);
      }
    }

    if (clientId) {
      fetchClientDetails();
    }
  }, [clientId]);

  return { client, loading, error };
}