//***** Helper function to let us give rotation values like 'degrees' (eg rotate 90 degrees) */

export const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const random = (min, max, float = false) => {
  const val = Math.random() * (max - min) + min;

  if (float) {
    return val;
  }

  return Math.floor(val);
};
