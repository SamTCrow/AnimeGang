PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_characterLike` (
	`characterId` integer NOT NULL,
	`userId` integer NOT NULL,
	PRIMARY KEY(`userId`, `characterId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_characterLike`("characterId", "userId") SELECT "characterId", "userId" FROM `characterLike`;--> statement-breakpoint
DROP TABLE `characterLike`;--> statement-breakpoint
ALTER TABLE `__new_characterLike` RENAME TO `characterLike`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_listToAnime` (
	`listId` integer NOT NULL,
	`animeId` integer NOT NULL,
	`animeName` text NOT NULL,
	PRIMARY KEY(`listId`, `animeId`),
	FOREIGN KEY (`listId`) REFERENCES `list`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_listToAnime`("listId", "animeId", "animeName") SELECT "listId", "animeId", "animeName" FROM `listToAnime`;--> statement-breakpoint
DROP TABLE `listToAnime`;--> statement-breakpoint
ALTER TABLE `__new_listToAnime` RENAME TO `listToAnime`;--> statement-breakpoint
CREATE TABLE `__new_scores` (
	`userID` integer NOT NULL,
	`animeID` integer NOT NULL,
	`score` integer NOT NULL,
	PRIMARY KEY(`userID`, `animeID`),
	FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_scores`("userID", "animeID", "score") SELECT "userID", "animeID", "score" FROM `scores`;--> statement-breakpoint
DROP TABLE `scores`;--> statement-breakpoint
ALTER TABLE `__new_scores` RENAME TO `scores`;--> statement-breakpoint
CREATE TABLE `__new_watchedAnime` (
	`userId` integer NOT NULL,
	`animeId` integer NOT NULL,
	PRIMARY KEY(`userId`, `animeId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_watchedAnime`("userId", "animeId") SELECT "userId", "animeId" FROM `watchedAnime`;--> statement-breakpoint
DROP TABLE `watchedAnime`;--> statement-breakpoint
ALTER TABLE `__new_watchedAnime` RENAME TO `watchedAnime`;