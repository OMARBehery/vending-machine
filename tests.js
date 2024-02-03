const { prettyPrintJSON } = require("@krisinc/node-rest-assured");

(async () => {
        const inputbody = `{"username: "firstname", "lastname" : "lst" }`;
        const headerOptions = JSON.stringify({"Cookie": authToken});
		const response = makeHttpRequest(url, JSON.parse(headerOptions), "POST", inputbody);
})();