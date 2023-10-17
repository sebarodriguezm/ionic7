export class VistaDto {
	id?: string;
	projectId?: string;
	type?: string; //1 para link externo, 2 para vista interna,
	link?: string; //cuando es link interno
	title?: string;
	description?: string;
	photo?: string;
	button?: string;
	icon?: string;
	color?: string;
	order?: number;
}