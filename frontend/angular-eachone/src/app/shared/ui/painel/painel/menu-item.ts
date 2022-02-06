
export class MenuItem {
    public name: string;
    public permissions: string[];
    public icon: string;
    public link: string;
    public active: boolean;
    public userType?: string;
    public onClick?: string;

    constructor({ name, permissions, icon, link, active, userType = 'any', onClick }: Omit<MenuItem, 'canAccess' | 'canViewByUserType'>) {
        this.name = name;
        this.permissions = permissions;
        this.icon = icon;
        this.link = link;
        this.active = active;
        this.userType = userType;
        if (onClick) {
            this.onClick = onClick;
        }
    }

    canAccess(profilePermissions: string[]): boolean {
        let canPermission = false;

        if (this.permissions.length == 0) {
            return true;
        }

        this.permissions.forEach(permission => {
            if (profilePermissions.some(profilePermission => profilePermission == permission)) {
                canPermission = true;
            }
        });

        return canPermission;
    }

    canViewByUserType(profileUserType: string): boolean {
        if (this.userType === 'any') {
            return true;
        }

        if (this.userType === profileUserType) {
            return true;
        }

        return false;
    }
}
