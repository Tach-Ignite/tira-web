import generateUsers from './user.seed';
import generateRandomProducts from './product.seed';
import generateOrganizations from './organization.seed';

const generateSeedData = async () => {
  const products = await generateRandomProducts();
  const organizations = await generateOrganizations();
  const users = await generateUsers();
  return {
    users,
    organizations,
    products,
  };
};

export default generateSeedData;
