//! En las bases de datos no relacionaeles como MongoDB, existen las relaciones por referencia, por documentos embebidos o subdocumentos

//* Relaciones por referencia (Normalización) --> Consistencia (si los datos son cambiados, al ser solo una referencia por ID, vamos a obtener los datos que corresponden en caso de haber un cambio o algo por el estilo)
const user = {
  id: "U001",
  name: "Marcelo",
  email: "marcelo@email.com",
};

const course = {
  id: "C001",
  title: "Javascript moderno",
  description: "Course description",
  id_alumnos: ["U001", "U002", "U003"],
};

//* Relaciones por documentos embebidos o subdocumentos (Desnormalización) --> Performance (con una sola llamada puedo obtener todos los datos requeridos sin necesidad de tener que hacer otra consulta a la db o una petición a la API a partir de un primer resultado)
const user2 = {
  id: "U001",
  name: "Marcelo",
  email: "marcelo@email.com",
};

const course2 = {
  id: "C001",
  title: "Javascript moderno",
  description: "Course description",
  id_alumnos: [
    { id: "U001", nombre: "Marcelo", email: "marcelo@email.com" },
    { id: "U002", nombre: "Franco", email: "franco@email.com" },
    { id: "U003", nombre: "Julieta", email: "julieta@email.com" },
  ],
};
