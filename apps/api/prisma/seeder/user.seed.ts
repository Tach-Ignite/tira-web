import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import inquirer from 'inquirer';
const prisma = new PrismaClient();

const EmailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;

const PasswordRegex = /^(?=.*[a-zA-Z].*)(?=.*[0-9].*)(?=.*[!@#$%&?\s].*).{8,}$/;

const users: { name: string; email: string; hash?: string; roleId?: string }[] =
  [
    {
      name: 'Demo User',
      email: 'user@example.com',
      hash: bcrypt.hashSync('user@Password1', 10),
    },
    {
      name: 'Demo Admin',
      email: 'admin@example.com',
    },
  ];

const generateUsers = async () => {
  const adminRole = await prisma.userRoles.upsert({
    where: { name: 'admin' },
    create: { name: 'admin' },
    update: { name: 'admin' },
    select: {
      id: true,
    },
  });

  const userRole = await prisma.userRoles.upsert({
    where: { name: 'customer' },
    create: { name: 'customer' },
    update: {},
  });
  const adminAnswers = await inquirer.prompt([
    {
      name: 'adminUserEmail',
      type: 'input',
      default: 'admin@example.com',
      message: 'Please Enter Admin User Email ',
      validate: (value: string) => {
        if (!value) {
          return 'Email is Required field';
        }
        if (!EmailRegex.test(value)) {
          return 'Email is not valid';
        }
        return true;
      },
    },
    {
      name: 'adminUserPass',
      type: 'input',
      default: 'admin@Password1',
      message:
        'Please Enter Admin User Password (Min 8 characters, 1 Number, 1 Alphabet and 1 special character ',
      validate: (value: string) => {
        if (!value) {
          return 'Password is Required field';
        }
        if (!PasswordRegex.test(value)) {
          return 'Password is not valid';
        }
        return true;
      },
    },
  ]);

  for (const user of users) {
    if (user.name.includes('Admin')) {
      user.email === adminAnswers.adminUserEmail;
      user.hash = bcrypt.hashSync(adminAnswers.adminUserPass, 10);
      user.roleId = adminRole.id;
    }
    await prisma.users.upsert({
      where: { email: user.email },
      create: {
        roleId: userRole.id,
        ...user,
        emailVerifiedAt: new Date().toISOString(),
      },
      update: {
        roleId: userRole.id,
        ...user,
        emailVerifiedAt: new Date().toISOString(),
      },
    });
  }
};

export default generateUsers;
