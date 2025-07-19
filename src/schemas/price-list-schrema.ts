import { z } from 'zod';

export const priceListSchema = z.object({
  name: z.string().min(1, 'Назва обов’язкова'),
  durationMin: z.coerce.number().nonnegative().min(1, "Тривалість повинна бути більше 0"),
  price: z.coerce.number().nonnegative().min(1, "Ціна повинна бути більше 0"),
  description: z.string().min(1, 'Опис обов’язковий'),
  bonuses: z.string().min(1, 'Бонуси обов’язкові'),
});

export type TPriceListSchema = z.infer<typeof priceListSchema>;
