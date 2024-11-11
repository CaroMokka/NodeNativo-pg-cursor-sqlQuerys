import pkg from "pg";

const { Client } = pkg;
const { Pool } = pkg;

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
// async function obtenerActoresConFilms() {
//   client.connect();
//   try {
//     const res = await client.query(`
//         SELECT 
//         a.actor_id,
//         a.first_name || ' ' || a.last_name AS actor_name,
//         f.title AS film_title,
//         f.release_year
//         FROM 
//         actor AS a
//         JOIN 
//         film_actor AS fa ON a.actor_id = fa.actor_id
//         JOIN 
//         film AS f ON fa.film_id = f.film_id
//         ORDER BY 
//         a.actor_id, f.release_year;
//         `);
//     console.log(res.rows);
//   } catch (err) {
//     console.error("Error al ejecutar la consulta:", err);
//   } finally {
//     await client.end();
//   }
// }
//obtenerActoresConFilms()
 
//REQUERIMIENTO - 2
// async function obtenerPeliculasConCategoria() {
//   try {
//     const res = await pool.query(`
//         SELECT 
//         f.film_id,
//         f.title AS film_title,
//         c.name AS category_name
//         FROM 
//         film AS f
//         JOIN 
//         film_category AS fc ON f.film_id = fc.film_id
//         JOIN 
//         category AS c ON fc.category_id = c.category_id
//         ORDER BY 
//         f.title, c.name;
//         `);
//     console.log(res.rows);
//   } catch (err) {
//     console.error("Error al ejecutar la consulta:", err);
//   }
// }
// obtenerPeliculasConCategoria()

//REQUERIMIENTO - 3
