// controllers/userController.mjs
import Course from "../models/courseModel.mjs";

export const getCourses = async () => {
  // populate() se utiliza para, a partir de la relacion del curso con el id del autor, ir a buscar los valores del autor
  const courses = await Course.find({ state: true }).populate("author", [
    "name",
    "email",
    "-_id", // para excluir un campo, se usa el simbolo "-" antes de la propiedada a excluir
  ]);
  return courses;
};

// Función para crear un curso en la base de datos
export const createCourse = async (req) => {
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    author: req.user._id,
  });

  // Guardar el curso en la base de datos
  return await course.save();
};

export const updateCourse = async (id, body) => {
  const course = await Course.findOneAndUpdate(
    { id },
    {
      $set: {
        title: body.title,
        description: body.description,
      },
    },
    { new: true }
  );
  return course;
};

export const disableCourse = async (id) => {
  const course = await Course.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        state: false,
      },
    },
    { new: true }
  );
  return course;
};
