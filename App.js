const form = document.getElementById("form");
const backgroundImg = document.querySelector(".background-container");
const containerImg = document.querySelector(".container-img");
const registerSection = document.querySelector("main");
const showRegister = document.querySelector("#show-register-section");
const containerInputs = document.querySelectorAll(".container-input");
const buttonCreate = document.querySelector(".btn-create-account");
const containerLogo = document.querySelector('.container-logo')
const headers = containerLogo.querySelectorAll('h2')

const inputsElements = [];
const verifyFocus = (element) => {
	containerInputs.forEach((container) =>
		container != element ? container.classList.remove("focus-input") : false
	);
};

function styleSetContainer(container) {
	[...container].forEach((container) => {
		const input = container.querySelector("input");
		inputsElements.push(input);
		input.addEventListener("focus", (event) => {
			container.classList.add("focus-input");
			verifyFocus(container);
		});
	});
}

styleSetContainer(containerInputs);

class ValidationsForm{
	constructor(){
		this.emailsValidy = ["@gmail.com", "@outlook.com", "@yahoo.com"]
		this.stateValidationInput = []
		this.isRegistered = false
		this.TIME_DISPLAY = 2000
	}
	filterEmptyValues(value) {
		const valuesFiltred = [...value.split("")]
			.filter((el) => el != "" && el != " ")
			.every((el) => el === "");
		valuesFiltred ? this.stateValidationInput.push("error") : false;
		return valuesFiltred;
	}
	messageError(message, parent) {
		const messageElement = parent.querySelector(".message");
		messageElement.classList.add("message-error");
		messageElement.textContent = message;
		setTimeout(
			() => messageElement.classList.remove("message-error"),
			this.TIME_DISPLAY
		);
	}
	itsValid(validy, parent, message) {
		validy
			? this.stateValidationInput.push("valid")
			: (this.messageError(message, parent),
			  this.stateValidationInput.push("error"));
	}
	email(input, parent) {
		let users = JSON.parse(localStorage.getItem("users"));
		!users ? users = [] : false
		let findUser = users.filter((user) => user.email === input.value);

		const messageError = "Email invalido";
		const registeredEmail = "Email ja cadastrado";
		for (let email of this.emailsValidy) {
			const emailIncludes = input.value.includes(email);
			if (findUser.length == 0) {
				this.isRegistered = false;
				return this.itsValid(emailIncludes, parent, messageError);
			} else {
				this.isRegistered = true;
				return this.messageError(registeredEmail, parent);
			}
		}
	}
	password(input, parent) {
		const messageError = "Minimo 8 caracteres";
		const passwordChars = input.value.length > 8;
		this.itsValid(passwordChars, parent, messageError);
	}

}

const makeId = () => {
	let performanceNumbers = performance.now().toString(36);
	let random = Math.random().toString(36);
	let result = performanceNumbers + random;
	return result.replaceAll(".", "");
};

function Submit(event) {
	const Validations = new ValidationsForm()

	inputsElements.forEach((input) => {
		const notEmpty = Validations.filterEmptyValues(input.value);
		const parent = input.parentElement.parentElement;

		notEmpty
			? parent.classList.add("error")
			: parent.classList.remove("error");

		Validations[input.id]
			? Validations[input.id](input, parent)
			: false;
	});

	const validated = Validations.stateValidationInput.every(
		(val) => val === "valid"
	);
	const userRegistered = Validations.isRegistered;

	if (validated && !userRegistered) {
		const userData = inputsElements.reduce((acc, input) => {
			acc["id"] = makeId();
			acc[input.id] = input.value;
			return acc;
		}, {});
		Storage(userData);
		Welcome(userData);
	}
}

function Welcome({firstName,lastName}) {
	const headerUser= containerLogo.querySelector('#user-header')
	inputsElements.forEach((input) => (input.value = ""));
	registerSection.classList.remove("register-on");
	headers.forEach( hd => hd.classList.remove('show-header'))

	headerUser.innerHTML = `Welcome ${firstName} ${lastName} <span>.</span>`
}

function Storage(data) {
	let users = JSON.parse(localStorage.getItem("users"));
	!users ? (users = []) : false;
	users.push(data);
	localStorage.setItem("users", JSON.stringify(users));
}

const displayRegister = () => {
	registerSection.classList.add("register-on")
	headers.forEach( hd2 => hd2.classList.add('show-header'))
}

window.addEventListener("load", () => {
	backgroundImg.classList.remove("background-view");
	backgroundImg.classList.add("gradient-color");
});

form.addEventListener("submit", (event) => event.preventDefault());
showRegister.addEventListener("click", displayRegister);
buttonCreate.addEventListener("click", Submit);
