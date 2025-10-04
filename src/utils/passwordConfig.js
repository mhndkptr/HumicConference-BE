import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const matchPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export { matchPassword, hashPassword };
