CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- npx wrangler d1 execute user --command "INSERT INTO  User (email, name, password) VALUES ('jane@prisma.io', 'Jane Doe (Local)', '123');" --local