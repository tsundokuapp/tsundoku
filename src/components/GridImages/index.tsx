import { DataStaffs } from "@/constants/DataStaff";

import { Pin } from "./Pin";
import { Container } from "./styles";

export const GridImages = () => {
  const data = DataStaffs(20);

  return (
    <Container>
      {data.map((staff) => (
        <Pin
          key={staff.id}
          id={staff.id}
          src={staff.image}
          size={staff.size}
          position={staff.position}
          member={staff.member}
          favorites={staff.favorites}
          bio={staff.bio}
        />
      ))}
    </Container>
  );
};
