const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 4;
    this.dia = new Date().getDate();
    this.tickets_pendientes = [];
    this.tickets_en_atencion = [];

    let data = require("../data/data.json");
    if (data.dia === this.dia) {
      this.ultimo = data.ultimo;
      this.tickets_pendientes = data.tickets_pendientes;
      this.tickets_en_atencion = data.tickets_en_atencion;
    } else {
      this.reiniciarConteno();
    }
  }
  reiniciarConteno() {
    this.ultimo = 0;
    this.tickets_pendientes = [];
    this.tickets_en_atencion = [];

    this.salvarCambios();
    console.log("Se ha inicializado el sistema");
  }

  siguienteTicket() {
    ++this.ultimo;
    let nuevo_ticket = new Ticket(this.ultimo, null);
    this.tickets_pendientes.push(nuevo_ticket);

    this.salvarCambios();
    return this.ultimo;
  }

  getEstadoTicket() {
    return this.ultimo;
  }

  getTicketsEnAtencion() {
    return this.tickets_en_atencion;
  }

  asignarTicket(escritorio) {
    if (this.tickets_pendientes.length === 0) {
      return {
        ok: false,
        message: "No hay tickets pendientes"
      };
    }

    let numero_ticket = this.tickets_pendientes[0].numero;
    this.tickets_pendientes.shift();

    let nuevo_ticket = new Ticket(numero_ticket, escritorio);

    var index_escritorio = this.tickets_en_atencion.findIndex(
      element => element.escritorio
    );

    if (index_escritorio !== -1) {
      this.tickets_en_atencion[index_escritorio] = nuevo_ticket;
    } else {
      this.tickets_en_atencion.push(nuevo_ticket);
    }


    if (this.tickets_en_atencion.length > 4) {
      this.tickets_en_atencion.splice(-1, 1);
    }
    this.salvarCambios();

    return nuevo_ticket;
  }

  salvarCambios() {
    let Data = {
      ultimo: this.ultimo,
      dia: this.dia,
      tickets_pendientes: this.tickets_pendientes,
      tickets_en_atencion: this.tickets_en_atencion
    };

    let jsonData = JSON.stringify(Data);

    fs.writeFileSync("./server/data/data.json", jsonData);
  }
}

module.exports = {
  TicketControl
};
