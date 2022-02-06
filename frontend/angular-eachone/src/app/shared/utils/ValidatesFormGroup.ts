import { FormGroup } from '@angular/forms';

class ValidatesFormGroup {

    public validatorCpf(form: FormGroup) {
        const control = form.get('cpf');
        let value = control.value;

        if (!value) {
            return;
        }

        value = value.replace(/[\.\-\/]/g, '').trim();

        if (value.length == 11) {
            if (!value || value.length != 11
                || value == "00000000000"
                || value == "11111111111"
                || value == "22222222222"
                || value == "33333333333"
                || value == "44444444444"
                || value == "55555555555"
                || value == "66666666666"
                || value == "77777777777"
                || value == "88888888888"
                || value == "99999999999") {
                control.setErrors({ cpfNotValid: true });
                return;
            }

            let soma = 0
            let resto
            for (let i = 1; i <= 9; i++) {
                soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
            }
            resto = (soma * 10) % 11;
            if ((resto == 10) || (resto == 11)) {
                resto = 0;
            }
            if (resto != parseInt(value.substring(9, 10))) {
                control.setErrors({ cpfNotValid: true });
                return;
            }
            soma = 0
            for (let i = 1; i <= 10; i++) {
                soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);
            }
            resto = (soma * 10) % 11;
            if ((resto == 10) || (resto == 11)) {
                resto = 0
            }
            if (resto != parseInt(value.substring(10, 11))) {
                control.setErrors({ cpfNotValid: true });
                return;
            }
            control.setErrors(null);
            return;
        }

        if (value && value.length !== 11 && value.length !== 14) {
            control.setErrors({ notEquivalent: true });
        }
    }

    public validatorCnpj(group: FormGroup) {
        const control = group.get('cnpj');
        if (control.value) {
            let value = control.value;

            value = value.replace(/[\.\-\/]/g, '').trim();

            if (value.length == 14) {
                if (!value || value.length != 14
                    || value == "00000000000000"
                    || value == "11111111111111"
                    || value == "22222222222222"
                    || value == "33333333333333"
                    || value == "44444444444444"
                    || value == "55555555555555"
                    || value == "66666666666666"
                    || value == "77777777777777"
                    || value == "88888888888888"
                    || value == "99999999999999") {
                    control.setErrors({ cnpjNotValid: true });
                    return;
                }

                let tamanho: number = value.length - 2;
                let numeros = value.substring(0, tamanho);
                let digitos = value.substring(tamanho);
                let soma: any = 0;
                let pos = tamanho - 7;
                for (let i = tamanho; i >= 1; i--) {
                    soma += +(numeros.charAt(tamanho - i)) * pos--;
                    if (pos < 2) {
                        pos = 9;
                    }
                }
                let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != +digitos.charAt(0)) {
                    control.setErrors({ cnpjNotValid: true });
                    return;
                }
                tamanho = tamanho + 1;
                numeros = value.substring(0, tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (let i = tamanho; i >= 1; i--) {
                    soma += +numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2) {
                        pos = 9;
                    }
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != +digitos.charAt(1)) {
                    control.setErrors({ cnpjNotValid: true });
                    return;
                }
                control.setErrors(null);
                return
            };

            if (value.length !== 14) {
                control.setErrors({ notEquivalent: true });
            }
        }
    }

    public validatorCpfCnpj(group: FormGroup) {
        const control = group.get('cpf_cnpj');
        let value = control.value;
        value = value.replace(/[\.\-\/]/g, '').trim();

        if (value.length == 14) {
            if (!value || value.length != 14
                || value == "00000000000000"
                || value == "11111111111111"
                || value == "22222222222222"
                || value == "33333333333333"
                || value == "44444444444444"
                || value == "55555555555555"
                || value == "66666666666666"
                || value == "77777777777777"
                || value == "88888888888888"
                || value == "99999999999999") {
                control.setErrors({ cnpjNotValid: true });
                return;
            }

            let tamanho: number = value.length - 2;
            let numeros = value.substring(0, tamanho);
            let digitos = value.substring(tamanho);
            let soma: any = 0;
            let pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += +(numeros.charAt(tamanho - i)) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != +digitos.charAt(0)) {
                control.setErrors({ cnpjNotValid: true });
                return;
            }
            tamanho = tamanho + 1;
            numeros = value.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
                soma += +numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != +digitos.charAt(1)) {
                control.setErrors({ cnpjNotValid: true });
                return;
            }
            control.setErrors(null);
            return
        };


        if (value.length == 11) {
            if (!value || value.length != 11
                || value == "00000000000"
                || value == "11111111111"
                || value == "22222222222"
                || value == "33333333333"
                || value == "44444444444"
                || value == "55555555555"
                || value == "66666666666"
                || value == "77777777777"
                || value == "88888888888"
                || value == "99999999999") {
                control.setErrors({ cpfNotValid: true });
                return;
            }

            let soma = 0
            let resto
            for (let i = 1; i <= 9; i++) {
                soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
            }
            resto = (soma * 10) % 11;
            if ((resto == 10) || (resto == 11)) {
                resto = 0;
            }
            if (resto != parseInt(value.substring(9, 10))) {
                control.setErrors({ cpfNotValid: true });
                return;
            }
            soma = 0
            for (let i = 1; i <= 10; i++) {
                soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);
            }
            resto = (soma * 10) % 11;
            if ((resto == 10) || (resto == 11)) {
                resto = 0
            }
            if (resto != parseInt(value.substring(10, 11))) {
                control.setErrors({ cpfNotValid: true });
                return;
            }
            control.setErrors(null);
            return;
        }

        if (value && value.length !== 11 && value.length !== 14) {
            control.setErrors({ notEquivalent: true });
        }
    }

}

export default new ValidatesFormGroup();