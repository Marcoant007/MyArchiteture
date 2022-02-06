/**
 * Padrão de projeto Either defini regras para retornar dois possíveis resultados
 * Quando uma função pode retornar mais de uma possiblidade 
 * 
 * Definimos dois tipos para serem retornados
 * 
 * Caso deseje retornar o parâmetro da esquerda chamamos o método left
 * Caso deseje retornar o parâmetro da direita chamamos o right
 * 
 * Esse padrão é normamente usado para retornar um erro ou sucesso executar diversos throws na regra de negócio
 */
export default class Either<X, Y> {

    private _isErro: boolean = false;
    private _left: X;
    private _right: Y;

    private constructor() {
    }

    public static left<X, Y>(value: X): Either<X, Y> {
       let either = new Either<X, Y>();
       either.setLeft(value);
       return either;
    }

    public static right<X, Y>(value: Y): Either<X, Y> {
        let either = new Either<X, Y>();
        either.setRight(value);
        return either;
    }

    public isLeft(): boolean {
        return this._isErro;
    }

    public left(): X {
        return this._left;
    }

    public right(): Y {
        return this._right;
    }

    private setLeft(value: X) {
        this._left = value;
        this._isErro = true;
    }

    private setRight(value: Y) {
        this._right = value;
        this._isErro = false;
    }
}


































// export type Either<L, A> = Left<L, A> | Right<L, A>;

// export class Left<L, A> {
//   readonly value: L;

//   constructor(value: L) {
//     this.value = value;
//   }

//   isLeft(): this is Left<L, A> {
//     return true;
//   }

//   isRight(): this is Right<L, A> {
//     return false;
//   }
// }

// export class Right<L, A> {
//   readonly value: A;

//   constructor(value: A) {
//     this.value = value;
//   }

//   isLeft(): this is Left<L, A> {
//     return false;
//   }

//   isRight(): this is Right<L, A> {
//     return true;
//   }
// }

// export const left = <L, A>(l: L): Either<L, A> => {
//   return new Left(l);
// };

// export const right = <L, A>(a: A): Either<L, A> => {
//   return new Right<L, A>(a);
// };