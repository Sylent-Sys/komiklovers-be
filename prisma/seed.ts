import { PrismaClient } from "@prisma/client"
import * as argon2 from "argon2"
import { faker } from '@faker-js/faker';

async function main() {
    const prisma = new PrismaClient();
    await prisma.user.deleteMany({});
    await prisma.user.create({
        data: {
            name: "Renka",
            email: "test@test.com",
            password: await argon2.hash("test"),
            profile: 'https://avatars.githubusercontent.com/u/55942632?v=4'
        }
    })
    for (let i = 0; i < 10; i++) {
        const firstName = faker.person.firstName();
        await prisma.user.create({
            data: {
                name: firstName,
                email: faker.internet.email({ firstName }),
                password: await argon2.hash("test"),
                profile: faker.image.avatar()
            }
        })
    }
}
main()