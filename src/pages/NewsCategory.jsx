import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { getNewsList } from "../api/adaptors";
import NewsCardList from "../components/NewsCardList";
import Pagination from "../components/Pagination";

function NewsCategory() {
  //extragem parametrul venit din URL
  const { categoryId } = useParams();
  //extragem query (search param-ul  din URL)
  let [queryParams] = useSearchParams();
  let currentPage = queryParams.get("page");
  //daca nu avem query paramul in url, inseamna ca suntem pe prima pagina
  if (!currentPage) {
    currentPage = 1;
  }
  const newsCategoryEndpoint = getNewsCategoriesEndpoint(categoryId, currentPage);
  //fetch uim stirile categoriei
  const news = useFetch(newsCategoryEndpoint);

  //adaptam datele venite de la server pt componentele noastre de react
  const adaptedNewsList = getNewsList(news);

  //in functie de parametrul primit afisam titlul paginii
  let title = "";

  switch (categoryId) {
    case "technology":
      title = "Tech";
      break;
    case "football":
      title = "Fotbal";
      break;
    default:
      break;
  }

  return (
    <Layout>
      <Container className="my-5">
        <h1>{title}</h1>
        {/* afisam lista stirilor */}
        <NewsCardList newsList={adaptedNewsList} />
        {/* afisam paginatia */}
        <Pagination active={currentPage} baseUrl={`/category/${categoryId}`} />
      </Container>
    </Layout>
  );
}

export default NewsCategory;
