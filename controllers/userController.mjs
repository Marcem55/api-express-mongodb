// controllers/userController.mjs
import User from "../models/userModel.mjs";

// Función para crear un usuario en la base de datos
export const createUser = async (body) => {
  const user = new User({
    email: body.email,
    name: body.name,
    password: body.password,
  });

  // Guardar el usuario en la base de datos
  return await user.save();
};

export const updateUser = async (email, body) => {
  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        name: body.name,
        password: body.password,
      },
    },
    { new: true }
  );
  console.log({ user });
  return user;
};
