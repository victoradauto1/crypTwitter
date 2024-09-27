"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addTweet, changeUserName } from "@/services/web3Services"

export default function NewTweet() {
    const { push } = useRouter();

  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  function bntPublishClick(){
    setMessage("Enviando seu tweet para a blockchain...Aguarde...")
    addTweet(text)
        .then(result =>{
            setText("");
            setMessage("O tweet foi enviado com sucesso, aguarde um momento a atualização do sistema.")
        } 
     )
        .catch(err => setMessage(`Erro ao enviar o tweet: ${err.message}`));
    
  }

  useEffect(()=>{
    const wallet = localStorage.getItem("wallet")
    if(!wallet) push("/")
  },[])

  return (
    <>
      <div className="top">
        <div className="left">
          <img src="images/Logo_of_Twitter.svg.png" className="brand" />
        </div>
        <h1>Bem vindo de volta!</h1>
        <p>O que está acontecendo?</p>
        <textarea className="form-control my-3" value={text} onChange={(e)=>setText(e.target.value)}></textarea>
        <div>
          <input type="button" className="btn btn-primary" value="enviar" onClick={bntPublishClick}/>
          <span className="message" value={message}>{message}</span>
        </div>
      </div>
    </>
  );
}
