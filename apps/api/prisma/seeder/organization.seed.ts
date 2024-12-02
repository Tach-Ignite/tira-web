/* eslint-disable prettier/prettier */

import slugify from 'slugify';
import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const organizations: {
  id: string;
  name: string;
  website: string;
}[] = [
  {
    id: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
    name: 'Tech Corp',
    website: 'www.lhftge.com',
  },
  {
    id: 'ec514e30-bc93-42e4-8156-f3907cbe4658',
    name: 'Innovative Solutions',
    website: 'www.omobet.com',
  },
  {
    id: '3081075b-270e-4b0b-ba0c-4110664ce929',
    name: 'Health Solutions',
    website: 'www.unplhl.com',
  },
  {
    id: 'c0a3d265-55c2-40d6-8af1-395bcd866a81',
    name: 'Eco Ventures',
    website: 'www.ktvknw.com',
  },
  {
    id: '87d813ec-2a40-41aa-bfc8-a7c62bfdfa54',
    name: 'Finance Co.',
    website: 'www.lnadnu.com',
  },
  {
    id: '5443ab99-ac28-4fa2-b288-e526868c2144',
    name: 'NextGen Technologies',
    website: 'www.oxksuo.com',
  },
  {
    id: 'ab255ca1-632c-4f4d-b702-ed7a908e134f',
    name: 'Future Innovations',
    website: 'www.bycnld.com',
  },
  {
    id: '738acd46-b477-4ebb-8a24-7206b322b751',
    name: 'Green Earth',
    website: 'www.sarjfl.com',
  },
  {
    id: 'c911258a-9793-4b4a-96be-31947f936dee',
    name: 'Global Services',
    website: 'www.tfwfiu.com',
  },
  {
    id: '6549ba2c-1e53-4375-a709-819269f8fde5',
    name: 'Smart Logistics',
    website: 'www.lsfdpo.com',
  },
  {
    id: 'f1abce83-0188-4c81-aa54-848d9da59b5b',
    name: 'Digital Creatives',
    website: 'www.rjpavs.com',
  },
  {
    id: 'dfd41be4-ef90-4fbd-82a0-287c8a169a4d',
    name: 'Data Solutions',
    website: 'www.hsrzey.com',
  },
  {
    id: '0ab253ab-6d5c-4aa8-a49d-cf39221316c8',
    name: 'Creative Minds',
    website: 'www.qvdwya.com',
  },
  {
    id: '78f8b141-ddbb-4513-9a16-60bfe738d92a',
    name: 'Insight Analytics',
    website: 'www.dslrsj.com',
  },
  {
    id: '14f6a969-dfad-4eba-b6b5-04d6b026d0f5',
    name: 'Unity Healthcare',
    website: 'www.rwgoba.com',
  },
  {
    id: '2943f343-10ff-41f1-8aa8-cbdd15b2eb04',
    name: 'Prime Retail',
    website: 'www.xxidny.com',
  },
  {
    id: 'b0ac0e26-b656-4109-a36f-dbb88a6db2f1',
    name: 'Clever Marketing',
    website: 'www.ofbtdv.com',
  },
  {
    id: '4160ec68-8e54-4fc2-af44-c7c4400377fd',
    name: 'Advanced Robotics',
    website: 'www.nexqpq.com',
  },
  {
    id: 'c320ea6c-9361-49b3-b6f0-5c83e0854066',
    name: 'Tech Innovations',
    website: 'www.hhgtdk.com',
  },
  {
    id: '5dd856f2-f4b1-474d-89e6-81a3a2459689',
    name: 'Visionary Solutions',
    website: 'www.kaozbf.com',
  },
  {
    id: '8eefbc71-f8d8-4d4c-9439-74a58a4c321e',
    name: 'Green Future',
    website: '',
  },
  {
    id: '744f4366-f5e9-4714-9c26-524bd69c8962',
    name: 'Digital Horizons',
    website: 'www.kaozbf2.com',
  },
  {
    id: '6b25f211-edce-4fc2-bf70-e5a239f0b2df',
    name: 'Health Tech',
    website: 'www.kaozbf3.com',
  },
  {
    id: '26794efa-ff96-4aeb-8cb9-af271962d54b',
    name: 'Smart Finance',
    website: 'www.kaozbf4.com',
  },
  {
    id: '3f00847c-0b19-47c5-8131-f0e2a68245ad',
    name: 'Education Edge',
    website: 'www.kaozbf5.com',
  },
  {
    id: '73b32577-ea92-46f3-9100-c6695c90b2c1',
    name: 'Bio Solutions',
    website: 'www.kaozbf6.com',
  },
  {
    id: '51c8d682-1229-469d-8eaf-e81f06d72635',
    name: 'City Connect',
    website: 'www.kaozbf7.com',
  },
  {
    id: 'd6028204-6cf8-4388-86e6-103ae0d228b1',
    name: 'AgriTech Innovations',
    website: 'www.kaozbf8.com',
  },
  {
    id: '8f487bca-06ae-4b4c-8d4c-39b0792cf7e6',
    name: 'Urban Mobility',
    website: 'www.kaozbf9.com',
  },
  {
    id: '7cce1235-9d51-4725-b830-0b7f92915764',
    name: 'NextWave AI',
    website: 'www.kaozbf10.com',
  },
  {
    id: '1f3a4c97-1b7c-48d2-84b6-c6a1e19ea0db',
    name: 'Renewable Power',
    website: 'www.kaozbf11.com',
  },
  {
    id: '136cea3b-4ce4-44b6-a07c-a515049336b2',
    name: 'TechLink',
    website: 'www.kaozbf12.com',
  },
  {
    id: 'a6b01b37-584b-4afc-94d9-9220ddd276c8',
    name: 'AI Vision',
    website: 'www.kaozbf13.com',
  },
  {
    id: 'f69346a5-1f5c-4a4a-8124-a427f1118545',
    name: 'AquaTech',
    website: 'www.kaozbf14.com',
  },
  {
    id: 'f6304cd1-3cab-4de1-b1ce-53fcb9386e8a',
    name: 'Virtual Edu',
    website: 'www.kaozbf15.com',
  },
  {
    id: '9be50376-6fe6-4bb3-8feb-68f18a6f9ee8',
    name: 'CleanTech',
    website: 'www.kaozbf16.com',
  },
  {
    id: 'edcac424-856f-4505-8553-a02877cb81be',
    name: 'Secure IT',
    website: 'www.kaozbf17.com',
  },
  {
    id: '971a9cda-ccb5-4a88-8f6b-3f00c454a1ec',
    name: 'Future Networks',
    website: 'www.kaozbf18.com',
  },
  {
    id: '7bed524f-61ed-4980-af3d-2a89dfad5e15',
    name: 'Mindful Media',
    website: 'www.kaozbf19.com',
  },
  {
    id: '3f9a07b3-a3db-49de-a296-448cb2723a33',
    name: 'Urban Agriculture',
    website: 'www.kaozbf20.com',
  },
  {
    id: '9a872fe3-8635-46d7-a183-0c95d3197570',
    name: 'Agile Solutions',
    website: 'www.kaozbf21.com',
  },
  {
    id: '8690cf99-fb53-4610-acfe-20f85ed2d5be',
    name: 'Creative Spark',
    website: 'www.kaozbf22.com',
  },
  {
    id: '022f9472-1624-4718-8c6f-97c1d05aac4e',
    name: 'NextGen Security',
    website: 'www.kaozbf23.com',
  },
  {
    id: 'c55b8f5e-e902-49b7-a91a-842083182a8d',
    name: 'Data Wise',
    website: 'www.kaozbf22.com',
  },
  {
    id: 'dcd7aed6-cf05-47b5-92d0-98a50342b5cb',
    name: 'Insightful Marketing',
    website: 'www.kaozbf24.com',
  },
  {
    id: '0215abd4-f05c-428a-94c4-f992dd49cabd',
    name: 'Pioneering Robotics',
    website: 'www.kaozbf25.com',
  },
  {
    id: '152cd361-b11b-4660-87d8-0f314f0d1fcb',
    name: 'Cultural Insights',
    website: 'www.kaozbf26.com',
  },
  {
    id: '32018ec9-b536-470b-b041-2e429c00f195',
    name: 'Connected Health',
    website: 'www.kaozbf27.com',
  },
  {
    id: 'fba85257-aa70-43ce-b383-0fb86282e762',
    name: 'Dynamic Logistics',
    website: 'www.kaozbf28.com',
  },
  {
    id: '1bb28a3b-1241-4b2e-add9-d1791ee7881c',
    name: 'Innovation Hub',
    website: 'www.kaozbf29.com',
  },
  {
    id: 'ca38482f-e5d2-4159-a1e1-73c0dcbb3be7',
    name: 'Ethical Energy',
    website: 'www.kaozbf30.com',
  },
  {
    id: '1bc271ce-b89e-46ad-8056-dbbeff4f6a23',
    name: 'Visionary Health',
    website: 'www.kaozbf31.com',
  },
  {
    id: 'c02c0eb2-70ed-4441-8364-793a509fdb02',
    name: 'Future of Work',
    website: 'www.kaozbf32.com',
  },
  {
    id: '0f6d589d-d1ec-41a3-aa58-091d21d5f4d6',
    name: 'Sustainable Brands',
    website: 'www.kaozbf33.com',
  },
  {
    id: 'f531f05a-76d4-4093-a034-331dc4689660',
    name: 'Tech Empowerment',
    website: 'www.kaozbf34.com',
  },
  {
    id: 'e98179f9-5e0d-4267-b7f6-015f0fb73021',
    name: 'Smart Analytics',
    website: 'www.kaozbf35.com',
  },
  {
    id: '99d3a91e-034a-47e8-a0cd-096463104c63',
    name: 'Intuitive Design',
    website: 'www.kaozbf36.com',
  },
  {
    id: 'cb98711a-3d9e-42a2-89d3-fc19a369f686',
    name: 'Pioneering Minds',
    website: 'www.kaozbf37.com',
  },
  {
    id: '82bd7d31-9197-4fa6-b7e3-014a7dbdb9c6',
    name: 'Smart Housing',
    website: 'www.kaozbf39.com',
  },
  {
    id: '34bd6d34-5678-5fa6-b7e3-013a7dbdb9c3',
    name: 'Global Innovations',
    website: 'www.kaozbf40.com',
  },
];

