import {Link} from '@inertiajs/inertia-react';
import React from 'react';
import MoreIcon from '@/Components/Icons/MoreIcon';

export default function ContentHeader({title, href = null}) {
  return (
    <div className={'flex flex-row justify-between pb-1'}>
      <div className={'text-xl font-bold'}>{title}</div>
      {href !== null ? (
        <Link href={href} className={'rounded-lg hover:bg-gray p-1'}>
          <MoreIcon svgClassName={'text-black'} />
        </Link>
      ) : (
        ''
      )}
    </div>
  );
}
