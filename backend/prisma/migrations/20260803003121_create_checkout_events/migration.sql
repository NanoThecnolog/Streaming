-- CreateEnum
CREATE TYPE "CheckoutStatus" AS ENUM ('STARTED', 'IN_PROGRESS', 'PAYMENT_PENDING', 'COMPLETED', 'ABANDONED', 'FAILED');

-- CreateEnum
CREATE TYPE "CheckoutStep" AS ENUM ('EMAIL', 'PLAN', 'PAYMENT_METHOD', 'PERSONAL_DATA', 'PAYMENT_DATA', 'CONFIRMATION', 'PASSWORD', 'COMPLETED');

-- CreateEnum
CREATE TYPE "CheckoutPaymentMethod" AS ENUM ('PIX', 'CREDIT_CARD', 'BILLET');

-- CreateEnum
CREATE TYPE "CheckoutDevice" AS ENUM ('MOBILE', 'TABLET', 'DESKTOP', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "CheckoutEventType" AS ENUM ('CHECKOUT_STARTED', 'STEP_VIEWED', 'FIELD_COMPLETED', 'STEP_COMPLETED', 'STEP_RETURNED', 'VALIDATION_ERROR', 'PAYMENT_ATTEMPTED', 'PAYMENT_FAILED', 'PAYMENT_APPROVED', 'CHECKOUT_COMPLETED', 'CHECKOUT_ABANDONED');

-- CreateTable
CREATE TABLE "CheckoutTrack" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "emailHash" TEXT,
    "status" "CheckoutStatus" NOT NULL DEFAULT 'STARTED',
    "currentStep" "CheckoutStep" NOT NULL DEFAULT 'EMAIL',
    "highestStep" "CheckoutStep" NOT NULL DEFAULT 'EMAIL',
    "planId" INTEGER,
    "paymentMethod" "CheckoutPaymentMethod",
    "emailFilled" BOOLEAN NOT NULL DEFAULT false,
    "planSelected" BOOLEAN NOT NULL DEFAULT false,
    "nameFilled" BOOLEAN NOT NULL DEFAULT false,
    "cpfFilled" BOOLEAN NOT NULL DEFAULT false,
    "phoneFilled" BOOLEAN NOT NULL DEFAULT false,
    "passwordCreated" BOOLEAN NOT NULL DEFAULT false,
    "cardNumberFilled" BOOLEAN NOT NULL DEFAULT false,
    "cardExpiryFilled" BOOLEAN NOT NULL DEFAULT false,
    "cardHolderFilled" BOOLEAN NOT NULL DEFAULT false,
    "cardCvvFilled" BOOLEAN NOT NULL DEFAULT false,
    "paymentAttempted" BOOLEAN NOT NULL DEFAULT false,
    "paymentApproved" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionId" TEXT,
    "paymentId" TEXT,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "failedStep" "CheckoutStep",
    "source" TEXT,
    "medium" TEXT,
    "campaign" TEXT,
    "content" TEXT,
    "referrer" TEXT,
    "landingPage" TEXT,
    "device" "CheckoutDevice" NOT NULL DEFAULT 'UNKNOWN',
    "browser" TEXT,
    "os" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "abandonedAt" TIMESTAMP(3),
    "lastEventAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CheckoutTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckoutTrackEvent" (
    "id" TEXT NOT NULL,
    "checkoutId" TEXT NOT NULL,
    "type" "CheckoutEventType" NOT NULL,
    "step" "CheckoutStep" NOT NULL,
    "field" TEXT,
    "durationMs" INTEGER,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckoutTrackEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutTrack_sessionId_key" ON "CheckoutTrack"("sessionId");

-- CreateIndex
CREATE INDEX "CheckoutTrack_status_idx" ON "CheckoutTrack"("status");

-- CreateIndex
CREATE INDEX "CheckoutTrack_currentStep_idx" ON "CheckoutTrack"("currentStep");

-- CreateIndex
CREATE INDEX "CheckoutTrack_planId_idx" ON "CheckoutTrack"("planId");

-- CreateIndex
CREATE INDEX "CheckoutTrack_paymentMethod_idx" ON "CheckoutTrack"("paymentMethod");

-- CreateIndex
CREATE INDEX "CheckoutTrack_createdAt_idx" ON "CheckoutTrack"("createdAt");

-- CreateIndex
CREATE INDEX "CheckoutTrackEvent_checkoutId_createdAt_idx" ON "CheckoutTrackEvent"("checkoutId", "createdAt");

-- CreateIndex
CREATE INDEX "CheckoutTrackEvent_type_createdAt_idx" ON "CheckoutTrackEvent"("type", "createdAt");

-- CreateIndex
CREATE INDEX "CheckoutTrackEvent_step_type_idx" ON "CheckoutTrackEvent"("step", "type");

-- AddForeignKey
ALTER TABLE "CheckoutTrackEvent" ADD CONSTRAINT "CheckoutTrackEvent_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "CheckoutTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
