/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { io } from "socket.io-client";

interface Message {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface Properties {
  loading: boolean;
  messages: Message[];
}

interface SendMessageProps {
  params: {
    message: string;
    author: string;
  },
  onSuccess?: (message: Message) => void;
  onError?: (error: any) => void;
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export function useMessage() {
  const [properties, setProperties] = useState<Properties>({
    loading: false,
    messages: [],
  });

  const handleSetProperties = (newProperties: Partial<Properties>) => {
    setProperties(prevProperties => ({
      ...prevProperties,
      ...newProperties,
    }));
  };

  const handleSendMessage = useCallback(async ({ params, onError, onSuccess, }: SendMessageProps) => {
    handleSetProperties({ loading: true });

    try {
      const response = await api.post('/messages', params);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (onError) {
          onError(error.response?.data);
        }
      }

    } finally {
      handleSetProperties({ loading: false });
    }
  }, []);

  const handleListMessages = useCallback(async () => {
    handleSetProperties({ loading: true });

    try {
      const response = await api.get('/messages');

      handleSetProperties({ messages: response.data });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data);
      }

    } finally {
      handleSetProperties({ loading: false });
    }
  },[])

  useEffect(() => {
    const socket = io('ws://localhost:3000');

    socket.on('message', (message: Message) => {
      console.log(message);
      handleSetProperties({ messages: [...properties.messages, message] });
    });
  }, [properties.messages]);

  return {
    loading: properties.loading,
    messages: properties.messages,
    handlers: {
      handleSendMessage,
      handleListMessages
    }
  };
}
