const EVERGINE_CANVAS_ID = 'evergine-canvas';
const assemblyName = 'Evergine.Workshop.Web';
const className = 'Evergine.Workshop.Web.Program';

const invoke = <T = void>(
    methodName: string,
    ...args: unknown[]
): T =>
    window.BINDING.call_static_method(
        `[${assemblyName}] ${className}:${methodName}`,
        args
    ) as T;

export { EVERGINE_CANVAS_ID, invoke };