import { Container } from "@mui/material";
import Footer from "./components/Footer";
import TestGrid from "./components/TestGrid";

export default function App() {
  return (
    <>
      <div className="content">
        <Container maxWidth="sm">
         <TestGrid />
        </Container>
      </div>
      <Footer />
    </>
  )
}