const seedTeamsForTeachCorpOrg: {
  id: string;
  name: string;
  orgId: string;
}[] = [
  {
    id: '56ec3606-h6a4-57f4-88c4-x0tfc3c2d586',
    name: 'Sales Team 1',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '66ed3707-h7b5-67f5-99d5-y1ugd4d3e697',
    name: 'Marketing Team 2',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '76fe3808-h8c6-78g6-aaf6-z2uhe5e4f708',
    name: 'Development Team 3',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '86gf3909-h9d7-89h7-bbg7-a3vif6f5g819',
    name: 'HR Team 4',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '96hf4010-h0e8-90i8-ccg8-b4wlg7g6h920',
    name: 'Finance Team 5',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'a6jf4111-h1f9-01j9-ddh9-c5xmj8h7i121',
    name: 'Support Team 6',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'b6kf4212-h2g0-12k0-eei0-d6ynk9i8j222',
    name: 'Operations Team 7',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'c6lf4313-h3h1-23l1-ffj1-e7zolaj9k323',
    name: 'Engineering Team 8',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'd6mf4414-h4i2-34m2-ggk2-f8apmbk0l424',
    name: 'Legal Team 9',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'e6nf4515-h5j3-45n3-hhl3-g9bqncl1m525',
    name: 'Research Team 10',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'f6of4616-h6k4-56o4-iim4-h0crodm2n626',
    name: 'IT Team 11',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'g6pf4717-h7l5-67p5-jjn5-i1dspen3o727',
    name: 'Design Team 12',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'h6qf4818-h8m6-78q6-kko6-j2etqfo4p828',
    name: 'QA Team 13',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'i6rf4919-h9n7-89r7-llp7-k3furgp5q929',
    name: 'Training Team 14',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'j6sf5020-h0o8-90s8-mmq8-l4gvs0q6r030',
    name: 'Procurement Team 15',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'k6tf5121-h1p9-01t9-nnr9-m5hwt1r7s131',
    name: 'Logistics Team 16',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'l6uf5222-h2q0-12u0-ooa0-n6ixu2s8t232',
    name: 'Administration Team 17',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'm6vf5323-h3r1-23v1-ppa1-o7jwv3t9u333',
    name: 'Content Team 18',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'n6wf5424-h4s2-34w2-qqa2-p8kxw4u0v434',
    name: 'Analytics Team 19',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'o6xf5525-h5t3-45x3-rrb3-q9lyx5v1w535',
    name: 'Public Relations Team 20',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'p6yf5626-h6u4-56y4-ssc4-r0mz0w2x636',
    name: 'Customer Success Team 21',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'q6zf5727-h7v5-67z5-ttd5-s1n01x3y737',
    name: 'Business Development Team 22',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'r6ag5828-h8w6-78a6-uue6-t2o12y4z838',
    name: 'Project Management Team 23',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 's6bg5929-h9x7-89b7-vvf7-u3p23z5a939',
    name: 'Partnerships Team 24',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 't6cg6030-h0y8-90c8-wwg8-v4q3406b040',
    name: 'Investor Relations Team 25',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'u6dg6131-h1z9-01d9-xxh9-w5r4517c141',
    name: 'Procurement Team 26',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'v6eg6232-h2a0-12e0-yyi0-x6s5628d242',
    name: 'Compliance Team 27',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'w6fg6333-h3b1-23f1-zzj1-y7t6739e343',
    name: 'Strategy Team 28',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'x6gg6434-h4c2-34g2-aak2-z8u7840c444',
    name: 'Innovation Team 29',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'y6hg6535-h5d3-45h3-bbl3-09v8951d545',
    name: 'Data Science Team 30',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: 'z6ig6636-h6e4-56i4-ccl4-10w9a62e646',
    name: 'Talent Acquisition Team 31',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '07jg6737-h7f5-67j5-ddm5-21x0b73f747',
    name: 'Media Team 32',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '17kg6838-h8g6-78k6-een6-32y1c84g848',
    name: 'Client Engagement Team 33',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '27lg6939-h9h7-89l7-ffo7-43z2d95h949',
    name: 'Vendor Management Team 34',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '37mg7040-h0i8-90m8-ggp8-54a3e06i050',
    name: 'Security Team 35',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '47ng7141-h1j9-01n9-hhq9-65b4f17j151',
    name: 'Infrastructure Team 36',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '57og7242-h2k0-12o0-iir0-76c5g28k252',
    name: 'User Experience Team 37',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '67pg7343-h3l1-23p1-jjs1-87d6h39l353',
    name: 'Mobile Development Team 38',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '77qg7444-h4m2-34q2-kkm2-98e7i40m454',
    name: 'Web Development Team 39',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
  {
    id: '87rg7545-h5n3-45r3-lln3-a9f8j51n555',
    name: 'Executive Team 40',
    orgId: '9d4a4072-a1c7-43ba-b2d4-4cd1b39c059f',
  },
];

const generateUniqueOrgFriendlyId = async (orgName: string) => {
  const slug = slugify(orgName, {
    lower: true,
    strict: true,
    replacement: '-',
  });
  let orgFriendlyId: string;
  let isUnique = false;

  do {
    const randomString = randomBytes(4).toString('hex'); // 8-character alphanumeric string
    orgFriendlyId = `${slug}-${randomString}`;

    // Check if this orgFriendlyId is already in use
    const existingOrg = await prisma.organizations.findUnique({
      where: { orgFriendlyId },
    });
    isUnique = !existingOrg;
  } while (!isUnique);

  return orgFriendlyId;
};

const generateOrganizations = async () => {
  for (const organization of organizations) {
    const orgFriendlyId = await generateUniqueOrgFriendlyId(organization.name);
    await prisma.organizations.upsert({
      where: { id: organization.id },
      create: {
        ...organization,
        orgFriendlyId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      update: {
        ...organization,
        orgFriendlyId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }
  for (const team of seedTeamsForTeachCorpOrg) {
    await prisma.teams.upsert({
      where: { id: team.id },
      create: {
        ...team,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      update: {
        ...team,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }
};

export default generateOrganizations;
