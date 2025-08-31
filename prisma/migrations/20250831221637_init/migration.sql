-- CreateEnum
CREATE TYPE "public"."Perfil" AS ENUM ('userCliente', 'userTienda');

-- CreateEnum
CREATE TYPE "public"."TipoMedia" AS ENUM ('FOTO', 'VIDEO');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "perfil" "public"."Perfil" NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "numeroDeMobil" TEXT NOT NULL,
    "direccionComercial" TEXT,
    "cuit" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Multimedia" (
    "id" SERIAL NOT NULL,
    "tipo" "public"."TipoMedia" NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Multimedia" ADD CONSTRAINT "Multimedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
