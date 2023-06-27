export interface INavbarItem {
  name: string;
  type: string;
  href: string;
}

export interface INavbar {
  className?: string;
  items: INavbarItem[];
}

export interface INavbarIcon {
  className?: string;
  type: string;
}