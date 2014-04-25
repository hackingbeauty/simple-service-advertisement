
/*
  Copyright 2014 Marc Juul
  License: AGPLv3

  This file is part of service-browser.

  service-browser is free software: you can redistribute it 
  and/or modifyit under the terms of the GNU Affero General 
  Public License as published by the Free Software Foundation,
  either version 3 of the License, or (at your option) any 
  later version.

  service-browser is distributed in the hope that it will be
  useful, but WITHOUT ANY WARRANTY; without even the implied
  warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR 
  PURPOSE.  See the GNU Affero General Public License for 
  more details.

  You should have received a copy of the GNU Affero General 
  Public License along with service-browser. 
  If not, see <http://www.gnu.org/licenses/>.
*/

console.log("web app initialized");

function service_up(service) {
    service.host = service.host.replace(/\.$/, '');

    var el = document.createElement('P');
    if(service.port == 80) {
        el.innerHTML = '<a href="http://'+service.host+'/">'+service.fullname + ' - ' + service.host + ' - ' + service.port + '</a>';        
    } else if(service.port == 443) {
        el.innerHTML = '<a href="https://'+service.host+'/">'+service.fullname + ' - ' + service.host + ' - ' + service.port + '</a>';        
    } else {
        el.innerHTML = service.fullname + ' - ' + service.host + ' - ' + service.port;
    }
    $('#services').append(el);
}

function service_down(service) {
    // TODO implement this
    console.log("service down handling un-implemented");
}


var sock = new SockJS('/websocket');

sock.onopen = function() {
    console.log('open');
};
sock.onmessage = function(e) {
    var data = JSON.parse(e.data);;
    if(data.type == 'service') {

        if(data.action == 'up') {
            service_up(data.service);
        } else if(e.data.action == 'down') {
            service_down(data.service);
        }
    }
};
sock.onclose = function() {
    console.log('close');
};