import { hashPassword } from "../utils/passwordConfig.js";
import { PrismaService } from "../common/services/prisma-service.js";
import Role from "../common/enums/role-enum.js";

class AdminSeeder {
  constructor() {
    this.prisma = new PrismaService();
  }

  async seed(name, email, password) {
    const normalizedEmail = email.toLowerCase();
    const normalizedName = name.toLowerCase();

    const exists = await this.prisma.user.findFirst({
      where: { email: normalizedEmail },
      select: { id: true },
    });

    if (exists) {
      console.log(`Admin already exists: ${normalizedEmail}`);
      return;
    }

    const hashed = await hashPassword(password);

    const created = await this.prisma.user.create({
      data: {
        email: normalizedEmail,
        name: normalizedName,
        password: hashed,
        role: Role.SUPER_ADMIN,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    console.log("Admin seeded:", created);
  }
}

const [, , argName, argEmail, argPassword] = process.argv;
const name = argName;
const email = argEmail;
const password = argPassword;

if (!name || !email || !password) {
  console.error("Usage: npm run seed:admin <name> <email> <password>");
  process.exit(1);
}

const seeder = new AdminSeeder();
seeder
  .seed(name, email, password)
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await seeder.prisma.$disconnect();
  });
