import react, { useState, useRef, useEffect } from "react";
import Card from "./Card.tsx";
import { NavLink } from "react-router-dom";
import Modal from "./Modal.tsx";
import axios from "axios";

interface NavbarProps {
  logo: string;
  tabs: {
    label: string;
    path: string;
  }[];
}
function Main({ tabs }: NavbarProps) {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=AIzaSyCS4ROvsyMQFPbHWyf2w4iRLivX36cohSQ" +
            "&maxResults=40"
        )
        .then((res) => setData(res.data.items))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=Money&key=AIzaSyCS4ROvsyMQFPbHWyf2w4iRLivX36cohSQ"
      )
      .then((response) => {
        setBooks(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <img src="./images/prishaPolicy.png" alt="example" className="logo" />
        </div>
        <div className="menu-link ">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">Favourites</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="search">
        <input
          type="text"
          placeholder="Enter Your Book Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={searchBook}
        />
        <button>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="container">{<Card book={bookData} />}</div>
      <div>
        {books.map((item) => {
          let thumbnail =
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail;

          if (thumbnail != undefined) {
            return (
              <>
                <div
                  className="card"
                  onClick={() => {
                    setShow(true);
                    setItem(item);
                  }}
                >
                  <img src={thumbnail} alt="" />
                  <div className="bottom">
                    <h3 className="title">{item.volumeInfo.title}</h3>
                  </div>
                </div>
                <Modal
                  show={show}
                  item={bookItem}
                  onClose={() => setShow(false)}
                />
              </>
            );
          }
        })}
      </div>
    </>
  );
}
export default Main;
