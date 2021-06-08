const nodemailer = require('nodemailer');

function generateOrderEmail ({order,total})  {

	return `
		<div>
			<h2>Your recent order for ${total}</h2>
			<p>Please start walking over, we will have your order ready in the next 20 mins.</p>
			<ul>
				${order.map(item => 
					`<li>
						<img src="${item.thumbnail}" alt="${item.name}">
						${item.size} ${item.name} - ${item.price}
					</li>`).join(' ')}
			</ul>
			<p>Your total is $${total} due at pickup</p>
		</div>

	`;
}

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "cortney.little36@ethereal.email",
        pass: "yyZ9eFAV4NXKQNuye3"
    }
});

const wait = (ms = 0) => {

	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms)
	})
}

exports.handler = async (event, context) => {
	// await wait(5000);
	const body = JSON.parse(event.body);
	if(body.maplesyrup){
		return {
			statusCode: 400,
			body: JSON.stringify({message: 'Boob beep bop zzzst good bye'})
		}
	}
	const requiredFields = ['email','name','order'];
	for(field of requiredFields){
		
		if(!body[field]) {
			return {
				statusCode: 400,
				body: JSON.stringify({message: `Opps! you are missing the ${field} field`})
			}
		}
	}

	if(!body.order.length) {
			return {
				statusCode: 400,
				body: JSON.stringify({message: `Why would you order nothing?!`})
			}
		}

const info = await transporter.sendMail({
	from: "Slick's Slices <slick@example.com>",
	to: `${body.name} <${body.email}>, orders@example.com`,
	subject:  "New order!",
	html: generateOrderEmail({order: body.order, total: body.total}),
});

	console.log(info);

	return {
		statusCode: 200,
		body: JSON.stringify({message: 'Success'})

	}

}
