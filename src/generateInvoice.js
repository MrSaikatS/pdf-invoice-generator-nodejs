import { nanoid } from "nanoid";
import * as fs from "node:fs";
import https from "node:https";

const generateInvoice = (params) => {
	const id = nanoid(7);
	console.log(`invoiceId Ready...`);

	const invoiceData = {
		logo: "https://lh3.googleusercontent.com/p/AF1QipMfyaGlqP1JqBCWaZuxufb5KL-wl_AOWrbJlPDp",
		to: `${params.fName} ${params.lName}`,
		currency: "inr",
		number: `INV-${id}`,
		items: params.services,
		notes: "Thanks for being an awesome customer!",
	};
	console.log(`invoiceData Ready...`);

	const filename = `${params.fName}${params.lName}-${id}.pdf`;
	console.log(`Filename Ready...`);

	const postData = JSON.stringify(invoiceData);

	const options = {
		hostname: "invoice-generator.com",
		port: 443,
		path: "/",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": Buffer.byteLength(postData),
		},
	};

	try {
		const file = fs.createWriteStream(filename);

		const req = https.request(options, function (res) {
			res.on("data", function (chunk) {
				file.write(chunk);
			}).on("end", function () {
				file.end();

				if (typeof success === "function") {
					success();
				}
			});
		});

		req.write(postData);
		console.log(`Generating Your Invoice...`);
		console.log(`Please wait...`);

		req.end();
	} catch (error) {
		console.error(error);
	}
	console.log(`Done... ${filename} is Saved!!`);
};

export default generateInvoice;
