import React from 'react';
import ApplicationLogoSVG from '@/assets/svg/ApplicationLogo.svg';
import Icon from '@/Components/Icons/Icon';
export default function ApplicationLogo({className}) {
  return <Icon src={ApplicationLogoSVG} className={className} />;
}
