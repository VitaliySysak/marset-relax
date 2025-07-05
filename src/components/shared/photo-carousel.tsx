'use client';

import React from 'react';
import { Carousel, Card } from '@/components/ui/carousel';
import { carouselData } from '@/data/page-data';

export function PhotoCarousel() {
  const cards = carouselData.map((card, index) => <Card key={index} card={card} />);

  return (
    <div className="w-full h-full pt-20 ">
      <Carousel items={cards} />
    </div>
  );
}