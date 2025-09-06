import { shuffle } from "@/utils/UtilitiesFunctions";

class Generate {
    private specialChars = "!@#$%&*_+|<>?";
    private uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    private numberChars = "0123456789";

    private Random(length: number) {
        const array = new Uint32Array(1)
        crypto.getRandomValues(array)
        return array[0] % length
    }

    password(passLength: number): string {

        const config = this.specialChars + this.lowercaseChars + this.uppercaseChars + this.numberChars
        const obg =
            this.specialChars[this.Random(this.specialChars.length)] +
            this.uppercaseChars[this.Random(this.uppercaseChars.length)] +
            this.lowercaseChars[this.Random(this.lowercaseChars.length)] +
            this.numberChars[this.Random(this.numberChars.length)]
        let senha = obg
        for (let i = obg.length; i < passLength; i++) {
            const randomIndex = this.Random(config.length)
            senha += config[randomIndex]
        }
        senha = shuffle(senha.split('')).join('')
        return senha
    }
}

export const generate = new Generate()