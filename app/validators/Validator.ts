class Validator {
    constructor() {

    }

    public isValidEmail(email: string): boolean {
        const re = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        return re.test(email);
    }

    public isValidPostalCode(code): boolean {
        if ((code != null && code != 0)) {
            if (!isNaN(code)) {
                return true;
            }
        }
        return false;
    }

    public isValidString(string: string): boolean {
        if ((string != null && string != undefined)) {
            return true;
        }
        return false;
    }

}

export default new Validator();