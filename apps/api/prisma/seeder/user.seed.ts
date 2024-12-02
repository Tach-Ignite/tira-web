/* eslint-disable prettier/prettier */
import bcrypt from 'bcryptjs';
import { PrismaClient, UseCaseTypes } from '@prisma/client';
import inquirer from 'inquirer';
import { organizations } from './organization.seed';
const prisma = new PrismaClient();

const EmailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;

const PasswordRegex = /^(?=.*[a-zA-Z].*)(?=.*[0-9].*)(?=.*[!@#$%&?\s].*).{8,}$/;

export const users: {
  name: string;
  email: string;
  hash?: string;
  roleId?: string;
  requireOnboarding?: boolean;
}[] = [
  {
    name: 'Demo User',
    email: 'user@tachcolorstore.com',
    hash: bcrypt.hashSync('user@Password1', 10),
  },
  {
    name: 'Demo Admin',
    email: 'admin@tachcolorstore.com',
  },
  {
    name: 'John Doe',
    email: 'john.doe@tachcolorstore.com',
    hash: bcrypt.hashSync('John@Password1', 10),
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@tachcolorstore.com',
    hash: bcrypt.hashSync('Jane@Password1', 10),
  },
  {
    name: 'Robert Johnson',
    email: 'robert.johnson@tachcolorstore.com',
    hash: bcrypt.hashSync('Robert@Password1', 10),
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@tachcolorstore.com',
    hash: bcrypt.hashSync('Emily@Password1', 10),
  },
  {
    name: 'Michael Brown',
    email: 'michael.brown@tachcolorstore.com',
    hash: bcrypt.hashSync('Michael@Password1', 10),
  },
  {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@tachcolorstore.com',
    hash: bcrypt.hashSync('Sarah@Password1', 10),
  },
  {
    name: 'David Lee',
    email: 'david.lee@tachcolorstore.com',
    hash: bcrypt.hashSync('David@Password1', 10),
  },
  {
    name: 'Laura Taylor',
    email: 'laura.taylor@tachcolorstore.com',
    hash: bcrypt.hashSync('Laura@Password1', 10),
  },
  {
    name: 'Daniel Martinez',
    email: 'daniel.martinez@tachcolorstore.com',
    hash: bcrypt.hashSync('Daniel@Password1', 10),
  },
  {
    name: 'Anna Thomas',
    email: 'anna.thomas@tachcolorstore.com',
    hash: bcrypt.hashSync('Anna@Password1', 10),
  },
  {
    name: 'James Jackson',
    email: 'james.jackson@tachcolorstore.com',
    hash: bcrypt.hashSync('James@Password1', 10),
  },
  {
    name: 'Olivia White',
    email: 'olivia.white@tachcolorstore.com',
    hash: bcrypt.hashSync('Olivia@Password1', 10),
  },
  {
    name: 'Benjamin Harris',
    email: 'benjamin.harris@tachcolorstore.com',
    hash: bcrypt.hashSync('Benjamin@Password1', 10),
  },
  {
    name: 'Sophia Clark',
    email: 'sophia.clark@tachcolorstore.com',
    hash: bcrypt.hashSync('Sophia@Password1', 10),
  },
  {
    name: 'Christopher Lewis',
    email: 'christopher.lewis@tachcolorstore.com',
    hash: bcrypt.hashSync('Christopher@Password1', 10),
  },
  {
    name: 'Amelia Walker',
    email: 'amelia.walker@tachcolorstore.com',
    hash: bcrypt.hashSync('Amelia@Password1', 10),
  },
  {
    name: 'Joseph Young',
    email: 'joseph.young@tachcolorstore.com',
    hash: bcrypt.hashSync('Joseph@Password1', 10),
  },
  {
    name: 'Mia Allen',
    email: 'mia.allen@tachcolorstore.com',
    hash: bcrypt.hashSync('Mia@Password1', 10),
  },
  {
    name: 'Alexander Scott',
    email: 'alexander.scott@tachcolorstore.com',
    hash: bcrypt.hashSync('Alexander@Password1', 10),
  },
  {
    name: 'Isabella King',
    email: 'isabella.king@tachcolorstore.com',
    hash: bcrypt.hashSync('Isabella@Password1', 10),
  },
];

const generateUsers = async () => {
  const superAdminRole = await prisma.userRoles.upsert({
    where: { name: 'super-admin' },
    create: { name: 'super-admin' },
    update: { name: 'super-admin' },
    select: {
      id: true,
    },
  });

  const systemAdminRole = await prisma.userRoles.upsert({
    where: { name: 'system-admin' },
    create: { name: 'system-admin' },
    update: { name: 'system-admin' },
    select: {
      id: true,
    },
  });

  const orgAdmin = await prisma.userRoles.upsert({
    where: { name: 'org-admin' },
    create: { name: 'org-admin' },
    update: {},
  });

  const orgUser = await prisma.userRoles.upsert({
    where: { name: 'org-member' },
    create: { name: 'org-member' },
    update: {},
  });

  const teamAdmin = await prisma.userRoles.upsert({
    where: { name: 'team-admin' },
    create: { name: 'team-admin' },
    update: {},
  });

  const teamUsers = await prisma.userRoles.upsert({
    where: { name: 'team-member' },
    create: { name: 'team-member' },
    update: {},
  });

  const userRole = await prisma.userRoles.upsert({
    where: { name: 'user' },
    create: { name: 'user' },
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

  const adminData = {
    email: adminAnswers?.adminUserEmail,
    hash: bcrypt.hashSync(adminAnswers.adminUserPass, 10),
    roleId: superAdminRole.id,
  };
  await prisma.users.upsert({
    where: { email: adminData.email },
    create: {
      roleId: adminData.roleId,
      ...adminData,
      emailVerifiedAt: new Date().toISOString(),
    },
    update: {
      roleId: adminData.roleId,
      ...adminData,
      emailVerifiedAt: new Date().toISOString(),
    },
  });

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.email === 'admin@tachcolorstore.com') {
      user.roleId = systemAdminRole.id;
    }
    const userRes = await prisma.users.upsert({
      where: { email: user.email },
      create: {
        roleId: userRole.id,
        email: user.email,
        hash: user.hash,
        emailVerifiedAt: new Date().toISOString(),
      },
      update: {
        roleId: userRole.id,
        email: user.email,
        hash: user.hash,
        emailVerifiedAt: new Date().toISOString(),
      },
    });
    if (user.email !== 'admin@tachcolorstore.com' && userRes?.userId) {
      // Start By pass onboarding for some of the seed users
      await prisma.userProfiles.upsert({
        where: { userId: userRes.userId },
        create: {
          useCaseType: UseCaseTypes.Individual,
          onboardingCompleted: user?.requireOnboarding ? false : true,
          userId: userRes.userId,
        },
        update: {
          useCaseType: UseCaseTypes.Individual,
          onboardingCompleted: user?.requireOnboarding ? false : true,
        },
      });

      // End By pass onboarding for some of the seed users
      const roleId =
        Math.floor(Math.random() * 2) === 0 ? orgUser.id : orgAdmin.id;
      await prisma.orgUsers.upsert({
        where: {
          orgId_userId: {
            orgId: organizations[i % 2].id,
            userId: userRes.userId,
          },
        },
        create: {
          orgId: organizations[i % 2].id,
          userId: userRes.userId,
          roleId: roleId,
        },
        update: {},
      });
      const team = await prisma.teams.upsert({
        where: {
          orgId_name: {
            name: organizations[i % 2].name + ' Team',
            orgId: organizations[i % 2].id,
          },
        },
        create: {
          name: organizations[i % 2].name + ' Team',
          orgId: organizations[i % 2].id,
        },
        update: {
          name: organizations[i % 2].name + ' Team',
          orgId: organizations[i % 2].id,
        },
      });

      await prisma.teamUsers.upsert({
        where: {
          teamId_userId: {
            teamId: team.id,
            userId: userRes.userId,
          },
        },
        create: {
          teamId: team.id,
          userId: userRes.userId,
          roleId: roleId === orgAdmin.id ? teamAdmin.id : teamUsers.id,
        },
        update: {
          teamId: team.id,
          userId: userRes.userId,
          roleId: roleId === orgAdmin.id ? teamAdmin.id : teamUsers.id,
        },
      });
    }
  }
};

export default generateUsers;
