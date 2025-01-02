import { Accordion } from '@/components/common/Accordion';

export const Volumes = () => {
  return (
    <div className="flex flex-col gap-4">
      <Accordion title="Volume 01" className="dark:bg-bgDark" classNameItems="hover:dark:bg-hoverBgDark">
        <h1>vish</h1>
        <h1>vis2</h1>
        <h1>vis2</h1>
        <h1>vis2</h1>
        <h1>vis2</h1>
      </Accordion>
    </div>
  );
};
