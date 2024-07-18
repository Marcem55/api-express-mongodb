// controllers/userController.mjs
import Course from "../models/courseModel.mjs";

export const getCourses = async () => {
  const courses = await Course.find({ state: true });
  return courses;
};

// Función para crear un curso en la base de datos
export const createCourse = async (body) => {
  const course = new Course({
    title: body.title,
    description: body.description,
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
