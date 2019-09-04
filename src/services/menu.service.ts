import { Menu, MenuItem } from "electron";
import ButtonMenuItems from "../configs/buttonMenu.json";

export class MenuService {

    private buttonContextMenu: Menu;
    private view: string;

    public constructor(callBack: (item: string) => void ) {
        this.buttonContextMenu = new Menu();

        for (const item of ButtonMenuItems) {
            if (item === "-") {
                this.buttonContextMenu.append(new MenuItem({type: "separator"}));
            } else {
                this.buttonContextMenu.append(
                    new MenuItem ({
                    label: item,
                    click() {
                        callBack(item);
                    },
                }));
            }
        }
    }

    public ShowContextMenu(view: string): void {
        this.view = view;
        this.buttonContextMenu.popup();
    }

    public ConsumeContextMenu(): string {
        const tmp = this.view;
        this.view = "";
        return tmp;
    }
}
