class Usuarios {

    constructor() {
        this.personas = [];

    }

    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;

    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        if (persona) return { ok: true, persona };
        else return { ok: false, message: 'Persona no encontrada' };
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        if (personaBorrada) {
            this.personas = this.personas.filter(persona => persona.id !== id);

            return {
                ok: true,
                personaBorrada
            };
        } else {
            return {
                ok: false,
                message: 'Persona no encontrada'
            }
        }

    }


}

module.exports = {
    Usuarios
}