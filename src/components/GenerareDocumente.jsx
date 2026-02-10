import React, { useEffect, useState } from "react";
import { API_BASE_URL, apiClient } from "../apiClient";
import './GenerareDocumente.css'


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
      
      const dataPentruApi = {
         CNP: formData.cnp,
         dosar: formData.dosar,
         tipDocumentId: formData.tipDocumentId
      }

      try {
         const response = await apiClient.get(`${API_BASE_URL}api/DescarcaDocument`,
               dataPentruApi
         );
          alert('Document descarcat cu succes!');
      } catch (error) {
      console.error('Eroare completă:', error);
      console.error('Response data:', error.response?.data);
      
      if (error.response?.data) {
        const errorDetails = error.response.data;
        
        if (errorDetails.errors) {
          const errorsText = Object.entries(errorDetails.errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
          alert(`Erori de validare:\n${errorsText}`);
        } else {
          const msg = errorDetails?.title || errorDetails?.message || JSON.stringify(errorDetails);
          alert(`Eroare: ${msg}`);
        }
      } else {
        alert(`Eroare: ${error.message}`);
      }
    }
  };

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
   };

  return (
  <div className="page-container">
    <div className="document-card">
      <h1 className="page-title">GENERARE DOCUMENTE</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Identificator CNP</label>
          <input
            type="text"
            name="cnp"
            className="input-field"
            placeholder="Introduceți CNP..."
            value={formData.cnp}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Număr Dosar / Lucrare</label>
          <input
            type="text"
            name="dosar"
            className="input-field"
            placeholder="Format: XXX/P/202X"
            value={formData.dosar}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Tipologie Document</label>
          <select
            name="tipDocumentId"
            className="input-field"
            value={formData.tipDocumentId}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Selectați tipul --</option>
            {nomTipDoc.map((tip) => (
              <option key={tip.id} value={tip.id} style={{background: '#160828'}}>
                {tip.nume}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-submit">
          DESCARCĂ DOCUMENTUL [EXE]
        </button>
      </form>
    </div>
  </div>
);
};
