import { Injectable } from "@angular/core";
import { flagsCardsEnum } from "../Enum/FlagsCardsEnum";

@Injectable({
    providedIn: 'root'
})
export class CardFlags {

    private flagsCardsRegex = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
        elo: /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
        hipercard: /^606282|^3841(?:[0|4|6]{1})0/,
        dinnerclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        americanExpress: /^3[47][0-9]{13}$/
    }

    public verifyCardFlagType(cardNumber: string) {
        if (this.flagsCardsRegex.visa.test(cardNumber)) {
            return flagsCardsEnum.visa;
        }

        if (this.flagsCardsRegex.mastercard.test(cardNumber)) {
            return flagsCardsEnum.mastercard;
        }

        if (this.flagsCardsRegex.elo.test(cardNumber)) {
            return flagsCardsEnum.elo;
        }

        if (this.flagsCardsRegex.hipercard.test(cardNumber)) {
            return flagsCardsEnum.hipercard;
        }

        if (this.flagsCardsRegex.dinnerclub.test(cardNumber)) {
            return flagsCardsEnum.dinnerclub;
        }

        if (this.flagsCardsRegex.americanExpress.test(cardNumber)) {
            return flagsCardsEnum.americanExpress;
        }
    }
}