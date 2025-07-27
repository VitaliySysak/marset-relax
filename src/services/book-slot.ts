import { TBookSlotSchema } from '@/schemas/book-slot-schema';
import { axiosInstance } from './axios-instance';
import axios from 'axios';

export default async function bookSlot(data: TBookSlotSchema) {
  try {
    return await axiosInstance.post('/appointment/book-slot/', data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error?.response?.data?.message);
    }
    console.error('Error while execution book-slot.ts/bookSlot:', error);
  }
}
