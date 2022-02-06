export class NavigationItem {
  public displayName: string;
  public permissions: string[];
  public link: string;
  public active: boolean;

  constructor({ displayName, permissions, link, active }: Omit<NavigationItem, 'canAccess'>) {
    this.displayName = displayName;
    this.permissions = permissions;
    this.link = link;
    this.active = active;
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
}