import { PinBox } from "./styles";

// size: 1 = small, 2 = medium, 3 = large
interface IPinProps {
  size: "small" | "medium" | "large" | string;
  src: string;
  description?: string;
  id?: number;
  position: string;
  member: string;
  favorites: string;
  bio: string;
}

export const Pin = ({
  size,
  src,
  description,
  id,
  position,
  member,
  favorites,
  bio,
}: IPinProps) => {
  return (
    <PinBox size={size}>
      <img src={src} alt="teste" />
      <div>
        <strong>{position}</strong>
        <strong>{member}</strong>
      </div>
    </PinBox>
  );
};

// onClick={() => handleSetModal(src, description, title, id)}
