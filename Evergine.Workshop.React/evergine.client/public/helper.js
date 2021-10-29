// Helper functions
function _evergine_getGlobalObject() {
    return window;
}

function _evergine_getObjectProperty(obj, property) {
    return obj[property];
}

function _evergine_setObjectProperty(obj, property, value) {
    obj[property] = value;
}

function _evergine_addSimpleEventListener(
    src,
    eventName,
    target,
    listenerName,
    options
) {
    src.addEventListener(
        eventName,
        (e) => {
            //let eref = DotNet.createJSObjectReference(e);
            target.invokeMethod(listenerName, e.type);
            //DotNet.disposeJSObjectReference(eref);
        },
        options
    );
}

function _evergine_addEventListener(
    src,
    eventName,
    target,
    listenerName,
    options
) {
    src.addEventListener(
        eventName,
        (e) => {
            let eref = DotNet.createJSObjectReference(e);
            target.invokeMethod(listenerName, e.type, eref);
            DotNet.disposeJSObjectReference(eref);
        },
        options
    );
}

function _evergine_addEventCustomListener(
    src,
    eventName,
    target,
    listenerName,
    summaryFn,
    options
) {
    src.addEventListener(
        eventName,
        (e) => {
            let output = window[summaryFn](src, e);
            target.invokeMethod(listenerName, e.type, output);
        },
        options
    );
}

function _evergine_getPointSummary(src, event) {
    return [
        Math.round(event.clientX),
        Math.round(event.clientY),
        Math.round(src.getBoundingClientRect().left),
        Math.round(src.getBoundingClientRect().top),
    ].join();
}

function _evergine_getTouchSummary(src, event) {
    event.preventDefault();
    let changed = event.changedTouches;
    let summ = [];
    for (i = 0; i < changed.length; i++) {
        let touch = changed[i];
        summ.push(touch.identifier + "," + _evergine_getPointSummary(src, touch));
    }
    return summ.join(";");
}

function _evergine_getMouseButtonSummary(src, event) {
    return [event.button].join();
}

function _evergine_getWheelSummary(src, event) {
    // Hack for firefox double event bug
    let deltaX = "deltaX" in event ? event.deltaX : 0;
    let deltaY = "deltaY" in event ? event.deltaY : 0;
    return [deltaX, deltaY].join();
}

function _evergine_getKeySummary(src, event) {
    return [event.code, event.key].join();
}

function _evergine_removeEventListener(src, eventName, options) {
    src.addEventListener(eventName, null, options);
}

function _evergine_setRequestAnimationFrameCallback(
    targetInstance,
    callbackName
) {
    if (callbackName) {
        App.requestAnimationFrameCallback = function (d) {
            targetInstance.invokeMethod(callbackName, d);
            if (App.requestAnimationFrameCallback) {
                window.requestAnimationFrame(App.requestAnimationFrameCallback);
            }
        };
        window.requestAnimationFrame(App.requestAnimationFrameCallback);
    } else {
        App.requestAnimationFrameCallback = undefined;
    }
}

function _evergine_ready() {
    console.log("Evergine Ready");
}