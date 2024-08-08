import Container from "react-bootstrap/Container";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark">
      <Container>
        <p className="text-light text-center m-0 py-3">IT School România © {currentYear}. Toate drepturile rezervate.</p>
      </Container>
    </footer>
  );
}
//exportarea default inseamna sa o exporti o singura data. iar cand o importezi in alt fisier nu trebuie sa o importi ca o functi {Footer} se poate si simplu {footer} vezi ex acesta in Layout.jsx
export default Footer;
