import { useContext } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { getNewsDetails } from "../api/adaptors";
import Button from "react-bootstrap/Button";
import "./NewsDetails.css";
import { getFormattedDate } from "../utils/date";
import { addToFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";

function NewsDetails() {
  //extragem functia care modifica state-ul global
  const { favoritesDispatch } = useContext(FavoritesContext);
  //extrage, parametrul venit din URL
  let { newsId } = useParams();
  //vrem ca id-ul extras din URL sa contina /-urile asa il decodam
  newsId = decodeURIComponent(newsId);
  //genera, endpointurile pt detalii stiri
  const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);
  //cerem datele de la server
  const NewsDetails = useFetch(newsDetailsEndpoint);
  //adaptam datele de la server la datele de care au
  const adaptedNewsDetails = getNewsDetails(NewsDetails);

  //extragem campurile de interes din datele adaptate
  const { title, description, image, date, author, content } = adaptedNewsDetails;
  const formattedDate = getFormattedDate(date); //functie de formatare a datelor

  function handleAddToFavorites(product) {
    //adaufam actiunea de adaugare la favorite
    const actionResult = addToFavorites(product);
    //trimtiem rezultatul actiunii catre reducer
    favoritesDispatch(actionResult);
  }

  return (
    <Layout>
      <Container className="NewsDetails my-5">
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <h1 className="pt-3 mb-5">{title}</h1>
            <p className="fw-bold">{description}</p>
            <div dangerouslySetInnerHTML={{ __html: image }} className="mb-4"></div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fw-bold">
                <p>{author}</p>
                <p className="mb-0">{formattedDate}</p>
              </div>
              <Button
                onClick={() => {
                  //construim payload-ul actiunii si apelam functia care trimite actiunea catre reducer
                  handleAddToFavorites({
                    id: newsId,
                    title,
                    description,
                    hasCloseButton: true,
                  });
                }}
              >
                Adaugă la favorite
              </Button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default NewsDetails;
