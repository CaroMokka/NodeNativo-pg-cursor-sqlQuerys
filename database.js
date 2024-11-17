import pkg from "pg";
import Cursor from "pg-cursor";

const { Client, Pool } = pkg;

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "dvdrental",
  port: 5432,
});

// const pool = new Pool({
//   user: "postgres",
//   password: "postgres",
//   host: "localhost",
//   database: "dvdrental",
//   port: 5432,
//   idleTimeoutMillis: 3_000,
// });

//REQUERIMIENTO - 1
async function obtenerActoresConFilms() {
  client.connect();
  try {
    const res = await client.query(`
        SELECT
        a.actor_id,
        a.first_name || ' ' || a.last_name AS actor_name,
        f.title AS film_title,
        f.release_year
        FROM
        actor AS a
        JOIN
        film_actor AS fa ON a.actor_id = fa.actor_id
        JOIN
        film AS f ON fa.film_id = f.film_id
        ORDER BY
        a.actor_id, f.release_year;
        `);
        return res.rows
    
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
  } finally {
    await client.end();
  }
}

//REQUERIMIENTO - 2
async function obtenerPeliculasConCategoria() {
  try {
    const res = await pool.query(`
        SELECT
        f.film_id,
        f.title AS film_title,
        c.name AS category_name
        FROM
        film AS f
        JOIN
        film_category AS fc ON f.film_id = fc.film_id
        JOIN
        category AS c ON fc.category_id = c.category_id
        ORDER BY
        f.title, c.name;
        `);
    console.log(res.rows);
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
  }
}

//REQUERIMIENTO - 3 (uso de cursores)

async function obtenerFilmsConIdiomas() {
  await client.connect();
 
    const query = `
        SELECT 
        f.film_id,
        f.title AS film_title,
        l.name AS language_name
        FROM 
        film AS f
        JOIN 
        language AS l ON f.language_id = l.language_id
        ORDER BY 
        f.title;
        `;

    const cursorQuery = client.query(new Cursor(query));
    async function lecturaCursor(cantidad) {
      return new Promise((resolve, reject) => {
        cursorQuery.read(cantidad, (err, rows) => {
          if (err) {
            reject(
              console.error(`Error de lectura de ${cantidad} filas: ${err}`)
            );
          } else {
            resolve(rows);
          }
        });
      });
    }
    try {
    const rows1 = await lecturaCursor(10);
    console.log("Primera lectura de filas:", rows1);
    if (rows1.length > 0) {
      const rows2 = await lecturaCursor(5);
      console.log("Segunda lectura de filas:", rows2);
      if (rows2.length > 0) {
        const rows3 = await lecturaCursor(20);
        console.log("Tercera lectura de filas:", rows3);
      } else {
        console.log("No hay suficientes filas para una tercera lectura");
      }
    } else {
      console.log("No hay suficientes filas para una segunda lectura");
    }
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
  } finally {
      cursorQuery.close(() => {
          client.end()
      })
  }
}

export {obtenerActoresConFilms, obtenerPeliculasConCategoria, obtenerFilmsConIdiomas}
