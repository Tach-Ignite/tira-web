import generateUsers from './user.seed';
import generateRandomProducts from './product.seed';

const generateSeedData = async () => {
  const products = await generateRandomProducts();
  const users = await generateUsers();
  return {
    users,
    products,
  };
};

export default generateSeedData;
