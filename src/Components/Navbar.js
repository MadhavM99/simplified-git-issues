import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

function TextLinkExample() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand className= "fw-bold fs-large" style={{ color: "#238636" ,fontSize: "30px"}} href="#home">Simplified Github Issues</Navbar.Brand>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
