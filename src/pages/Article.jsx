import { useContext, useEffect, useState } from "react"
import React from "react"
import "../css/article.css";
import { Link } from "react-router-dom"
import { Loading } from "../components/Loading";
import notifyNoEvents from "../assets/notify no events.svg";
import { Navbar } from "../components/Navbar";
import { LoginContext } from "../context/LoginProvider";
import { ArticlesContext } from "../context/ArticlesProvider";
import Footer from "../components/Footer";

export const Article = () => {
    // const [articles, setArticles] = useState([])
    const {articles, setArticles} = useContext(ArticlesContext)
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    // const imgUrl = "../assets/"

    const {isLogin, setIsLogin} = useContext(LoginContext)

    if (isLogin) {
        document.body.style.backgroundColor = "white";
    } else {
        document.body.style.backgroundColor = "white";
    }

    useEffect(() => {
        document.title = "Loading.."
        
        const loadData = async () => {
            try {
                const url = "https://644e5c2c4e86e9a4d8f6d279.mockapi.io/article"
                const response = await fetch(url)
                const data = await response.json()

                setArticles(data)
            } catch (error) {
                console.log("error: " + error);
            }
            
            setTimeout(() => {
                setIsLoading(false)
                document.title = "EarthCare | Articles"
            }, 2000)
        }


        loadData()

        // fetch("https://644e5c2c4e86e9a4d8f6d279.mockapi.io/article")
        // .then(response => response.json())
        // .then((result) => {
        //     setArticles(result)
        //     setTimeout(() => {
        //         setIsLoading(false)
        //     }, 2000)
        // })
        // .catch((error) => {
        //     console.log("error: " + error);
        // })
    }, [])

    // Search events
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredArticles = articles.filter((e) => {
    return e.titleArticle.toLowerCase().includes(search.toLowerCase());
  });

    return (
        <>
            <Navbar />
            {isLoading ? (
                // <span>Loading...</span>
                <Loading />
            ) : (
                
                <main id="article">
                    <div className="container-fluid mt-5" id="article-content">
                        <div className="row mx-3 mb-4 d-flex justify-content-center align-items-center">
                            <div className="col-lg-8 title-articles">
                                <h2 className="fw-bold">Blog, Postingan, dan Artikel</h2>
                                <p className="mb-3">
                                    Blog, Postingan, dan Artikel yang mungkin relevan untuk Anda baca
                                </p>
                            </div>
                            <div className="col-lg-4 search-articles">
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg py-lg-2 py-1 shadow-none" 
                                        name="search"
                                        id="searchArticle"
                                        placeholder="Search"
                                        aria-label="search articles"
                                        autoComplete="off"
                                        value={search}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                        </div>
                        {filteredArticles.length === 0 ? (
                            <div className="notify d-flex justify-content-center align-items-center flex-column">
                                <img src={notifyNoEvents} alt="events tidak ditemukan" />
                                <p className="d-flex text-center">No articles found</p>
                            </div>
                        ) : (
                            filteredArticles.map((data,index) => (
                                <div className="row mx-3 mb-4" key={index}>
                                    <div className="col-lg-6">
                                        <img src={data.image} className="img-fluid my-2 me-4 rounded-3" alt={data.titleArticle} />
                                    </div>
                                    <div className="col-lg-6 ps-lg-5 d-flex flex-column justify-content-center">
                                        <h2 className="fw-semibold">{data.titleArticle}</h2>
                                        <p>{data.description}</p>
                                        <div className="date-article mb-4">
                                            <i className="fa-solid fa-calendar-days text-muted fa-lg"></i>
                                            <p className="d-inline text-muted ms-1">{data.datePost}</p>
                                        </div>
                                        <div className="button-more">
                                            <Link to={`/detailArticle/:${data.id}?id=${data.id}`} 
                                                className="btn btn-primary border-0 px-3 py-2" 
                                                id="btnSelengkapnya">
                                                    Selengkapnya
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <Footer/>
                </main>
            )}
        </>
    )
}