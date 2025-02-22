import { useContext, useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarker,
  FaClock,
  FaTicketAlt,
  FaUserAlt,
  FaArrowLeft,
} from "react-icons/fa";
import "../css/detail-events.css";
import { Loading } from "../components/Loading";
import { Navbar } from "../components/Navbar";
import { LoginContext } from "../context/LoginProvider";
import Footer from "../components/Footer";

export default function DetailEvents() {
  const { id } = useParams();
  const [detailEvents, setDetailEvents] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [registerClose, setRegisterClose] = useState(false);

  const { isLogin, setIsLogin } = useContext(LoginContext);

  if (isLogin) {
    document.body.style.backgroundColor = "white";
  } else {
    document.body.style.backgroundColor = "white";
  }

  useEffect(() => {
    document.title = "Loading..";
    fetchDetailEvents();
  }, []);

  const fetchDetailEvents = async () => {
    try {
      const res = await fetch(
        `https://644dfece4e86e9a4d8ef004c.mockapi.io/detail-events/${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to access data detail events");
      }
      const data = await res.json();
      setDetailEvents(data);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      // Check register event end
      const registerDate = new Date(data.tanggal);
      const currentDate = new Date();
      if (currentDate > registerDate) {
        setRegisterClose(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // if (isLoading) {
  //   return <p className="loading">Loading....</p>;
  // }

  // Test sweet alert
  // const MySwal = withReactContent(Swal);
  // const handleClick = () => {
  //   MySwal.fire({
  //     icon: "error",
  //     title: "Oops...",
  //     text: "Something went wrong!",
  //   });
  // };

  return (
    <>
      {(document.title = `${detailEvents.judul}`)}
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
        <div className="detail__events d-flex justify-content-center align-items-center">
          <main className="d-flex container mx-5">
            <Row>
              <Col md={6} lg={8}>
                <div className="card__image">
                  <img
                    className="img-fluid mt-5"
                    src={detailEvents.gambar}
                    alt="ilustrasi detail events"
                  />
                  <h3 className="mt-3 mb-1">Detail Events</h3>
                  <hr color="black" />
                  <p>{detailEvents.detail}</p>
                  <Link className="btn btn-dark" to={"/event"}>
                    <FaArrowLeft /> Kembali ke halaman event
                  </Link>
                </div>
              </Col>

              <Col md={6} lg={4}>
                <Card className="bg-white shadow card card__detail p-2 mt-lg-5 mt-md-5">
                  <div className="card-body">
                    <h4 className="card-title mb-2">{detailEvents.judul}</h4>
                    <Badge bg="success me-2 mb-3">Lingkungan</Badge>
                    <Badge bg="success">Events</Badge>
                    <div className="date-detail mb-3 mt-3">
                      <FaCalendarAlt />
                      <p className="d-inline text-muted ms-3">
                        {detailEvents.tanggal}
                      </p>
                    </div>
                    <div className="time-detail mb-3">
                      <FaClock />
                      <p className="d-inline text-muted ms-3">
                        {detailEvents.waktu}
                      </p>
                    </div>
                    <div className="ticket-detail mb-3">
                      <FaTicketAlt />
                      <p className="d-inline text-muted ms-3">
                        {detailEvents.tiket}
                      </p>
                    </div>
                    <div className="location-detail mb-3">
                      <FaMapMarker />
                      <p className="d-inline text-muted ms-3">
                        {detailEvents.lokasi}
                      </p>
                    </div>
                    <div className="registration-detail mb-3">
                      <FaUserAlt />
                      <p className="d-inline text-muted ms-3">
                        {detailEvents.pembuat}
                      </p>
                    </div>
                    <div className="d-grid mt-4 btn-detail-event">
                      {/* <button className="btn btn-primary">
                        Daftar Event
                      </button> */}
                      {/* <Link
                        className="btn btn-primary"
                        to={`/daftarevents/${id}`}
                        onClick={
                          registerClose ? (e) => e.preventDefault() : null
                        }
                      >
                        {registerClose
                          ? "Pendaftaran Ditutup"
                          : "Pesan Sekarang"}
                      </Link> */}

                      {registerClose ? (
                        <button className="btn btn-primary" disabled>
                          Pendaftaran Ditutup
                        </button>
                      ) : (
                        <Link
                          className="btn btn-primary"
                          to={`/daftarevents/${id}`}
                        >
                            Ikuti Event
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </main>
        </div>
          <Footer/>
        </div>
      )}
    </>
  );
}
