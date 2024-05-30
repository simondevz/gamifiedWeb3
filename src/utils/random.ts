export const randomNumbers = async (quantity: number, max: number) => {
  /**
   * This function generates a an array of random numbers.
   * The lenght of the array is {quantity}.
   * No number generated can be higer than {max}.
   * Every number in the generated array must be distinct.
   * {quantity} has to be equal or less than {max}
   */
  const scaleFactor = quantity * 557;
  let randNumbersArr: number[] = [];
  if (max < quantity)
    throw new Error("Max is smaller then quantity in randomNumbers call.");

  for (let index = 0; index < quantity; index++) {
    const randNum = await generateUniqueRandomNumber(
      scaleFactor,
      max,
      randNumbersArr
    );
    randNumbersArr = [...randNumbersArr, randNum];
  }
  return randNumbersArr;
};

// Recursively generates numbers and checks against an array so that it never returns a number in the array
const generateUniqueRandomNumber = async (
  scaleFactor: number,
  max: number,
  except: number[]
): Promise<number> => {
  return new Promise((resolve) => {
    const num = Math.round(Math.random() * scaleFactor) % max;
    if (except.length === 0) {
      resolve(num);
    } else {
      // If the number is found in the array return whatever the function will return when called again
      for (let index = 0; index < except.length; index++) {
        if (except[index] === num) {
          return generateUniqueRandomNumber(scaleFactor, max, except).then(
            (num) => resolve(num)
          );
        }
      }
      resolve(num);
    }
  });
};
