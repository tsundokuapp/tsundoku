import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { useRef, useState } from 'react';

import { useEditorStore } from '@/features/editor/store/useEditorStore';

interface IMarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: IMarkerProps) => {
  return (
    <div
      className="group absolute top-0 z-[5] -ml-2 h-full w-4 cursor-ew-resize"
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <CaretDown
        weight="fill"
        className="absolute left-1/2 top-0 h-full -translate-x-1/2 transform fill-blue-500"
      />
      <div
        className="absolute left-1/2 top-4 -translate-x-1/2 transform transition-opacity"
        style={{
          height: '100vh',
          width: '1px',
          transform: 'scaleX(0.5)',
          backgroundColor: '#3B72f6',
          display: isDragging ? 'block' : 'none',
        }}
      />
    </div>
  );
};

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
  const { margin, setMargin } = useEditorStore();
  const [isDraggingLeft, setIsDraggingLeft] = useState<boolean>(false);
  const [isDraggingRight, setIsDraggingRight] = useState<boolean>(false);
  const rulerRef = useRef<HTMLDivElement | null>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };
  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const PAGE_WIDTH = 816;
    const MINIMUM_SPACE = 100;

    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector('#ruler-container');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = event.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - margin.right - MINIMUM_SPACE;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setMargin({
            left: newLeftPosition,
            right: margin.right ?? 56,
          });
        } else if (isDraggingRight) {
          const maxRightPosition =
            PAGE_WIDTH - (margin.left ?? 56 + MINIMUM_SPACE);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition,
          );
          setMargin({
            left: margin.left ?? 56,
            right: constrainedRightPosition,
          });
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setMargin({ ...margin, left: 56 });
  };

  const handleRightDoubleClick = () => {
    setMargin({ ...margin, right: 56 });
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative mx-auto flex h-6 w-[816px] select-none items-center border-b border-gray-300 print:hidden"
    >
      <div id="ruler-container" className="relative h-full w-full">
        <Marker
          position={margin.left ?? 56}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={margin.right ?? 56}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;
              return (
                <div
                  className="absolute bottom-0"
                  key={marker}
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 h-2 w-[1px] bg-neutral-500" />
                      <span className="absolute bottom-2 -translate-x-1/2 transform text-[10px] text-neutral-500">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 h-1.5 w-[1px] bg-neutral-500" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 h-1 w-[1px] bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
