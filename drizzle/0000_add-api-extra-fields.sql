--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "businessUnit" varchar(255);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "serviceName" varchar(255);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "clientsImpacted" text;--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "backends" text;--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "complexity" varchar(100);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "serviceType" varchar(100);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "integrationType" varchar(100);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "serviceDescription" text;--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "swaggerUrl" varchar(500);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "apiVersion" varchar(50);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "authRequired" boolean;--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "responseFormat" varchar(100);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "timeout" varchar(50);--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN IF NOT EXISTS "parameters" text;