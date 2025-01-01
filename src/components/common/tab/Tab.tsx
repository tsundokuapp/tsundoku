import React from 'react';

import { TabProps } from './Tab.d';

export const Tab = ({
  title,
  children,
  eventKey,
  disabled,
  id,
  alert,
}: TabProps) => {
  return React.cloneElement(children as React.ReactElement, {
    title,
    eventKey,
    disabled,
    id,
    alert,
  });
};
