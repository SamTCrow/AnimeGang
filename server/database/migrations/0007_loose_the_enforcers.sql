PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_anime` (
	`id` integer PRIMARY KEY NOT NULL,
	`cover` text NOT NULL,
	`trailer` text,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`source` text,
	`episodes` integer NOT NULL,
	`status` text NOT NULL,
	`airing` integer NOT NULL,
	`start` text,
	`duration` text,
	`rating` integer,
	`score` integer,
	`synopsis` text,
	`season` text,
	`year` integer,
	`studioID` integer
);
--> statement-breakpoint
INSERT INTO `__new_anime`("id", "cover", "trailer", "title", "type", "source", "episodes", "status", "airing", "start", "duration", "rating", "score", "synopsis", "season", "year", "studioID") SELECT "id", "cover", "trailer", "title", "type", "source", "episodes", "status", "airing", "start", "duration", "rating", "score", "synopsis", "season", "year", "studioID" FROM `anime`;--> statement-breakpoint
DROP TABLE `anime`;--> statement-breakpoint
ALTER TABLE `__new_anime` RENAME TO `anime`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `charactersToAnime` ADD `role` text;--> statement-breakpoint
ALTER TABLE `list` ADD `name` text NOT NULL;