class Room {

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get _canvas() {
        return this[_canvas];
    }

    set _canvas(value) {
        this[_canvas] = value;
    }

    get _users() {
        return this[_users];
    }

    set _users(value) {
        this[_users] = value;
    }

    get _isPublic() {
        return this[_isPublic];
    }

    set _isPublic(value) {
        this[_isPublic] = value;
    }

    constructor(name, password) {
        this._name = name;
        this._canvas = createCanvas(800,600);
        this._users = [];
        if(this._password != '') {
            this._isPublic = true;
        }
        else {
            this._isPublic = false;
            this._password = password;
        }
        this._name = name;
        this._password = password;
    }

    addUser(user) {
        this._users.push(user);

    }

}
module.exports = Room;
