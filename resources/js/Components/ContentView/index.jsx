import ContentHeader from '@/Components/ContentView/ContentHeader';
import React from 'react';

export default function ContentView({
  className = '',
  children,
  title,
  moreHref = null,
}) {
  return (
    <div
      className={
        'bg-content flex flex-col text-xl font-bold justify-center p-6 my-3 mx-3 rounded-lg' +
        className
      }
    >
      <ContentHeader title={title} href={moreHref} />
      {children}
    </div>
  );
}
