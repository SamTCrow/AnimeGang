PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_comments` (
	`id` integer PRIMARY KEY NOT NULL,
	`author` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`text` text NOT NULL,
	`referenceId` integer NOT NULL,
	`referenceType` text,
	`parentId` integer,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parentId`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_comments`("id", "author", "createdAt", "text", "referenceId", "referenceType", "parentId") SELECT "id", "author", "createdAt", "text", "referenceId", "referenceType", "parentId" FROM `comments`;--> statement-breakpoint
DROP TABLE `comments`;--> statement-breakpoint
ALTER TABLE `__new_comments` RENAME TO `comments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `name`;