export interface NavItems {
    parentId: number,
    menuId: number,
    title: string,
    csstitle: string,
    link: string,
    children: NavItems[],
    icon: string,
    id: number
}

export interface FlatNode {
    expandable: boolean;
    name: string;
    level: number;
    route:string;
    icon: string;
}