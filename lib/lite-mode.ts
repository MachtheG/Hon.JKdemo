export const LITE_KEY = "jk-lite";
export const LITE_EVENT = "jk-lite-change";

/**
 * Runs before first paint (inlined in <head>). Turns lite mode on when the
 * visitor chose it, or when the browser reports Save-Data / a 2G connection.
 */
export const liteModeBootScript = `(function(){try{var s=localStorage.getItem("${LITE_KEY}");var c=navigator.connection;var auto=!!(c&&(c.saveData||/(^|-)2g$/.test(c.effectiveType||"")));document.documentElement.dataset.lite=s===null?String(auto):s;}catch(e){}})();`;
