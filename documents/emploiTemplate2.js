module.exports = ({ corpsemploi, designation }) => {
    const today = new Date();
return `
    <!doctype html>
    <html>
       <head>
       <style>
       #emploi {
         font-family: Arial, Helvetica, sans-serif;
         border-collapse: collapse;
         width: 100%;
       }
       
       #emploi td, #emploi th {
         border: 1px solid #ddd;
         padding: 8px;
       }
       
       #emploi tr:nth-child(even){background-color: #f2f2f2;}
       
       #emploi tr:hover {background-color: #ddd;}
       
       #emploi th {
         padding-top: 12px;
         padding-bottom: 12px;
         text-align: left;
         background-color: #04AA6D;
         color: white;
       }
       </style>
       </head>

       <body>

      <div className="container">
      <h2>Emploi de ${designation}</h2>
      <div className="bd-example">
      <table className="table" id="emploi">
                
          <thead>
            <tr className="table-warning">
              <th scope="col">Jour</th>
              <th scope="col">Du 8h30 à 11h</th>
              <th scope="col">Du 11h à 13h30</th>
              <th scope="col">Du 13h30 à 16h</th>
              <th scope="col">Du 16h à 18h30</th>
            </tr>
          </thead>
         <tbody>
          ${corpsemploi}
          </tbody>
       </body>
</div>
</div>

    </html>
    `;
};