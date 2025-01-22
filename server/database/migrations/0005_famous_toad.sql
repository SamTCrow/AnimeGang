PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_listToAnime` (
	`listId` integer NOT NULL,
	`animeId` integer NOT NULL,
	`animeName` text NOT NULL,
	PRIMARY KEY(`listId`, `animeId`),
	FOREIGN KEY (`listId`) REFERENCES `list`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_listToAnime`("listId", "animeId", "animeName") SELECT "listId", "animeId", "animeName" FROM `listToAnime`;--> statement-breakpoint
DROP TABLE `listToAnime`;--> statement-breakpoint
ALTER TABLE `__new_listToAnime` RENAME TO `listToAnime`;--> statement-breakpoint
PRAGMA foreign_keys=ON;