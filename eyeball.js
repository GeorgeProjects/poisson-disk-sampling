"use strict";

var Poisson = require('./'),
    save = require('save-pixels'),
    zeros = require('zeros'),
    Noise = require('noisejs').Noise;

var noise = new Noise();

var outputPng = function (sampling) {
    var array = zeros([sampling.shape[0], sampling.shape[1]], 'float32');
    var i = 0;

    sampling.samplePoints.forEach(function (point) {
        i++;
        array.set(Math.round(point[0]), Math.round(point[1]), 255);
    });

    save(array, 'png').pipe(process.stdout);
};

var p = new Poisson([900, 400], 1.25, 7.5, 25, function (point) {
    return Math.pow(0.5 + noise.perlin2(point[0] / 75, point[1] / 75) * 0.5, 2.25);
});

p.fill();

outputPng(p);








