import { Navbar } from "@/components/Admin/Heading/Navbar";
import LayoutAdminMain from "@/components/Layouts/Admin/Main";
import { Container, Titulo } from "./style";

const DashBoard = () => {
  return (
    <LayoutAdminMain>
      <Navbar
        title="Dashboard"
        placeholderSearchbox=""
        showSearhBox={false}
        titleLinkNavigation=""
        showLinkNavigation={false}
        urlLinkNavigation="#"
        icon=""
      />
      <Container>
        <Titulo>Dashboard</Titulo>
      </Container>
    </LayoutAdminMain>
  );
};

export default DashBoard;
