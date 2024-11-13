CREATE TABLE `anime` (
	`id` integer PRIMARY KEY NOT NULL,
	`cover` text NOT NULL,
	`trailer` text,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`source` text,
	`episodes` integer NOT NULL,
	`status` text NOT NULL,
	`airing` integer,
	`duration` text,
	`rating` text,
	`score` integer,
	`synopsis` text,
	`season` text,
	`year` integer,
	`studioID` integer
);
--> statement-breakpoint
CREATE TABLE `animeToGenres` (
	`animeId` integer NOT NULL,
	`genreId` integer NOT NULL,
	PRIMARY KEY(`animeId`, `genreId`),
	FOREIGN KEY (`animeId`) REFERENCES `anime`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`genreId`) REFERENCES `genres`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `characterLike` (
	`characterId` integer NOT NULL,
	`userId` integer NOT NULL,
	PRIMARY KEY(`characterId`, `userId`),
	FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `charactersToAnime` (
	`characterId` integer NOT NULL,
	`animeId` integer NOT NULL,
	PRIMARY KEY(`animeId`, `characterId`),
	FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`animeId`) REFERENCES `anime`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `characters` (
	`id` integer PRIMARY KEY NOT NULL,
	`image` text,
	`name` text NOT NULL,
	`about` text
);
--> statement-breakpoint
CREATE TABLE `genres` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `list` (
	`id` integer,
	FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `listToAnime` (
	`listId` integer NOT NULL,
	`animeId` integer NOT NULL,
	PRIMARY KEY(`animeId`, `listId`),
	FOREIGN KEY (`listId`) REFERENCES `list`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`animeId`) REFERENCES `anime`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `relatedAnime` (
	`animeId` integer NOT NULL,
	`relatedAnimeId` integer NOT NULL,
	`relationType` text NOT NULL,
	PRIMARY KEY(`animeId`, `relatedAnimeId`),
	FOREIGN KEY (`animeId`) REFERENCES `anime`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`relatedAnimeId`) REFERENCES `anime`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `scores` (
	`userID` integer NOT NULL,
	`animeID` integer NOT NULL,
	`score` integer NOT NULL,
	PRIMARY KEY(`animeID`, `userID`),
	FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`animeID`) REFERENCES `anime`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `streamingLinks` (
	`id` integer PRIMARY KEY NOT NULL,
	`animeId` integer NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `studio` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` text,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`nickname` text NOT NULL,
	`password` text NOT NULL,
	`email` text,
	`avatar` text,
	`listId` integer,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text
);
--> statement-breakpoint
CREATE TABLE `watchedAnime` (
	`userId` integer NOT NULL,
	`animeId` integer NOT NULL,
	PRIMARY KEY(`userId`, `animeId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`animeId`) REFERENCES `anime`(`id`) ON UPDATE no action ON DELETE no action
);
