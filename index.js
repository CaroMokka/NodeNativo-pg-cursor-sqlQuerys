import { createServer } from "http";
import url from "url";
import {
  obtenerActoresConFilms,
  obtenerFilmsConIdiomas,
  obtenerPeliculasConCategoria,
} from "./database.js";

const port = 3000;

createServer(async (req, res) => {
  const url_parse = url.parse(req.url, true);
  const path = url_parse.pathname;
  const method = req.method;

  if (method == "GET" ) {
      if(path == "/actores/peliculas"){
        const result = await obtenerActoresConFilms();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "Listado de actores con sus respectivos films",
          data: result,
        })
      )
      }
      
  }
}).listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));