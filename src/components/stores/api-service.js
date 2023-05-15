import axios from "axios";

const host =
  "https://bestpricefirefire-default-rtdb.europe-west1.firebasedatabase.app/bestprice.json";

function llamadaAPI(method, body, path) {
  let config = {
    method: method ?? "get",
    maxBodyLength: Infinity,
    url: path,
    headers: {},
  };

  if (body) {
    (config.data = body), (config.headers["Content-Type"] = "application/json");
  }

  return axios.request(config);
}

//GET
export async function getEntidades() {
  console.log("Obteniendo todos los datos de Firebase");
  return llamadaAPI("get", null, host);
}

//POST
export async function postEntidad(data) {
  console.log("Insertando datos en Firebase");
  return llamadaAPI("post", data, host); // Reemplaza API por host
}

//   export function borrarEntidad(entidad) {
//   return llamadaApi(cambiarHttpPorHttps(entidad._links.self.href), 'delete')
// }
