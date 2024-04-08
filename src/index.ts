/* eslint-disable @typescript-eslint/no-unused-vars */
import yargs from "yargs";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";
import { getUserCollection } from "./functions/get_user_collection.js";
import { newCardAsync } from "./functions/new_card.js";
import { Checker } from "./classes/checker.js";

// Obtiene la instancia de la clase Checker
const checker = Checker.getInstance();

/**
 * Configura los comandos de la línea de comandos para agregar una carta a una colección.
 */
yargs(hideBin(process.argv))
.command('add', 'Adds a card to a collection', (yargs) => {
	yargs.options({
		user: {
			username: 'Username',
			type: 'string',
			demandOption: true
		},
		id: {
			description: 'Card ID',
			type: 'number',
			demandOption: true
		},
		name: {
			description: 'Card Name',
			type: 'string',
			demandOption: true
		},
		mana: {
			description: 'Mana Cost',
			type: 'number',
			demandOption: true
		},
		color: {
			description: 'Card Color',
			type: 'string',
			demandOption: true
		},
		type: {
			description: 'Card Type',
			type: 'string',
			demandOption: true
		},
		rarity: {
			description: 'Card Rarity',
			type: 'string',
			demandOption: true
		},
		strength: {
			description: 'Card Strength',
			type: 'number',
			demandOption: false
		},
		resistance: {
			description: 'Card Resistance',
			type: 'number',
			demandOption: false
		},
		loyalty: {
			description: 'Card Loyalty',
			type: 'number',
			demandOption: false
		},
		text: {
			description: 'Card Text',
			type: 'string',
			demandOption: true
		},
		value: {
			description: 'Card Value',
			type: 'number',
			demandOption: true
		}
	});
	}, (argv) => {
		const userCollection: string = getUserCollection(argv.user);
	    newCardAsync(argv.id as number,
			argv.name as string,
			argv.user,
			argv.mana,
			argv.color,
			argv.type,
			argv.rarity,
			[argv.strength, argv.resistance],
			argv.loyalty,
			argv.text,
			argv.value,
			userCollection, 
			(error?: Error, data?: [ number, string ]) => {
				if (error) {
					console.log(chalk.red(error.message));
				} else {
					console.log(chalk.green(`Carta añadida a la colección de ${ argv.user } con id ${ data![1]} y nombre ${ data![0]}`));
				}
			});
	})
 .help()
 .argv;