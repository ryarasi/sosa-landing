'use client';

import React from 'react';
import Link from 'next/link';
import { BentoGridItem } from './bento-grid';

interface ClickableBentoItemProps {
  href: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  header: React.ReactNode;
  className?: string;
  external?: boolean;
}

export const ClickableBentoItem = ({ 
  href, 
  title, 
  description, 
  header, 
  className,
  external = false 
}: ClickableBentoItemProps) => {
  const content = (
    <BentoGridItem
      title={title}
      description={description}
      header={header}
      className={`cursor-pointer hover:scale-[1.02] transition-transform duration-200 ${className}`}
    />
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href}>
      {content}
    </Link>
  );
};