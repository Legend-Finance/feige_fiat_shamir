const repl = require("repl");
replServer = repl.start({});

replServer.context.jsbn = require("./jsbn");
replServer.context.BigPrimeGenerator = require("./big_prime_generator");
replServer.context.BigIntegerGenerator = require("./big_integer_generator");
