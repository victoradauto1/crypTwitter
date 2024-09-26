"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import { doLogin } from "../services/web3Services"
import { useState, useEffect } from "react";


export default function Home() {

  const [message, setMessage] = useState(" ");

  useEffect(() => {
    document.title = "CrypTwitter | Login";
  }, []);

  function btnLoginClick(){
    setMessage("Conectando com a MetaMask... Aguarde...")
    doLogin()
      .then((wallet) => {
        setMessage(`Conectado com a carteira: ${wallet}`); 
      })
      .catch((err) => {
        console.error(err);
        setMessage("Erro ao conectar com a MetaMask. Tente novamente.");
      });
  };

  return (
    <>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="/images/twitterPoster.jpg" className="d-block mx-l-auto img-fluid" width="700" height="500" />
          </div>
          <div className="col-lg-6 ">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">CrypTwitter</h1>
            <p className="lead">Sua rede social descentralizada.</p>
            <p className="lead mb-3">Autentique-se com suas carteiras, escreva suas mensagens e saiba o que está acontecendo no mundo aonde você estiver! </p>
            <div className="d-grid d-md-flex justify-content-md-start">
                <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={btnLoginClick}>
                  <img src="/images/MetaMask_Fox.svg.png" width="64" className="me-3"/>
                  Conectar com a MetaMask
                </button>
            </div>
            <p className="message">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}
