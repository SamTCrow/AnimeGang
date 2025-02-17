CREATE TABLE `characterLike` (
	`id` integer PRIMARY KEY NOT NULL,
	`characterId` integer NOT NULL,
	`userId` integer NOT NULL,
	`likedHated` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `list` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `listToAnime` (
	`id` integer PRIMARY KEY NOT NULL,
	`listId` integer NOT NULL,
	`animeId` integer NOT NULL,
	FOREIGN KEY (`listId`) REFERENCES `list`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `scores` (
	`id` integer PRIMARY KEY NOT NULL,
	`userID` integer NOT NULL,
	`animeID` integer NOT NULL,
	`score` integer NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`avatar` text,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text,
	`verified` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `watchedAnime` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` integer NOT NULL,
	`animeId` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
