/* global app, $ */

(function() {
    "use strict";

    var create = function(id, url) {
        $.getJSON(url + "/config.json").then(function(args) {
            var $root = $("#" + id);
            $root.css("background-color", args.color);
        });
    }; // create()

    app.mod["std/empty"] = create;

})();
