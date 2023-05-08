function sendEventToWebView(match, message) {
    try {
        if (/Android/.test(navigator.userAgent)) {
            // The WebView is on an Android device
            if (typeof MyApp !== "undefined") {
                window.MyApp[match ? "onSuccess" : "onFailure"](message);
            } else {
                console.error("MyApp object is not defined.");
            }
        } else if (/iPhone|iPad|iPod|iOS/.test(navigator.userAgent)) {
            // The WebView is on an iOS device
            if (typeof webkit !== "undefined") {
                window.webkit.messageHandlers.MyApp.postMessage({
                    event: match ? "onSuccess" : "onFailure",
                    data: message
                });
            } else {
                console.error("webkit object is not defined.");
            }
        }
    } catch (e) {
        console.error(e)
    }
}