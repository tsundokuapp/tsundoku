interface INotificationProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  description: string;
  onClose: () => void;
  onMore: () => void;
}

export const Notification = ({
  type,
  title,
  description,
  onClose,
  onMore,
}: INotificationProps) => {
  return (
    <div>
      <h1>Notification</h1>
    </div>
  );
};
