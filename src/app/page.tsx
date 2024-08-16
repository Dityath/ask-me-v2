"use client"

import supabase from "@/hooks/supabaseCLient";
import { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState(0)
  const [message, setMessage] = useState("")
  const [modalSuccess, setModalSuccess] = useState(false)
  const [modalError, setModalError] = useState(false)
  const [modalErrorMsg, setModalErrorMsg] = useState("")

  const handleMessageChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    const truncatedValue = value.slice(0, 400);
    setNumber(truncatedValue.length);
    setMessage(truncatedValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const now = new Date()

    try {
      const { data, error } = await supabase.from('Question').insert([{ content: message, updatedAt: now }]);

      if (error) {
        console.error('Error inserting question:', error);
      } else {
        console.log('Question inserted successfully:', data);
        setModalSuccess(true)
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setModalError(true)
      setModalErrorMsg(JSON.stringify(error))
    }
  };

  return (
    <>
      {modalSuccess && (
        <div className="absolute flex justify-center items-center w-screen h-screen z-50 bg-black/80">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Question sent!</h3>
            <button className="mt-10 btn btn-primary"
              onClick={() => {
                setModalSuccess(false)
                setNumber(0)
                setMessage("")
              }}>close</button>
          </div>
        </div>
      )}

      {modalError && (
        <div className="absolute flex justify-center items-center w-screen h-screen z-50 bg-black/80">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Error Sending Question!</h3>
            <p>{modalErrorMsg}</p>
            <button className="mt-10 btn btn-primary"
              onClick={() => {
                setModalError(false)
                setModalErrorMsg("")
              }}>close</button>
          </div>
        </div>
      )}

      <div className={"h-screen w-full flex justify-center items-center"}>
        <form onSubmit={handleSubmit} className={"w-full max-w-xl"}>
          <h1>Ask me something</h1>
          <div className="relative">
            <textarea
              required={true}
              placeholder="Your message here..."
              className="textarea textarea-bordered min-h-[200px] max-h-[300px] w-full text-sm"
              onChange={handleMessageChange}
              value={message}
            ></textarea>
            <p
              className={`absolute right-5 bottom-5 ${number >= 390 ? "text-error" : ""
                }`}
            >
              {number}
              {number >= 400 ? " (Maximum)" : null}
            </p>
          </div>
          <button type="submit" className="btn btn-primary mt-2">Ask me</button>
        </form>
      </div>
    </>
  );
}
