PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_characterLike` (
	`characterId` integer NOT NULL,
	`characterName` text NOT NULL,
	`characterAnimeId` integer NOT NULL,
	`characterAnimeName` text NOT NULL,
	`userId` integer NOT NULL,
	PRIMARY KEY(`userId`, `characterId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_characterLike`("characterId", "characterName", "characterAnimeId", "characterAnimeName", "userId") SELECT "characterId", "characterName", "characterAnimeId", "characterAnimeName", "userId" FROM `characterLike`;--> statement-breakpoint
DROP TABLE `characterLike`;--> statement-breakpoint
ALTER TABLE `__new_characterLike` RENAME TO `characterLike`;--> statement-breakpoint
PRAGMA foreign_keys=ON;