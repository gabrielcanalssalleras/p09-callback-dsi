import fs from "fs";
import { Checker } from "../classes/checker.js";
import chalk from 'chalk';

// Obtiene la instancia de la clase Checker
const checker = Checker.getInstance();

/**
 * Crea una nueva carta y la añade a la colección del usuario de forma asíncrona.
 * @param ID - El ID de la carta.
 * @param Name - El nombre de la carta.
 * @param User - El usuario.
 * @param Mana - El mana de la carta.
 * @param Color - El color de la carta.
 * @param Type - El tipo de la carta.
 * @param Rarity - La rareza de la carta.
 * @param Strres - La fuerza y resistencia de la carta.
 * @param Loyalty - La lealtad de la carta.
 * @param Text - El texto de la carta.
 * @param Value - El valor de la carta.
 * @param userCollection - La colección de cartas del usuario.
 * @param callback - Función que se ejecutará al finalizar la operación.
 */
export function newCardAsync(ID: number, Name: string, User: unknown, Mana: unknown, Color: unknown,
                                                Type: unknown, Rarity: unknown, Strres: unknown[], Loyalty: unknown,
                                                Text: unknown, Value: unknown, userCollection: unknown, callback: (error?: Error, data?: unknown) => void): void {

    // Validaciones
    if (!checker.checkId(ID, userCollection)) {
        callback(new Error(`El ID de la carta no es válido.`), undefined);
        return;
    }
    if (!checker.checkMana(Mana)) {
        callback(new Error(`El mana de la carta no es válido.`), undefined);
        return;
    }
    if (!checker.checkColor(Color)) {
        callback(new Error(`El color de la carta no es válido.`), undefined);
        return;
    }
    if (!checker.checkType(Type)) {
        callback(new Error(`El tipo de la carta no es válido.`), undefined);
        return;
    }
    if (!checker.checkRarity(Rarity)) {
        callback(new Error(`La rareza de la carta no es válida.`), undefined);
        return;
    }
	if (!checker.checkStrRes(Type, Strres[0], Strres[1])) {
		callback(new Error(`La fuerza y resistencia de la carta no son válidas.`), undefined);
		return;
	}
    // Escritura del archivo JSON
    fs.writeFile(`${ userCollection }/${ Name }.json`, JSON.stringify({
        ID,
        Name,
        Mana,
        Color,
        Type,
        Rarity,
        Strength: Strres[0],
        Resistance: Strres[1],
        Loyalty,
        Text,
        Value
    }, null, 2), (err) => {
        if (err) {
            callback(err, undefined);
            return;
        }
        callback(undefined, [Name, ID]);
    });
}
