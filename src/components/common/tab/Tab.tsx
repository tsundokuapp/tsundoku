import React from 'react';

import { ITab } from '@/types/Tab';

export const Tab = ({
  title,
  children,
  eventKey,
  disabled,
  id,
  alert,
}: ITab) => {
  return React.cloneElement(children as React.ReactElement, {
    title,
    eventKey,
    disabled,
    id,
    alert,
  });
};
