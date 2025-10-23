CREATE TABLE `api_categories` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(100),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `api_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `api_subscriptions` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`apiId` varchar(64) NOT NULL,
	`apiKey` varchar(255) NOT NULL,
	`status` enum('active','suspended','cancelled') NOT NULL DEFAULT 'active',
	`subscribedAt` timestamp DEFAULT (now()),
	`expiresAt` timestamp,
	CONSTRAINT `api_subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `apis` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`categoryId` varchar(64) NOT NULL,
	`version` varchar(50) NOT NULL,
	`status` enum('active','deprecated','beta') NOT NULL DEFAULT 'active',
	`endpoint` varchar(500) NOT NULL,
	`method` enum('GET','POST','PUT','DELETE','PATCH') NOT NULL,
	`pricing` varchar(100),
	`rateLimit` varchar(100),
	`documentation` text,
	`featured` boolean DEFAULT false,
	`popularity` int DEFAULT 0,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `apis_id` PRIMARY KEY(`id`)
);
