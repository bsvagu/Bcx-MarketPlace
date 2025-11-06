DROP TABLE "api_categories" CASCADE;--> statement-breakpoint
DROP TABLE "api_requests" CASCADE;--> statement-breakpoint
DROP TABLE "api_subscriptions" CASCADE;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "businessUnit" varchar(255);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "serviceName" varchar(255);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "clientsImpacted" text;--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "backends" text;--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "complexity" varchar(100);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "serviceType" varchar(100);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "integrationType" varchar(100);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "serviceDescription" text;--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "swaggerUrl" varchar(500);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "apiVersion" varchar(50);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "authRequired" boolean;--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "responseFormat" varchar(100);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "timeout" varchar(50);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "parameters" text;--> statement-breakpoint
DROP TYPE "public"."subscription_status";--> statement-breakpoint
DROP TYPE "public"."user_role";