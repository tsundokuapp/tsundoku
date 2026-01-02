export interface ITab {
  title: string | React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
  eventKey: string | number;
  disabled?: boolean;
  id?: string;
  alert?: boolean;
}
