CREATE TYPE "public"."api_method" AS ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH');--> statement-breakpoint
CREATE TYPE "public"."api_status" AS ENUM('active', 'deprecated', 'beta');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'suspended', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "api_categories" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"icon" varchar(100),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "api_requests" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"userId" varchar(64) NOT NULL,
	"apiId" varchar(64),
	"requestType" varchar(50) NOT NULL,
	"details" text NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "api_subscriptions" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"userId" varchar(64) NOT NULL,
	"apiId" varchar(64) NOT NULL,
	"apiKey" varchar(255) NOT NULL,
	"status" "subscription_status" DEFAULT 'active' NOT NULL,
	"subscribedAt" timestamp DEFAULT now(),
	"expiresAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "apis" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"categoryId" varchar(64) NOT NULL,
	"version" varchar(50) NOT NULL,
	"status" "api_status" DEFAULT 'active' NOT NULL,
	"endpoint" varchar(500) NOT NULL,
	"method" "api_method" NOT NULL,
	"pricing" varchar(100),
	"rateLimit" varchar(100),
	"documentation" text,
	"featured" boolean DEFAULT false,
	"popularity" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" text,
	"email" varchar(320),
	"password" varchar(255),
	"loginMethod" varchar(64),
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"lastSignedIn" timestamp DEFAULT now()
);
