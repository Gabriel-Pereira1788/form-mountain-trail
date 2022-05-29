const form = document.getElementById("form");
const backgroundImg = document.querySelector(".background-container");
const containerImg = document.querySelector(".container-img");
const registerSection = document.querySelector("main");
const showRegister = document.querySelector("#show-register-section");
const containerInputs = document.querySelectorAll(".container-input");
const buttonCreate = document.querySelector(".btn-create-account");

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

function Validation(inputs) {
	const filterEmptyValues = (value) => {
		return [...value.split("")]
			.filter((el) => el != "" && el != " ")
			.every((el) => el === "");
	};

	const VALIDATIONS_INPUTS = {
		emailsValidy: ["@gmail.com", "@outlook.com", "@yahoo.com"],
		stateValidation: [],
		itsValid(validy) {
			validy
				? this.stateValidation.push('valid')
				: this.stateValidation.push('error');
		},
		email(input) {
			for (let email of this.emailsValidy) {
				return this.itsValid(input.value.includes(email))			
			}
		},
		password(input) {
			this.itsValid(input.value.length > 8)
			
		},
	};

	inputs.forEach((input) => {
		const notEmpty = filterEmptyValues(input.value);
		const parent = input.parentElement.parentElement;

		notEmpty
			? parent.classList.add("error")
			: parent.classList.remove("error");

		VALIDATIONS_INPUTS[input.id]
			? VALIDATIONS_INPUTS[input.id](input)
			: false;
	});
	return VALIDATIONS_INPUTS.stateValidation;
}

function Submit(event) {
	const validations = Validation(inputsElements).every(val => val === true)
	console.log(validations)
	}

const displayRegister = () => {
	containerImg.style.position = "static";
	registerSection.classList.add("register-on");
};

window.addEventListener("load", () => {
	backgroundImg.classList.remove("background-view");
	backgroundImg.classList.add("gradient-color");
});

form.addEventListener("submit", (event) => event.preventDefault());

showRegister.addEventListener("click", displayRegister);

buttonCreate.addEventListener("click", Submit);
