export class Window {
    public x: number;
    public y: number;
    public height: number;
    public width: number;
}

// tslint:disable-next-line: max-classes-per-file
export class AppConfigView {
    public height: number;
    public width: number;
}

// tslint:disable-next-line: max-classes-per-file
export class AppConfig {
    public window: Window;
    public view: Window;
    public appViewPopup: Window;
}
