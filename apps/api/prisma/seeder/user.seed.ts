/* eslint-disable prettier/prettier */
import bcrypt from 'bcryptjs';
import { PrismaClient, UseCaseTypes } from '@prisma/client';
import inquirer from 'inquirer';
import {
  organizations,
  generateUniqueTeamFriendlyId,
} from './organization.seed';
const prisma = new PrismaClient();

const EmailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;

const PasswordRegex = /^(?=.*[a-zA-Z].*)(?=.*[0-9].*)(?=.*[!@#$%&?\s].*).{8,}$/;

export const users: {
  firstName: string;
  lastName: string;
  email: string;
  hash?: string;
  roleId?: string;
  requireOnboarding?: boolean;
}[] = [
  {
    firstName: 'Demo',
    lastName: 'User',
    email: 'user@example.com',
    hash: bcrypt.hashSync('user@Password1', 10),
  },
  {
    firstName: 'Demo',
    lastName: 'Admin',
    email: 'admin@example.com',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    hash: bcrypt.hashSync('John@Password1', 10),
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    hash: bcrypt.hashSync('Jane@Password1', 10),
  },
  {
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    hash: bcrypt.hashSync('Robert@Password1', 10),
  },
  {
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    hash: bcrypt.hashSync('Emily@Password1', 10),
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    hash: bcrypt.hashSync('Michael@Password1', 10),
  },
  {
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@example.com',
    hash: bcrypt.hashSync('Sarah@Password1', 10),
  },
  {
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@example.com',
    hash: bcrypt.hashSync('David@Password1', 10),
  },
  {
    firstName: 'Laura',
    lastName: 'Taylor',
    email: 'laura.taylor@example.com',
    hash: bcrypt.hashSync('Laura@Password1', 10),
  },
  {
    firstName: 'Daniel',
    lastName: 'Martinez',
    email: 'daniel.martinez@example.com',
    hash: bcrypt.hashSync('Daniel@Password1', 10),
  },
  {
    firstName: 'Anna',
    lastName: 'Thomas',
    email: 'anna.thomas@example.com',
    hash: bcrypt.hashSync('Anna@Password1', 10),
  },
  {
    firstName: 'James',
    lastName: 'Jackson',
    email: 'james.jackson@example.com',
    hash: bcrypt.hashSync('James@Password1', 10),
  },
  {
    firstName: 'Olivia',
    lastName: 'White',
    email: 'olivia.white@example.com',
    hash: bcrypt.hashSync('Olivia@Password1', 10),
  },
  {
    firstName: 'Benjamin',
    lastName: 'Harris',
    email: 'benjamin.harris@example.com',
    hash: bcrypt.hashSync('Benjamin@Password1', 10),
  },
  {
    firstName: 'Sophia',
    lastName: 'Clark',
    email: 'sophia.clark@example.com',
    hash: bcrypt.hashSync('Sophia@Password1', 10),
  },
  {
    firstName: 'Christopher',
    lastName: 'Lewis',
    email: 'christopher.lewis@example.com',
    hash: bcrypt.hashSync('Christopher@Password1', 10),
  },
  {
    firstName: 'Amelia',
    lastName: 'Walker',
    email: 'amelia.walker@example.com',
    hash: bcrypt.hashSync('Amelia@Password1', 10),
  },
  {
    firstName: 'Joseph',
    lastName: 'Young',
    email: 'joseph.young@example.com',
    hash: bcrypt.hashSync('Joseph@Password1', 10),
  },
  {
    firstName: 'Mia',
    lastName: 'Allen',
    email: 'mia.allen@example.com',
    hash: bcrypt.hashSync('Mia@Password1', 10),
  },
  {
    firstName: 'Alexander',
    lastName: 'Scott',
    email: 'alexander.scott@example.com',
    hash: bcrypt.hashSync('Alexander@Password1', 10),
  },
  {
    firstName: 'Isabella',
    lastName: 'King',
    email: 'isabella.king@example.com',
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
    if (user.email === 'admin@example.com') {
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
    if (user.email !== 'admin@example.com' && userRes?.userId) {
      // Start By pass onboarding for some of the seed users
      await prisma.userProfiles.upsert({
        where: { userId: userRes.userId },
        create: {
          useCaseType: UseCaseTypes.Individual,
          firstName: user?.firstName,
          lastName: user?.lastName,
          onboardingCompleted: user?.requireOnboarding ? false : true,
          userId: userRes.userId,
        },
        update: {
          useCaseType: UseCaseTypes.Individual,
          firstName: user?.firstName,
          lastName: user?.lastName,
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
      const teamFriendlyId = await generateUniqueTeamFriendlyId(
        `${organizations[i % 2].name} Team`,
      );
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
          teamFriendlyId,
        },
        update: {
          name: organizations[i % 2].name + ' Team',
          orgId: organizations[i % 2].id,
          teamFriendlyId,
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
