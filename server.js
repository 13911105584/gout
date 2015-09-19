/* global require, __dirname, process */

var CONFIG = {
    "port": 3000
};

var fs      = require("fs");
var http    = require("http");
var https   = require("https");
var express = require("express");
var app = express();

// Créer le proxy.
app.use("/proxy", function (req, res) {
    "use strict";

    var protocol;
    var presize;
    if (/^\/https/.test(req.url)) {
        protocol = https;
        presize = 7;
    } else {
        protocol = http;
        presize = 6;
    }

    // Garder l'adresse du serveur pour du reverse proxy. Puis supprimer
    // l'adresse pour pouvoir transmettre les entêtes.
    var host = req.headers.host;
    delete req.headers.host;
    var options = {
        "host":    req.url.substring(presize, req.url.indexOf("/", presize)),
        "method":  req.method,
        "path":    req.url.substring(req.url.indexOf("/", presize)),
        "headers": req.headers
    };

    var client = protocol.request(options, function (proxy) {
        // Faire du reverse proxy dans le cas d'une redirection.
        if (300 < proxy.statusCode && 400 >proxy.statusCode &&
                proxy.headers.location) {
            proxy.headers.location =
                "http://" + host + "/proxy/http" +
                proxy.headers.location.replace("https:/", "s")
                                      .replace("http:/",  "");
        }
        res.writeHead(proxy.statusCode, proxy.headers);
        proxy.pipe(res);
    }).on("error", function (error) {
        process.stdout.write(error);
        res.writeHead(500, error.message);
        res.end();
    });

    // Rediriger le flux de la requête reçue vers la requête créée.
    req.pipe(client);
});

// Retourner les bibliothèque JavaScript.
app.use("/lib", function (req, res) {
    var module = "node_modules/" + req.path.substr(1, req.path.length - 4);
    fs.readFile(module + "/package.json", function (err, data) {
        if (err) {
            throw err;
        }
        var json = JSON.parse(data);
        fs.readFile(module + "/" + json.main, function (err, data) {
            if (err) {
                throw err;
            }
            res.send(data.toString().replace("#!/usr/bin/env node", ""));
        });
    });
});

// Créer le serveur web.
app.use(express.static(__dirname + "/public"));

app.listen(CONFIG.port);
process.stdout.write("Listening on port " + CONFIG.port + "...");
