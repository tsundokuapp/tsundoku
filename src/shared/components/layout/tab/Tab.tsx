import React from 'react';

export interface ITab {
  title: string | React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
  eventKey: string | number;
  disabled?: boolean;
  id?: string;
  alert?: boolean;
}

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
