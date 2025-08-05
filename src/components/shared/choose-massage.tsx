import React from 'react';
import { cn } from '@/lib/utils';
import { FiMessageSquare } from 'react-icons/fi';
import getMassages from '@/services/get-prices';
import { Massage } from '@prisma/client';
import { BookMassageCard } from './book-massage-card';
import { CardSkeleton } from './card-skeleton';
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
  showAll: boolean;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChooseMassage: React.FC<Props> = ({ className, showAll, setShowAll }) => {
  const [massages, setMassages] = React.useState<Massage[]>([]);
  const [selectedMessage, setSelectedMessage] = React.useState<Massage | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const massages = await getMassages();
        setMassages(massages);
      } catch (error) {
        setIsError(true);
        console.error('Error while execution choose-massage.tsx/ChooseMassage:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const visibleMassages = showAll ? massages : massages.slice(0, 9);

  return (
    <div className={cn('mt-6 w-full', className)}>
      <div className="flex items-center gap-2">
        <FiMessageSquare color="#d34545" />
        <h3 className="text-[20px] font-medium">Оберіть масаж</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 gap-4 w-full mt-4">
        {isLoading
          ? [...Array(9)].map((_, i) => <CardSkeleton className="flex-1" key={i} />)
          : visibleMassages.map((massage, i) => (
              <BookMassageCard
                name="massageType"
                key={massage.id}
                massage={massage}
                isSelected={selectedMessage?.id === massage.id}
                onSelect={() => setSelectedMessage(massage)}
                className={cn(!showAll && i > 3 ? 'hidden sm:block' : '')}
              />
            ))}
      </div>

      {isError && <h3>Помилка при завантаженні данних</h3>}

      {!isLoading && massages.length > 6 && (
        <div className="flex justify-center mt-6">
          <Button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="text-white bg-[#d34545] hover:bg-[#c14142]"
          >
            {showAll ? 'Показати менше' : 'Показати більше'}
          </Button>
        </div>
      )}
    </div>
  );
};
