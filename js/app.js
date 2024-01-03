const listCourse = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articuloCarrito = [];

initEventListeners();
function initEventListeners() {
	listCourse.addEventListener('click', agregarCurso);
	carrito.addEventListener('click', eliminarCurso);
	vaciarCarritoBtn.addEventListener('click', () => {
		articuloCarrito = [];
		limpiarCurso();
	});
}

function agregarCurso(e) {
	e.preventDefault();

	if (e.target.classList.contains('agregar-carrito')) {
		const cursoSeleccionado = e.target.parentElement.parentElement;
		leerDatoCurso(cursoSeleccionado);

	}
}

function eliminarCurso(e) {

	if (e.target.classList.contains('borrar-curso')) {
		const cursoId = e.target.getAttribute('data-id');

		const cursoEliminar = articuloCarrito.find(curso => curso.id === cursoId)
		if (cursoEliminar) {
			if (cursoEliminar.cantidad > 1) {
				cursoEliminar.cantidad--;
			} else {
				articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId);
			}
		}

		carritoHTML()
	}
}

function leerDatoCurso(curso) {

	const infoCurso = {
		imagen: curso.querySelector("img").src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	}

	const existe = articuloCarrito.some(curso => curso.id === infoCurso.id);
	if (existe) {
		const cursos = articuloCarrito.map(curso => {
			if (curso.id === infoCurso.id) {
				curso.cantidad++;
				return curso;
			} else {
				return curso;
			}
		});

		articuloCarrito = [...cursos];

	} else {
		articuloCarrito = [...articuloCarrito, infoCurso];
	}

	carritoHTML();
}

function carritoHTML() {
	limpiarCurso()

	articuloCarrito.forEach(curso => {

		const { imagen, titulo, precio, cantidad, id } = curso;
		const row = document.createElement('tr');

		row.innerHTML = `
			<td>
				<img src='${imagen}' width='100'>
			</td>
			<td>${titulo}</td>
			<td>${precio}</td>
			<td>${cantidad}</td>
			<td>
				<a href="#" class="borrar-curso" data-id="${id}"> X </a>
			</td>
		`;

		contenedorCarrito.appendChild(row);
	});
}

function limpiarCurso() {

	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}