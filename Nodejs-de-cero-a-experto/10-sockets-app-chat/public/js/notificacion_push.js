 function notificacion(nombre, mensaje, tipo) {
    if (Notification) {
        
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
      var title = "Chat";
  
      let extra = {
        icon: "../assets/img/campana.png",
        body: "Nuevo mensaje de " + nombre
      };
      if (tipo) {
        switch (tipo) {
          case 1: {
            extra = {
              icon: "../assets/img/campana.png",
              body: "Se conectó el usuario " + nombre
            };
          }
          case 2: {
            extra = {
              icon: "../assets/img/campana.png",
              body: "Se desconectó el usuario " + nombre
            };
          }
        }
      }
  
      var noti = new Notification(title, extra);
      noti.onclick = {
        // Al hacer click
      };
      noti.onclose = {
        // Al cerrar
      };
      setTimeout(function() {
        noti.close();
      }, 2500);
    }
  
  }
  export { notificacion };

