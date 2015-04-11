/* @flow */
/* global document, define */

define(["jquery", "scronpt"], function ($, Cron) {
    "use strict";

    var IMG_DIR = "mod/regseb/om/img/";
    var TOURNAMENTS = {
        "unknown": "Inconnue",
        "amical":  "Amical",
        "cdf":     "Coupe de France",
        "cdl":     "Coupe de la Ligue",
        "ligue_1": "Ligue 1",
        "tdc":     "Trophée des Champions",
        "ucl":     "Ligue des Champions",
        "uel":     "Ligue Europa"
    };
    var CHANNELS = {
        "unknown":   "Inconnue",
        "canalplus": "Canal+",
        "2":         "+Sport", // 404.
        "3":         "Foot+", // 404.
        "tf1":       "TF1",
        "france2":   "France 2",
        "france3":   "France 3",
        "france4":   "France 4",
        "france5":   "France 5",
        "9":         "M6", // 404.
        "10":        "D8", // 404.
        "eurosport": "Eurosport",
        "12":        "Orange sport", // 404.
        "13":        "CFOOT", // 404.
        "14":        "Sport +", // 404.
        "15":        "TMC", // 404.
        "nt1":       "NT1",
        "w9":        "W9",
        "18":        "Bein Sport 1", // 404.
        "19":        "Bein Sport 1 / Canal+",
        "20":        "Bein Sport 2", // 404.
        "21":        "Bein Sport Max",
        "22":        "Bein Sport 2 / Max", // 404.
        "23":        "Bein Sport 1 / Max", // 404.
        "24":        "Bein Sport 1 / + Sport"
    };

    var gates = {};

    var create = function (id, url) {
        $.getJSON(url + "/config.json").then(function (args) {
            var $root = $("#" + id);
            $root.css("background-color", args.color || "#03a9f4");

            gates[id] = {
                // Par défaut, mettre à jour tous les matins à 7h.
                "cron": new Cron(args.cron || "0 7 * * *", update, id)
            };

            if (1 === Object.keys(gates).length)
                document.addEventListener("visibilitychange", function () {
                    for (var id in gates)
                        if (!gates[id].cron.status())
                            update(id);
                });

            update(id);
        });
    }; // create()

    var update = function (id) {
        var args = gates[id];

        // Si la page est cachée : ne pas actualiser les données et indiquer
        // qu'il faudra mettre à jour les données quand l'utilisateur reviendra
        // sur la page.
        if (document.hidden) {
            args.cron.stop();
            return;
        }
        args.cron.start();

        var $root = $("#" + id);
        extract().then(function (data) {
            display($root, data);
        });
    }; // update()

    var extract = function () {
        var url = "https://www.om.net/calendrier-resultats";
        return $.get(url).then(function (data) {
            var $last = $(".om-match-last", data);
            var last = {
                "link": "http://www.om.net" + $("a:first", $last).attr("href"),
                "tournament": extractId($(".competition-picto img", $last)),
                "score": $(".score", $last).text(),
                "desc": $(".title", $last).html()
            };

            var $next = $(".om-match-next", data);
            var next = null;
            if ($("a", $next).length)
                next = {
                    "link": "http://www.om.net" +
                            $("a:last", $next).attr("href"),
                    "tournament": extractId($(".competition-picto img", $next)),
                    "teams": $(".title", $next).text(),
                    "date": new Date($(".date", $next).attr("datetime")),
                    "channel": extractId($(".tv img", $next))
                };

            return {
                "last": last,
                "next": next
            };
        });
    }; // extract()

    var extractId = function ($img) {
        return 0 !== $img.length ? /\/(.+)\.png$/.exec($img.attr("src"))[1]
                                 : "?";
    }; // extractId()

    var display = function ($root, data) {
        // Afficher le dernier match joué.
        var $last = $("p:first", $root);
        var tournament = data.last.tournament;
        $("img", $last).attr({ "src": IMG_DIR + tournament + ".svg",
                               "alt": TOURNAMENTS[tournament],
                               "title": TOURNAMENTS[tournament] });
        $("a", $last).text(data.last.score)
                     .attr({ "href": data.last.link,
                             "title": data.last.desc });

        // Afficher l'éventuel prochain match.
        var $next = $("p:last", $root);
        if (null !== data.next) {
            var channel = data.next.channel;
            $("img:first", $next).attr({ "src": IMG_DIR + tournament + ".svg",
                                         "alt": TOURNAMENTS[tournament],
                                         "title": TOURNAMENTS[tournament] });
            $("a", $next).text(data.next.teams)
                         .attr("href", data.next.link);
            $("time", $next).text(data.next.date.format("dd/MM HH:mm"))
                            .attr("title",
                                  data.next.date.format("EEEEE dd MMMMM yyyy" +
                                                        " HH:mm"));
            $("img:last", $next).attr({ "src": IMG_DIR + channel + ".svg",
                                        "alt": CHANNELS[channel],
                                        "title": CHANNELS[channel] });
        } else
            $("a", $next).text("(Aucun match programmé)")
                         .attr("href", "http://www.om.net/");
    }; // display()

    return create;

});