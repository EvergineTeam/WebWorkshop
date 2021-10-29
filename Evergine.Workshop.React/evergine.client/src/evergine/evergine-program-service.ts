import { invoke } from '@evergine/evergine-definitions';

const devicePixelRatio = window.devicePixelRatio || 1;

const initializeEvergineCanvas = (id: string) => {
    window.Module.canvas = document.getElementById(id) as HTMLCanvasElement;
    invoke('Run', id);
};

const updateCanvasSize = (id: string) =>
    invoke('UpdateCanvasSize', id);

const getDevicePixelRatio: () => number = () => devicePixelRatio;

export {
    initializeEvergineCanvas,
    updateCanvasSize,
    getDevicePixelRatio
};
