const {io} = require("../server");
const {TicketControl} = require("../classes/ticket-control");


const ticketControl = new TicketControl();



io.on('connection',(cliente)=>{

    
    
    cliente.on('siguienteTicket',(data,callback)=>{
    
    
    let data_ticket= {
        ok:true,
        number_ticket:ticketControl.siguienteTicket()
    }

  
    callback(data_ticket)

    });


    cliente.emit('estadoActual',{
        actual:ticketControl.getEstadoTicket(),
        tickets_en_atencion:ticketControl.getTicketsEnAtencion()
    });
  
    cliente.on('atenderTicket',(data,callback)=>{

        if(!data.escritorio){
            return callback({
                ok:false,
                err:{
                message:'El escritorio es necesario'
                }
            });
        }


    callback(ticketControl.asignarTicket(data.escritorio));
    console.log('Emit broadcast');
    cliente.broadcast.emit("actualizandoAtencion",{tickets_en_atencion:ticketControl.getTicketsEnAtencion()});


    });

});