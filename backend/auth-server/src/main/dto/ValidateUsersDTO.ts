import UserDTO from "./UserDTO";

export class ValidateUserDTO {

    private left: UserDTO[];
    private right: UserDTO[];

    addLeft(user: UserDTO) {
        if (!this.left) {
            this.left = [];
        }
        this.left.push(user);
    }
    
    getLeft(): UserDTO[] {
        if (!this.left) {
            this.left = [];
        }
        return this.left;
    }

    addRight(user: UserDTO) {
        if (!this.right) {
            this.right = [];
        }
        this.right.push(user);
    }

    getRight(): UserDTO[] {
        if (!this.right) {
            this.right = [];
        }
        return this.right;
    }

}