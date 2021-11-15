
class EvergineModule {

    canvas: HTMLCanvasElement;

    constructor(module: object) {
        Object.assign(this);
    }

    locateFile(base: string) {
        return `evergine/${base}`;
    }

    setProgress(progress: number) {
        let percentage = Math.round(progress);

        let loadingBarBar = document.getElementById("loading-bar-percentage");
        loadingBarBar.style.width = percentage + "%";

        let loadingBar = document.getElementById("loading-bar");
        if (percentage === 100) {
            loadingBar.classList.add("progress-infinite");
        }
    }
}