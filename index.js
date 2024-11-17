import { createServer } from "http";
import url from "url";
import {
  obtenerActoresConFilms,
  obtenerPeliculasConCategoria,
  obtenerFilmsConIdiomas,
} from "./database.js";

const port = 3000;

createServer(async (req, res) => {
  const url_parse = url.parse(req.url, true);
  const path = url_parse.pathname;
  const method = req.method;

  res.writeHead(200, { "Content-Type": "application/json" });

  if (method == "GET") {
    if (path == "/actores/peliculas") {
      const result = await obtenerActoresConFilms();
      return res.end(
        JSON.stringify({
          message: "Listado de actores con sus respectivos films",
          data: result,
        })
      );
    }
    if (path == "/peliculas/categorias") {
      const result = await obtenerPeliculasConCategoria();
      return res.end(
        JSON.stringify({
          message: "Listado de películas con categorías",
          data: result,
        })
      );
    }
    if(path == "/peliculas/idiomas"){
      const result = (await obtenerFilmsConIdiomas()).flat()
      return res.end(JSON.stringify({ message: "Listado de películas con su respectivo idioma", data: result }))
    }
  }
}).listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
