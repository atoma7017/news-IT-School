import React from "react";
import BootstrapPagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import "./Pagination.css";

function Pagination(props) {
  //componenta va primi ca prop-uri numarul paginii care este activa, precum si url-ul catre care redirecteaza la click pe noua pagina
  let { active, baseUrl } = props;

  //folosim hook-ul useNavigate
  let navigate = useNavigate();

  //daca nu am primit nici o valoare pt prop ul active, inseamna ca pagina 1 este activa
  if (!active) {
    active = 1;
  }
  let items = [];
  for (let number = 1; number <= 5; number++) {
    //vom avea 5 componente de tip BootstrapPagination.Item
    //impingem chestii intr un array gol cu push
    items.push(
      <BootstrapPagination.Item
        key={number}
        //prop-ul active va avea valoarea true daca pagina curenta este cea activa
        active={number === Number(active)}
        //daca pagina este activa, ii adaugam un id pentru stilizare, adica suprascrierea stilizarii de la Bootstrap
        id={active ? "pagination-active" : null}
        onClick={() => {
          //la click pe buton, navigam catre noua pagina
          navigate(`${baseUrl}?page=${number}`);
          //si scrolam inapoi in varful paginii
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        {number}
      </BootstrapPagination.Item>
    );
  }
  return (
    <div>
      {/* pe ecran afisam itemii paginatiei, impachetati de componenta BootstrapPagination */}
      <BootstrapPagination className="Pagination">{items}</BootstrapPagination>
    </div>
  );
}

export default Pagination;
