define(["jquery"], function ($) {
    "use strict";

    const create = function (id, { "config.json": config }) {
        const $root = $("#" + id);
        $("iframe", $root).attr({ "src":    config,
                                  "width":  $root.width(),
                                  "height": $root.height() });
    }; // create()

    return create;
});