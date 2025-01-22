CREATE TABLE `comments` (
	`id` integer PRIMARY KEY NOT NULL,
	`author` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`text` text NOT NULL,
	`referenceId` integer NOT NULL,
	`referenceType` text NOT NULL,
	`parentId` integer,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parentId`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action
);
