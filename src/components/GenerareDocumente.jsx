import React, { useEffect, useState } from "react";


export default function GenerareDocumente(){

   const [formData, setFormData] = useState({
    cnp: '',
    dosar: '',
    tipDocumentId: ''
   })

   const [nomTipDoc, setNomTipDoc] = useState([]);

   useEffect(() => {
      incarcaNomTipulDocumentelor();
   }, []);

   const incarcaNomTipulDocumentelor = async () => {
      try {
      const response = await apiClient.get(`${API_BASE_URL}api/NTipDocument`);

      setNomTipDoc(response.data); 
   } catch (error) {
      console.error("Eroare la încărcarea nomenclatorului:", error);
   }};
   

   const handleSubmit = async (e) => {
   e.preventDefault();
    if(!formData.cnp ?? "" === ""){
      alert("Trebuie introdus un CNP valid");
      return;
    }

    if(!formData.dosar ?? "" === ""){
      alert("Trebuie introdus un numar de lucrare/dosar penal!")
      return;
    }

    if(!formData.tipDocumentId ?? "" === ""){
      alert("Trebuie introdus Tipul de document");
      return;
      }
      
    
   }

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
   };

   return(
    <div className="page-container">
      <h1>Generare Documente</h1>
      <div>
         <form onSubmit={handleSubmit}>

         </form>
      </div>
    </div>
   )
}