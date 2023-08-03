import { PrismaClient } from "@prisma/client"
import * as argon2 from "argon2"
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
await prisma.user.deleteMany({});
await prisma.user.create({
    data: {
        name: "Renka",
        email: "test@test.com",
        password: await argon2.hash("test"),
    }
})
for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    await prisma.user.create({
        data: {
            name: firstName,
            email: faker.internet.email({ firstName }),
            password: await argon2.hash("test"),
        }
    })
}