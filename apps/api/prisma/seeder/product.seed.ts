import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import FormData from 'form-data';
import {
  generateRandomHexColor,
  getRandomColorBrand,
  getRandomLoremIpsum,
} from './seederUtils';
import inquirer from 'inquirer';

const prisma = new PrismaClient();

export const svg = `<svg
   width="133mm"
   height="133mm"
   viewBox="0 0 133 133"
   version="1.1"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <circle
     style="fill:#fill;fill-opacity:1;stroke:#stroke;stroke-width:0.08757708;stroke-linejoin:bevel;stroke-dasharray:none;paint-order:markers fill stroke"
     id="path1642"
     cx="66.570381"
     cy="66.623238"
     r="66.363625"/>
  <path
     id="path115"
     style="fill:#fill;fill-opacity:0;stroke:#stroke;stroke-width:0.773346;stroke-dasharray:none;stroke-opacity:1"
     d="m 128.12315,56.924965 -32.320906,14.231155 0.05029,0.01602 a 13.667095,13.761726 0 0 0 -4.096121,2.832702 13.667095,13.761726 0 0 0 0,19.46195 13.667095,13.761726 0 0 0 19.328117,0 13.667095,13.761726 0 0 0 2.72312,-3.917956 l 0.007,0.02557 z m -27.43275,16.1385 a 10.960554,11.036445 0 0 1 8.15989,3.22469 10.960554,11.036445 0 0 1 0,15.607661 10.960554,11.036445 0 0 1 -15.500344,0 10.960554,11.036445 0 0 1 4e-6,-15.607657 10.960554,11.036445 0 0 1 7.34045,-3.224694 z" />
  <path
     style="display:inline;fill:#fill;fill-opacity:0;stroke:#stroke;stroke-width:0.773346;stroke-dasharray:none;stroke-opacity:1"
     d="M 52.948906,97.609179 C 43.07498,49.572975 101.01923,26.722162 128.19899,53.86267 c 0,0 -26.91321,-25.855194 -45.71745,-15.938218 -10.196371,5.377314 -30.87241,-0.320733 -30.87241,-0.320733 0,0 6.728962,5.758446 5.896777,10.315498 -0.568779,3.115053 -5.887477,8.809119 -10.755802,2.558051 -6.242294,-8.015106 -21.599041,-5.82259 -21.599041,-5.82259 11.960519,5.931667 11.289817,10.881389 0.164366,6.953176 5.121964,10.107439 9.251275,9.698069 11.205101,10.832002 2.421204,1.405138 1.421779,5.257261 -1.173774,6.496097 C 32.630668,70.232276 24.676602,65.591641 25.618054,62.15976 26.357734,59.380751 15.68324,55.960847 5.9561122,57.756361 17.220711,59.287749 28.182352,75.547726 14.178289,72.651608 8.763066,71.355864 4.0901834,77.84574 4.0901834,77.84574 c 0,0 31.0183646,1.550885 19.6778426,10.028222 0,0 10.629742,5.09689 15.460889,1.833778 6.174056,-4.170058 13.719991,7.901439 13.719991,7.901439 z"
     id="path1141-1" />
  <circle
     style="fill:#stroke;fill-opacity:1;stroke-width:0;stroke-linejoin:bevel;paint-order:markers fill stroke"
     id="path2362"
     cx="101.05"
     cy="83.8"
     r="11" />

</svg>
`;

function createSVGImageWithRandomColor(randomColor: string): string {
  const strokeColor =
    parseInt(randomColor, 16) > 8388607 ? '#000000' : '#FFFFFF';
  return svg
    .replace(/#fill/g, `#${randomColor}`)
    .replace(/#stroke/g, `${strokeColor}`);
}

const getProductImageURL = async (color: string) => {
  const svgString = createSVGImageWithRandomColor(color);
  const fileName = `${color}.svg`;
  const formData = new FormData();
  formData.append('file', svgString, {
    filename: fileName,
    contentType: 'image/svg+xml',
    knownLength: svgString.length,
  });
  const res = await fetch(`${process.env.API_URL}/assets/upload`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
  return res.data ? res.data : null;
};

const ProductCategories = [
  {
    name: 'Finish',
  },
  {
    name: 'Mechanism',
  },
  {
    name: 'Material',
  },
];

const generateRandomColorProduct = async () => {
  const friendlyId = generateRandomHexColor();
  const title = `#${friendlyId}`;
  const quantity = Math.floor(Math.random() * 100);
  const getProductImage = await getProductImageURL(friendlyId);
  const msrpPrice =
    ((Math.floor(Math.random() * 10000) + Number.EPSILON) * 100) / 100;

  const salePrice =
    ((Math.floor(Math.random() * 10000) + Number.EPSILON) * 100) / 100;

  return {
    productImageUrl: getProductImage ? [getProductImage] : [],
    title,
    description: getRandomLoremIpsum(),
    brand: getRandomColorBrand(),
    friendlyId,
    quantity,
    msrpPrice,
    salePrice,
  };
};

const generateRandomProducts = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'count',
      message: 'Enter the number of sample product you want to create',
      default: 25,
    },
  ]);

  for (let i = 0; i < answer.count; i++) {
    const randomNumber = Math.floor(Math.random() * 3);
    const product = await generateRandomColorProduct();
    await prisma.products.create({
      data: {
        ...product,
        categories: {
          connectOrCreate: {
            where: { name: ProductCategories[randomNumber].name },
            create: ProductCategories[randomNumber],
          },
        },
      },
    });
  }
};

export default generateRandomProducts;
