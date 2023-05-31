const obj = {
    mid: 429582883,
    platform: "web",
    web_location: 1550101,
    wts: Math.round(Date.now() / 1e3),
} + 'f0b832dc840fce639318eb2dd9a549c4'
str = "mid=429582883&platform=web&web_location=1550101&wts=1679898796f0b832dc840fce639318eb2dd9a549c4"
i = '668e41e42b0544a88cbd311d52799d9f'
a = 'ce03d395ec2346f0b84bb3c090c11ac4'
for (var s = (n = i + a,
    r = [],
    [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52].forEach((function(t) {
        n.charAt(t) && r.push(n.charAt(t))
    }
    )),
    r.join("").slice(0, 32)), c = Math.round(Date.now() / 1e3), p = Object.assign({}, t, {
        wts: c
    }), d = Object.keys(p).sort(), h = [], v = 0; v < d.length; v++) {

    }

locationArray = [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52];
locationArray.forEach(item => {
    n.charAt(t) && r.push(n.charAt(t))
})

function f(t) {
    return t.substring(t.lastIndexOf("/") + 1, t.length).split(".")[0]
}

wordsToBytes = function(t) {
    for (var e = [], n = 0; n < 32 * t.length; n += 8)
        e.push(t[n >>> 5] >>> 24 - n % 32 & 255);
    return e
}

bytesToHex = function(t) {
    for (var e = [], n = 0; n < t.length; n++)
        e.push((t[n] >>> 4).toString(16)),
        e.push((15 & t[n]).toString(16));
    return e.join("")
}

bytesToHex(wordsToBytes(str)) // 849e295d4356abc13c6097312aefee70