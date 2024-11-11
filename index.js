import pkg from "pg";

const { Client } = pkg;

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "dvdrental",
  port: 5432,
});

//Requerimiento - 1
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
        console.log(res.rows)
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err.stack);
  } finally {
      await client.end()
  }
}
obtenerActoresConFilms()