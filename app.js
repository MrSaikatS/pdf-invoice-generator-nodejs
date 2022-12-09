import generateInvoice from "./src/generateInvoice.js";

const invoice = {
	fName: "Neel",
	lName: "Mitra",
	services: [
		{
			name: "Facebook Love React",
			quantity: 200,
			unit_cost: 0.055,
		},
		{
			name: "Facebook WoW React",
			quantity: 150,
			unit_cost: 0.055,
		},
		{
			name: "Facebook Like",
			quantity: 150,
			unit_cost: 0.05,
		},
	],
};

generateInvoice(invoice);
