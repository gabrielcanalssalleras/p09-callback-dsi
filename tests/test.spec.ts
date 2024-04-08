import { expect } from 'chai';
import 'mocha';
import { execSync } from 'child_process';
import { newCardAsync } from '../src/functions/new_card.js';

const carta1 = {
	ID: 23,
	Name: "Electromante trasgo",
	Mana: 2,
	Color: "Multicolor",
	Type: "Criatura",
	Text: "Arrollar. Vuela.",
	Value: 1,
	Rarity: "Comun",
	Strength: 2,
	Resistance: 2
};

const carta2 = {
	ID: 2,
	Name: "Bola de Fuego",
	Mana: 4,
	Color: "Rojo",
	Type: "Conjuro",
	Text: "Duele bastante.",
	Value: 25,
	Rarity: "Infrecuente"
};

const cartaMala1 = {
	ID: 12,
	Name: "Bobbin el Goblin",
	Mana: 1,
	Color: "Verde",
	Type: "Criatura",
	Text: "Aplica herida.",
	Value: 1,
	Rarity: "Rara",
	Resistance: 2
};

const cartaMala2 = {
	ID: 3,
	Name: "Bobbol el Kobold",
	Mana: 1,
	Color: "Rojo",
	Type: "Criatura",
	Text: "Aplica herida.",
	Value: 1,
	Rarity: "Comun",
	Strength: 2
};

const cartaMala3 = {
	ID: 4,
	Name: "Espada de Ameiko",
	Mana: 1,
	Color: "Blanco",
	Type: "Artefacto",
	Text: "Gana 5 vidas.",
	Value: 1,
	Rarity: "Comun",
	Strength: 2
};

const enum Colors {
	White = "\x1b[37m",
	Blue = "\x1b[34m",
	Black = "\x1b[30m",
	Red = "\x1b[31m",
	Green = "\x1b[32m",
	EOS = "\x1b[39m\n"	
}

describe('Magic Cards', () => {
	before(() => {
		execSync('rm -rf collections/testing/*');
	});

	it('Puedes añadir cartas a un usuario.', (done) => {
		newCardAsync(carta1.ID, carta1.Name, "testing", carta1.Mana, carta1.Color, carta1.Type, carta1.Rarity, [carta1.Strength, carta1.Resistance], 
					 0, carta1.Text, carta1.Value, "collections/testing", (error?: Error, data?: [ number, string ]) => {
			if (error) {
				expect(error.message).to.eql(`El ID de la carta no es válido.`);
			} else {
				expect(data).to.eql([carta1.Name, carta1.ID]);
			}
		});

		newCardAsync(carta2.ID, carta2.Name, "testing", carta2.Mana, carta2.Color, carta2.Type, carta2.Rarity, [0, 0], 
					 0, carta2.Text, carta2.Value, "collections/testing", (error?: Error, data?: [ number, string ]) => {
			if (error) {
				expect(error.message).to.eql(`La fuerza y resistencia de la carta no son válidas.`);
			} else {
				expect(data).to.eql([carta2.Name, carta2.ID]);
			}
		});
		done();
	});

	it('No puedes añadir cartas con el mismo ID', (done) => {
		newCardAsync(carta1.ID, carta1.Name, "testing", carta1.Mana, carta1.Color, carta1.Type, carta1.Rarity, [carta1.Strength, carta1.Resistance], 
					 0, carta1.Text, carta1.Value, "collections/testing", (error?: Error, data?: [ number, string ]) => {
			if (error) {
				expect(error.message).to.eql(`El ID de la carta no es válido.`);
			} else {
				expect(data).to.eql([carta1.Name, carta1.ID]);
			}
			done();
		});
	});

	it('Las cartas de tipo Criatura deben tener el atributo strength', (done) => {
		newCardAsync(cartaMala1.ID, cartaMala1.Name, "testing", cartaMala1.Mana, cartaMala1.Color, cartaMala1.Type, cartaMala1.Rarity, [0, cartaMala1.Resistance], 
					 0, cartaMala1.Text, cartaMala1.Value, "collections/testing", (error?: Error, data?: [ number, string ]) => {
			if (error) {
				expect(error.message).to.eql(`La fuerza y resistencia de la carta no son válidas.`);
			} else {
				expect(data).to.eql([cartaMala1.Name, cartaMala1.ID]);
			}
			done();
		});
	});

	it('Las cartas de tipo Criatura deben tener el atributo resistance', (done) => {
		newCardAsync(cartaMala2.ID, cartaMala2.Name, "testing", cartaMala2.Mana, cartaMala2.Color, cartaMala2.Type, cartaMala2.Rarity, [cartaMala2.Strength, 0], 
					 0, cartaMala2.Text, cartaMala2.Value, "collections/testing", (error?: Error, data?: [ number, string ]) => {
			if (error) {
				expect(error.message).to.eql(`La fuerza y resistencia de la carta no son válidas.`);
			} else {
				expect(data).to.eql([cartaMala2.Name, cartaMala2.ID]);
			}
			done();
		});
	});

	it('Las cartas que no sean de tipo Criatura no deben tener el atributo strength', (done) => {
		newCardAsync(cartaMala3.ID, cartaMala3.Name, "testing", cartaMala3.Mana, cartaMala3.Color, cartaMala3.Type, cartaMala3.Rarity, [cartaMala3.Strength, 0], 
					 0, cartaMala3.Text, cartaMala3.Value, "collections/testing", (error?: Error, data?: [ number, string ]) => {
			if (error) {
				expect(error.message).to.eql(`La fuerza y resistencia de la carta no son válidas.`);
			} else {
				expect(data).to.eql([cartaMala3.Name, cartaMala3.ID]);
			}
			done();
		});
	
	});
});