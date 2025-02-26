import React, { ReactElement, useState, useCallback } from 'react';

import { ITab } from '@/@types/Tab';
import { cn } from '@/helpers/twUtils';

interface CustomChildrenProps extends ReactElement, ITab {
  /* Nada */
}

interface INavTabs {
  defaultActiveKey: string | number;
  children: ReactElement | ReactElement[] | CustomChildrenProps[];
  fill?: boolean;
}

type TabItemProps = Omit<CustomChildrenProps, 'children' | 'type' | 'props'> & {
  tabIndex: number;
  alert?: boolean;
};

export const NavTabs = ({ defaultActiveKey, children, fill }: INavTabs) => {
  const [activeKey, setActiveKey] = useState<string | number>(defaultActiveKey);

  const handleActiveTab = useCallback((key: string | number) => {
    setActiveKey(key);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, key: string | number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveKey(key);
      }
    },
    [],
  );

  const Tab = ({
    title,
    eventKey,
    disabled,
    tabIndex,
    id,
    alert = false,
  }: TabItemProps) => {
    const isActive = eventKey === activeKey;

    return (
      <a
        id={id}
        className={cn(
          'hover:border-primary relative mb-[-1px] box-border block h-[40px] items-center justify-center rounded-t-md border border-slate-900 px-4 py-2 transition hover:cursor-pointer hover:no-underline',
          {
            'text-primary border-b-slate-100 font-bold dark:border-b-slate-800':
              isActive,
            'pointer-events-none border-transparent text-slate-500 hover:cursor-not-allowed':
              disabled,
            'flex-1 text-center': fill,
          },
        )}
        onClick={() => handleActiveTab(eventKey)}
        tabIndex={tabIndex}
        onKeyDown={(e) => handleKeyDown(e, eventKey)}
      >
        {alert && (
          <>
            <div
              className={cn(
                'bg-error absolute right-[-1px] top-[-1px] h-2 w-2 animate-ping rounded',
              )}
            />
            <div
              className={cn(
                'bg-error absolute right-[-1px] top-[-1px] h-2 w-2 rounded',
              )}
            />
          </>
        )}
        {title}
      </a>
    );
  };

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div>
      <nav
        className={cn(
          'mb-2 mt-2 flex list-none flex-wrap justify-start border border-transparent border-b-slate-900 pl-0',
        )}
      >
        {childrenArray.map((child, index) => {
          return (
            <Tab
              tabIndex={index}
              key={child.props.eventKey}
              eventKey={child.props.eventKey}
              title={child.props.title}
              disabled={child.props.disabled}
              id={child.props.id}
              alert={child.props.alert}
            />
          );
        })}
      </nav>
      <div>
        {childrenArray.map((child) => {
          const { eventKey, children } = child.props;
          return (
            <div
              key={eventKey}
              className={cn('', {
                'hidden flex-1': eventKey !== activeKey,
              })}
            >
              {children}
            </div>
          );
        })}
      </div>
    </div>
  );
};
