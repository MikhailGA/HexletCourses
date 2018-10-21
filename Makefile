start:
	npm run babel-node src/courses/prototype/buildHTML.js

codewars:
	npm run babel-node src/bin/codewars.js

startHttpServerNodemoon:
	nodemon --exec babel-node -- src/bin/httpServer.js

startHttpServer:
	npm run babel-node src/bin/httpServer.js

startExpressNodemoon:
	nodemon --exec babel-node -- src/bin/express.js

startExpress:
	npm run babel-node src/bin/express.js

startServer:
	npm run babel-node src/bin/server.js

startServerNodemoon:
	nodemon --exec babel-node -- src/bin/server.js

startCinema:
	npm run babel-node src/bin/cinema.js

build:
	npm run build