import { useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./NewsCard.css";
import { removeFromFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";

function NewsCard(props) {
  //extragem dispatch-ul care modifica state-ul aferent stirilor favorite.
  const { favoritesDispatch } = useContext(FavoritesContext);
  //extragem prop-urile componentei
  const { newsId, imgSrc, title, description, hasCloseButton } = props;

  function handleRemoveFromFavorites(id) {
    //apelam actiunea de stergere de la favorite
    const actionResult = removeFromFavorites(id);
    //trimitem rezultatul actiunii catre reducer.
    favoritesDispatch(actionResult);
  }

  return (
    <Card className="NewsCard h-100 d-flex flex-column justify-content-between align-items-center">
      {/* la click pe continutul cardului, suntem redirectati catre pagina de detalii */}
      {/* caracterul / din id il dreuteaza pe React Router, asa ca trebuie sa codificam */}
      <Link to={`/news/${encodeURIComponent(newsId)}`}>
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Link>
      {/* daca avem buton de eliminare de la favorite, il afisam */}
      {hasCloseButton && (
        <Button
          variant="light"
          onClick={() => {
            //pasam id-ul corespunzator functiei care actualizeaza lista de favorite
            handleRemoveFromFavorites(newsId);
          }}
        >
          <span className="material-icons text-dark">close</span>
        </Button>
      )}
    </Card>
  );
}

export default NewsCard;
